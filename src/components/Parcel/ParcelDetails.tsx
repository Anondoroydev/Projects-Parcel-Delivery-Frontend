import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { withAsyncHandler } from "@/hooks/eventHandler";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useUpdateParcelMutation } from "@/redux/features/parcel/parcel.api";
import { IParcel } from "@/types/parcel.type";
import {
  Calendar,
  Loader,
  MapPin,
  Package,
  Phone,
  SquareLibrary,
  User,
} from "lucide-react";
import React from "react";
import FormattedDate from "../modules/FormattedDate";
import Button from "../ui/button";
import StatusTimeline from "./StatusTimeline";

interface ParcelDetailsProps {
  parcel: IParcel;
}

const ParcelDetails: React.FC<ParcelDetailsProps> = ({ parcel }) => {
  const { data } = useUserInfoQuery(undefined);

  const [updateParcel, { isLoading: isUpdateParcelLoading }] =
    useUpdateParcelMutation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "in_transit":
        return "bg-blue-100 text-blue-800";
      case "out_for_delivery":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const parcelUpdateHandler = withAsyncHandler(
    (data: { trkId: string; data: Partial<IParcel> }) => updateParcel(data),
    {
      loadingMessage: "Confirming Parcel Delivery",
      successMessage: "Parcel confirmed successfully!",
      showSuccess: true,
      showError: true,
    }
  );

  const parcelUpdater = async (trkId: string, data: Partial<IParcel>) => {
    await parcelUpdateHandler({ trkId, data });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Parcel Details</CardTitle>
          <Badge
            variant="outline"
            className={getStatusColor(parcel?.currentStatus)}
          >
            {parcel?.currentStatus?.replace("_", " ")?.toUpperCase()}
          </Badge>
        </div>
        <CardDescription>Tracking ID: {parcel?.trackingId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.data?.role === "SENDER" && (
            <div className="space-y-2">
              <h3 className="font-medium flex items-center">
                <User className="mr-2 h-4 w-4" />
                Receiver Information
              </h3>
              <p>{parcel?.receiver?.name}</p>
              <p className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                {parcel?.receiver?.address}
              </p>
              <p className="flex items-center text-sm text-muted-foreground">
                <Phone className="mr-2 h-4 w-4" />
                {parcel?.receiver?.phone}
              </p>
            </div>
          )}
          {data?.data?.role === "RECIVER" && (
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">From</p>
                  <p className="text-sm font-medium">{parcel?.sender?.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Estimated Delivery
                  </p>
                  <p className="text-sm font-medium">
                    <FormattedDate dateString={parcel?.expectedDeliveryDate} />
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="text-sm font-medium">
                    {parcel?.packageDetails?.description}
                  </p>
                </div>
              </div>
            </CardContent>
          )}

          <div className="space-y-2">
            <h3 className="font-medium flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Parcel Information
            </h3>
            <p>Weight: {parcel?.packageDetails?.weight} kg</p>
            {parcel?.packageDetails?.description && (
              <p className="text-sm text-muted-foreground">
                {parcel?.packageDetails?.description}
              </p>
            )}
            <p className="flex items-center text-sm text-muted-foreground">
              <SquareLibrary className="mr-2 h-4 w-4" />
              Type: {parcel?.packageDetails?.type}
            </p>
            <p className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              Created: {new Date(parcel?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Delivery Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusTimeline status={parcel?.currentStatus} className="mb-6" />

            <div className="space-y-2">
              <h3 className="font-medium">Delivery Updates</h3>
              {parcel?.statusLog && parcel?.statusLog?.length > 0 ? (
                <div className="space-y-2">
                  {parcel?.statusLog?.map((update, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary mr-3"></div>
                      <div>
                        <p className="text-sm font-medium capitalize">
                          {update?.status?.replace("_", " ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <FormattedDate dateString={update?.createdAt} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No status updates available.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Separator />
        <div className="flex items-center justify-end">
          {parcel?.currentStatus === "IN_TRANSIT" &&
            data?.data?.role === "RECIVER" && (
              <Button
                disabled={isUpdateParcelLoading}
                onClick={async () => {
                  await parcelUpdater(parcel?.trackingId, {
                    currentStatus: "DELIVERED",
                  });
                }}
              >
                {isUpdateParcelLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Confirm Delivery"
                )}
              </Button>
            )}
        </div>
        <Separator />
        <div>
          <h3 className="font-medium mb-2">Status History</h3>
          <div className="space-y-2">
            {parcel?.statusLog?.map((status, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mr-3"></div>
                <div>
                  <p className="text-sm font-medium">
                    {status?.status?.replace("_", " ").toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(status?.createdAt).toLocaleString()}
                    {status?.note && ` • ${status?.note}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParcelDetails;
