import { IParcel } from "@/types/parcel.type";
import React from "react";
import ParcelDetails from "./ParcelDetails";

interface ParcelListProps {
  parcels: IParcel[];
  title: string;
  emptyMessage: string;
}

const ParcelList: React.FC<ParcelListProps> = ({
  parcels,
  title,
  emptyMessage,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {parcels.length === 0 ? (
        <div className="text-center py-8 bg-muted rounded-lg">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        parcels.map((parcel) => (
          <ParcelDetails key={parcel?.trackingId} parcel={parcel} />
        ))
      )}
    </div>
  );
};

export default ParcelList;
