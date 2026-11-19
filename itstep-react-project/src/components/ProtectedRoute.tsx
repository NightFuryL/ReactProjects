import useAuth from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { data: user, isPending, isError } = useAuth();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
