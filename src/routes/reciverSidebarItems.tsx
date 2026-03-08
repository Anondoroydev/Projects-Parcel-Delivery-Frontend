import IncomingParcels from "@/pages/Reciver/IncomingParcels";
import type { ISidebarItems } from "@/types";

export const reciverSidebarItems: ISidebarItems[] = [
  {
    title: "Parcel",
    items: [
      {
        title: "All Parcels",
        url: "/reciver/all-parcel",
        component: IncomingParcels,
      },
    ],
  },
];
