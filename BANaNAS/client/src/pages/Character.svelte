<script>
  import Category_Collection from "../components/Category-Collection.svelte";
  export let changePage;
  import Loader from "../components/Loader-Falling.svelte";
  import CharBackground from "../components/Char-Background.svelte";
  import { onMount } from "svelte";

  let loading = true;

  onMount(() => {
    setTimeout(() => {
      loading = false;},
      3500)
  })

  let selectedCategory = {name: ''};

</script>

<main>

{#if loading}
<CharBackground />
<Loader />
{/if}


<button on:click={() => changePage('home')}>Home</button>
  <h2>{selectedCategory.name}</h2>

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