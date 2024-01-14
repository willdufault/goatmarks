<!-- HTML. -->
<main class='height-100 rounded-25 no-overflow'>
	<div class='height-100 container has-background-bookmark-container p-3 scrollable'>
		
		<div class="columns is-multiline m-0">
			{#each bookmarks as bm}
				<div class="column is-2">
					<Bookmark name={bm.name} url={bm.url}></Bookmark>
				</div>
			{/each}
			<div class="column is-2">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="card py-4 has-background-bookmark-card" on:click={() => addBMarkUser()}>
					<div class="card-image p-2 is-flex is-justify-content-center">
						<figure class="image is-48x48">
							<img class="is-rounded p-1" src="./images/Plus.svg" alt="Bookmark Icon">
						</figure>
					</div>
					<div class="card-content is-flex is-justify-content-center py-0">
						<p>Add</p>
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
		{
			url: 'https://google.com',
			name: 'Google'
		},
		{
			url: 'https://bulma.io',
			name: 'Bulma'
		}
	];

	async function addBMarkUser () {
		const json = {
      username: "wduf",
      link: "maine.com",
      linkName: "maine",
    };
    const body = JSON.stringify(json);
    console.log("This is the body, ", body);

    const response = await fetch("/addBmarkUser", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();

    console.log("text:", text);

    return response;
	}

</script>