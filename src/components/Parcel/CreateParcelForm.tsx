import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { withAsyncHandler } from "@/hooks/eventHandler";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const packageTypes = ["DOCUMENT", "PACKAGE", "FRAGILE"] as const;

const parcelSchema = z.object({
  receiver: z.object({
    name: z
      .string()
      .min(1, "Receiver name is required")
      .min(2, "Receiver name must be at least 2 characters")
      .max(50, "Receiver name cannot exceed 50 characters")
      .trim(),

    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message:
          "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
      })
      .trim(),

    address: z
      .string()
      .min(1, "Address is required")
      .min(5, "Address must be at least 5 characters")
      .max(200, "Address cannot exceed 200 characters")
      .trim(),

    email: z
      .email({ message: "Invalid email address format" })
      .min(1, "Email is required")
      .min(5, "Email must be at least 5 characters long")
      .max(100, "Email cannot exceed 100 characters")
      .trim()
      .toLowerCase(),
  }),

  packageDetails: z.object({
    type: z.enum(packageTypes, "Please select a valid package type"),
    weight: z
      .number()
      .positive("Weight must be a positive number")
      .max(100, "Weight cannot exceed 100kg")
      .refine((val) => !isNaN(val), "Weight must be a valid number"),

    description: z
      .string()
      .max(500, "Description cannot exceed 500 characters")
      .optional()
      .or(z.literal("")),
  }),

  fee: z
    .number()
    .nonnegative("Fee cannot be negative")
    .max(10000, "Fee cannot exceed 10,000")
    .refine((val) => !isNaN(val), "Fee must be a valid number"),
});

type ParcelFormData = z.infer<typeof parcelSchema>;

interface FeeCalculationParams {
  weight: number;
  packageType: "DOCUMENT" | "PACKAGE" | "FRAGILE";
}

const calculateDeliveryFee = ({
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
    FRAGILE: 2.0,
  };

  // Calculate weight surcharge
  const weightSurcharge = Math.max(0, weight - 1) * WEIGHT_RATE;

  // Get multiplier based on package type
  const typeMultiplier = TYPE_MULTIPLIERS[packageType];

  // Calculate total fee
  const totalFee = (BASE_FEE + weightSurcharge) * typeMultiplier;

  return Math.round(totalFee * 100) / 100; // Round to 2 decimal places
};

const CreateParcelForm: React.FC = () => {
  const { data: user } = useUserInfoQuery(undefined);
  // console.log(user.data);
  const [createParcel, { isLoading }] = useCreateParcelMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ParcelFormData>({
    resolver: zodResolver(parcelSchema),
    mode: "onChange",
  });

  // Watch weight and package type fields for automatic fee calculation
  const weightValue = watch("packageDetails.weight");
  const packageTypeValue = watch("packageDetails.type");

  // Calculate fee whenever weight or package type changes
  useEffect(() => {
    if (weightValue && packageTypeValue) {
      const calculatedFee = calculateDeliveryFee({
        weight: weightValue,
        packageType: packageTypeValue,
      });
      setValue("fee", calculatedFee, { shouldValidate: true });
    }
  }, [weightValue, packageTypeValue, setValue]);

  const createParcelHandler = withAsyncHandler(
    (data: ParcelFormData) => createParcel(data),
    {
      loadingMessage: "Creating your parcel...",
      successMessage: "Parcel created successfully!",
      showSuccess: true,
      showError: true,
      onSuccess: () => reset(),
    }
  );

  const onSubmit = async (data: ParcelFormData) => {
    console.log("Form submitted:", data);

    const dataR = {
      ...data,
      sender: user?.data?._id,
    };
    await createParcelHandler(dataR);
    console.log(dataR);
    // Your submission logic here
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Create New Parcel</CardTitle>
        <CardDescription>
          Fill in the details to create a new parcel delivery request
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Receiver Fields */}
          <div className="space-y-2">
            <Label htmlFor="receiver.name">Receiver Name</Label>
            <Input
              id="receiver.name"
              {...register("receiver.name")}
              className={errors?.receiver?.name ? "border-destructive" : ""}
            />
            {errors?.receiver?.name && (
              <p className="text-sm text-destructive">
                {errors?.receiver?.name?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="receiver.email">Receiver Email</Label>
            <Input
              id="receiver.email"
              type="email"
              {...register("receiver.email")}
              className={errors?.receiver?.email ? "border-destructive" : ""}
            />
            {errors?.receiver?.email && (
              <p className="text-sm text-destructive">
                {errors?.receiver?.email?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="receiver.phone">Receiver Phone</Label>
            <Input
              id="receiver.phone"
              {...register("receiver.phone")}
              className={errors?.receiver?.phone ? "border-destructive" : ""}
            />
            {errors?.receiver?.phone && (
              <p className="text-sm text-destructive">
                {errors?.receiver?.phone?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="receiver.address">Receiver Address</Label>
            <Textarea
              id="receiver.address"
              {...register("receiver.address")}
              rows={3}
              className={errors?.receiver?.address ? "border-destructive" : ""}
            />
            {errors?.receiver?.address && (
              <p className="text-sm text-destructive">
                {errors?.receiver?.address?.message}
              </p>
            )}
          </div>

          {/* Package Details Fields */}
          <div className="space-y-2">
            <Label htmlFor="packageDetails.type">Package Type</Label>
            <Select
              onValueChange={(value: "DOCUMENT" | "PACKAGE" | "FRAGILE") =>
                setValue("packageDetails.type", value)
              }
            >
              <SelectTrigger
                className={
                  errors?.packageDetails?.type ? "border-destructive" : ""
                }
              >
                <SelectValue placeholder="Select package type" />
              </SelectTrigger>
              <SelectContent>
                {packageTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.packageDetails?.type && (
              <p className="text-sm text-destructive">
                {errors?.packageDetails?.type?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="packageDetails.weight">Weight (kg)</Label>
            <Input
              id="packageDetails.weight"
              type="number"
              step="0.1"
              {...register("packageDetails.weight", { valueAsNumber: true })}
              className={
                errors?.packageDetails?.weight ? "border-destructive" : ""
              }
            />
            {errors?.packageDetails?.weight && (
              <p className="text-sm text-destructive">
                {errors?.packageDetails?.weight?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="packageDetails.description">
              Description (Optional)
            </Label>
            <Textarea
              id="packageDetails.description"
              {...register("packageDetails.description")}
              rows={2}
              className={
                errors?.packageDetails?.description ? "border-destructive" : ""
              }
            />
            {errors?.packageDetails?.description && (
              <p className="text-sm text-destructive">
                {errors?.packageDetails?.description?.message}
              </p>
            )}
          </div>

          {/* Fee Field (auto-calculated) */}
          <div className="space-y-2">
            <Label htmlFor="fee">Delivery Fee (USDT)</Label>
            <Input
              disabled
              id="fee"
              type="number"
              step="0.01"
              {...register("fee", { valueAsNumber: true })}
              readOnly
              className={errors?.fee ? "border-destructive" : ""}
            />
            {errors?.fee && (
              <p className="text-sm text-destructive">{errors?.fee?.message}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Fee is automatically calculated based on weight and package type
            </p>
          </div>

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? <Loader className="animate-spin" /> : "Create Parcel"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default CreateParcelForm;
