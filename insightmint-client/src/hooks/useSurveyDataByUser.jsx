import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSurveyDataByUser = () => {
  const { user, authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  if (!user) {
    return;
  }
  const { data: userSurveyData = [], isPending: userSurveyDataLoading } =
    useQuery({
      queryKey: [user?.email, "userSurveyData"],
      enabled: !authLoading,
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/find-survey-by-email/${user?.email}`
        );
        return res.data;
      },
    });
  return [userSurveyData, userSurveyDataLoading];
};

export default useSurveyDataByUser;
