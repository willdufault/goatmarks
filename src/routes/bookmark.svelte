<!-- HTML. -->
<main>
	<div class="clickable card py-4 has-background-bookmark-card">
		<!-- Link to URL if active, otherwise do nothing. -->
		<a href={url}>
			<div class="card-image p-2 is-flex is-justify-content-center">
				<figure class="image is-48x48">
					<img class="is-rounded has-background-white p-1" src="{image_url}" alt="Bookmark Icon">
				</figure>
			</div>
			<div class="card-content is-flex is-justify-content-center py-0">
				<p>{name.length <= 8 ? name : `${name.slice(0, 6)}...`}</p>
			</div>
		</a>
		<div class="dropdown is-hoverable">
			<div class="dropdown-trigger">
			  <button class="button is-ghost" aria-haspopup="true" aria-controls="dropdown-menu2">
					<span class="icon is-small">
						<img class="kebab" src="./images/Kebab.svg" alt="Kebab">
					</span>
			  </button>
			</div>
			<div class="dropdown-menu" id="dropdown-menu2" role="menu">
			  <div class="dropdown-content has-background-bookmark-card">
				<div class="dropdown-item">
					<button class='invisible-button' on:click={async () => {group ? await delBMarkGroup() : await delBmarkUser()}}>
						<p>Delete</p>
					</button>
				</div>
			  </div>
			</div>
		</div>
	</div>
</main>

<!-- CSS. -->
<style>
	.kebab {
		filter: brightness(0) invert(1);
	}
	.card {
		border-radius: 30px;
	}

	.card-content {
		white-space:nowrap;
	}

	.dropdown {
		position: absolute;
		top: 0%;
		left: 0%;
		visibility: hidden;
	}

	.dropdown-menu {
		min-width: fit-content !important;
	}

	.card:hover .dropdown{
		/* transition: all 0.2s ease 1s; */
		visibility: visible;
	}

	.dropdown button {
		border-radius: 9999px;
		border-color: none;
	}
	
</style>

<!-- TypeScript. -->
<script lang='ts'>
	import { account_name, group_code, bookmarks } from '../store'

	export let url: string;
	export let name: string;
	export let group: boolean;
	let image_url: string = 'http://logo.clearbit.com/' + url;

	async function delBmarkUser() {
    const json = {
      username: $account_name,
      link: url,
    };

    const body = JSON.stringify(json);
    console.log("This is the body, ", body);

    const response = await fetch("/delBmarkUser", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });	
    let [user, user_bookmarks] = await response.json();

		// console.log('before:',$bookmarks)

		console.log(user, user_bookmarks);

		$bookmarks = user_bookmarks;

		// console.log('after:', $bookmarks)

    return response;
  }


	async function delBMarkGroup() {
    const json = {
      code: $group_code,
      link: url,
    };

    const body = JSON.stringify(json);
    console.log("This is the body, ", body);

    const response = await fetch("/delBmarkGroup", {
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