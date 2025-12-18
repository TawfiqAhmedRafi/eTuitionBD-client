import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTutor = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["tutor-info", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get("/tutor-info"); 
      return res.data;
    },
    enabled: !!user?.email,
    staleTime: 5 * 60 * 1000, 
  });

  return { tutor: data, isLoading, isError, refetch };
};

export default useTutor;