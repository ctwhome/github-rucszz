<script>
  import { recipes } from '$lib/stores';
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let name = '';
  let ingredients = [];
  let picture = '';
  let imagePreview = null;

  let newIngredient = { name: '', category: '', place: '' };
  let existingIngredients = [];
  let searchQuery = '';

  $: {
    const allIngredients = $recipes.flatMap(recipe => recipe.ingredients);
    existingIngredients = Array.from(new Set(allIngredients.map(JSON.stringify))).map(JSON.parse);
  }

  $: filteredIngredients = searchQuery
    ? existingIngredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ingredient.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ingredient.place.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : existingIngredients;

  onMount(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  });

  function handlePaste(e) {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          imagePreview = event.target.result;
          picture = event.target.result;
        };
        reader.readAsDataURL(blob);
        break;
      }
    }
  }

  function addIngredient() {
    if (newIngredient.name && newIngredient.category && newIngredient.place) {
      ingredients = [...ingredients, { ...newIngredient }];
      newIngredient = { name: '', category: '', place: '' };
    }
  }

  function addExistingIngredient(event) {
    const selectedIngredient = JSON.parse(event.target.value);
    if (selectedIngredient.name) {
      ingredients = [...ingredients, selectedIngredient];
      event.target.value = ''; // Reset the select
      searchQuery = ''; // Clear the search query
    }
  }

  function removeIngredient(index) {
    ingredients = ingredients.filter((_, i) => i !== index);
  }

  function addRecipe() {
    if (name && ingredients.length > 0 && picture) {
      $recipes = [...$recipes, { name, ingredients, picture }];
      dispatch('recipeAdded');
      resetForm();
    }
  }

  function resetForm() {
    name = '';
    ingredients = [];
    picture = '';
    imagePreview = null;
    newIngredient = { name: '', category: '', place: '' };
    searchQuery = '';
  }
</script>

<form id="recipe-form" on:submit|preventDefault={addRecipe} class="space-y-4">
  <div>
    <label for="name" class="block mb-1">Recipe Name</label>
    <input id="name" bind:value={name} class="input input-bordered w-full" required />
  </div>
  
  <div>
    <h3 class="font-semibold mb-2">Ingredients</h3>
    <div class="flex space-x-2 mb-2">
      <input bind:value={newIngredient.name} placeholder="Ingredient" class="input input-bordered flex-grow" />
      <input bind:value={newIngredient.category} placeholder="Category" class="input input-bordered w-1/4" />
      <input bind:value={newIngredient.place} placeholder="Place" class="input input-bordered w-1/4" />
      <button type="button" on:click={addIngredient} class="btn btn-primary">Add</button>
    </div>
    <div class="mb-2">
      <input
        bind:value={searchQuery}
        placeholder="Search ingredients..."
        class="input input-bordered w-full mb-2"
      />
      <select on:change={addExistingIngredient} class="select select-bordered w-full">
        <option value="">Select existing ingredient</option>
        {#each filteredIngredients as ingredient}
          <option value={JSON.stringify(ingredient)}>
            {ingredient.name} - {ingredient.category} - {ingredient.place}
          </option>
        {/each}
      </select>
    </div>
    <ul class="space-y-2">
      {#each ingredients as ingredient, index}
        <li class="flex justify-between items-center bg-base-200 p-2 rounded">
          <span>{ingredient.name} - {ingredient.category} - {ingredient.place}</span>
          <button type="button" on:click={() => removeIngredient(index)} class="btn btn-xs btn-error">Remove</button>
        </li>
      {/each}
    </ul>
  </div>
  
  <div>
    <label for="picture" class="block mb-1">Picture URL or Paste Image</label>
    <input id="picture" bind:value={picture} class="input input-bordered w-full" placeholder="Enter URL or paste image" />
    {#if imagePreview}
      <img src={imagePreview} alt="Preview" class="mt-2 w-32 h-32 object-cover rounded-md" />
    {/if}
    <p class="text-sm text-gray-500 mt-1">You can paste an image from your clipboard anywhere on this form.</p>
  </div>
</form>