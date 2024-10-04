<script>
  import { recipes, ingredientAvailability } from '$lib/stores';
  import { onMount } from 'svelte';

  let allIngredients = [];

  onMount(() => {
    const storedAvailability = localStorage.getItem('ingredientAvailability');
    if (storedAvailability) {
      $ingredientAvailability = JSON.parse(storedAvailability);
    }
  });

  $: {
    const ingredientSet = new Set();
    $recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        ingredientSet.add(JSON.stringify(ingredient));
      });
    });
    allIngredients = Array.from(ingredientSet).map(JSON.parse);
  }

  function updateAvailability(ingredient) {
    const key = `${ingredient.name}-${ingredient.category}-${ingredient.place}`;
    $ingredientAvailability[key] = !$ingredientAvailability[key];
    localStorage.setItem('ingredientAvailability', JSON.stringify($ingredientAvailability));
  }

  function clearAll() {
    $ingredientAvailability = {};
    localStorage.removeItem('ingredientAvailability');
  }
</script>

<svelte:head>
  <title>Pantry - Weekly Meal Planner</title>
</svelte:head>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">Pantry</h1>
  
  <button on:click={clearAll} class="btn btn-sm btn-outline mb-4">Clear All</button>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each allIngredients as ingredient}
      {@const key = `${ingredient.name}-${ingredient.category}-${ingredient.place}`}
      <div class="bg-base-200 p-4 rounded-lg flex justify-between items-center">
        <div>
          <h3 class="font-semibold">{ingredient.name}</h3>
          <p class="text-sm text-gray-500">{ingredient.category} - {ingredient.place}</p>
        </div>
        <label class="cursor-pointer flex items-center">
          <input
            type="checkbox"
            class="checkbox"
            checked={$ingredientAvailability[key] || false}
            on:change={() => updateAvailability(ingredient)}
          />
          <span class="ml-2">{$ingredientAvailability[key] ? 'Available' : 'Need to buy'}</span>
        </label>
      </div>
    {/each}
  </div>
</div>