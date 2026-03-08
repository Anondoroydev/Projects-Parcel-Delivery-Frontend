// import TravelLogin from "@/assets/images/travel-login.jpg";
import TravelLogin from "@/assets/images/parcel-l.jpeg";
import { LoginForm } from "@/components/modules/Authentication/LoginForm";
import { Package } from "lucide-react";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            to="/"
            className="flex items-center text-primary font-bold text-xl"
          >
            <Package className="w-8 h-8 mr-2" />
            ParcelDelivery
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={TravelLogin}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
    </div>
  );
}
