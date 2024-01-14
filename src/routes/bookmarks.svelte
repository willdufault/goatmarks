<!-- HTML. -->
<main class='height-100'>
	<div class='height-100 container has-background-bookmark-container rounded-25'>
		
		<div class="columns height-100 is-multiline m-0">
			{#each bookmarks as bm}
				<div class="column is-2">
					<Bookmark name={bm.name} url={bm.url}></Bookmark>
				</div>
			{/each}
			<div class="column is-2">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="card py-4" on:click={() => addBMarkUser()}>
					<div class="card-image p-2 is-flex is-justify-content-center">
						<figure class="image is-48x48 m-3">
							<img class="plus is-rounded" src="./images/Plus.svg" alt="Bookmark Icon">
						</figure>
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
		box-shadow: none;
		background-color: transparent;
		outline-style: dashed;
		outline-width: 5px;
		outline-offset: -5px;
		outline-color: #88929A;
	}
	.plus{
		filter: invert(66%) sepia(10%) saturate(338%) hue-rotate(164deg) brightness(86%) contrast(85%);
	}
</style>

<!-- TypeScript. -->
<script lang='ts'>
	import Bookmark from './bookmark.svelte';
	import Icon from '@iconify/svelte';
	
	interface bookmark {
		url: string,
		name: string
	}
	let bookmarks : bookmark[] = [
		
	];

	async function addBMarkUser () {
		const json = {
			username: "wduf",
			link: "maine.com",
			linkName: "maine",
		};
		const body = JSON.stringify(json);

		const response = await fetch("/addBmarkUser", {
			method: "POST",
			body: body,
			headers: {
				"Content-Type": "application/json",
			},
		});

		const status = response.status;
		if(status == 200) {
			const bookmarks_response = await response.json();
			let update: any[] = [];
			bookmarks_response.array.forEach((element: any) => {
				update.push({
					url : element.url,
					name : element.name
				})
			});
			bookmarks = update;
			bookmarks = bookmarks;
			return false;
		} else {
			return false;
		}
	}

</script>