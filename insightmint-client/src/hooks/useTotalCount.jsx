import useAdmin from "./useAdmin";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useTotalCount = () => {
  const axiosSecure = useAxiosSecure();
  const [isAdminLoading] = useAdmin();

  const { data: totalCount = {}, isFetching: totalCountLoading } = useQuery({
    queryKey: ["totalCount"],
    enabled: !isAdminLoading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/total-collection-count`);
      return response.data;
    },
  });

  return [totalCount, totalCountLoading];
};

export default useTotalCount;
