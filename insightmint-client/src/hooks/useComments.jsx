import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "./useAxiosPublic";

const useComments = (id) => {
  const axiosPublic = useAxiosPublic();

  const { refetch: commentsRefetch, data: commentsData = [] } = useQuery({
    queryKey: ["commentsData"],
    queryFn: async () => {
      const response = await axiosPublic(`/survey-comments/${id}`);
      return response.data;
    },
  });
  return [commentsData, commentsRefetch];
};

export default useComments;
