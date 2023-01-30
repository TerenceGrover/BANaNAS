<script>
  export let changePage;

  import GraphContainer from '../components/Graph-Container.svelte';
  import Footer from '../components/Footer.svelte';

</script>

<main>
  <header id="header-section">
    <div id="button-container">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span class="button" on:click={() => changePage('home')}>
        <img id="home-icon" src="../../assets/icons/home.svg" alt="home-icon"/>
        Home
      </span>
      <!-- svelte-ignore a11y-click-events-have-key-events -->

      <span class="button" on:click={() => changePage('character')}>
        <img id="back-icon" src="../../assets/icons/back.svg" alt="back-icon"/>
        Back
      </span>
    </div>
    <div id="header-container">
      <h1 id="top-header">DATA</h1>
    </div>
  </header>
  <hr id="hr-divider" />
  
  <div id=page-content>
    <h2 id="top-sub-header">Graph Type</h2>
    <GraphContainer />
  </div>
  <div id="divider">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span id="divider-text" on:click={() => {
      document.getElementById('footer').scrollIntoView({behavior: "smooth"});
    }}>Analytics</span>
  </div>

  <hr id="hr-sub-divider" />

  <section id="sub-section" />
  <div id="footer">
    <Footer />
  </div>
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
    height: 10vh;
    width: 100vw;
    background-color: #052c46;
  }

  #button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-size: 3vh;
    color: #fed703;
    cursor: pointer;
    -webkit-text-stroke: 1px black;
    width: 10vw;
  }

  #home-icon {
    height: 3vh;
    margin-bottom: 1vh;
  }

  #back-icon {
    margin-top: 0.5vh;
    height: 3vh;
    width: 3vh;
    margin-bottom: 0.5vh;
    padding-bottom: 0.5vh;
  }

  .button {
    display: flex;
    justify-content: space-between;
    gap: 5px;
    align-items: center;
    font-family: 'Farro', sans-serif;
    filter: drop-shadow(1px 1px 0px #000000AA); 
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

  #top-sub-header {
    font-size: 2vh;
    font-family: 'Farro', sans-serif;
    color: #fff;
    padding-top: 20px;
  }

  #hr-divider {
    height: 0.5vh;
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

  #page-content {
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    padding-top: 5vh;
    min-height: 75vh;
    max-height: 75vh;
    background-color: #fed703;
    width: 100vw;
    z-index: 2;
  }

  #footer {
    height: 9.5vh;
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
