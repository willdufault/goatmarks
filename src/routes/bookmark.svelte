<!-- HTML. -->
<main>
	<a href={url}>
		<div class="card">
			<div class="card-image p-3 is-flex is-justify-content-center">
				<figure class="image is-48x48">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img src="{image_url}" alt="Image">
				</figure>
			</div>
			<div class="card-content is-flex is-justify-content-center py-0">
				<h3>{name}</h3>
			</div>
		</div>
	</a>
</main>

<!-- CSS. -->
<style></style>

<!-- TypeScript. -->
<script lang='ts'>
	export let url: string;
	export let name: string; 
	let image_url: string = 'http://logo.clearbit.com/' + url;
</script>