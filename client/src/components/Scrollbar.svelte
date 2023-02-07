<script>
  import { onMount } from "svelte";

  export let graphNumber = 5;
  export let position = 2;

  onMount(() => {
    let active = document.getElementById(position);
    if (active) {
      active.classList.add('active');
    }
  });

</script>

<main>
  <div id="scrollbar" style="width: {graphNumber * 2}vw;">
    <div id="thumb-container">
      {#each Array(graphNumber) as _, i}
        <div
        on:click={() => {
          position = i;
        }}
        on:keydown={e => {
          if (e.key === 'Enter') {
            position = i;
          }
        }}
          key={i}
          id={i}
          class={"scrollbar-thumb" + (i === position ? " active" : "")}
          style="width: {100 / (graphNumber * 2)}%;"
        />
      {/each}
    </div>
  </div>

  <!-- DIV HERE TO TEST SVELTE TREE SHAKING -->
  <div class="active" />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #scrollbar {
    position: relative;
    display: flex;
    height: 2.5vh;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50px;
  }

  #thumb-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 7.25%;
    height: 100%;
    width: 100%;
  }

  .scrollbar-thumb {
    aspect-ratio: 1 / 1;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50px;
  }

  .active {
    background-color: rgba(255, 255, 255, 0.7);
  }
</style>
