import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PackageTypesArray, ParcelStatusArray } from "@/constants/parcel";
import { type IParcel, type TParcelStatus } from "@/types/parcel.type";
import { getStatusVariant } from "@/utils/getStatus";
import {
  Clock,
  DollarSign,
  Loader,
  Mail,
  MapPin,
  Package,
  Phone,
  Save,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { StatusBadge } from "../ui/statusBadge";

interface ParcelDetailsDialogProps {
  parcel: IParcel | null;
  open: boolean;
  editedParcel: Partial<IParcel> | null; // Fixed type
  setEditedParcel: React.Dispatch<
    React.SetStateAction<Partial<IParcel> | null>
  >;
  onOpenChange: (open: boolean) => void;
  onUpdateParcel: () => Promise<void>;
  isLoading: boolean;
}

export function ParcelDetailsDialog({
  parcel,
  open,
  onOpenChange,
  onUpdateParcel,
  editedParcel,
  setEditedParcel,
  isLoading,
}: ParcelDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Initialize edited parcel when dialog opens or parcel changes
  useEffect(() => {
    if (parcel) {
      setEditedParcel({ ...parcel });
    }
  }, [parcel, open, setEditedParcel]);


  const handleSave = async () => {
    await onUpdateParcel();
    setIsEditing(true);
    onOpenChange(true);
  }; // Fixed syntax error

  const handleCancel = () => {
    // Reset to the current parcel data (which might have been updated by parent)
    setEditedParcel(parcel ? { ...parcel } : null);
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: any) => {
    if (editedParcel) {
      // Handle nested objects
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        setEditedParcel({
          ...editedParcel,
          [parent]: {
            ...(editedParcel[parent as keyof IParcel] as object),
            [child]: value,
          },
        });
      } else {
        setEditedParcel({
          ...editedParcel,
          [field]: value,
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!parcel || !editedParcel) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Parcel Details: {parcel.trackingId}
          </DialogTitle>
          <DialogDescription>
            View and manage parcel information and tracking
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Action buttons */}
          <div className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button disabled={isLoading} onClick={handleSave}>
                  {isLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <span className="flex items-center justify-center">
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </span>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Edit Parcel Details
              </Button>
            )}
          </div>

          {/* Status Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <StatusBadge variant={getStatusVariant(parcel?.currentStatus)}>
                  {parcel?.currentStatus}
                </StatusBadge>
                {isEditing && (
                  <Select
                    value={editedParcel?.currentStatus || parcel.currentStatus}
                    onValueChange={(value) =>
                      handleFieldChange("currentStatus", value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {ParcelStatusArray.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </h3>
              <p className="text-sm text-muted-foreground">
                Current parcel status
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Expected Delivery
              </h3>
              <p className="text-sm">
                {formatDate(parcel.expectedDeliveryDate)}
              </p>
            </div>
          </div>

          {/* Package Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Package Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Package Type</Label>
                {isEditing ? (
                  <Select
                    value={
                      editedParcel?.packageDetails?.type ||
                      parcel.packageDetails.type
                    }
                    onValueChange={(value) =>
                      handleFieldChange("packageDetails.type", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PackageTypesArray.map((pak) => (
                        <SelectItem key={pak} value={pak}>
                          {pak}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="type"
                    value={parcel.packageDetails.type}
                    readOnly
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                {isEditing ? (
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={
                      editedParcel?.packageDetails?.weight ||
                      parcel?.packageDetails.weight
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        "packageDetails.weight",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                ) : (
                  <Input
                    id="weight"
                    value={parcel?.packageDetails?.weight}
                    readOnly
                  />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  value={
                    editedParcel?.packageDetails?.description ||
                    parcel.packageDetails.description
                  }
                  onChange={(e) =>
                    handleFieldChange(
                      "packageDetails.description",
                      e.target.value
                    )
                  }
                />
              ) : (
                <Input
                  id="description"
                  value={parcel.packageDetails.description}
                  readOnly
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="fee">Shipping Fee ($)</Label>
              {isEditing ? (
                <Input
                  id="fee"
                  type="number"
                  step="0.01"
                  value={editedParcel?.fee || parcel.fee}
                  onChange={(e) =>
                    handleFieldChange("fee", parseFloat(e.target.value))
                  }
                />
              ) : (
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <Input id="fee" value={parcel.fee.toFixed(2)} readOnly />
                </div>
              )}
            </div>
          </div>

          {/* Recipient Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Recipient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedParcel?.receiver?.name || parcel.receiver.name}
                    onChange={(e) =>
                      handleFieldChange("receiver.name", e.target.value)
                    }
                  />
                ) : (
                  <Input id="name" value={parcel.receiver.name} readOnly />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1">
                  <Mail className="h-4 w-4" /> Email
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={
                      editedParcel?.receiver?.email || parcel.receiver.email
                    }
                    onChange={(e) =>
                      handleFieldChange("receiver.email", e.target.value)
                    }
                  />
                ) : (
                  <Input id="email" value={parcel.receiver.email} readOnly />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> Address
              </Label>
              {isEditing ? (
                <Textarea
                  id="address"
                  value={
                    editedParcel?.receiver?.address || parcel.receiver.address
                  }
                  onChange={(e) =>
                    handleFieldChange("receiver.address", e.target.value)
                  }
                />
              ) : (
                <Input id="address" value={parcel.receiver.address} readOnly />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-1">
                <Phone className="h-4 w-4" /> Phone
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={editedParcel?.receiver?.phone || parcel.receiver.phone}
                  onChange={(e) =>
                    handleFieldChange("receiver.phone", e.target.value)
                  }
                />
              ) : (
                <Input id="phone" value={parcel.receiver.phone} readOnly />
              )}
            </div>
          </div>

          {/* Status History */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Status History</h3>
            <div className="space-y-2">
              {parcel.statusLog.map((log, index) => (
                <div
                  key={log._id}
                  className="flex items-start gap-3 p-3 border rounded-md"
                >
                  <div className="flex flex-col items-center mt-1">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        index === 0 ? "bg-primary" : "bg-muted-foreground"
                      }`}
                    />
                    {index < parcel.statusLog.length - 1 && (
                      <div className="w-0.5 h-10 bg-muted-foreground/30 my-1" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <StatusBadge
                        variant={getStatusVariant(log?.status as TParcelStatus)}
                      >
                        {log.status}
                      </StatusBadge>
                      <span className="text-sm text-muted-foreground">
                        {formatDateTime(log.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{log.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Created: </span>
              {formatDateTime(parcel.createdAt)}
            </div>
            <div>
              <span className="font-medium">Last Updated: </span>
              {formatDateTime(parcel.updatedAt)}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
