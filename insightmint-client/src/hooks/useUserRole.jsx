import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserRole = (email) => {
  const axiosSecure = useAxiosSecure();

  if (!email) {
    // Handle the case where email is not provided
    return [[], () => {}];
  }

  const { refetch: refetchUserRole, data: userRole = [] } = useQuery({
    queryKey: ["userRole", email],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(`/user/${email}`);
        return response.data;
      } catch (error) {
        // Handle the error, e.g., log it or return a default value
        console.error("Error fetching user role:", error);
        return [];
      }
    },
  });

  return [userRole, refetchUserRole];
};

export default useUserRole;
