<!-- TypeScript. -->
<script lang="ts">
  // import axios from "axios";

  async function doSomething() {
    const response = await fetch("/healthcheck", {
      method: "POST",
      body: "what is happening ere",
    });
    return response;
  }
</script>

<!-- HTML. -->
<main>
  <head> this is the head </head>
  <body>
    <button on:click={doSomething}>This is a button</button>
  </body>
</main>

<!-- CSS. -->
<style></style>
