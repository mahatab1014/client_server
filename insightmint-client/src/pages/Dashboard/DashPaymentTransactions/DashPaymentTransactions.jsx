import PageTitle from "../../../components/PageTitle/PageTitle";
import PaymentTable from "../../../components/PaymentTable/PaymentTable";
import usePaymentData from "../../../hooks/usePaymentData";

const DashPaymentTransactions = () => {
  const [paymentData, paymentDataLoading] = usePaymentData();

  return (
    <>
      <PageTitle title="Payment Transactions" />
      <section>
        <div className="title py-10">
          <h2 className="text-3xl text-center">Payment Transactions</h2>
          <div className="text-center">
            <span className="inline-block w-40 h-1 bg-orange-color rounded-full"></span>
            <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-xs table-zebra">
            <thead className="bg-slate-500 text-white">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Transactions ID</th>
                <th>Price</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentData?.map((data, index) => (
                <PaymentTable key={data?._id} data={data} index={index} />
              ))}
            </tbody>
            {/* <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>company</th>
                <th>location</th>
                <th>Last Login</th>
                <th>Favorite Color</th>
              </tr>
            </tfoot> */}
          </table>
        </div>
      </section>
    </>
  );
};

export default DashPaymentTransactions;
