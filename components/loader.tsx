import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export const LoadingCircle = () => {
  return (
    <Loader2 className="w-4 h-4 animate-spin" />
  )
}
