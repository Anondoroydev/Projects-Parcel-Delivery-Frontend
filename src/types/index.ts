import type { ComponentType } from "react";

// types.ts
export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  //   setTheme: (theme: Theme | ((prev: Theme) => Theme)) => void;
  setTheme: () => void;
};

export type TRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "USER"
  | "SENDER"
  | "RECIVER"
  | "DELIVERY_MAN";

export type TStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
// types/index.ts
interface AuthProvider {
  provider: string;
  providerId: string;
}
export interface IUser {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: TRole;
  isDeleted: boolean;
  isActive: "ACTIVE" | string; // Could be more specific if other values exist
  isVerified: boolean;
  auths: AuthProvider[];
  createdAt: Date; // ISO date string
  updatedAt: Date; // ISO date string
}
export type ParcelStatus =
  | "pending"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface StatusUpdate {
  status: ParcelStatus;
  timestamp: string;
  updatedBy: string;
  note?: string;
}

export interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type IconClass = {
  classes?: string;
};
