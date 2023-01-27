<script>
  import Loader_1 from "../components/Loader-1.svelte";
  export let changePage;
  import { onMount } from "svelte";

  let loading = true;

  onMount(() => {
    setTimeout(() => {
      loading = false;
    }, 1000);
  });

</script>

<main>

  <h1>Character</h1>
  <button on:click={() => changePage('home')}>Back</button>
  <button on:click={() => changePage('data')}>FIGHT</button>

  {#if loading}
    <Loader_1 />
  {:else}
    <p>Character</p>
  {/if}

</main>

<style>

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    overflow: none;
  }

</style>