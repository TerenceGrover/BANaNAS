<script>

  import Character from "./pages/Character.svelte";
  import Data from "./pages/Data.svelte";
  import Home from "./pages/Home.svelte";
  let currentPage = "character";

  function changePage(newPage) {
    currentPage = newPage;
  }

</script>

<main>

  {#if currentPage === "home"}
    <Home changePage={changePage} />
  {:else if currentPage === "character"}
    <Character changePage={changePage} />
  {:else if currentPage === "data"}
    <Data changePage={changePage} />
  {:else}
    <p>Invalid page</p>
  {/if}


</main>