import CreateParcelForm from "@/components/Parcel/CreateParcelForm";
import ManageParcel from "@/pages/Admin/ManageParcel";
import { User } from "@/pages/Admin/User";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const ParcelTracker = lazy(() => import("@/components/Parcel/ParcelTracker"));

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Users",
        url: "/admin/users",
        component: User,
      },
    ],
  },
  {
    title: "Parcel Management",
    items: [
      {
        title: "Create Parcel",
        url: "/admin/create-parcel",
        component: CreateParcelForm,
      },
      {
        title: "Manage Parcel",
        url: "/admin/manage-parcel",
        component: ManageParcel,
      },
      {
        title: "Track parcel",
        url: "/admin/track-parcel",
        component: ParcelTracker,
      },
    ],
  },
];
