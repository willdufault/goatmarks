<!-- HTML. -->
<main>
	<div class="columns is-multiline m-1">
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
			url: 'google.com',
			name: 'Google'
		},
		{
			url: 'bulma.io',
			name: 'Bulma'
		}
	]
</script>