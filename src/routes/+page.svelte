<!-- HTML. -->
<main>
	<Header></Header>
	<div id="page-content" class="container p-3">
		<div class="container m-1">
			<NavigationBar></NavigationBar>
		</div>
		<div class="columns m-1 is-variable is-2">
			<div class="column is-8">
				<Bookmarks></Bookmarks>
			</div>
			<div class="column is-4">
				<Clock></Clock>
				<Grouped></Grouped>
			</div>
		</div>
	</div>
	<img class="background-img" id="TL" src="./images/Background TL.svg" alt="beans">
	<img class="background-img" id="BL" src="./images/Background BL.svg" alt="beans">
	<img class="background-img" id="TR" src="./images/Background TR.svg" alt="beans">
	<img class="background-img" id="BR" src="./images/Background BR.svg" alt="beans">
</main>

<!-- CSS. -->
<style>
	.column {
		background-clip: content-box;
		border-radius: 50px;
	}
	.background-img {
		position: fixed;
		z-index: 0;
	}
	img#TL { top: 22%; }
	img#BL { top: 75%; }
	img#TR { top: 25%; right: 0%; }
	img#BR { top: 70%; right: 0%; }

	#page-content {
		z-index: 1;
	}

</style>

<!-- TypeScript. -->
<script lang='ts'>
	import Header from './header.svelte';
	import NavigationBar from './navigation-bar.svelte';
	import Bookmarks from './bookmarks.svelte';
	import Clock from './clock.svelte';
	import Grouped from './grouped.svelte'
</script>