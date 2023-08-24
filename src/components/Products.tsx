import { useState, useEffect } from "react";
import { foodItems, item } from "../fooditem";

import Cart from "./Cart";
import Header from "./Header";
export interface cartItem {
  item: item;
  count: number;
}
interface userData {
  name: string;
  data: cartItem[];
}

export default function Products() {
  const [userData, setUserData] = useState<userData>(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      return parsedUserData;
    }
    return [];
  });
  const [cart, setCart] = useState(userData.data);
  const [showCart, setShowCart] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<string>("All Range");
  const [selectedRatingRange, setSelectedRatingRange] =
    useState<string>("All Range");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  function handleAdd(item: item) {
    const existingCartItemIndex = cart.findIndex(
      (cartItem) => cartItem.item.id === item.id
    );
    if (existingCartItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex].count += 1;
      setCart(updatedCart);
    } else {
      setCart((prev) => [...prev, { item: item, count: 1 }]);
    }
  }

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUserData(parsedUserData);
    } else {
      console.error("No data found!");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...userData, data: cart })
    );
  }, [cart, userData]);

  function decrementCartItem(itemId: number) {
    const updatedCart = cart
      .map((cartItem) => {
        if (cartItem.item.id === itemId) {
          return { ...cartItem, count: cartItem.count - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.count > 0);
    setCart(updatedCart);
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...userData, data: updatedCart })
    );
  }

  function removeCartItem(itemId: number) {
    const updatedCart = cart.filter((cartItem) => cartItem.item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("userData", JSON.stringify(updatedCart));
  }

  function filterItems(item: item): boolean {
    switch (selectedPriceRange) {
      case "50-100":
        if (!(item.price >= 50 && item.price <= 100)) return false;
        break;
      case "100-200":
        if (!(item.price >= 100 && item.price <= 200)) return false;
        break;
      case "200-300":
        if (!(item.price >= 200 && item.price <= 300)) return false;
        break;
      default:
        break;
    }

    switch (selectedRatingRange) {
      case "4-5":
        if (!(item.rating >= 4 && item.rating <= 5)) return false;
        break;
      case "3-4":
        if (!(item.rating >= 3 && item.rating <= 4)) return false;
        break;
      case "1-3":
        if (!(item.rating >= 1 && item.rating <= 3)) return false;
        break;
      default:
        break;
    }

    if (selectedCategory !== "All" && item.category !== selectedCategory) {
      return false;
    }

    return true;
  }

  const filteredItems = foodItems.filter(filterItems);

  return (
    <>
      <Header cartData={cart} setShowCart={setShowCart} user={userData.name} />
      <div className="md:flex  md:ml-5 w-[60%]">
        <label className="md:ml-4 p-2 text-black">Price</label>
        <select
          className="bg-yellow-400 mt-2 "
          name="Price"
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          value={selectedPriceRange}
        >
          <option value="All Range">All Range</option>
          <option value="50-100">50-100</option>
          <option value="100-200">100-200</option>
          <option value="200-300">200-300</option>
        </select>{" "}
        <br />
        <label className="md:ml-4 p-2 text-black">Rating</label>
        <select
          className="bg-yellow-400 mt-2"
          name="Rating"
          onChange={(e) => setSelectedRatingRange(e.target.value)}
          value={selectedRatingRange}
        >
          <option value="All Range">All Range</option>
          <option value="4-5">4-5</option>
          <option value="3-4">3-4</option>
          <option value="1-3">1-3</option>
        </select>
        <br />
        <label className="md:ml-4 p-2 text-black">Category</label>
        <select
          className="bg-yellow-400 mt-2"
          name="Category"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="All">All</option>
          <option value="chicken">Fried Chicken</option>
          <option value="drinks">Beverages</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="md:mx-20 flex-wrap md:flex text-2xl ml-5 text-black">
        {filteredItems.map((item) => (
          <div className="m-2 mx-4 my-10 p-1 " key={item.id}>
            <div>{item.name}</div>
            <div
              className="w-64 h-64"
              style={{
                backgroundImage: `url(${item.imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="text-black">Rs. {item.price}</div>
            <button
              onClick={() => handleAdd(item)}
              className="btn rounded-md bg-yellow-400 text-black hover:bg-green-400 hover:text-black p-2"
            >
              Add to Bucket
            </button>
          </div>
        ))}
        {showCart && (
          <Cart
            cartData={cart}
            setShowCart={setShowCart}
            handleIncr={handleAdd}
            handleDecr={decrementCartItem}
            handleRemove={removeCartItem}
          />
        )}
      </div>
    </>
  );
}
