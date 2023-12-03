import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_STRIPE);
const Payment = () => {
  return (
    <>
      <div className="title">
        <h2 className="text-3xl text-center">Stripe Payment</h2>
        <div className="text-center">
          <span className="inline-block w-40 h-1 bg-orange-color rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
        </div>
      </div>

      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </div>
    </>
  );
};

export default Payment;
