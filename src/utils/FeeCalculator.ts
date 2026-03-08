interface FeeCalculationParams {
  weight: number;
  packageType: "DOCUMENT" | "PACKAGE" | "FRAGILE";
}

export const calculateDeliveryFee = ({
  weight,
  packageType,
}: FeeCalculationParams): number => {
  // Base fee for all packages
  const BASE_FEE = 50;

  // Weight surcharge (per kg)
  const WEIGHT_RATE = 15;

  // Package type multipliers
  const TYPE_MULTIPLIERS = {
    DOCUMENT: 1.0,
    PACKAGE: 1.5,
    FRAGILE: 2.5,
  };

  // Calculate weight surcharge
  const weightSurcharge = Math.max(0, weight - 1) * WEIGHT_RATE;

  // Get multiplier based on package type
  const typeMultiplier = TYPE_MULTIPLIERS[packageType];

  // Calculate total fee
  const totalFee = (BASE_FEE + weightSurcharge) * typeMultiplier;

  const total = Math.round(totalFee * 100) / 100; // Round to 2 decimal places

  return total;
};
