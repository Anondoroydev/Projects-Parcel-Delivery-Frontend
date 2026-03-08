import ParcelTracker from "@/components/Parcel/ParcelTracker";
import { Parcel } from "@/pages/Admin/Parcels";
import type { ISidebarItems } from "@/types";

export const userSidebarItems: ISidebarItems[] = [
  {
    title: "History",
    items: [
      {
        title: "Parcels",
        url: "/user/parcels",
        component: Parcel,
      },
      {
        title: "Track My Parcel",
        url: "track-my-parcel",
        component: ParcelTracker,
      },
    ],
  },
];
