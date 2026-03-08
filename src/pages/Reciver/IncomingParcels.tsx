import ParcelList from "@/components/Parcel/ParcelList";
import Button from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllParcelsQuery } from "@/redux/features/parcel/parcel.api";
import { RotateCw } from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router";

const IncomingParcels: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("currentStatus") || undefined;
  const {
    data: parcels,
    isLoading,
    error,
  } = useGetAllParcelsQuery({ currentStatus });

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

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">
          Error loading incoming parcels. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Incoming Parcels</h1>
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
      <ParcelList
        parcels={parcels?.data || []}
        title="Your Parcels"
        emptyMessage="No parcels at the moment."
      />
    </div>
  );
};

export default IncomingParcels;
