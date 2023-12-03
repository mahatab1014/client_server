import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useAdmin from "./useAdmin";

const usePaymentData = () => {
  const { user, authLoading } = useAuth();
  const [isAdmin] = useAdmin();

  const axiosSecure = useAxiosSecure();

  if (!user) {
    return;
  }

  const { data: paymentData = [], isPending: paymentDataLoading } = useQuery({
    queryKey: [user?.email, "paymentData", isAdmin],
    enabled: !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${
          isAdmin === "admin"
            ? "/payment-transactions"
            : `/payment-transactions-user/${user?.email}`
        }`
      );
      return res.data;
    },
  });
  return [paymentData, paymentDataLoading];
};

export default usePaymentData;
