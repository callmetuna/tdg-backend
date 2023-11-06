import React, { useState } from 'react';

const Checkout = () => {
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleDeliveryLocationChange = (e) => {
    setDeliveryLocation(e.target.value);
  };

  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {!isOrderConfirmed ? (
        <>
          <div className="mt-4">
            <label htmlFor="deliveryLocation" className="block font-bold">Delivery Location:</label>
            <input
              type="text"
              id="deliveryLocation"
              className="border px-4 py-2 mt-2"
              value={deliveryLocation}
              onChange={handleDeliveryLocationChange}
            />
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Order Summary:</h2>
            {/* Render your order summary here */}
          </div>

          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
          </div>
        </>
      ) : (
        <div>
          <p className="font-bold">Order confirmed! Thank you for your purchase.</p>
          {/* Render the order details and a thank you message here */}
        </div>
      )}
    </div>
  );
};

export default Checkout;
