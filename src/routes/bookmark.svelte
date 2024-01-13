<!-- HTML. -->
<main>
	<div class='card'>
		<div class="card-image p-3">
			<figure class="image is-48x48">
				<img src="{image_url}" alt="Bookmark Icon">
			</figure>
		</div>
	</div>
</main>

<!-- CSS. -->
<style></style>

<!-- TypeScript. -->
<script lang='ts'>
	export let url: string;
	export let name: string; 
	let image_url: string = 'http://logo.clearbit.com/' + url;
</script>