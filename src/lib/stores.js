import { writable } from 'svelte/store';

const initialRecipes = [
  {
    name: "Vegan Buddha Bowl",
    ingredients: [
      { name: "Quinoa", category: "Grains", place: "Pantry" },
      { name: "Chickpeas", category: "Legumes", place: "Pantry" },
      { name: "Sweet Potato", category: "Vegetables", place: "Produce" },
      { name: "Kale", category: "Vegetables", place: "Produce" },
      { name: "Avocado", category: "Fruits", place: "Produce" },
      { name: "Tahini", category: "Condiments", place: "Pantry" },
      { name: "Lemon", category: "Fruits", place: "Produce" }
    ],
    picture: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Vegan Lentil Curry",
    ingredients: [
      { name: "Red Lentils", category: "Legumes", place: "Pantry" },
      { name: "Coconut Milk", category: "Dairy Alternatives", place: "Pantry" },
      { name: "Onion", category: "Vegetables", place: "Produce" },
      { name: "Garlic", category: "Vegetables", place: "Produce" },
      { name: "Ginger", category: "Vegetables", place: "Produce" },
      { name: "Curry Powder", category: "Spices", place: "Pantry" },
      { name: "Tomatoes", category: "Vegetables", place: "Produce" },
      { name: "Spinach", category: "Vegetables", place: "Produce" }
    ],
    picture: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Vegan Mushroom Risotto",
    ingredients: [
      { name: "Arborio Rice", category: "Grains", place: "Pantry" },
      { name: "Mushrooms", category: "Vegetables", place: "Produce" },
      { name: "Vegetable Broth", category: "Canned Goods", place: "Pantry" },
      { name: "White Wine", category: "Alcohol", place: "Pantry" },
      { name: "Onion", category: "Vegetables", place: "Produce" },
      { name: "Garlic", category: "Vegetables", place: "Produce" },
      { name: "Nutritional Yeast", category: "Condiments", place: "Pantry" },
      { name: "Thyme", category: "Herbs", place: "Produce" }
    ],
    picture: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Vegan Cauliflower Tacos",
    ingredients: [
      { name: "Cauliflower", category: "Vegetables", place: "Produce" },
      { name: "Corn Tortillas", category: "Bread", place: "Pantry" },
      { name: "Black Beans", category: "Legumes", place: "Pantry" },
      { name: "Avocado", category: "Fruits", place: "Produce" },
      { name: "Lime", category: "Fruits", place: "Produce" },
      { name: "Cilantro", category: "Herbs", place: "Produce" },
      { name: "Cumin", category: "Spices", place: "Pantry" },
      { name: "Chili Powder", category: "Spices", place: "Pantry" }
    ],
    picture: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
  {
    name: "Vegan Sushi Rolls",
    ingredients: [
      { name: "Sushi Rice", category: "Grains", place: "Pantry" },
      { name: "Nori Sheets", category: "Seaweed", place: "Pantry" },
      { name: "Cucumber", category: "Vegetables", place: "Produce" },
      { name: "Avocado", category: "Fruits", place: "Produce" },
      { name: "Carrots", category: "Vegetables", place: "Produce" },
      { name: "Tofu", category: "Protein", place: "Refrigerated" },
      { name: "Soy Sauce", category: "Condiments", place: "Pantry" },
      { name: "Wasabi", category: "Condiments", place: "Pantry" }
    ],
    picture: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
  {
    name: "Vegan Chickpea Pancakes",
    ingredients: [
      { name: "Chickpea Flour", category: "Flours", place: "Pantry" },
      { name: "Almond Milk", category: "Dairy Alternatives", place: "Refrigerated" },
      { name: "Spinach", category: "Vegetables", place: "Produce" },
      { name: "Tomatoes", category: "Vegetables", place: "Produce" },
      { name: "Onion", category: "Vegetables", place: "Produce" },
      { name: "Cumin", category: "Spices", place: "Pantry" },
      { name: "Turmeric", category: "Spices", place: "Pantry" },
      { name: "Maple Syrup", category: "Sweeteners", place: "Pantry" }
    ],
    picture: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80"
  },
  {
    name: "Vegan Paella",
    ingredients: [
      { name: "Arborio Rice", category: "Grains", place: "Pantry" },
      { name: "Vegetable Broth", category: "Canned Goods", place: "Pantry" },
      { name: "Saffron", category: "Spices", place: "Pantry" },
      { name: "Artichoke Hearts", category: "Vegetables", place: "Canned Goods" },
      { name: "Bell Peppers", category: "Vegetables", place: "Produce" },
      { name: "Tomatoes", category: "Vegetables", place: "Produce" },
      { name: "Peas", category: "Vegetables", place: "Frozen" },
      { name: "Garlic", category: "Vegetables", place: "Produce" },
      { name: "Onion", category: "Vegetables", place: "Produce" },
      { name: "Lemon", category: "Fruits", place: "Produce" },
      { name: "Paprika", category: "Spices", place: "Pantry" },
      { name: "Olive Oil", category: "Oils", place: "Pantry" },
      { name: "Parsley", category: "Herbs", place: "Produce" }
    ],
    picture: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

export const recipes = writable(initialRecipes);
export const mealPlan = writable({
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: []
});

export const ingredientAvailability = writable({});