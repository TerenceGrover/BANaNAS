<script>
  export let changePage;
  export let leftData;
  export let rightData;

  import GraphContainer from '../components/Graph-Container.svelte';
  import Footer from '../components/Footer.svelte';
  import { onMount } from 'svelte';
  import { getMetrics } from '../utils/api-services';
  import Loader_1 from '../components/Loader-1.svelte';
  import DataAnimatedBg from '../components/Data-Animated-BG.svelte';

  let leftGraphData = [];
  let rightGraphData = [];

  let loading = true;

  async function getAllData() {
    getMetrics(leftData.cat, leftData.what, leftData.where).then((data) => {
      leftGraphData = data;
    });
    getMetrics(rightData.cat, rightData.what, rightData.where).then((data) => {
      rightGraphData = data;
    });
  }

  setTimeout(() => {
    loading = false;
  }, 2500);

  onMount(() => {
    getAllData();
  });
</script>

<main>
  <header id="header-section">
    <div id="button-container">
      <button
        on:click={() => {
          changePage('home');
        }}
        id="home-button">&#8636; Home</button
      >
      <button
        on:click={() => {
          changePage('character');
        }}
        id="character-button">&#8636; Back</button
      >
      <div id="header-container">
        <h1 id="top-header">DATA</h1>
        <h2 id="top-sub-header">Graph Type</h2>
      </div>
    </div>
  </header>
  <hr id="hr-top-divider" />

  {#if loading}
    <div class="animated">
      <DataAnimatedBg />
      <Loader_1 />
    </div>
  {:else}
    <GraphContainer {leftGraphData} {rightGraphData} />
  {/if}

  <div id="divider">
    <span id="divider-text">Analytics</span>
  </div>

  <hr id="hr-sub-divider" />

  <section id="sub-section" />

  <Footer />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100vw;
  }

  .animated {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100vh;
    width: 100vw;
    background-color: #052c46;
    z-index: 3;
  }

  #header-section {
    position: relative;
    display: flex;
    padding-left: 2vw;
    height: 8.5vh;
    width: 100vw;
    background-color: #052c46;
  }

  #button-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  #button-container > button {
    font-size: 2.5vh;
    font-family: 'Farro', sans-serif;
    color: rgba(255, 255, 255, 0.7);
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  #header-container {
    position: absolute;
    top: 1vh;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  #top-header {
    font-size: 4vh;
    font-family: 'Farro', sans-serif;
    color: #fed703;
    z-index: 1;
  }

  #top-sub-header {
    font-size: 2vh;
    font-family: 'Farro', sans-serif;
    color: #fff;
    margin: 7px 0px;
  }

  #hr-top-divider {
    height: 2px;
    width: 100vw;
    background-color: #fed703;
    border: none;
  }

  #hr-sub-divider {
    height: 3px;
    width: 100vw;
    background-color: #052c46;
    border: none;
  }

  #divider {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15vh;
    width: 100vw;
    background-color: #fed703;
    z-index: 2;
  }

  #divider-text {
    font-size: 38px;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #052c46;
  }

  #sub-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 5vh;
    min-height: 80vh;
    background-color: #fed703;
    width: 100vw;
    z-index: 2;
  }
</style>
