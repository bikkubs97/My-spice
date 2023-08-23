import { useState } from "react";
import Cart from "./Cart";
import Header from "./Header";

export interface item {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  rating: number;
  category: string;
}

export interface cartItem {
  item: item;
  count: number;
}
export default function Products() {
  const foodItems: item[] = [
    {
      id: 1,
      name: "Pizza",
      price: 120,
      imgUrl: "pizza.png",
      rating: 4.7,
      category: "others",
    },

    {
      id: 2,
      name: "Fries",
      price: 100,
      imgUrl: "fires.png",
      rating: 4.8,
      category: "chicken",
    },
    {
      id: 3,
      name: "Chicken Nuggets",
      price: 150,
      imgUrl: "nuggets.png",
      rating: 3.9,
      category: "chicken",
    },
    {
      id: 4,
      name: "Burger",
      price: 80,
      imgUrl: "burger.png",
      rating: 4.2,
      category: "others",
    },
    {
      id: 5,
      name: "Fried Chicken",
      price: 300,
      imgUrl: "chicken.png",
      rating: 4.5,
      category: "chicken",
    },
    {
      id: 6,
      name: "Coco Cola",
      price: 70,
      imgUrl: "coco.png",
      rating: 4.7,
      category: "drinks",
    },
    {
      id: 7,
      name: "Shawarma",
      price: 100,
      imgUrl: "swarma.png",
      rating: 4.7,
      category: "others",
    },
    {
      id: 8,
      name: "Pepsi",
      price: 60,
      imgUrl: "pepsi.png",
      rating: 4.7,
      category: "drinks",
    },
  ];

  const [cart, setCart] = useState<cartItem[]>([]);
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
  }

  function removeCartItem(itemId: number) {
    const updatedCart = cart.filter((cartItem) => cartItem.item.id !== itemId);
    setCart(updatedCart);
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
      <Header cartData={cart} setShowCart={setShowCart} />
      <div className="flex ml-5">
        <label className="ml-4 p-2 text-black">Price</label>
        <select
          className="bg-yellow-400"
          name="Price"
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          value={selectedPriceRange}
        >
          <option value="All Range">All Range</option>
          <option value="50-100">50-100</option>
          <option value="100-200">100-200</option>
          <option value="200-300">200-300</option>
        </select>
        <label className="ml-4 p-2 text-black">Rating</label>
        <select
          className="bg-yellow-400"
          name="Rating"
          onChange={(e) => setSelectedRatingRange(e.target.value)}
          value={selectedRatingRange}
        >
          <option value="All Range">All Range</option>
          <option value="4-5">4-5</option>
          <option value="3-4">3-4</option>
          <option value="1-3">1-3</option>
        </select>
        <label className="ml-4 p-2 text-black">Category</label>
        <select
          className="bg-yellow-400"
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
      <div className="md:mx-20 flex-wrap md:flex text-2xl ml-5 text-white">
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
