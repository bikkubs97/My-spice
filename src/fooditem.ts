export const foodItems: item[] = [
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
      category: "others",
    },
    {
      id: 3,
      name: "Nuggets",
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

  export interface item {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    rating: number;
    category: string;
  }
  