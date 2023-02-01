<script>
  import { onMount } from 'svelte';
  import Carousel from 'svelte-carousel';
  import categoryList from '../Utils/categoryList';

  export let currentlySelected

  const svg = []

  let loading = true;

  onMount(() => {
    categoryList.forEach((item) => {
      svg.push(`../../assets/jobs/${item.name.toLowerCase()}.svg`)
    })

    setTimeout(() => {
      loading = false;
    }, 500);

  });

</script>

<main>

  <div id="carousel-container">
    {#if !loading}

  <Carousel
  on:pageChange={
    event => currentlySelected = categoryList[event.detail].name
  }
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#each svg as src}
      <div class="carousel-item">
        <object
        width={100}
        height={100}
        title="monkey-svg"
        data={src}
        alt="Monkey"
        />
      </div>
      {/each}

  </Carousel>
  {/if}

</div>

</main>
    <!-- svelte-ignore a11y-click-events-have-key-events -->

<style>

  #carousel-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }

  .carousel-item {
    height: 110px !important;
    width: 125px !important;
    z-index: 1000000 !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  object {
    height: 110px !important;
    width: 110px !important;
    z-index: 1000000 !important;
  }

</style>
