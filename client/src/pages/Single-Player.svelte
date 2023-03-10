<script>
  const isMobile = window.innerWidth < 768;

  import Category_Collection from '../components/Category-Collection.svelte';
  import Loader from '../components/Loader-Falling.svelte';
  import CharAnimatedBackground from '../components/Char-Animated-Background.svelte';
  import CharStaticBackground from '../components/Char-Static-Background.svelte';
  import { onMount } from 'svelte';
  import Carousel from '../components/Carousel.svelte';
  import Player_Zone from '../components/Player-Zone.svelte';
  import SubSelectorSingle from '../components/Sub-Selector-Single.svelte';
  import { splitWordsOnCapitalLetters } from '../Utils/helpers';

  export let changePage;

  onMount(() => {
    setTimeout(() => {
      loading = false;
    }, 3000);

    if (isMobile) {
      leftCategory = 'Agriculture';
    }
  });

  let loading = true;
  let hoveredCategory = { name: '' };
  let selectedCategory = { name: '' };

  let what = '';

  function cleanUp() {
    selectedCategory = { name: '' };
    hoveredCategory = { name: '' };
    what = '';
  }
</script>

<main>
  {#if loading}
    <CharAnimatedBackground />
    <Loader />
  {:else}
    <h1 id="title">Choose Your Fighter</h1>
    <h2 id="hovered-category-name">
      {splitWordsOnCapitalLetters(hoveredCategory.name)}
    </h2>
    <div id="player-container">
      <h2 id="selected-category-name">
        {splitWordsOnCapitalLetters(selectedCategory.name)}
      </h2>
      <div id="bounce">
        <Player_Zone selectedPlayer={selectedCategory.name} player="?" />
      </div>
    </div>
    <SubSelectorSingle
      {changePage}
      bind:what
      category={selectedCategory.name}
    />
    <div id="globe-container">
      <img id="globe" src="../../assets/globe2.gif" alt="globe" />
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h4 id="reset-categories" on:click={() => cleanUp()}>
      Reset
      <img
        id="reset-icon"
        src="../../assets/icons/reset.svg"
        alt="reset-icon"
      />
    </h4>
    {#if !isMobile}
      <div id="category-list">
        <Category_Collection
          bind:currentlyHovered={hoveredCategory}
          bind:currentlySelected={selectedCategory}
        />
      </div>
    {/if}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h4 id="home-button" on:click={() => changePage('home')}>
      <img id="home-icon" src="../../assets/icons/home.svg" alt="home-icon" />
      Home
    </h4>

    <CharStaticBackground />
  {/if}
</main>

<style>
  * {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    width: 100vw;
    font-family: 'Farro', sans-serif;
    color: #fed703;
    overflow: hidden;
  }

  #player-container {
    position: absolute;
    display: flex;
    width: 40vw;
    height: 100vh;
    left: 0;
    justify-content: center;
    align-items: center;
    z-index: 2;
    padding: 15vh 0;
  }

  #selected-category-name {
    position: absolute;
    align-self: flex-start;
    font-size: 4vh;
    color: #fed703;
    z-index: 500;
    padding-top: 5vh;
    filter: drop-shadow(1px 1px 0px #000000);
    -webkit-text-stroke: 1px black;
  }

  #globe-container {
    position: absolute;
    display: flex;
    width: 40vw;
    height: 100vh;
    right: 0;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  #globe {
    height: 60vh;
  }

  #category-list {
    z-index: 10000;
    position: absolute;
    align-self: center;
    height: 25vh;
    bottom: 0;
    padding: 2.5vh 2.5vw;
  }

  #title {
    z-index: 3;
    margin-top: 5vh;
    font-size: 7vh;
    -webkit-text-stroke: 2px black;
    filter: drop-shadow(3px 3px 0px #000000aa);
  }

  #hovered-category-name {
    position: absolute;
    z-index: 1000000000;
    margin-top: 12.5vh;
    font-size: 3vh;
    color: #fed703;
    filter: drop-shadow(5px 5px 0px #000000);
    -webkit-text-stroke: 1px black;
  }

  #reset-categories {
    position: absolute;
    z-index: 10000;
    top: 5vh;
    right: 5vw;
    font-size: 3vh;
    align-items: center;
    color: #052c46;
    cursor: pointer;
    -webkit-text-stroke: 1px black;
    filter: drop-shadow(1px 1px 0px #000000);
  }

  #reset-icon {
    height: 3vh;
  }

  #home-icon {
    height: 3vh;
    margin-bottom: 1vh;
    -webkit-text-stroke: 1px black;
  }

  #home-button {
    position: absolute;
    z-index: 5;
    top: 5vh;
    left: 5vw;
    font-size: 3vh;
    color: #fed703;
    cursor: pointer;
    width: 6vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    -webkit-text-stroke: 1px black;
    filter: drop-shadow(3px 3px 0px #000000);
  }

  #bounce {
    animation: pulse 3s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.9);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(0.9);
    }
  }

  @keyframes upndown {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(15px);
    }

    100% {
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 768px) {
    * {
      overflow: hidden;
    }

    main {
      position: relative;
    }

    #title {
      position: absolute;
      font-size: 3.5vh;
      top: 45%;
      left: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
    }

    #home-button {
      top: 2vh;
      left: 2vw;
      font-size: 2vh;
      width: auto;
    }

    #reset-categories {
      top: 2vh;
      right: 2vw;
      font-size: 2vh;
      color: #fed703;
    }
  }
</style>
