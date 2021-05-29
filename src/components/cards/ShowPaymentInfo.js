import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p>
      <span>Order Id :{order.paymentIntent.id}</span>{" "}
      <span>
        {" "}
        <br />
        Amount :{(order.paymentIntent.amount /= 100).toLocaleString()}
      </span>{" "}
      <br />
      <span>Currency :{order.paymentIntent.currency.toUpperCase()}</span> <br />
      <span>Method :{order.paymentIntent.payment_method_types[0]}</span> <br />
      <span>Payment :{order.paymentIntent.status.toUpperCase()}</span> <br />
      <span>
        Ordered on :
        {new Date(order.paymentIntent.created * 1000).toLocaleString()} <br />
      </span>{" "}
      {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS :{order.orderStatus}
        </span>
      )}
    </p>
  </div>
);
export default ShowPaymentInfo;
