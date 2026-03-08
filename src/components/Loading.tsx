import { Loader } from "lucide-react";
const Loading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loader className="animate-spin text-9xl" />
    </div>
  );
};

export default Loading;
