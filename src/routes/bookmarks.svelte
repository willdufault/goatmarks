<!-- HTML. -->
<main>
	{#each {length: 3} as i}
		<Bookmark name={'name'} url={'url'} image_url={'image_url'}></Bookmark>
	{/each}
</main>

<!-- CSS. -->
<style></style>

<!-- TypeScript. -->
<script lang='ts'>
	import Bookmark from './bookmark.svelte';
</script>