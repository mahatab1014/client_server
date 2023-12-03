import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSingleUserData = (email) => {
  const axiosSecure = useAxiosSecure();
  const { refetch: singleUserDataRefetch, data: singleUserData = {} } =
    useQuery({
      queryKey: ["singleUserData", email],
      queryFn: async () => {
        const response = await axiosSecure.get(`/user/${email}`);
        return response.data;
      },
    });

  return [singleUserData, singleUserDataRefetch];
};

export default useSingleUserData;
