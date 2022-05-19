import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({appoinment}) => {
    const {patientName,patient,price} = appoinment || {};
  const stripe = useStripe();
  const elements = useElements();
  const [cardError,setCardError] = useState('');
  const [success,setSuccess] = useState('');
  const [transictionId,setTransictionId] = useState('');
  const [clientSecret,setClientSecret] = useState('');
  useEffect(() => {
    fetch('http://localhost:5000/create-payment-intent',{
        method:'POST',
        headers:{
            'content-type':'application/json',
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body:JSON.stringify({price})
    }).then((res) => res.json())
    .then((data) => {
        console.log( data.clientSecret);
        if(data.clientSecret){
            setClientSecret(data.clientSecret)
        }
    })
  }, [price])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
        return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
        return;
    }
    const {error,paymentMethod} =  await stripe.createPaymentMethod({
        type:'card',
        card
    });

    setCardError(error?.message || '');

    setSuccess('');

    // let's payment : 

    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: patientName,
              email:patient
            },
          },
        },
      );

      if (confirmError) {
          setCardError(confirmError?.message || '')
      } else {
          setCardError('');
          console.log(paymentIntent);
          setTransictionId(paymentIntent.id);
          setSuccess('Congrates!Your payment is success')
      }

  };
  return (
    <>
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
      <button className="btn btn-sm btn-success mt-3" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
    </form>

    {
        cardError && <p className="text-error">{cardError}</p>
    }
     {
        success && <div className="text-success">
          <p>{success}</p>
          <p>{transictionId}</p>
          </div>
    }
    
    </>
  );
};

export default CheckoutForm;
