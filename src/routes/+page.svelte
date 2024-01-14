<!-- TypeScript. -->
<script lang="ts">
  import Header from "./header.svelte";
  import NavigationBar from "./navigation-bar.svelte";
  import Bookmarks from "./bookmarks.svelte";
  import Clock from "./clock.svelte";
  import Grouped from "./grouped.svelte";
  import Db from "./db.svelte";
</script>

<!-- HTML. -->
<main>
  <Header></Header>
  <div id="page-content" class="container p-3">
    <div class="container m-0 pb-3">
      <NavigationBar></NavigationBar>
    </div>
    <div class="columns height-100 m-0 is-variable is-3">
      <div class="column height-100 is-flex is-flex-direction-column is-8">
        <Bookmarks></Bookmarks>
      </div>
      <div
        class="column height-100 is-4 is-flex is-flex-direction-column gap-1-5rem"
      >
        <Clock></Clock>
        <Grouped></Grouped>
      </div>
    </div>
  </div>
  <img
    class="background-img"
    id="TL"
    src="./images/Background TL.svg"
    alt="beans"
  />
  <img
    class="background-img"
    id="BL"
    src="./images/Background BL.svg"
    alt="beans"
  />
  <img
    class="background-img"
    id="TR"
    src="./images/Background TR.svg"
    alt="beans"
  />
  <img
    class="background-img"
    id="BR"
    src="./images/Background BR.svg"
    alt="beans"
  />
  <!-- <Db></Db> -->
</main>

<!-- CSS. -->
<style>
  .column {
    background-clip: content-box;
    border-radius: 50px;
  }

  .background-img {
    position: fixed;
    z-index: 0;
  }

  .gap-1-5rem {
    gap: 1.5rem;
  }

  img#TL {
    top: 22%;
  }
  img#BL {
    top: 75%;
  }
  img#TR {
    top: 25%;
    right: 0%;
  }
  img#BR {
    top: 70%;
    right: 0%;
  }

  #page-content {
    z-index: 1;
    height: 77vh;
  }
</style>
