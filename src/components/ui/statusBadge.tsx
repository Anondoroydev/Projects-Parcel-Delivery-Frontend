import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        // Warm yellow - waiting for action
        REQUESTED:
          "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300",

        // Fresh green - approved and ready
        APPROVED:
          "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",

        // Calm blue - picked and in process
        PICKED:
          "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950/40 dark:text-blue-300",

        // Moving purple - actively in transit
        IN_TRANSIT:
          "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-700 dark:bg-purple-950/40 dark:text-purple-300",

        // Success green - completed delivery
        DELIVERED:
          "border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-950/40 dark:text-green-300",

        // Warning red - something went wrong
        CANCELLED:
          "border-red-200 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-950/40 dark:text-red-300",

        // Neutral gray - returned/undelivered
        RETURNED:
          "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-300",
      },
    },
    defaultVariants: {
      variant: "REQUESTED",
    },
  }
);

function StatusBadge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { badgeVariants, StatusBadge };
