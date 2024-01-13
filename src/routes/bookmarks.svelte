<!-- HTML. -->
<main>
	<div class="has-background-bookmark-container rounded-25 columns is-multiline m-1">
		{#each bookmarks as bm}
			<div class="column is-2">
				<Bookmark name={bm.name} url={bm.url}></Bookmark>
			</div>
		{/each}
	</div>
	
</main>

<!-- CSS. -->
<style></style>

<!-- TypeScript. -->
<script lang='ts'>
	import Bookmark from './bookmark.svelte';

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
	]
</script>