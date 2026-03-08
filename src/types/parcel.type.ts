export type TParcelStatus =
  | "REQUESTED"
  | "APPROVED"
  | "PICKED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED";

export enum EParcelStatus {
  REQUESTED = "REQUESTED",
  APPROVED = "APPROVED",
  PICKED = "PICKED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
}

export type TPackageType = "DOCUMENT" | "PACKAGE" | "FRAGILE";

export enum EPackageType {
  DOCUMENT = "DOCUMENT",
  PACKAGE = "PACKAGE",
  FRAGILE = "FRAGILE",
}

export interface IStatusLog {
  status: TParcelStatus;
  updatedBy: string;
  note?: string;
  createdAt: Date;
}

export interface IPackageDetails {
  type: TPackageType;
  weight: number; // in kg
  description?: string;
}

export interface IReceiverInfo {
  name: string;
  phone: string;
  address: string;
  email: string;
}

export interface IParcel {
  _id: string;
  trackingId: string;
  receiver: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  sender: {
    name: string;
    email: string;
    phone: string;
  };
  packageDetails: {
    type: string;
    weight: number;
    description: string;
  };
  fee: number;
  currentStatus: TParcelStatus;
  isBlocked: boolean;
  expectedDeliveryDate: string;
  statusLog: Array<{
    status: string;
    updatedBy: string;
    note: string;
    createdAt: string;
    _id: string;
  }>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
