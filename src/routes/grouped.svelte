<!-- HTML. -->
<main class='height-100  rounded-25 no-overflow'>
	<div class="height-100 has-background-bookmark-container columns is-multiline m-0 scrollable">
		{#each bookmarks as bm}
			<div class="column is-4">
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
	]
</script>