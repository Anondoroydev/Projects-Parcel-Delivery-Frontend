import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { deliverymanSidebarItems } from "@/routes/deliverymanSidebarItems";
import { reciverSidebarItems } from "@/routes/reciverSidebarItems";
import { SenderSidebarItems } from "@/routes/senderSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.superAdmin:
    case role.admin:
      return [...adminSidebarItems];

    case role.user:
      return [...userSidebarItems];
    case role.sender:
      return [...SenderSidebarItems];
    case role.reciver:
      return [...reciverSidebarItems];
    case role.DELIVERY_MAN:
      return [...deliverymanSidebarItems];

    default:
      return [];
  }
};
