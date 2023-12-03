/* eslint-disable react/prop-types */
import moment from "moment";

const PaymentTable = ({ data, index }) => {
  const originalDate = moment(data?.date);
  const formattedDate = originalDate.format("MMM-D-YYYY, h:mm a");

  return (
    <>
      <tr>
        <th>{index}</th>
        <td>{data?.name}</td>
        <td>{data?.email}</td>
        <td>{data?.transactionId}</td>
        <td>${data?.price}</td>
        <td className="capitalize">{data?.status}</td>
        <td>{formattedDate}</td>
      </tr>
    </>
  );
};

export default PaymentTable;
