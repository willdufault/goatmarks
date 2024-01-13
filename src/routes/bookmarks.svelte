<!-- HTML. -->
<main>
	<div class='container has-background-bookmark-container rounded-25'>
		<div class='is-flex is-justify-content-right px-4 pt-3'>
			<button class='invisible-button is-flex is-size-4' on:click={toggleEditMode}>
				<Icon icon={active ? 'bxs:grid' : 'ic:round-close'}	 />
			</button>
		</div>
		<div bind:this={grid_element} class="columns is-multiline m-0 grid">
			{#each bookmarks as bm}
			<div class="item column is-2">
				<div class='item-content'>
					<Bookmark name={bm.name} url={bm.url} active={active}></Bookmark>
				</div>
			</div>
			{/each}
		</div>
	</div>
</main>

<!-- CSS. -->
<style>
	/* Muuri styles for draggable tiles. */
	.grid {
  	position: relative;
	}
	
	.item {
		display: block;
		position: absolute;
		z-index: 1;
	}

	.item-content {
		position: relative;
	}
	
	.item.muuri-item-dragging {
		z-index: 3;
	}

	.item.muuri-item-releasing {
		z-index: 2;
	}

	.item.muuri-item-hidden {
		z-index: 0;
	}

</style>

<!-- TypeScript. -->
<script lang='ts'>
	import { onMount } from 'svelte';
	import Bookmark from './bookmark.svelte';
	import Icon from '@iconify/svelte';
	
	let grid_element: HTMLElement;
	let muuri_grid: any;
	let active: boolean = true;

	function toggleEditMode(): void{
			active = !active;
			muuri_grid._settings.dragEnabled = active;
			muuri_grid = muuri_grid;
			bookmarks = bookmarks;

			console.log(muuri_grid);
		}
	
	interface bookmark {
		url: string,
		name: string
	}
	export let bookmarks : bookmark[] = [
		{
			url: 'https://google.com',
			name: 'Google'
		},
		{
			url: 'https://bulma.io',
			name: 'Bulma'
		},
		{
			url: 'https://google.com',
			name: 'Google'
		},
		{
			url: 'https://bulma.io',
			name: 'Bulma'
		},
		{
			url: 'https://google.com',
			name: 'Google'
		},
		{
			url: 'https://bulma.io',
			name: 'Bulma'
		},
		{
			url: 'https://google.com',
			name: 'Google'
		},
		{
			url: 'https://bulma.io',
			name: 'Bulma'
		},
		{
			url: 'https://google.com',
			name: 'Google'
		},
		{
			url: 'https://bulma.io',
			name: 'Bulma'
		},
		{
			url: 'https://google.com',
			name: 'Google'
		},
		{
			url: 'https://bulma.io',
			name: 'Bulma'
		},
	];
	
	onMount(async () => {
		let muuri = await import('muuri');
		let Muuri = muuri.default;

		// Start with tile dragging disabled.
		muuri_grid = new Muuri(grid_element, {dragEnabled: true, dragStartPredicate: () => {return !active}});
		console.log(muuri_grid);
	});	
</script>