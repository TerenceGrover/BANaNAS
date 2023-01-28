<script>
  export let changePage;

  import { onMount } from 'svelte';
  import Footer from '../components/Footer.svelte';
  import Scrollbar from '../components/Scrollbar.svelte';
  import Loader_1 from '../components/Loader-1.svelte';
  import BarGraph from '../components/Data/Bar-Graph.svelte';

  // TEMPORARY POSITION TO BE CHANGED BASED ON DATA POSSIBILITIES
  let position = 2;
  let maxPosition = 4;

  let data = [];

  let loading = true;

  onMount(() => {
    // TEMPORARY
    setTimeout(() => {
      loading = false;
    }, 2000);
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
  </header>
  <hr id="hr-top-divider" />

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
        <BarGraph />
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

  #header-section {
    position: relative;
    display: flex;
    padding-left: 2vw;
    height: 8.5vh;
    width: 100vw;
    background-color: #052c46;
  }

  #button-container{
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
