<!-- HTML. -->
<main>
	<div class='is-flex is-justify-content-space-between px-5 py-4'>
		<a class='is-flex is-align-items-center' href='javascript:window.location.reload()'>
			<figure class='image is-32x32 mr-2'>
				<img class='is-rounded box-shadow-surround' src='./images/goatmarks-logo.jpg' alt='GoatMarks Logo'>
			</figure>
			<h1 class='title is-4'>GoatMarks</h1>
		</a>
		<div style="{$is_logged_in === true ? '' : 'display: none;'}">
			<button class='invisible-button is-size-2 is-flex is-display-flex is-align-items-center' on:click={logOut}>
				<h3 class='subtitle is-6 mb-0 pr-3'>{$account_name}</h3>
				<div class='is-flex is-size-4'>
					<Icon icon="mdi:logout" />
				</div>
			</button>
		</div>
		<div style="{$is_logged_in === true ? 'display: none;' : ''}">
			<button class='invisible-button is-size-2 is-flex js-modal-trigger is-display-flex is-align-items-center' data-target="modal-js-example">
				<h3 class='subtitle is-6 mb-0 pr-3'>Log in</h3>
				<div class='is-flex is-size-4'>
					<Icon icon="fa:user" />
				</div>
			</button>
		</div>
	</div>
	
	<div id="modal-js-example" class="modal">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="box rounded has-background-bookmark-container is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
				<h1 class="title is-3 mt-4">Log In or Create an Account</h1>
				<div class="input-fields is-align-self-stretch">
					<div class="field">
						<div class="control has-icons-left">
							<input bind:this={username} class="input" type="text" placeholder="Username">
							<span class="icon is-small is-left">
								<Icon icon="fa:user" />
							</span>
						</div>
					</div>
					<div class="field">
						<div class="control has-icons-left">
							<input bind:this={password} class="input" type="text" placeholder="Password">							
							<span class="icon is-small is-left">
								<Icon icon="fa:lock" />
							</span>
						</div>
					</div>
				</div>
				
				
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
<style>
	.rounded {
		border-radius: 25px;
	}
</style>

<!-- TypeScript. -->
<script lang='ts'>
	import { account_name, is_logged_in, bookmarks, group_code, is_in_group } from '../store';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	function logOut(): void {
		$account_name = '';
		$is_logged_in = false;
		$bookmarks = [];
		$group_code = '';
		$is_in_group = false;
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

	let username: HTMLInputElement;
	let password: HTMLInputElement;
	$account_name = "";
	$is_logged_in = false;
	interface bookmark {
		url: string,
		name: string,
	}
	$bookmarks = [] as bookmark[];

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
			getUserByName();
			return true;
		} else {
			console.log(status)
			return false;
		}
	}

	async function getUserByName() {
		console.log($account_name)
		const json = {
			username: $account_name,
		};

		const body = JSON.stringify(json);
		console.log("This is the body, ", body);

		const response = await fetch("/getUserByName", {
			method: "POST",
			body: body,
			headers: {
				"Content-Type": "application/json",
			},
		});

		const status = await response.status;
		if(status == 200) {
			const user_response : {}[] = await response.json();
			let update: bookmark[] = [];
			let bookmarks_response : {}[] = user_response[0]['bookmarks' as keyof {}]
			for (let i = 0; i < bookmarks_response.length; i++) {
				let get_url : string = bookmarks_response[i]['url' as keyof {}]
				let get_name : string = bookmarks_response[i]['name' as keyof {}]
				update.push({
					url: get_url,
					name: get_name
				});
			}
			$bookmarks = update;
			return true;
		} else {
			return false;
		}
	}
</script>