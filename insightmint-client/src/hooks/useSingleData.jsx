import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSingleData = (id) => {
  const axiosSecure = useAxiosSecure();
  const {
    refetch,
    data: singleSurveyData = {},
    isLoading,
  } = useQuery({
    queryKey: ["singleSurveyData", id],
    queryFn: async () => {
      const response = await axiosSecure(`/survey/${id}`);
      return response.data;
    },
  });

  return [singleSurveyData, refetch, isLoading];
};

export default useSingleData;
