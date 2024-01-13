<!-- HTML. -->
<main>
	<div class="container p-3 borderify">
		<div class="container m-1 borderify">
			<NavigationBar></NavigationBar>
		</div>
		<div class="columns m-1 is-variable is-4">
			<div class="column is-8 has-background-bookmark-container">
				<Bookmarks></Bookmarks>
			</div>
			<div class="column is-4 has-background-bookmark-container is-flex is-justify-content-center is-align-items-center">
				<Clock></Clock>
			</div>
		</div>
	</div>
</main>

<!-- CSS. -->
<style>
	.column {
		background-clip: content-box;
		border-radius: 50px;
	}
</style>

<!-- TypeScript. -->
<script lang='ts'>
	import Bookmarks from './bookmarks.svelte';
	import NavigationBar from './navigation-bar.svelte';
	import Clock from './clock.svelte';
</script>