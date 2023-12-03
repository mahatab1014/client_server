import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  if (!user || authLoading) {
    // Return a default value or loading state when user is not available or still loading
    return [null, true];
  }

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data?.role;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
