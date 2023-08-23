import { useState } from "react";
import { cartItem, item } from "./Products";

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
      <div className="fixed top-12 mx-20 mt-10 p-4 md:h-[80%] md:w-[80%] bg-white border-4 border-black rounded-md ">
        <span className="text-4xl font-bold text-center text-black">
          Your Bucket
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
                  <li key={cartItem.item.id}>
                    {cartItem.item.name} - {cartItem.count} No
                    <div className="">
                      <button
                        className="bg-orange-600 m-1 w-8 hover:bg-green-600"
                        onClick={() => handleIncr(cartItem.item)}
                      >
                        +
                      </button>
                      <button
                        className="bg-orange-600 m-1 w-8 hover:bg-green-600"
                        onClick={() => handleDecr(cartItem.item.id)}
                      >
                        -
                      </button>
                      <button
                        className="bg-orange-600 m-1 w-8 hover:bg-red-600"
                        onClick={() => handleRemove(cartItem.item.id)}
                      >
                        X
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-black">
                  You have nothing in your bucket, Please add products to the
                  bucket
                </p>
              )}
            </ul>
            {cartData.length > 0 && (
              <div className="md:absolute bottom-2">
                <span className="m-5 text-green-500 font-bold">
                  Total = Rs.{total.toFixed(2)}
                </span>
                <button
                  onClick={() => setCheckoutClicked(true)}
                  className="bg-orange-600 p-2 border rounded-md hover:bg-yellow-500 hover:text-black"
                >
                  Proceed to Checkout!
                </button>
              </div>
            )}
          </div>

          {checkoutClicked && (
            <div className="text-black">
              <h1>Enter Shipping Details</h1>
              <form>
                <label>Name</label>
                <input type="text" />
                <br />
                <label>Address</label>
                <input type="text" />
                <br />
                <label>Phone</label>
                <input type="tel" pattern="[0-9]{10}" />
                <button className="bg-orange-600 p-2 border rounded-md hover:bg-yellow-500 hover:text-black">
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
