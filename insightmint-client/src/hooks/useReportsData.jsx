import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useReportsData = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch: reportsDataRefetch, data: reportsData = [] } = useQuery({
    queryKey: ["reportsData"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/report-survey`);
      return response.data;
    },
  });
  return [reportsData, reportsDataRefetch];
};

export default useReportsData;
