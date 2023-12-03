import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useSurveysData = () => {
  const axiosPublic = useAxiosPublic();
  const { refetch, data: surveysData = [] } = useQuery({
    queryKey: ["surveysData"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/surveys`);
      return response.data;
    },
  });
  return [surveysData, refetch];
};

export default useSurveysData;
