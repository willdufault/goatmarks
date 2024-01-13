<!-- TypeScript. -->
<script lang="ts">
  // import axios from "axios";

  async function register() {
    const json = {
      username: "cfyock",
      password: "password",
    };
    const body = JSON.stringify(json);
    console.log("This is the body, ", body);

    const response = await fetch("/a", {
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

<!-- HTML. -->
<main>
  <head> this is the head </head>
  <body>
    <button on:click={register}>This is a button</button>
  </body>
</main>

<!-- CSS. -->
<style></style>
