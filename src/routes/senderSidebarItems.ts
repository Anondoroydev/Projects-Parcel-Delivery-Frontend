import SenderDashboard from "@/pages/Sender/SenderDashboard";
import type { ISidebarItems } from "@/types";

export const SenderSidebarItems: ISidebarItems[] = [
  {
    title: "Parcel",
    items: [
      {
        title: "Create Parcel",
        url: "/sender/create-parcel",
        component: SenderDashboard,
      },
    ],
  },
];
