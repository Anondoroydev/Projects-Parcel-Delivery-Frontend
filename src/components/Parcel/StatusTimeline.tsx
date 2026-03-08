import { cn } from "@/lib/utils";
import {
  Check,
  Clock,
  Home,
  Package,
  PackageCheck,
  Truck,
  Undo2,
  X,
} from "lucide-react";
import React from "react";

interface StatusTimelineProps {
  status: string;
  className?: string;
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({
  status,
  className,
}) => {
  const isCancelled = status === "CANCELLED";
  const isReturned = status === "RETURNED";
  const isTerminalStatus = isCancelled || isReturned;

  // Regular status steps (excluding terminal statuses)
  const statusSteps = [
    { key: "REQUESTED", label: "Pending", icon: Clock },
    { key: "APPROVED", label: "Processing", icon: Package },
    { key: "PICKED", label: "Picked", icon: PackageCheck },
    { key: "IN_TRANSIT", label: "Out for Delivery", icon: Truck },
    { key: "DELIVERED", label: "Delivered", icon: Home },
  ];

  if (isTerminalStatus) {
    // Special rendering for terminal statuses
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center py-4",
          className
        )}
      >
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2",
            isCancelled
              ? "bg-red-100 border-red-300 text-red-600"
              : "bg-amber-100 border-amber-300 text-amber-600"
          )}
        >
          {isCancelled ? (
            <X className="w-6 h-6" />
          ) : (
            <Undo2 className="w-6 h-6" />
          )}
        </div>
        <p
          className={cn(
            "font-medium",
            isCancelled ? "text-red-600" : "text-amber-600"
          )}
        >
          {isCancelled ? "Order Cancelled" : "Order Returned"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {isCancelled
            ? "This order has been cancelled"
            : "This order has been returned to sender"}
        </p>
      </div>
    );
  }

  const currentStatusIndex = statusSteps.findIndex(
    (step) => step.key === status
  );

  return (
    <div className={cn("flex justify-between relative", className)}>
      <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
      {statusSteps.map((step, index) => {
        const isCompleted = index < currentStatusIndex;
        const isCurrent = index === currentStatusIndex;
        const IconComponent = step.icon;

        return (
          <div key={step.key} className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2",
                isCompleted || isCurrent
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-muted border-muted-foreground text-muted-foreground"
              )}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                <IconComponent className="w-4 h-4" />
              )}
            </div>
            <p
              className={cn(
                "text-xs mt-1",
                isCompleted || isCurrent
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatusTimeline;
