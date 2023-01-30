<script>
  export let changePage;

  import GraphContainer from '../components/Graph-Container.svelte';
  import Footer from '../components/Footer.svelte';

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
  <hr id="hr-divider" />

  <GraphContainer />

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
