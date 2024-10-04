<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<header class="flex justify-between p-4 bg-gray-100">
	<div class="corner w-12 h-12">
		<a href="https://kit.svelte.dev" class="flex items-center justify-center w-full h-full">
			<img src={logo} alt="SvelteKit" class="w-8 h-8 object-contain" />
		</a>
	</div>

	<nav class="flex justify-center items-center">
		<ul class="flex space-x-4 bg-white bg-opacity-70 px-4 py-2 rounded-full">
			<li class:active={$page.url.pathname === '/'}>
				<a class="text-sm font-bold uppercase tracking-widest hover:text-blue-600 transition-colors" href="/">Home</a>
			</li>
			<li class:active={$page.url.pathname === '/about'}>
				<a class="text-sm font-bold uppercase tracking-widest hover:text-blue-600 transition-colors" href="/about">About</a>
			</li>
		</ul>
	</nav>

	<div class="corner w-12 h-12">
		<a href="https://github.com/sveltejs/kit" class="flex items-center justify-center w-full h-full">
			<img src={github} alt="GitHub" class="w-8 h-8 object-contain" />
		</a>
	</div>
</header>

<style>
	li.active a {
		color: var(--color-theme-1);
	}
</style>