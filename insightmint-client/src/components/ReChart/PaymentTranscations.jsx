import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
// import './ChartComponent.css';

const PaymentTranscations = ({ data }) => {
  // Assuming data is an array of transactions
  // Group data by date and calculate total amount for each day
  const aggregatedData = data.reduce((result, item) => {
    const date = moment(item.date).format("YYYY-MM-DD");
    if (!result[date]) {
      result[date] = { date, totalAmount: 0 };
    }
    result[date].totalAmount += item.price;
    return result;
  }, {});

  // Convert aggregated data to an array
  const chartData = Object.values(aggregatedData).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalAmount" fill="#191C14" name="Total Amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentTranscations;

// export default PaymentTranscations;
