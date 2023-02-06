<script>
  import Character from "./pages/Character.svelte";
  import Data from "./pages/Data.svelte";
  import Home from "./pages/Home.svelte";
  import BarGraph from "./components/Data/Bar-Graph.svelte";
  import { onMount } from "svelte";
  let currentPage = "home";

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

  let loading = true
  let data = {}
  import { getGlobalData } from "./Utils/api-services.js";

  onMount(async () => {
    data = await getGlobalData('Agriculture','Agriculture')
    loading = false
  })


</script>

<main>

  {#if !loading}
  <div style="background:white;height:75vh;width:75vw;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">
    <BarGraph {data} />
  </div>
  {/if}



  <!-- {#if currentPage === "home"}
    <Home {changePage} />
  {:else if currentPage === "character"}
    <Character {changePage} />
  {:else if currentPage === "data"}
    <Data {changePage} {leftData} {rightData} />
  {:else}
    <p>Invalid page</p>
  {/if} -->


</main>

<style>
  main {
    max-width: 1920px;
  }
</style>