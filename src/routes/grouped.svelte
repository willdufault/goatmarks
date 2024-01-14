<!-- HTML. -->
<main class='height-100  rounded-25 no-overflow'>
	<div class="height-100 has-background-bookmark-container columns is-multiline m-0 scrollable">
		{#each $group_bookmarks as gr}
			<div class="column is-4">
				<Bookmark name={gr.name} url={gr.url}></Bookmark>
			</div>
		{/each}
		<div class="column is-2">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="card py-4 js-modal-trigger" data-target="add_gr_modal">
			  <div class="card-image p-2 is-flex is-justify-content-center">
				<figure class="image is-48x48 m-3">
				  <img
					class="plus is-rounded"
					src="./images/Plus.svg"
					alt="Bookmark Icon"
				  />
				</figure>
			  </div>
			</div>
		</div>
	</div>
	<div id="add_gr_modal" class="modal">
		<div class="modal-background">
			<div class="modal-content">
		  		<div class="box has-background-bookmark-container is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
					<input bind:this={gr_nm} class="input my-1" type="text" placeholder="Name" />
					<input bind:this={gr_url} class="input my-1" type="text" placeholder="URL" />
					<button class="button is-primary" on:click={() => addBmarkGroup()}>Add Bookmark</button>
		  		</div>
			</div>
			<button class="modal-close is-large" aria-label="close"></button>
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
		outline-color: #88929a;
	}
	.plus {
		filter: invert(66%) sepia(10%) saturate(338%) hue-rotate(164deg)
		brightness(86%) contrast(85%);
	}

</style>

<!-- TypeScript. -->
<script lang='ts'>
	import Bookmark from './bookmark.svelte';
	import { group_bookmarks, group_code } from '../store';
	import { onMount } from 'svelte';

	interface bookmark {
		url: string;
		name: string;
	}

	$group_bookmarks = [] as bookmark[];
	let gr_url: HTMLInputElement;
	let gr_nm: HTMLInputElement;

	async function addBmarkGroup() {
		if ($group_code == "" || gr_url.value == "" || gr_nm.value == "") return false;
		
		const json = {
			code: $group_code,
			link:  gr_url.value,
			linkName: gr_nm.value,
		};
		const body = JSON.stringify(json);
		console.log("This is the body, ", body);

		const response = await fetch("/addBmarkGroup", {
			method: "POST",
			body: body,
			headers: {
				"Content-Type": "application/json",
			},
		});

		const status = response.status;
		if (status == 200) {
			const bookmarks_response: {}[] = await response.json();
			let update: bookmark[] = [];
			for (let i = 0; i < bookmarks_response.length; i++) {
				let get_url: string = bookmarks_response[i]["url" as keyof {}];
				let get_name: string = bookmarks_response[i]["name" as keyof {}];
				update.push({
					url: get_url,
					name: get_name,
				});
			}
			$group_bookmarks = update;
			return true;
		} else {
			return false;
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