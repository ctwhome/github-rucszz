<script>
  import { createEventDispatcher } from 'svelte';
  import RecipeForm from './RecipeForm.svelte';

  const dispatch = createEventDispatcher();

  export let isOpen = false;

  function closeDialog() {
    dispatch('close');
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-base-100 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <h2 class="text-2xl font-bold mb-4">Add New Recipe</h2>
      <RecipeForm on:recipeAdded={closeDialog} />
      <div class="flex justify-end mt-4 space-x-2">
        <button class="btn btn-outline" on:click={closeDialog}>Cancel</button>
        <button class="btn btn-primary" type="submit" form="recipe-form">Add Recipe</button>
      </div>
      <button class="btn btn-sm btn-circle absolute right-2 top-2" on:click={closeDialog}>✕</button>
    </div>
  </div>
{/if}