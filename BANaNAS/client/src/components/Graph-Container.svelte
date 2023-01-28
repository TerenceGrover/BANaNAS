<script>

  import { onMount } from 'svelte';
  import Scrollbar from '../components/Scrollbar.svelte';
  import Loader_1 from '../components/Loader-1.svelte';
  import BarGraph from '../components/Data/Bar-Graph.svelte';

  // TEMPORARY POSITION TO BE CHANGED BASED ON DATA POSSIBILITIES
  let position = 2;
  let maxPosition = 4;
  let loading = true;

  onMount(() => {
    // TEMPORARY
    setTimeout(() => {
      loading = false;
    }, 2000);
  });

</script>

<main>

  <section id="top-section">
    <button
      on:click={() => {
        if (position > 0) {
          position--;
        } else {
          position = maxPosition;
        }
      }}
      id="left"
      class="scroll-buttons">{'<'}</button
    >
    <div id="D3-container">
      {#if loading}
        <Loader_1 />
      {:else}
      <div id="current-Graph">
        <BarGraph />
      </div>
      {/if}
    </div>
    <button
      on:click={() => {
        if (position < maxPosition) {
          position++;
        } else {
          position = 0;
        }
      }}
      id="right"
      class="scroll-buttons">{'>'}</button
    >
    <div id="scroll-container">
      <Scrollbar bind:position />
    </div>
  </section>


</main>

<style>

  #top-section {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 75vh;
    width: 100vw;
    background-color: #052c46;
  }

  .scroll-buttons {
    position: absolute;
    height: 10%;
    width: 5%;
    font-size: 5vh;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #fed703;
    background-color: transparent;
    border: none;
    border-radius: 8px;
  }

  .scroll-buttons:hover {
    cursor: pointer;
  }

  #left {
    left: 10px;
  }

  #right {
    right: 10px;
  }

  #scroll-container {
    position: absolute;
    bottom: 1vh;
    left: 50%;
    transform: translateX(-50%);
    height: 5%;
    width: 20%;
  }

</style>