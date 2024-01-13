<!-- HTML. -->
<main>
	<Header></Header>
	<div class="container p-3 borderify">
		<div class="container m-1 borderify">
			<NavigationBar></NavigationBar>
		</div>
		<div class="columns m-1">
			<div class="column is-8 has-background-bookmark-container">
				<Bookmarks></Bookmarks>
			</div>
			<div class="column is-4 borderify">
				<Clock></Clock>
			</div>
		</div>
	</div>
</main>

<!-- CSS. -->
<style></style>

<!-- TypeScript. -->
<script lang='ts'>
	import Header from './header.svelte';
	import NavigationBar from './navigation-bar.svelte';
	import Bookmarks from './bookmarks.svelte';
	import Clock from './clock.svelte';
</script>