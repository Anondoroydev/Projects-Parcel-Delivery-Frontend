import DeliveryManParcelManagement from "@/pages/DeliveryMan/DeliveryManParcelManagement";
import type { ISidebarItems } from "@/types";

export const deliverymanSidebarItems: ISidebarItems[] = [
  {
    title: "Parcel",
    items: [
      {
        title: "Create Parcel",
        url: "/delivery/parcels",
        component: DeliveryManParcelManagement,
      },
    ],
  },
];
