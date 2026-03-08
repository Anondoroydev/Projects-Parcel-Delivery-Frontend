import App from "@/App";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/Public/About";
import Contact from "@/pages/Public/Contact";
import Home from "@/pages/Public/Home";
import Login from "@/pages/Public/Login";
import Register from "@/pages/Public/Register";
import Unauthorized from "@/pages/Public/Unauthorized";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { deliverymanSidebarItems } from "./deliverymanSidebarItems";
import { reciverSidebarItems } from "./reciverSidebarItems";
import { SenderSidebarItems } from "./senderSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
  {
    Component: withAuth(
      DashboardLayout,
      (role.admin as TRole) && (role.superAdmin as TRole)
    ),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/users" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/parcels" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.sender as TRole),
    path: "/sender",
    children: [
      { index: true, element: <Navigate to="/sender/create-parcel" /> },
      ...generateRoutes(SenderSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.reciver as TRole),
    path: "/reciver",
    children: [
      { index: true, element: <Navigate to="/reciver/all-parcel" /> },
      ...generateRoutes(reciverSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.DELIVERY_MAN as TRole),
    path: "/delivery",
    children: [
      { index: true, element: <Navigate to="/delivery/parcels" /> },
      ...generateRoutes(deliverymanSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },

  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
