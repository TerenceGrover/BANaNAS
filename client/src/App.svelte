<script>
  import Character from "./pages/Character.svelte";
  import Data from "./pages/Data.svelte";
  import Home from "./pages/Home.svelte";
  let currentPage = "character";

  let leftData = {};

  let rightData = {};

  function changePage(newPage, left = null, right = null) {
    currentPage = newPage;
    if (left) {
      leftData = left
    }
    if (right) {
      rightData = right;
    }
  }

</script>

<main>

  {#if currentPage === "home"}
    <Home {changePage} />
  {:else if currentPage === "character"}
    <Character {changePage} />
  {:else if currentPage === "data"}
    <Data {changePage} {leftData} {rightData} />
  {:else}
    <p>Invalid page</p>
  {/if}


</main>

<style>
  main {
    max-width: 1920px;
  }
</style>