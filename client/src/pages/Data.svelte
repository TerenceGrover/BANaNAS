<script>
  const isMobile = window.innerWidth < 768;

  export let changePage;
  export let leftData;
  export let rightData;
  export let mode;

  import GraphContainer from '../components/Graph-Container.svelte';
  import Footer from '../components/Footer.svelte';
  import { onMount } from 'svelte';
  import { getMetrics, getDescription, getGlobalData, getGlobalAggregatedData } from '../Utils/api-services';
  import Loader_1 from '../components/Loader-1.svelte';
  import DataAnimatedBg from '../components/Data-Animated-BG.svelte';
  import Analytics from '../components/Analytics.svelte';  
  import BarGraph from '../components/Data/Bar-Graph.svelte';
  import AnalyticsWorld from '../components/Analytics-World.svelte';
  import Capture from '../components/Capture.svelte';

  let leftGraphData = [];
  let rightGraphData = [];
  let worldData = [];
  let worldAvg = [];

  let loading = true;
  
    async function getAllData() {
      getMetrics(leftData.cat, leftData.what, leftData.where).then((data) => {
        leftGraphData = data;
      });
      getMetrics(rightData.cat, rightData.what, rightData.where).then((data) => {
        rightGraphData = data;
      });
    }; 
    async function getGlobal() {
      getGlobalData(leftData.cat, leftData.what.value).then((data) => {
        worldData = data;
      });
    };
    

  onMount(() => {
    if (mode === 'multi') {
    getAllData().then(
      getDescription(leftData.cat, leftData.what).then((data) => {
        leftData.desc = data.description;
      }),
      getDescription(rightData.cat, rightData.what).then((data) => {
        rightData.desc = data.description;
      })
    );
    setTimeout(() => {
    loading = false;
  }, 4000);
  } else if (mode === 'single') {
    getGlobal().then(
      getGlobalAggregatedData(leftData.cat,leftData.what.value).then((data) => {
        worldAvg = data;
      }),
      getDescription(leftData.cat, leftData.what.value).then((data) => {
        leftData.desc = data.description;
      }).then(
        setTimeout(() => {
        loading = false;
      }, 4000)
      )
    )
  }
})
</script>

<main>
  <header id="header-section">
    <div id="button-container">
    <button id="home-button" on:click={() => changePage('home')}>
      {#if !isMobile}
        <img id="home-icon" src="../../assets/icons/home.svg" alt="home-icon"/>
      {:else}
        <img id="home-icon-mobile" src="../../assets/icons/home.svg" alt="home-icon"/>
      {/if}
      Home
    </button>
    <button id="back-button" on:click={() => changePage(mode === 'multi' ? 'character' : 'single-player')}>
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
  {#if !isMobile}
    {#if mode === 'single'}
    <div id="race-container">  
      <BarGraph data={worldData} metaData={leftData} />
    </div>
    {:else if mode === 'multi'}
      <GraphContainer {leftData} {rightData} {leftGraphData} {rightGraphData} />
    {/if}
    {:else if isMobile}
      <div id="mobile-top-section">
        <h1 id="mobile-header">Download your correlations here!</h1>
        <div id="download-button">
          <Capture 
          {leftGraphData}
          {rightGraphData}
          {leftData}
          {rightData}/>
        </div>
      </div>
      {/if}
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
    {#if mode === 'multi'}
    <Analytics {leftData} {rightData} {leftGraphData} {rightGraphData} />
    {:else}
    <AnalyticsWorld metaData = {leftData} {worldAvg} />
    {/if}
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

  #home-icon-mobile {
    height: 2vh;
    margin: 0 1vw;
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

  #race-container{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 75vh;
    width: 100vw;
    background-color: #052c46;
  }

  #top-header {
    font-size: 7vh;
    font-family: 'Farro', sans-serif;
    color: #fed703;
    z-index: 1;
    -webkit-text-stroke: 2px black;
    filter: drop-shadow(3px 3px 0px #000000AA); 
  }

  #mobile-top-section {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 75vh;
    width: 100vw;
    padding: 10vh 0;
    background-color: #052c46;
  }

  #mobile-header {
    font-size: 5vh;
    font-family: 'Farro', sans-serif;
    color: #fed703;
    z-index: 1;
    -webkit-text-stroke: 2px black;
    filter: drop-shadow(3px 3px 0px #000000AA); 
    text-align: center;
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
    padding-left: 5vw;
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
