<!-- HTML. -->
<main>
	<div class='is-flex is-justify-content-space-between px-5 py-4'>
		<a class='is-flex is-align-items-center' href='javascript:window.location.reload()'>
			<figure class='image is-32x32 mr-2'>
				<img class='is-rounded box-shadow-surround' src='./images/goatmarks-logo.jpg' alt='GoatMarks Logo'>
			</figure>
			<h1 class='title is-4'>GoatMarks</h1>
		</a>
		<button class='invisible-button is-size-2 is-flex js-modal-trigger is-display-flex is-align-items-center' data-target="modal-js-example">
			<h3 class='subtitle is-5 mb-0 pr-2'>{$account_name}</h3>
			<Icon icon="fa:user" />
		</button>
	</div>
	
	<div id="modal-js-example" class="modal">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="box has-background-bookmark-container is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
				<input bind:this={username} class="input my-1" type="text" placeholder="Username">
				<input bind:this={password} class="input my-1" type="text" placeholder="Password">
				<div class="columns is-multiline my-4">
					<div class="column is-half">
						<button class="button is-primary" on:click={() => login()}>Log In</button>
					</div>
					<div class="column is-half">
						<button class="button is-primary" on:click={() => register()}>Create Account</button>
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
	import { account_name, is_logged_in } from '../store';
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

	let username: HTMLInputElement;
	let password: HTMLInputElement;
	$account_name = "";
	$is_logged_in = false;

	async function register() {

		let user : String = username.value;
		let pass : String = password.value;
		
		if (user == "" || pass == "") return false;

		const json = {
			username: user,
			password: pass,
		};
		const body = JSON.stringify(json);

		const response = await fetch("/register", {
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
	async function login() {
		let user : String = username.value;
		let pass : String = password.value;
		
		if (user == "" || pass == "") return false;

		const json = {
			username: user,
			password: pass,
		};
		const body = JSON.stringify(json);
		console.log("This is the body, ", body);

		const response = await fetch("/login", {
			method: "POST",
			body: body,
			headers: {
				"Content-Type": "application/json",
			},
		});

		let status = await response.status;
		if (status == 200) {
			const text = await response.text();
			$account_name = text;
			$is_logged_in = true;
			return true;
		} else {
			console.log(status)
			return false;
		}
	}
</script>