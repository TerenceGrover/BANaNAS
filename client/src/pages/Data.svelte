<script>
  export let changePage;
  export let leftData;
  export let rightData;

  import GraphContainer from '../components/Graph-Container.svelte';
  import Footer from '../components/Footer.svelte';
  import { onMount } from 'svelte';
  import { getMetrics, getDescription } from '../Utils/api-services';
  import Loader_1 from '../components/Loader-1.svelte';
  import DataAnimatedBg from '../components/Data-Animated-BG.svelte';
  import Analytics from '../components/Analytics.svelte';  
  import { tapoLogin } from '../Utils/api-services';


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
  }, 3000);

  onMount(() => {
    getAllData().then(
      getDescription(leftData.cat, leftData.what).then((data) => {
        leftData.desc = data.description;
      }),
      getDescription(rightData.cat, rightData.what).then((data) => {
        rightData.desc = data.description;
      })
    )
  });
</script>

<main>
  <header id="header-section">
    <div id="button-container">
    <button id="home-button" on:click={() => changePage('home')}>
      <img id="home-icon" src="../../assets/icons/home.svg" alt="home-icon"/>
      Home
    </button>
    <button id="back-button" on:click={() => changePage('character')}>
      <img id="back-icon" src="../../assets/icons/back.svg" alt="home-icon"/>
      Back
    </button>
      <div id="header-container">
        <h1 id="top-header">DATA</h1>
    </div>
  </header>
  <hr id="hr-top-divider" />

  {#if loading}
    <div class="animated">
      <DataAnimatedBg />
      <Loader_1 />
    </div>
  {:else}
    <GraphContainer {leftData} {rightData} {leftGraphData} {rightGraphData} />
  {/if}

  <div id="divider">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span id="divider-text" on:click={() => {
      document.getElementById('footer').scrollIntoView({behavior: "smooth"});
    }}>Analytics</span>
  </div>

  <hr id="hr-sub-divider" />

  <section id="sub-section">
  {#if !loading}
    <Analytics {leftData} {rightData} {leftGraphData} {rightGraphData} />
  {/if}

  </section>
  <section id="footer">
    <Footer />
  </section>
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
    height: 10vh;
    width: 100vw;
    background-color: #052c46;
  }

  #button-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    width: 6vw;
  }

  #button-container > button {
    font-size: 2.5vh;
    font-family: 'Farro', sans-serif;
    color: #fed703;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    filter: drop-shadow(2px 2px 0px black);
  }

  #home-icon {
    height: 3vh;
    margin-bottom: 1vh;
  }

  #home-button {
    font-size: 3vh;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    -webkit-text-stroke: 1px black;
  }

  #back-icon {
    height: 3vh;
    margin-bottom: 1vh;
  }

  #back-button {
    font-size: 3vh;
    color: #fed703;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    -webkit-text-stroke: 1px black;
  }

  #header-container {
    position: absolute;
    height: 10vh;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #top-header {
    font-size: 7vh;
    font-family: 'Farro', sans-serif;
    color: #fed703;
    z-index: 1;
    -webkit-text-stroke: 2px black;
    filter: drop-shadow(3px 3px 0px #000000AA); 
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
    text-shadow: 2px 2px #ffffff;
    animation: pulse 2s infinite;
    cursor: pointer;
  }

    #divider-text:hover {
    animation-play-state: paused;
    animation: tilt-shaking 0.5s infinite;
  }

  #sub-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 2vh;
    min-height: 75vh;
    background-color: #fed703;
    width: 100vw;
    z-index: 2;
  }

  #footer{
    height: 10vh;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
    }

    50% {
      transform: scale(1);
    }

    100% {
      transform: scale(0.95);
    }
  }

@keyframes tilt-shaking {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0eg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}


</style>
