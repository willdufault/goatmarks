<!-- TypeScript. -->
<script lang="ts">
  import { bookmarks, account_name } from "../store";
  import Bookmark from "./bookmark.svelte";
  import { onMount } from "svelte";
  import { is_logged_in } from "../store";

  interface bookmark {
    url: string;
    name: string;
  }

  $bookmarks = [] as bookmark[];
  let bm_url: HTMLInputElement;
  let bm_nm: HTMLInputElement;

  export function validURL(query: string): boolean {
    // Valid URL regex pattern.
    let pattern: RegExp = new RegExp(
      /^((https?|ftp|smtp|localhost):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
    );

    // True if the given query matches the URL pattern.
    return pattern.test(query);
  }

  async function addBMarkUser() {
    if ($account_name == "" || bm_url.value == "" || bm_nm.value == "")
      return false;

    let url = bm_url.value;
    if (
      bm_url.value.startsWith("https://") ||
      bm_url.value.startsWith("http://")
    ) {
      console.log("in if");
      url = bm_url.value;
    } else {
      console.log("in else");
      url = `https://${bm_url.value}`;
    }

    console.log(url);
    const json = {
      username: $account_name,
      link: url,
      linkName: bm_nm.value,
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
      $bookmarks = update;
      return true;
    } else {
      return false;
    }
  }

  onMount(() => {
    function openModal($el: any) {
      $el.classList.add("is-active");
    }

    function closeModal($el: any) {
      $el.classList.remove("is-active");
    }

    function closeAllModals() {
      (document.querySelectorAll(".modal") || []).forEach(($modal) => {
        closeModal($modal);
      });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll(".js-modal-trigger") || []).forEach(
      ($trigger) => {
        const modal_cast = $trigger as HTMLElement;
        const modal: any = modal_cast.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener("click", () => {
          openModal($target);
        });
      }
    );

    // Add a click event on various child elements to close the parent modal
    (
      document.querySelectorAll(
        ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
      ) || []
    ).forEach(($close) => {
      const $target = $close.closest(".modal");

      $close.addEventListener("click", () => {
        closeModal($target);
      });
    });

    // Add a keyboard event to close all modals
    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        closeAllModals();
      }
    });
  });
</script>

<!-- HTML. -->
<main class="height-100 rounded-25 no-overflow">
  <div
    class="height-100 container has-background-bookmark-container scrollable"
  >
    <div style={$is_logged_in === true ? "" : "display: none;"}>
      <div class="columns is-multiline m-0">
        {#each $bookmarks as bm}
          <div class="column is-2">
            <Bookmark name={bm.name} url={bm.url} group={false}></Bookmark>
          </div>
        {/each}
        <div class="column is-2">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div class="card py-4 js-modal-trigger" data-target="add_bm_modal">
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
    </div>
    <div class='container height-100 mx-4 has-text-centered is-flex is-justify-content-center is-align-items-center' style={$is_logged_in ? 'display: none !important' : ''}>
			<h1 class='title is-4'>Please log in to view bookmarks.</h1>
		</div>
  </div>
  <div id="add_bm_modal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div
        class="box has-background-bookmark-container is-flex is-justify-content-center is-flex-direction-column is-align-items-center"
      >
        <input
          bind:this={bm_nm}
          class="input my-1"
          type="text"
          placeholder="Name"
        />
        <input
          bind:this={bm_url}
          class="input my-1"
          type="text"
          placeholder="URL"
        />

        <button class="button is-primary" on:click={() => addBMarkUser()}
          >Add Bookmark</button
        >
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
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
