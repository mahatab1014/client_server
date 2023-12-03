import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import toast from "react-hot-toast";

const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [userRole, refetchUserRole] = useUserRole(user?.email);
  const navigate = useNavigate();
  const totalPrice = 14.99;

  // console.log(userRole);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          // console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("payment error", error);
      setError(error.message);
    } else {
      // console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log("confirm error");
    } else {
      // console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        const paymentData = {
          email: user.email,
          name: user.displayName,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), // utc date convert. use moment js to
          status: "succeeded",
        };
        const userRoleUpdateData = { role: "pro_user" };

        const res = await axiosSecure.post(
          "/payment-transactions",
          paymentData
        );
        axiosSecure
          .put(`/user-role/${userRole?._id}`, userRoleUpdateData)
          .then(() => {
            const dataRefetch = refetchUserRole();
            toast.promise(dataRefetch, {
              loading: "Role updating...",
              success: <b>Role updated!</b>,
              error: <b>Could not updated.</b>,
            });
          });
        if (res.data?.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Thank you for payment",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/dashboard/payment-transactions");
        }
      }
    }
  };

  return (
    <>
      <p className="text-red-600 pb-4 text-center">{error}</p>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="primary-button !btn-sm mt-3"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>

        {transactionId && (
          <p className="text-green-600">Your transaction id: {transactionId}</p>
        )}
      </form>
    </>
  );
};

export default CheckOutForm;
