<script>
  import Category_Collection from "../components/Category-Collection.svelte";
  export let changePage;
  import Loader from "../components/Loader-Falling.svelte";
  import CharAnimatedBackground from "../components/Char-Animated-Background.svelte";
  import CharStaticBackground from "../components/Char-Static-Background.svelte";
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
<CharAnimatedBackground />
<Loader />
{:else}
  <button on:click={() => changePage('home')}>Home</button>
  <h2>{selectedCategory.name}</h2>
  <Category_Collection bind:currentlySelected={selectedCategory}/>
  <CharStaticBackground />

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