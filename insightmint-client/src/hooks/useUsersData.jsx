import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const useUsersData = (role) => {
  const axiosSecure = useAxiosSecure();
  const { refetch: usersRefetch, data: usersData = [] } = useQuery({
    queryKey: ["usersData", role],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${role}`);
      return response.data;
    },
  });
  return [usersData, usersRefetch];
};

export default useUsersData;
