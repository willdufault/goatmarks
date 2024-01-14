<!-- HTML. -->
<main class='height-100  rounded-25 no-overflow'>
	<div class="height-100 has-background-bookmark-container scrollable">
		{#if $is_logged_in && $is_in_group}
		<div class='columns is-multiline m-0'>
			{#each bookmarks as bm}
			<div class="column is-4">
				<Bookmark name={bm.name} url={bm.url} group={true}></Bookmark>
			</div>
			{/each}
		</div> 
		{:else}
			<div class='container height-100 mx-4 has-text-centered is-flex is-justify-content-center is-align-items-center'>
				<h1 class='title is-4'>Please join a group to view shared bookmarks.</h1>
			</div>
		{/if}
	</div>
	
</main>

<!-- CSS. -->
<style></style>

<!-- TypeScript. -->
<script lang='ts'>
	import Bookmark from './bookmark.svelte';
	import { is_logged_in, is_in_group } from '../store'

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
		
	]
</script>