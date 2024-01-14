<!-- HTML. -->
<main>
	<div class='is-flex is-justify-content-space-between px-5 py-4'>
		<a class='is-flex is-align-items-center' href='javascript:window.location.reload()'>
			<figure class='image is-32x32 mr-2'>
				<img class='is-rounded box-shadow-surround' src='./images/goatmarks-logo.jpg' alt='GoatMarks Logo'>
			</figure>
			<h1 class='title is-4'>GoatMarks</h1>
		</a>
		<button class='invisible-button is-size-2 is-flex js-modal-trigger' data-target="modal-js-example">
			<Icon icon="mdi:person" />
		</button>
	</div>
	
	<div id="modal-js-example" class="modal">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="box has-background-bookmark-container">
				<div class="columns is-multiline">
					<div class="column is-half is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
						<h1 class="title">Log In</h1>
						<input class="input" type="text" placeholder="Username">
						<input class="input" type="text" placeholder="Password">
					</div>
					<div class="column is-half is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
						<h1 class="title">Create Account</h1>
						<input class="input" type="text" placeholder="Username">
						<input class="input" type="text" placeholder="Password">
					</div>
				</div>	
			</div>
		</div>
		<button class="modal-close is-large" aria-label="close"></button>
	</div>
</main>

<!-- CSS. -->
<style></style>

<!-- TypeScript. -->
<script lang='ts'>
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

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
				console.log("nuts")
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