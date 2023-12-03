import SpinnerLoader from "../../../components/PreLoader/SpinnerLoader";
import PaymentTranscations from "../../../components/ReChart/PaymentTranscations";
import useAdmin from "../../../hooks/useAdmin";
import usePaymentData from "../../../hooks/usePaymentData";
import useTotalCount from "../../../hooks/useTotalCount";
import moment from "moment";

const DashHome = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [totalCount, totalCountLoading] = useTotalCount();
  const [paymentData, paymentDataLoading] = usePaymentData();

  if (totalCountLoading || paymentDataLoading) {
    return <SpinnerLoader />;
  }

  const date = moment().format("MMM D, YYYY");

  const last7DaysData = paymentData.filter((item) =>
    moment(item.date).isAfter(moment().subtract(7, "days"))
  );
  // Calculate total revenue for the last 7 days
  const totalRevenueLast7Days = last7DaysData.reduce(
    (total, item) => total + item.price,
    0
  );
  // Calculate total revenue for all days
  const totalRevenueAllDays = paymentData.reduce(
    (total, item) => total + item.price,
    0
  );
  // Calculate percentage change
  const percentageChange =
    ((totalRevenueLast7Days - totalRevenueAllDays) / totalRevenueAllDays) * 100;

  const revenuePercentage = String(percentageChange).slice(0, 6);

  // console.log(revenuePercentage.includes("-"));
  const totalRevenue =
    totalCount?.total_revenue && totalCount.total_revenue[0]
      ? totalCount.total_revenue[0].total
      : 0;

  console.log("totalCount", totalCount);
  console.log("totalRevenue", totalRevenue);

  return (
    <section>
      {!totalRevenue ? (
        <>
          <div className="flex justify-center items-center h-screen">
            <h2 className="text-3xl">Please give a reload</h2>
          </div>
        </>
      ) : (
        <>
          {" "}
          {isAdmin === "admin" ? (
            <>
              <div className="my-5 md:mt-0 md:p-5">
                <div className="">
                  <div className="flex justify-center py-10">
                    <div className="stats stats-vertical lg:stats-horizontal shadow">
                      <div className="stat place-items-center">
                        <div className="stat-title">Total USER</div>
                        <div className="stat-value text-secondary">
                          {totalCount?.total_user}
                        </div>
                        <div className="stat-desc text-secondary">
                          ↗︎ 40 (2%)
                        </div>
                      </div>
                      <div className="stat place-items-center">
                        <div className="stat-title">Total Survey</div>
                        <div className="stat-value">
                          {totalCount?.total_survey}
                        </div>
                        <div className="stat-desc">From Start to {date}</div>
                      </div>
                      <div className="stat place-items-center">
                        <div className="stat-title">Total Comments</div>
                        <div className="stat-value">
                          {totalCount?.total_comment}
                        </div>
                        <div className="stat-desc">From Start to {date}</div>
                      </div>

                      <div className="stat place-items-center">
                        <div className="stat-title">Total Revenue</div>
                        <div className="stat-title">Total Revenue</div>
                        <div className="stat-value">
                          ${totalRevenue === 0 ? "No Money" : totalRevenue}
                        </div>
                        <div
                          className="stat-desc tooltip tooltip-warning"
                          data-tip="Last 7 days data"
                        >
                          {revenuePercentage.includes("-") ? "↘︎" : "↗︎"} (
                          {revenuePercentage}) %
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl text-center">Selling Data</h2>
                    <PaymentTranscations data={paymentData} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-5 md:mt-0 md:p-5">
                <div className="mockup-window border bg-base-300">
                  <div className="flex flex-col items-center px-4 py-16 bg-base-200">
                    <h2 className="text-3xl">
                      Dashboard can access only admin
                    </h2>
                    <p className="text-lg mb-5">
                      We're sorry, but wait for next 2.0 update
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default DashHome;
