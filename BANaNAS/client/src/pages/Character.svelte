<script>
  import Loader_1 from "../components/Loader-1.svelte";
  export let changePage;

</script>

<main>

  <h1>Character</h1>
  <button on:click={() => changePage('home')}>Back</button>
  <button on:click={() => changePage('data')}>FIGHT</button>

  <Loader_1 />

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