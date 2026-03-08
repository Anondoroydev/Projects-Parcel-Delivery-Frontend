import Loading from "@/components/Loading";
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
import { getStatusVariant } from "@/utils/getStatus";
import { MoreHorizontal, Package, RotateCw, Search } from "lucide-react";
import { useSearchParams } from "react-router";

// Delivery man can only update these three statuses
const deliveryManStatusArray = ["PICKED", "IN_TRANSIT", "DELIVERED"];

export default function DeliveryManParcelManagement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || undefined;
  const currentStatus = searchParams.get("currentStatus") || undefined;

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
      loadingMessage: "Updating Parcel status",
      successMessage: "Parcel status updated successfully!",
      showSuccess: true,
      showError: true,
    }
  );

  const parcelUpdater = async (trkId: string, data: Partial<IParcel>) => {
    await parcelUpdateHandler({ trkId, data });
  };

  // Filter parcels to only show those that delivery man can work with
  const filteredParcels = data?.data?.filter((parcel: IParcel) =>
    ["REQUESTED", "APPROVED", "PICKED", "IN_TRANSIT"].includes(
      parcel.currentStatus
    )
  );

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="p-4 text-primary text-center mt-10">
        Error loading parcels
      </div>
    );

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Delivery Management</CardTitle>
          <CardDescription>
            Update delivery status for assigned parcels
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search parcels..."
                className="pl-8 w-full"
                value={searchTerm || ""}
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
              </SelectContent>
            </Select>
            <Button
              title="Reset Searchfield and filter"
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
            {filteredParcels?.map((parcel: IParcel) => (
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
                      <DropdownMenuSeparator />
                      {deliveryManStatusArray.map((status, i) => (
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
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {filteredParcels?.length === 0 && (
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
                  {filteredParcels?.map((parcel: IParcel) => (
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
                            <DropdownMenuSeparator />
                            {deliveryManStatusArray.map((status, i) => (
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
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredParcels?.length === 0 && (
              <div className="flex justify-center items-center py-10 text-muted-foreground">
                No parcels found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
