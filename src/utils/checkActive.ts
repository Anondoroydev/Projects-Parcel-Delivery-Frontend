import type { TStatus } from "@/types";

export const checkActive = (status: TStatus): TStatus => {
  switch (status) {
    case "ACTIVE":
      return "ACTIVE";
    case "INACTIVE":
      return "INACTIVE";
    case "BLOCKED":
      return "BLOCKED";
    default:
      return "ACTIVE";
  }
};
