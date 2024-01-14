<!-- TypeScript. -->
<script lang="ts">
  // import axios from "axios";

  async function register() {
    const json = {
      username: "wduf",
      password: "password",
    };
    const body = JSON.stringify(json);
    console.log("This is the body, ", body);

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

  async function createGroup() {
    const json = {
      name: "Beecology",
    };
    const body = JSON.stringify(json);
    console.log("This is the body, ", body);

    const response = await fetch("/createGroup", {
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

  async function addBmarkUser() {
    const json = {
      username: "cfyock",
      link: "google.com",
      linkName: "google",
    };
    const body = JSON.stringify(json);
    console.log("This is the body, ", body);

    const response = await fetch("/addBmarkUser", {
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

  async function addBmarkGroup() {
    const json = {
      code: "32219",
      link: "google.com",
      linkName: "google",
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

    const text = await response.text();

    console.log("text:", text);

    return response;
  }

  async function addGroupToUser() {
    const json = {
      username: "cfyock",
      code: "37702",
    };

    const body = JSON.stringify(json);
    console.log("This is the body, ", body);

    const response = await fetch("/addGroupToUser", {
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

  async function getAllGroups() {
    const response = await fetch("/getAllGroups", {
      method: "POST",
      body: "",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();

    console.log("text:", text);

    return response;
  }

  async function getAllUsers() {
    const response = await fetch("/getAllUsers", {
      method: "POST",
      body: "",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();

    console.log("text:", text);

    return response;
  }

  async function getGroupByCode() {
    const json = {
      code: "37702",
    };

    const body = JSON.stringify(json);
    console.log("This is the body, ", body);

    const response = await fetch("/getGroupByCode", {
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

  async function getUserByName() {
    const json = {
      code: "cfyock",
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

    const text = await response.text();

    console.log("text:", text);

    return response;
  }

  async function delBmarkUser() {
    const json = {
      username: "cfyock",
      link: "google.com",
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

    const text = await response.text();

    console.log("text:", text);

    return response;
  }

  async function delBmarkGroup() {
    const json = {
      code: "32219",
      link: "google.com",
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

  // generate code and check if it already exists
</script>

<!-- HTML. -->
<main>
  <head> this is the head </head>
  <body>
    <button on:click={register}>Register User Test Button</button>
    <button on:click={createGroup}>Create Group Test Button</button>
    <button on:click={addBmarkUser}>Add bookmark to user Test Button</button>
    <button on:click={addBmarkGroup}>Add bookmark to group Test Button</button>
    <button on:click={addGroupToUser}>Add group to user Test Button</button>
    <button on:click={getAllGroups}>Get all groups info button</button>
    <button on:click={getAllUsers}>Get all users info button</button>
    <button on:click={getGroupByCode}>Get group by code button</button>
    <button on:click={getUserByName}>Get user by username button</button>
    <button on:click={delBmarkUser}>Delete bookmark from user button</button>
    <button on:click={delBmarkGroup}>Delete bookmark from group button</button>
  </body>
</main>

<!-- CSS. -->
<style></style>
