import type { TParcelStatus } from "@/types/parcel.type";

export const getStatusVariant = (status: TParcelStatus): TParcelStatus => {
  const variantMap: Record<TParcelStatus, string> = {
    REQUESTED: "REQUESTED",
    APPROVED: "APPROVED",
    PICKED: "picked",
    IN_TRANSIT: "PICKED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
    RETURNED: "RETURNED",
  };

  return variantMap[status] as TParcelStatus;
};

// Format status for display (optional)
export const formatStatus = (status: TParcelStatus): string => {
  const statusMap: Record<TParcelStatus, string> = {
    REQUESTED: "Requested",
    APPROVED: "Approved",
    PICKED: "Picked Up",
    IN_TRANSIT: "In Transit",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
    RETURNED: "Returned",
  };

  return statusMap[status];
};
