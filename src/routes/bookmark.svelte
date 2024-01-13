<!-- HTML. -->
<main>
	<!-- Link to URL if active, otherwise do nothing. -->
	<a href={active ? url : 'javascript:;'} class={active ? '' : 'cursor-move'}>
		<div class="card py-4 has-background-bookmark-card">
			<div class="card-image p-2 is-flex is-justify-content-center">
				<figure class="image is-48x48">
					<img class="is-rounded has-background-white p-1" src="{image_url}" alt="Bookmark Icon">
				</figure>
			</div>
			<div class="card-content is-flex is-justify-content-center py-0">
				<p>{name}</p>
			</div>
		</div>
	</a>
</main>

<!-- CSS. -->
<style>
	.card {
		border-radius: 30px;
	}

	.cursor-move {
		cursor: move;
	}
</style>

<!-- TypeScript. -->
<script lang='ts'>
	export let url: string;
	export let name: string; 
	export let active: boolean;
	let image_url: string = 'http://logo.clearbit.com/' + url;
</script>