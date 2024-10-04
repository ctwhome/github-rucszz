<script>
  import { recipes, mealPlan } from '$lib/stores';
  import MealPlan from './MealPlan.svelte';
</script>

<svelte:head>
  <title>Weekly Meal Planner</title>
</svelte:head>

<main class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">Weekly Meal Planner</h1>
  
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4">Meal Plan</h2>
    <MealPlan />
  </div>
  
  <div>
    <h2 class="text-2xl font-semibold mb-4">Recipes</h2>
    <ul class="space-y-4">
      {#each $recipes as recipe}
        <li class="bg-base-200 p-3 rounded-lg cursor-move" draggable="true" on:dragstart={(e) => e.dataTransfer.setData('text/plain', recipe.name)}>
          <div class="flex items-center space-x-4">
            <img src={recipe.picture} alt={recipe.name} class="w-20 h-20 object-cover rounded-md" />
            <div>
              <h3 class="font-semibold">{recipe.name}</h3>
              <p class="text-sm">Ingredients: {recipe.ingredients.map(i => i.name).join(', ')}</p>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</main>