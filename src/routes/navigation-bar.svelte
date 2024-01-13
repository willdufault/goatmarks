<!-- HTML. -->
<main>
    <div class='container is-flex is-justify-content-space-between'>
			<input bind:this={search_input} type='text' placeholder='Search Google or type a URL.' on:keypress={search}>
			<div class='buttons-wrapper'>

				<!-- 

					Stevie recommends modal for log in, maybe just a pop up underneath for joining a room

				 -->

				<button class='button'>suck</button>
				<button class='button'>my</button>
				<button class='button'>nuts</button>
			</div>
		</div>
</main>

<!-- CSS. -->
<style></style>

<!-- TypeScript. -->
<script lang='ts'>
	let search_input: HTMLInputElement;

	/*

	*/
	async function pageExists(url: string) {

    let response = await fetch( `https://${url}` )
		console.log(response.json());
		return false;
	}

	/*

	*/
	function search(event: KeyboardEvent): void {
		if(event.key === 'Enter') {
			let query: string = search_input.value;

			console.log(pageExists(query));

			window.open(`https://google.com/search?q=${query}`)
		}
	}
</script>