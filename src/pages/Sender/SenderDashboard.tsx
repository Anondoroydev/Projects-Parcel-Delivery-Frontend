// SenderDashboard.tsx
import React, { useState } from "react";

import CreateParcelForm from "@/components/Parcel/CreateParcelForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/ui/statusBadge";
import { withAsyncHandler } from "@/hooks/eventHandler";
import {
  useGetAllParcelsQuery,
  useUpdateParcelMutation,
} from "@/redux/features/parcel/parcel.api";
import { IParcel } from "@/types/parcel.type";
import { getStatusVariant } from "@/utils/getStatus";
import {
  AlertCircle,
  Calendar,
  Clock,
  Loader,
  MapPin,
  Package,
  Plus,
  RotateCw,
  Truck,
  User,
} from "lucide-react";
import { useSearchParams } from "react-router";

const SenderDashboard: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("currentStatus") || undefined;

  const {
    data: parcels,
    error,
    isLoading,
    refetch,
  } = useGetAllParcelsQuery({ currentStatus });
  const [updateParcel, { isLoading: isCancelParcelLoading }] =
    useUpdateParcelMutation();

  const handleFilterValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("currentStatus", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("currentStatus");
    setSearchParams(params);
  };

  const parcelUpdateHandler = withAsyncHandler(
    (data: { trkId: string; data: Partial<IParcel> }) => updateParcel(data),
    {
      loadingMessage: "Cancel the Parcel delivery",
      successMessage: "Parcel Cancelled successfully!",
      showSuccess: true,
      showError: true,
    }
  );

  const handleCancelParcel = async (trkId: string, data: Partial<IParcel>) => {
    await parcelUpdateHandler({ trkId, data });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Error Loading Parcels
            </CardTitle>
            <CardDescription>
              There was a problem loading your parcels. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={refetch}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Parcels</h1>
          <p className="text-muted-foreground">Manage your delivery requests</p>
        </div>
        <div className="flex items-center gap-5">
          {isCreating && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
          )}
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Parcel
          </Button>
        </div>
      </div>
      {isCreating && (
        <>
          <CreateParcelForm />
        </>
      )}

      <div className="w-full">
        <div className="flex items-center gap-5">
          <Select
            value={currentStatus || ""}
            onValueChange={(value) => {
              if (value === "all") {
                return handleClearFilter();
              }
              handleFilterValueChange(value);
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="REQUESTED">Requested</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="PICKED">Picked</SelectItem>
              <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
              <SelectItem value="RETURNED">Returned</SelectItem>
            </SelectContent>
          </Select>
          <Button
            title="Rreset Searchfield and filter"
            onClick={handleClearFilter}
            size={"icon"}
            variant="default"
          >
            <RotateCw />
          </Button>
        </div>

        <div className="mt-6">
          <ParcelGrid
            parcels={parcels?.data || []}
            onCancelParcel={handleCancelParcel}
            isLoading={isCancelParcelLoading}
          />
        </div>
      </div>
    </div>
  );
};

// ParcelGrid component to display parcels in a grid
const ParcelGrid: React.FC<{
  parcels: IParcel[];
  onCancelParcel: (trkId: string, data: Partial<IParcel>) => void;
  isLoading: boolean;
}> = ({ parcels, onCancelParcel, isLoading }) => {
  if (parcels.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No parcels found</h3>
        <p className="text-muted-foreground">
          You don't have any parcels in this category yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {parcels.map((parcel) => (
        <ParcelCard
          key={parcel.trackingId}
          parcel={parcel}
          onCancelParcel={onCancelParcel}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

// ParcelCard component to display individual parcel details
const ParcelCard: React.FC<{
  parcel: IParcel;
  onCancelParcel: (trkId: string, data: Partial<IParcel>) => void;
  isLoading: boolean;
}> = ({ parcel, onCancelParcel, isLoading }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5" />
              {parcel?.packageDetails?.description}
            </CardTitle>
            <CardDescription>ID: {parcel.trackingId}</CardDescription>
          </div>
          {parcel?.currentStatus && (
            <StatusBadge variant={getStatusVariant(parcel?.currentStatus)}>
              {parcel?.currentStatus?.replace("_", " ")}
            </StatusBadge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{parcel.receiver.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="line-clamp-1">{parcel?.receiver?.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <span>
            {parcel?.packageDetails?.weight} kg • {parcel?.packageDetails?.type}{" "}
          </span>
        </div>
        {parcel?.expectedDeliveryDate && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              Est. delivery:{" "}
              {new Date(parcel?.expectedDeliveryDate).toLocaleDateString()}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>
            Created: {new Date(parcel.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        {parcel?.currentStatus === "REQUESTED" ? (
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={() =>
              onCancelParcel(parcel?.trackingId, {
                currentStatus: "CANCELLED",
              })
            }
            className="w-full"
          >
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              "Cancel Delivery"
            )}
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled className="w-full">
            Cannot Cancel
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SenderDashboard;
