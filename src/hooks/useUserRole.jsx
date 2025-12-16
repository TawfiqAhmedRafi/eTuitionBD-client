import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get("/user-role");
      return res.data.role;
    },
    staleTime: 8 * 60 * 1000,
    enabled: !!user?.email,
  });

  return { role: data, isLoading, isError, refetch };
};

export default useUserRole;
