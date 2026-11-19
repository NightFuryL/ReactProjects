import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";

export default function useAuth() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get("/api/me");
      return response.data;
    },
    retry: false,
  });
}
