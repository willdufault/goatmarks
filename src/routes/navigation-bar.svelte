<!-- HTML. -->
<main>
    <div class='has-background-bookmark-container p-4 mx-3 container is-flex is-justify-content-space-between is-align-items-center rounded'>
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
			{#if $is_in_group}
				<button class='invisible-button is-size-4 pr-2 is-flex is-justify-content-center is-align-items-center' on:click={leaveRoom}>
					<h3 class='subtitle is-6 mb-0 pr-3'>Group: {$group_code}</h3>
					<div class='is-flex is-size-4'>
						<Icon icon="mdi:logout" />
					</div>
				</button>
			{:else}
				<button class='invisible-button is-size-4 pr-2 is-flex is-justify-content-center is-align-items-center js-modal-trigger' data-target="modal-js-example">
					<h3 class='subtitle is-6 mb-0 pr-3'>Join group</h3>
					<div class='is-flex is-size-4'>
						<Icon icon="fa:group" />
					</div>
				</button>
			{/if}
			<!-- modal or drop down menu for this? -->
		</div>
		
		<div id="modal-js-example" class="modal">
			<div class="modal-background"></div>
			<div class="modal-content">
				<div class="box has-background-bookmark-container">
					<div class="columns is-multiline">
						<div class="column is-half is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
							<h1 class="title">Join a group</h1>
							<input class="input" type="text" placeholder="Group code">
						</div>
						<div class="column is-half is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
							<h1 class="title">Create a group</h1>
							<button class="button">Generate group</button>
						</div>
					</div>
					
				</div>
			</div>
			<button class="modal-close is-large" aria-label="close"></button>
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
	import { onMount } from 'svelte';
	import { is_in_group, group_code } from '../store';

	let f = () => {}

	// Search bar.
	let search_input: HTMLInputElement;

	function leaveRoom(): void {
		$group_code = '';
		$is_in_group = false;
	}

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

	onMount (() => {
		function openModal($el : any) {
			$el.classList.add('is-active');
		}

		function closeModal($el : any) {
			$el.classList.remove('is-active');
		}

		function closeAllModals() {
			(document.querySelectorAll('.modal') || []).forEach(($modal) => {
				closeModal($modal);
			});
		}

		// Add a click event on buttons to open a specific modal
		(document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
			const modal_cast = $trigger as HTMLElement;
			const modal : any = modal_cast.dataset.target;
			const $target = document.getElementById(modal);

			$trigger.addEventListener('click', () => {
				openModal($target);
			});
		});

		// Add a click event on various child elements to close the parent modal
		(document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
			const $target = $close.closest('.modal');

			$close.addEventListener('click', () => {
				closeModal($target);
			});
		});

		// Add a keyboard event to close all modals
		document.addEventListener('keydown', (event) => {
			if (event.code === 'Escape') {
				closeAllModals();
			}
		});
	});
</script>