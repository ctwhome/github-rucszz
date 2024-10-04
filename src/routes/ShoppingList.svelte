<script>
  import { mealPlan, ingredientAvailability } from '$lib/stores';
  import { onMount } from 'svelte';

  let checkedItems = {};

  $: shoppingList = Object.values($mealPlan)
    .flat()
    .flatMap(recipe => recipe.ingredients)
    .reduce((acc, ingredient) => {
      const key = `${ingredient.name}-${ingredient.category}-${ingredient.place}`;
      if (!acc[key] && !$ingredientAvailability[key]) {
        acc[key] = { ...ingredient, count: 0 };
      }
      if (acc[key]) {
        acc[key].count += 1;
      }
      return acc;
    }, {});

  $: groupedShoppingList = Object.values(shoppingList).reduce((acc, item) => {
    if (!acc[item.place]) {
      acc[item.place] = {};
    }
    if (!acc[item.place][item.category]) {
      acc[item.place][item.category] = [];
    }
    acc[item.place][item.category].push(item);
    return acc;
  }, {});

  onMount(() => {
    const storedCheckedItems = localStorage.getItem('checkedItems');
    if (storedCheckedItems) {
      checkedItems = JSON.parse(storedCheckedItems);
    }
  });

  function updateCheckedStatus(ingredient) {
    const key = `${ingredient.name}-${ingredient.category}-${ingredient.place}`;
    checkedItems[key] = !checkedItems[key];
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }

  function clearChecked() {
    checkedItems = {};
    localStorage.removeItem('checkedItems');
  }
</script>

<div class="space-y-4">
  <button on:click={clearChecked} class="btn btn-sm btn-outline">Clear All Checked</button>
  {#each Object.entries(groupedShoppingList) as [place, categories]}
    <div class="bg-base-200 p-4 rounded-lg">
      <h3 class="font-semibold text-lg mb-2">{place}</h3>
      {#each Object.entries(categories) as [category, items]}
        <div class="mb-4">
          <h4 class="font-medium text-md mb-2">{category}</h4>
          <ul class="space-y-2">
            {#each items as item}
              {@const key = `${item.name}-${item.category}-${item.place}`}
              <li class="bg-base-100 p-2 rounded-lg flex justify-between items-center">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class="checkbox"
                    checked={checkedItems[key] || false}
                    on:change={() => updateCheckedStatus(item)}
                  />
                  <span class:line-through={checkedItems[key]}>{item.name}</span>
                </label>
                <span class="badge">{item.count}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  {/each}
</div>