<script>
  import { recipes, mealPlan } from '$lib/stores';

  function handleDrop(event, day) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    try {
      // Check if the data is from within the meal plan
      const { sourceDay, sourceIndex } = JSON.parse(data);
      if (sourceDay && sourceIndex !== undefined) {
        const [movedRecipe] = $mealPlan[sourceDay].splice(sourceIndex, 1);
        if (movedRecipe) {
          $mealPlan[day] = [...$mealPlan[day], movedRecipe];
        }
      }
    } catch {
      // If it's not JSON, it's a new recipe from the recipe list
      const recipeName = data;
      const recipe = $recipes.find(r => r.name === recipeName);
      if (recipe) {
        $mealPlan[day] = [...$mealPlan[day], recipe];
      }
    }
    $mealPlan = $mealPlan;
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function removeRecipe(day, index) {
    $mealPlan[day] = $mealPlan[day].filter((_, i) => i !== index);
    $mealPlan = $mealPlan;
  }

  function handleDragStart(event, day, index) {
    event.dataTransfer.setData('text/plain', JSON.stringify({ sourceDay: day, sourceIndex: index }));
  }
</script>

<div class="grid grid-cols-7 gap-2">
  {#each Object.entries($mealPlan) as [day, dayRecipes]}
    <div 
      class="bg-base-200 p-2 rounded-lg"
      on:dragover={handleDragOver}
      on:drop={(event) => handleDrop(event, day)}
    >
      <h3 class="font-semibold text-sm mb-2">{day}</h3>
      {#if dayRecipes.length > 0}
        <ul class="space-y-2">
          {#each dayRecipes as recipe, index}
            <li 
              class="flex flex-col items-center bg-base-100 p-2 rounded cursor-move text-center"
              draggable="true"
              on:dragstart={(event) => handleDragStart(event, day, index)}
            >
              <img src={recipe.picture} alt={recipe.name} class="w-16 h-16 object-cover rounded-md mb-1" />
              <span class="text-xs">{recipe.name}</span>
              <button on:click={() => removeRecipe(day, index)} class="btn btn-xs btn-error mt-1">
                Remove
              </button>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-gray-500 text-xs">Drop recipes here</p>
      {/if}
    </div>
  {/each}
</div>