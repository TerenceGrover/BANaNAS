<script>
  import Loader_1 from "../components/Loader-1.svelte";
  import Category_Collection from "../components/Category-Collection.svelte";
  export let changePage;

  let selectedCategory = {name: ''};

</script>

<main>

  <h1>Character</h1>
  <h2>{selectedCategory.name}</h2>

  <button on:click={() => changePage('home')}>Back</button>
  <button on:click={() => changePage('data')}>FIGHT</button>

  <Loader_1 />
  <Category_Collection bind:currentlySelected={selectedCategory}/>

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