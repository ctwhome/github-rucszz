<script>
  import '../app.css';
  import { page } from '$app/stores';
  import AddRecipeDialog from './AddRecipeDialog.svelte';

  let isAddRecipeDialogOpen = false;

  function openAddRecipeDialog() {
    isAddRecipeDialogOpen = true;
  }

  function closeAddRecipeDialog() {
    isAddRecipeDialogOpen = false;
  }
</script>

<div class="min-h-screen bg-base-100 text-base-content">
  <nav class="bg-base-200 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <a href="/" class="text-xl font-bold">Meal Planner</a>
        <a href="/shopping-list" class="text-lg hover:underline">Shopping List</a>
        <a href="/pantry" class="text-lg hover:underline">Pantry</a>
      </div>
      <button class="btn btn-primary" on:click={openAddRecipeDialog}>Add Recipe</button>
    </div>
  </nav>
  
  <main class="p-4">
    <slot />
  </main>

  <AddRecipeDialog isOpen={isAddRecipeDialogOpen} on:close={closeAddRecipeDialog} />
</div>