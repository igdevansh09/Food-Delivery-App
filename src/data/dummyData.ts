export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  tags: string[];
  menu: MenuItem[];
}

export const dummyRestaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Luigi's Pizza",
    rating: 4.8,
    deliveryTime: "30-45 min",
    deliveryFee: 2.99,
    tags: ["Italian", "Pizza"],
    menu: [
      {
        id: "m1",
        name: "Margherita Pizza",
        description: "Classic tomato and fresh mozzarella",
        price: 12.99,
        emoji: "🍕",
      },
      {
        id: "m2",
        name: "Pepperoni Pizza",
        description: "Mozzarella and double pepperoni",
        price: 14.99,
        emoji: "🍕",
      },
    ],
  },
  {
    id: "r2",
    name: "The Hungry Bear 🐻",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    tags: ["American", "Burgers"],
    menu: [
      {
        id: "m3",
        name: "Special Burger",
        description: "Beef patty with our secret bear sauce",
        price: 15.0,
        emoji: "🍔",
      },
      {
        id: "m4",
        name: "Cheese Fries",
        description: "Crispy fries topped with melted cheddar",
        price: 5.99,
        emoji: "🍟",
      },
    ],
  },
  {
    id: "r3",
    name: "Tokyo Bite",
    rating: 4.9,
    deliveryTime: "40-55 min",
    deliveryFee: 3.99,
    tags: ["Japanese", "Sushi"],
    menu: [
      {
        id: "m5",
        name: "Spicy Tuna Roll",
        description: "Fresh tuna with spicy mayo and cucumber",
        price: 15.5,
        emoji: "🍣",
      },
      {
        id: "m6",
        name: "Salmon Nigiri",
        description: "Fresh raw salmon over pressed vinegared rice",
        price: 12.0,
        emoji: "🍣",
      },
    ],
  },
];

export const featuredFoods = [
  {
    id: "f1",
    emoji: "🍕",
    foodName: "Pizza",
    restaurantName: "Luigi's Pizza",
    price: "$12",
  },
  {
    id: "f2",
    emoji: "🍔",
    foodName: "Burger",
    restaurantName: "The Hungry Bear 🐻",
    price: "$10",
  },
  {
    id: "f3",
    emoji: "🍣",
    foodName: "Sushi",
    restaurantName: "Tokyo Bite",
    price: "$15",
  },
  {
    id: "f4",
    emoji: "🌮",
    foodName: "Tacos",
    restaurantName: "El Camino",
    price: "$9",
  },
  {
    id: "f5",
    emoji: "🥗",
    foodName: "Salad",
    restaurantName: "Green Bowl",
    price: "$11",
  },
];

export const dummyCategories = [
  { id: "c1", name: "Pizza", emoji: "🍕" },
  { id: "c2", name: "Burger", emoji: "🍔" },
  { id: "c3", name: "Sushi", emoji: "🍣" },
  { id: "c4", name: "Dessert", emoji: "🍰" },
  { id: "c5", name: "Healthy", emoji: "🥗" },
];
