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
		<div class="dropdown is-hoverable">
			<div class="dropdown-trigger">
			  <button class="button is-ghost" aria-haspopup="true" aria-controls="dropdown-menu2">
				<span class="icon is-small">
				  <img src="./images/Kebab.svg" alt="Kebab">
				</span>
			  </button>
			</div>
			<div class="dropdown-menu" id="dropdown-menu2" role="menu">
			  <div class="dropdown-content has-background-bookmark-card">
				<div class="dropdown-item">
					<p>Edit Bookmark</p>
				</div>
				<div class="dropdown-item">
					<p>Delete Bookmark</p>
				</div>
			  </div>
			</div>
		  </div>
	</div>
</main>

<!-- CSS. -->
<style>
	.card {
		border-radius: 30px;
	}

	.dropdown {
		position: absolute;
		top: 0%;
		right: 0%;
		visibility: hidden;
	}

	.card:hover .dropdown{
		visibility: visible;
	}

	.dropdown button {
		border-radius: 9999px;
		border-color: none;
	}
	
</style>

<!-- TypeScript. -->
<script lang='ts'>
	export let url: string;
	export let name: string; 
	let image_url: string = 'http://logo.clearbit.com/' + url;
</script>