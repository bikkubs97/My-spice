import { useNavigate } from "react-router-dom";
import { cartItem } from "./Products";

export interface HeaderProps {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartData: cartItem[];
  user: string;
}

export default function Header({ setShowCart, cartData, user }: HeaderProps) {
  // Initialize user state

  // Calculate the total number of items in the cart
  const cartItemCount = cartData.reduce(
    (total, cartItem) => total + cartItem.count,
    0
  );
  const navigate = useNavigate();
  async function handleSignOut() {
    try {
      // Execute handleUpdate asynchronously and wait for it to complete
      await handleUpdate();

      // After handleUpdate completes, remove the token and navigate
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  }

  async function handleUpdate() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://foofiesta-server-j46h.onrender.com/users/data",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            data: cartData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("User data updated:", data);
      window.alert("Changes Saved Successfully!");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error; // Rethrow the error so it can be caught by handleSignOut
    }
  }

  return (
    <div>
      <div className="flex justify-between w-full">
        <h1 className="text-orange-600 font-extrabold text-6xl m-2 p-2">
          My Spice!
        </h1>
        <div className="flex">
          <h2 className="m-1 md:m-4 md:p-6 text-xl text-orange-600 hover:text-black hover:cursor-pointer font-bold animate-pulse">
            Welcome {user ? user : ""}
          </h2>
          <h2
            onClick={handleSignOut}
            className="m-1 md:m-4 md:p-6 text-xl text-orange-600 hover:text-black hover:cursor-pointer hover:animate-bounce"
          >
            SignOut
          </h2>
          <div
            onClick={() => setShowCart(true)}
            className="md:m-4 md:p-6 text-xl text-orange-600  hover:text-black hover:cursor-pointer bg-[url('trolley.png')] hidden bg-cover w-50 md:w-20 md:block md:hover:animate-bounce "
          >
            Cart
          </div>
          <div
            onClick={() => setShowCart(true)}
            className="md:hidden mt-10 text-black"
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
