import { useState } from "react";
import { cartItem, } from "./Products";
import { item } from "../fooditem";

interface CartProps {
  cartData: cartItem[];
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  handleIncr: (item: item) => void;
  handleDecr: (itemId: number) => void;
  handleRemove: (itemId: number) => void;
}

function Cart({
  cartData,
  setShowCart,
  handleIncr,
  handleDecr,
  handleRemove,
}: CartProps): JSX.Element {
  // Calculate the subtotal for each item
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const subtotals = cartData.map((cartItem) => {
    return cartItem.item.price * cartItem.count;
  });
  
  // Calculate the total by summing up the subtotals
  const total = subtotals.reduce((acc, subtotal) => acc + subtotal, 0);

  return (
    <>
      <div className="fixed top-12 w-[90%] md:mx-20 mt-10 m:mb-4 p-4  md:w-[80%]   bg-white border-4 border-black rounded-md">
        <span className="text-4xl font-bold text-center text-black">
          Your Cart
        </span>
        <button
          onClick={() => {
            setShowCart(false);
          }}
          className="bg-red-800 absolute right-5 p-2 hover:bg-red-500"
        >
          X
        </button>
        <div className="md:flex">
          <div className="h-2/3 md:w-1/2 md:m-5 text-black">
            <ul>
              {cartData.length > 0 ? (
                cartData.map((cartItem) => (
                  <li key={cartItem.item.id} className="flex items-center">
                    <div>
                      <button
                        className="bg-orange-600 m-1 w-8 hover:bg-green-600 rounded-md"
                        onClick={() => handleIncr(cartItem.item)}
                      >
                        +
                      </button>
                      <button
                        className="bg-orange-600 m-1 w-8 hover:bg-green-600 rounded-md"
                        onClick={() => handleDecr(cartItem.item.id)}
                      >
                        -
                      </button>
                      <button
                        className="bg-orange-600 m-1 w-8 hover:bg-red-600 rounded-md"
                        onClick={() => handleRemove(cartItem.item.id)}
                      >
                        X
                      </button>
                    </div>
                    <div>
                      {cartItem.item.name} - {cartItem.count} No
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-black">
                  You have nothing in your Cart, Please add products to the
                  Cart
                </p>
              )}
            </ul>
            {cartData.length > 0 && (
              <div className="md:relative top-2">
                <div className="m-5 text-green-500 font-bold">
                  Total = Rs.{total.toFixed(2)}
                </div>
               
                <button
                  onClick={() => setCheckoutClicked(true)}
                  className="bg-yellow-400 p-2 border rounded-md hover:bg-green-500 hover:text-black"
                >
                  Proceed to Checkout!
                </button>
              </div>
            )}
          </div>

          {checkoutClicked && cartData.length > 0 && (
            <div className="text-black">
              <h1 className="font-bold text-orange-600 mt-5">
                Enter Shipping Details
              </h1>
              <form className="group">
                <label className="p-1 m-1">Name</label>
                <br />
                <input className="p-1 m-1 border rounded-md" type="text" />
                <br />
                <label className="p-1 m-1">Address</label>
                <br />
                <input className="p-1 m-1 border rounded-md" type="text" />
                <br />
                <label className="p-1 m-1">Phone</label>
                <br />
                <input
                  className="p-1 m-1 border rounded-md"
                  type="tel"
                  pattern="[0-9]{10}"
                />
                <br />
                <button  className="bg-yellow-400 p-2 border rounded-md hover:bg-green-500 hover:text-black">
                  Proceed to Pay!
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
