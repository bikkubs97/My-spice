import { useNavigate } from "react-router-dom";
import { cartItem } from "./Products";

export interface HeaderProps {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartData: cartItem[];
  user: string;
}

export default function Header({ setShowCart, cartData, user }: HeaderProps) {
  // Calculate the total number of items in the cart
  const cartItemCount = cartData.reduce(
    (total, cartItem) => total + cartItem.count,
    0
  );
  const navigate = useNavigate();
  async function handleSignOut() {
    try {
      await handleUpdate();
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
      throw error;
    }
  }

  return (
    <div>
      <div className="flex justify-between w-full bg-yellow-300 p-2">
        <h1 className="text-orange-600 font-extrabold text-6xl mx-2 pt-4">
          My Spice!
        </h1>
        <div className="md:flex md:mt-0">
          <h2 className="m-1 md:m-4 md:p-6 text-xl text-green-700 hover:text-black hover:cursor-pointer font-bold animate-pulse">
            Welcome {user ? user : ""}
          </h2>
          <h2
            onClick={handleSignOut}
            className="my-4 md:m-4 md:p-6 text-xl text-orange-600 hover:text-black hover:cursor-pointer hover:animate-bounce"
          >
            SignOut
          </h2>
          <div
            onClick={() => setShowCart(true)}
            className="md:m-4 ml-1 md:p-6 text-xl text-orange-600 mt-1 hover:text-black hover:cursor-pointer  md:hover:animate-bounce"
          >
            Cart
          </div>

          <div
            onClick={() => setShowCart(true)}
            className="bg-red-500 w-10 md:relative text-center h-8  mr-5 rounded-md p-2 md:absoulte md:top-9 right-8 text-white font-bold hover:cursor-pointer"
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
