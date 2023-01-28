<script>
  export let changePage;

  import { onMount } from 'svelte';
  import Footer from '../components/Footer.svelte';
  import Scrollbar from '../components/Scrollbar.svelte';
  import Loader_1 from '../components/Loader-1.svelte';

  let data = [];
  let data2 = [];
  
  let loading = true;
  
  onMount(() => {
    // TEMPORARY
    setTimeout(() => {
      loading = false;
    }, 2000);
  })

</script>



<main>
  <header id="header-section">
    <h1 id="top-header">DATA</h1>
    <h2 id="top-sub-header">Graph Type</h2>
    <hr id="hr-top-divider" />
  </header>

  <section id='top-section'>
    <button id="left" class='scroll-buttons'>{'<'}</button>
    <div id='D3-container'>
      {#if loading}
        <Loader_1 />
      {:else}
        <div id='D3-graph' />
      {/if}

    </div> 
    <button id="right" class='scroll-buttons'>{'>'}</button>
    <div id="scroll-container">
      <Scrollbar />
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 1vh;
    padding-bottom: 1vh;
    width: 100vw;
    background-color: #052c46;
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

  .scroll-buttons{
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

  #left {
    left: 10px;
  }

  #right {
    right: 10px;
  }

  #scroll-container {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    height: 10%;
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
