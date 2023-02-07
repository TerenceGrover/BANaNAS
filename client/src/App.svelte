<script>
  import Character from "./pages/Character.svelte";
  import Data from "./pages/Data.svelte";
  import Home from "./pages/Home.svelte";
  import SinglePlayer from "./pages/Single-Player.svelte";
  let currentPage = "home";

  let leftData = {};
  let rightData = {};
  let mode = "";

  function changePage(newPage, left = null, right = null, gameMode) {
    currentPage = newPage;
    if (left) {
      leftData = left
    }
    if (right) {
      rightData = right;
    }
    mode = gameMode;
  }

</script>

<main>

  {#if currentPage === "home"}
    <Home {changePage} />
  {:else if currentPage === "character"}
    <Character {changePage} />
  {:else if currentPage === "single-player"}
    <SinglePlayer {changePage} />
  {:else if currentPage === "data"}
    <Data {changePage} {leftData} {rightData} {mode} />
  {:else}
    <p>Invalid page</p>
  {/if}


</main>

<style>
  main {
    max-width: 1920px;
  }
</style>