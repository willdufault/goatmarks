<!-- HTML. -->
<main>
	<div class="container p-3 borderify">
		<div class="container m-1 borderify">
			<NavBar></NavBar>
		</div>
		<div class="columns m-1">
			<div class="column is-8 borderify">
				<Bookmarks></Bookmarks>
			</div>
			<div class="column is-4 borderify">
				<Clock></Clock>
			</div>
		</div>
	</div>
</main>

<!-- CSS. -->
<style>
	.borderify {
		border: 5px solid red;
	}
</style>

<!-- TypeScript. -->
<script lang='ts'>
	import Bookmarks from './bookmarks.svelte';
	import NavBar from './navigation-bar.svelte';
	import Clock from './clock.svelte';
</script>