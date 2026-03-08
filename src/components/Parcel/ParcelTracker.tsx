// components/parcels/ParcelTracker.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLazyGetAllParcelsQuery } from "@/redux/features/parcel/parcel.api";
import { Search } from "lucide-react";
import React, { useState } from "react";
import ParcelDetails from "./ParcelDetails";

const ParcelTracker: React.FC = () => {
  const [trackingId, setTrackingId] = useState("");
  const [getAllParcels, { data: parcel, isLoading, isError }] =
    useLazyGetAllParcelsQuery();

  console.log(parcel);

  const handleTrack = () => {
    if (trackingId.trim()) {
      getAllParcels({ trackingId: trackingId.trim() });
    }
  };

  return (
    <Card className="w-full max-w-2xl my-10 mx-auto">
      <CardHeader>
        <CardTitle>Track Your Parcel</CardTitle>
        <CardDescription>
          Enter your tracking ID to check the status of your parcel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <div className="flex-1 space-y-2">
            <Label htmlFor="trackingId">Tracking ID</Label>
            <Input
              id="trackingId"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter tracking ID"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleTrack}
              disabled={isLoading || !trackingId.trim()}
            >
              <Search className="mr-2 h-4 w-4" />
              {isLoading ? "Tracking..." : "Track"}
            </Button>
          </div>
        </div>

        {isError && (
          <div className="bg-destructive/15 text-destructive p-3 rounded-md">
            {"Parcel not found"}
          </div>
        )}

        {parcel && <ParcelDetails parcel={parcel?.data[0]} />}
      </CardContent>
    </Card>
  );
};

export default ParcelTracker;
