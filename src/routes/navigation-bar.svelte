<!-- HTML. -->
<main>
    <div class='has-background-bookmark-container p-4 mx-3 container is-flex is-justify-content-space-between rounded'>
			<!-- <input bind:this={search_input} type='text' placeholder='Search Google or type a URL.	' on:keypress={search}> -->
			
			<div class="field mb-0">
				<p class="control has-icons-left has-icons-right">
					<input bind:this={search_input} class="input google-search-bar" placeholder="Search Google or type a URL" on:keydown={search}>
					<span class="icon is-small is-left">
						<Icon icon='logos:google-icon' />
					</span>
					<span class="icon is-small is-right">
						<Icon icon='tabler:search' />
					</span>
				</p>
			</div>
			
			<button class='invisible-button is-size-2 is-flex'>
				<Icon icon='mdi:people' />
			</button>
			<!-- modal or drop down menu for this? -->
		</div>
</main>

<!-- CSS. -->
<style>
	.google-search-bar {
		width: 40rem;
	}

	.rounded {
		border-radius: 25px;
	}
</style>

<!-- TypeScript. -->
<script lang='ts'>
	import Icon from '@iconify/svelte';

	// Search bar.
	let search_input: HTMLInputElement;

	/*
	Determine whether a given query is a valid URL.
	*/
	function validURL(query: string): boolean {
		// Valid URL regex pattern.
		let pattern: RegExp = new RegExp(/^((https?|ftp|smtp|localhost):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/);

		// True if the given query matches the URL pattern.
		return pattern.test(query); 
	}

	/*
	When the enter key is pressed, parse the query and open a new tab with the website if the query is 
	a valid URL, otherwise open a new tab with a Google search for the query.
	*/
	function search(event: KeyboardEvent): void {
		// Enter key pressed.
		if(event.key === 'Enter') {
			// Search query.
			let query: string = search_input.value;

			// Common protocols at the beginning of URLs.
			// Currently only supports http and https.
			let protocols: string[] = ['http://', 'https://'];

			// Iterate through protocols.
			for(let protocol of protocols) {
				// Query begins with this protocol.
				if(query.startsWith(protocol)) {
					// Strip the protocol from the query.
					query = query.slice(protocol.length);

					// Protocol found, remove it.
					// Assuming query is well-formed and does not have multiple protocols.
					break;
				}
			}

			// Adds 'https://' to the beginning of the query if it is a valid URL. Otherwise it will 
			// search Google for the query.
			let url = validURL(query) ? `https://${query}` : `https://google.com/search?q=${query}`;

			// Open the url in a new tab.
			window.open(url, '_self');
		}
	}
</script>