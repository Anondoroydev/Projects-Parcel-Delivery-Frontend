import Loading from "@/components/Loading";
import { ParcelDetailsDialog } from "@/components/Parcel/ParcelDetailsDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/statusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { withAsyncHandler } from "@/hooks/eventHandler";
import {
  useGetAllParcelsQuery,
  useUpdateParcelMutation,
} from "@/redux/features/parcel/parcel.api";
import type { IParcel, TParcelStatus } from "@/types/parcel.type";
import { getChangedFieldsEnhanced } from "@/utils/getChangedFields";
import { getStatusVariant } from "@/utils/getStatus";
import {
  Eye,
  MoreHorizontal,
  Package,
  RotateCw,
  Search,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

const statusArray = [
  "REQUESTED",
  "APPROVED",
  "PICKED",
  "IN_TRANSIT",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

export default function ManageParcel() {
  const [editedParcel, setEditedParcel] = useState<Partial<IParcel> | null>(
    null
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || undefined;
  const currentStatus = searchParams.get("currentStatus") || undefined;

  const [viewDetails, setViewDetails] = useState(false);
  const [viewParcel, setViewParcel] = useState<IParcel | null>(null);

  const { data, isLoading, error } = useGetAllParcelsQuery({
    searchTerm,
    currentStatus,
  });
  const [updateParcel, { isLoading: isUpdateParcelLoading }] =
    useUpdateParcelMutation();

  const handleSearchValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("searchTerm", value);
    setSearchParams(params);
  };

  const handleFilterValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("currentStatus", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("currentStatus");
    params.delete("searchTerm");
    setSearchParams(params);
  };

  const parcelUpdateHandler = withAsyncHandler(
    (data: { trkId: string; data: Partial<IParcel> }) => updateParcel(data),
    {
      loadingMessage: "Updating Parcel data",
      successMessage: "Parcel data updated successfully!",
      showSuccess: true,
      showError: true,
    }
  );

  const parcelUpdater = async (trkId: string, data: Partial<IParcel>) => {
    await parcelUpdateHandler({ trkId, data });
  };

  const handleOnUpdateParcel = async () => {
    if (editedParcel && viewParcel) {
      const changes = getChangedFieldsEnhanced(viewParcel, editedParcel);

      const trkId = viewParcel.trackingId;
      const data = { ...changes };

      // Only proceed if there are actual changes
      if (Object.keys(changes)?.length > 0) {
        await parcelUpdater(trkId, data);
      }
    }
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="p-4 text-primary text-center mt-10">
        Error loading users
      </div>
    );

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Parcel Management</CardTitle>
          <CardDescription>
            Manage all parcels and their delivery status
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search parcels..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => handleSearchValueChange(e.target.value)}
              />
            </div>
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
        </CardHeader>
        <CardContent>
          {/* Mobile View */}
          <div className="sm:hidden space-y-4">
            {data?.data?.map((parcel: IParcel) => (
              <div
                key={parcel?.trackingId}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{parcel.trackingId}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(parcel.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge variant={getStatusVariant(parcel.currentStatus)}>
                    {parcel.currentStatus}
                  </StatusBadge>
                </div>

                <div>
                  <p className="font-medium">{parcel.receiver.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {parcel.receiver.email}
                  </p>
                </div>

                <div>
                  <p className="font-medium">{parcel.packageDetails.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {parcel.packageDetails.weight} kg
                  </p>
                </div>

                <div className="pt-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <MoreHorizontal className="h-4 w-4 mr-2" />
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={() => {
                          setViewParcel(parcel);
                          setViewDetails(true);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {statusArray.map((status, i) => (
                        <DropdownMenuItem
                          disabled={isUpdateParcelLoading}
                          key={i}
                          onClick={() =>
                            parcelUpdater(parcel?.trackingId, {
                              currentStatus: status as TParcelStatus,
                            })
                          }
                        >
                          <Package className="mr-2 h-4 w-4" />
                          Mark as {status}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      {parcel?.isBlocked ? (
                        <DropdownMenuItem
                          disabled={isUpdateParcelLoading}
                          onClick={() =>
                            parcelUpdater(parcel.trackingId, {
                              isBlocked: false,
                            })
                          }
                          className="text-green-600"
                        >
                          <UserCheck className="mr-2 h-4 w-4" />
                          Unblock Parcel
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          disabled={isUpdateParcelLoading}
                          onClick={() =>
                            parcelUpdater(parcel.trackingId, {
                              isBlocked: true,
                            })
                          }
                          className="text-destructive"
                        >
                          <UserX className="mr-2 h-4 w-4" />
                          Block Parcel
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {data?.data?.length === 0 && (
              <div className="flex justify-center items-center py-10 text-muted-foreground">
                No parcels found
              </div>
            )}
          </div>

          {/* Desktop View */}
          <div className="hidden sm:block">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking #</TableHead>
                    <TableHead>Sender</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Package Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.map((parcel: IParcel) => (
                    <TableRow key={parcel._id}>
                      <TableCell className="font-medium">
                        {parcel?.trackingId}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{parcel?.sender?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {parcel?.sender?.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {parcel?.sender?.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {parcel?.receiver?.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {parcel?.receiver?.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {parcel?.receiver?.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {parcel.packageDetails.type}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {parcel.packageDetails.weight} kg
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          variant={getStatusVariant(parcel.currentStatus)}
                        >
                          {parcel?.currentStatus}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        {new Date(parcel.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setViewParcel(parcel);
                                setViewDetails(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {statusArray.map((status, i) => (
                              <DropdownMenuItem
                                disabled={isUpdateParcelLoading}
                                key={i}
                                onClick={() =>
                                  parcelUpdater(parcel?.trackingId, {
                                    currentStatus: status as TParcelStatus,
                                  })
                                }
                              >
                                <Package className="mr-2 h-4 w-4" />
                                Mark as {status}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            {parcel?.isBlocked ? (
                              <DropdownMenuItem
                                disabled={isUpdateParcelLoading}
                                onClick={() =>
                                  parcelUpdater(parcel.trackingId, {
                                    isBlocked: false,
                                  })
                                }
                                className="text-green-600"
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Unblock Parcel
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                disabled={isUpdateParcelLoading}
                                onClick={() =>
                                  parcelUpdater(parcel?.trackingId, {
                                    isBlocked: true,
                                  })
                                }
                                className="text-destructive"
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Block Parcel
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {data?.data?.length === 0 && (
              <div className="flex justify-center items-center py-10 text-muted-foreground">
                No parcels found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <ParcelDetailsDialog
        editedParcel={editedParcel}
        setEditedParcel={setEditedParcel}
        onOpenChange={() => setViewDetails(!viewDetails)}
        open={viewDetails}
        onUpdateParcel={handleOnUpdateParcel}
        parcel={viewParcel}
        isLoading={isUpdateParcelLoading}
      />
    </>
  );
}
