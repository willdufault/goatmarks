<!-- HTML. -->
<main>

	<div class="card py-4 has-background-bookmark-card">
		<!-- Link to URL if active, otherwise do nothing. -->
		<a href={url}>
			<div class="card-image p-2 is-flex is-justify-content-center">
				<figure class="image is-48x48">
					<img class="is-rounded has-background-white p-1" src="{image_url}" alt="Bookmark Icon">
				</figure>
			</div>
			<div class="card-content is-flex is-justify-content-center py-0">
				<p>{name}</p>
			</div>
		</a>
	</div>
</main>

<!-- CSS. -->
<style>
	.card {
		border-radius: 30px;
	}
</style>

<!-- TypeScript. -->
<script lang='ts'>
	export let url: string;
	export let name: string; 
	let image_url: string = 'http://logo.clearbit.com/' + url;
</script>