import React from "react";
import { cartItem } from "./Products"; // Import the correct type from Products

interface HeaderProps {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartData: cartItem[]; // Add a prop for cart data
}

export default function Header({ setShowCart, cartData }: HeaderProps) {
  // Calculate the total number of items in the cart
  const cartItemCount = cartData.reduce(
    (total, cartItem) => total + cartItem.count,
    0
  );

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-orange-600 font-extrabold text-6xl m-2 p-2">
          My Spice!
        </h1>
        <div className="flex">
          <h2 className="m-4 p-6 text-xl text-orange-600 hover:text-black hover:cursor-pointer">
            Welcome
          </h2>
          <h2 className="m-4 p-6 text-xl text-orange-600 hover:text-black hover:cursor-pointer ">
            Sign Out
          </h2>
          <div
            onClick={() => setShowCart(true)}
            className="m-4 p-6 text-xl text-white hover:text-yellow-300 hover:cursor-pointer bg-[url('cart.png')] hidden bg-cover w-50 md:w-20 md:block hover:animate-bounce "
          ></div>
          <div
            onClick={() => setShowCart(true)}
            className="md:hidden mt-10 text-white"
          >
            Cart
          </div>
          <div
            onClick={() => setShowCart(true)}
            className="bg-red-500 w-10 text-center h-8 mt-5 mr-5 rounded-md p-2 text-white font-bold hover:cursor-pointer"
          >
            {cartItemCount}
          </div>
        </div>
      </div>
      <h3 className="text-green-400 text-2xl m-2 font-bold mb-6">
        Order the best food online!
      </h3>
    </div>
  );
}
