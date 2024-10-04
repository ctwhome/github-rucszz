<script>
	import { spring } from 'svelte/motion';

	let count = 0;

	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);

	function modulo(n, m) {
		return ((n % m) + m) % m;
	}
</script>

<div class="counter flex border-t border-b border-gray-200 my-4">
	<button
		on:click={() => (count -= 1)}
		aria-label="Decrease the counter by one"
		class="w-8 h-16 flex items-center justify-center hover:bg-gray-100 transition-colors"
	>
		<svg aria-hidden="true" viewBox="0 0 1 1" class="w-4 h-4">
			<path d="M0,0.5 L1,0.5" stroke="currentColor" stroke-width="0.1" vector-effect="non-scaling-stroke" />
		</svg>
	</button>

	<div class="counter-viewport w-32 h-16 overflow-hidden text-center relative">
		<div class="counter-digits absolute w-full h-full" style="transform: translate(0, {100 * offset}%)">
			<strong class="absolute flex w-full h-full items-center justify-center text-4xl font-normal text-blue-600" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
			<strong class="absolute flex w-full h-full items-center justify-center text-4xl font-normal text-blue-600">{Math.floor($displayed_count)}</strong>
		</div>
	</div>

	<button
		on:click={() => (count += 1)}
		aria-label="Increase the counter by one"
		class="w-8 h-16 flex items-center justify-center hover:bg-gray-100 transition-colors"
	>
		<svg aria-hidden="true" viewBox="0 0 1 1" class="w-4 h-4">
			<path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" stroke="currentColor" stroke-width="0.1" vector-effect="non-scaling-stroke" />
		</svg>
	</button>
</div>