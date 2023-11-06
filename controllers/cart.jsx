import React from 'react';

const ShoppingCart = () => {
  // You can replace these dummy data with your actual data
  const items = [
    { id: 1, name: 'Denim T-Shirt', ref: '007197456', price: 5000, quantity: 1 },
    { id: 2, name: 'Denim Pants', ref: '011015233', price: 8000, quantity: 2 },
    { id: 3, name: 'Sony Smartwatch', ref: '004822981', price: 10000, quantity: 1 },
    { id: 4, name: 'Cognac Oxford Brown Shoes', ref: '035772962', price: 4500, quantity: 1 },
  ];

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Ref</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.ref}</td>
              <td className="border px-4 py-2">{item.price}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <p className="font-bold">Total Amount: {totalAmount} NGN</p>
      </div>

      <div className="mt-4">
        <label htmlFor="cardType" className="block font-bold">Card Type:</label>
        <select id="cardType" className="border px-4 py-2 mt-2">
          <option value="visa">VISA</option>
          <option value="verve">Verve</option>
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="cardNumber" className="block font-bold">Card Number:</label>
        <input type="text" id="cardNumber" className="border px-4 py-2 mt-2" />
      </div>
    </div>
  );
};

export default ShoppingCart;
