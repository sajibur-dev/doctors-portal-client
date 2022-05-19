import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe('pk_test_51L0cObECmG0okXGwg0vmM6PwRRdceN3aivFpwT5rKn08L5jGsolQvhgbTSMaX4HBTGYnOMOu0RTajc6WerHfPkbR00WpsFKa9f')

const PaymentDetail = () => {
  const { id } = useParams();
  const { data: booking } = useQuery(["specificBooking"], () =>
    fetch(`http://localhost:5000/booking/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  const {patientName,treatment,price,slot,date} = booking || {};
  console.log(booking);
  return (
    <div>
      <div class="card w-2/3 bg-base-100 shadow-xl">
        <div class="card-body">
            <p className="text-success">Hello,{patientName}</p>
          <h2 class="card-title">Please pay for {treatment}</h2>
          <p>Your appointments <span className="text-orange-500">{date}</span> at <span className="text-orange-500">{slot}</span>  </p>
          <p>Please pay ${price}</p>
        </div>
      </div>
      <div class="card w-2/3 bg-base-100 shadow-xl mt-5">
      <div class="card-body">

        <Elements stripe={stripePromise}>
            <CheckoutForm appoinment={booking}/>
        </Elements>
      </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
