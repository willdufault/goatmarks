<!-- HTML. -->
<main class='height-100 rounded-25 no-overflow'>
	<div class='height-100 container has-background-bookmark-container scrollable'>
		
		<div class="columns height-100 is-multiline m-0">
			{#each $bookmarks as bm}
				<div class="column is-2">
					<Bookmark name={bm.url} url={bm.url}></Bookmark>
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
	import { bookmarks, account_name } from '../store';
	import Bookmark from './bookmark.svelte';
	import { onMount } from "svelte"
	interface bookmark {
		url: string,
		name: string,
	}
	
	$bookmarks = [] as bookmark[];

	async function addBMarkUser () {
		if ($account_name == "") return false;
		const json = {
			username: $account_name,
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
			const bookmarks_response : {}[] = await response.json();
			let update: bookmark[] = [];
			for (let i = 0; i < bookmarks_response.length; i++) {
				let get_url : string = bookmarks_response[i]['url' as keyof {}]
				let get_name : string = bookmarks_response[i]['url' as keyof {}]
				update.push({
					url: get_url,
					name: get_name
				});
			}
			$bookmarks = update;
			return false;
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