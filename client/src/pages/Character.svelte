<script>
  const isMobile = window.innerWidth < 768;

  import Category_Collection from '../components/Category-Collection.svelte';
  import Loader from '../components/Loader-Falling.svelte';
  import Versus from '../components/Versus.svelte';
  import Player_Zone from '../components/Player-Zone.svelte';
  import CharAnimatedBackground from '../components/Char-Animated-Background.svelte';
  import CharStaticBackground from '../components/Char-Static-Background.svelte';
  import SubSelector from '../components/Sub-Selector.svelte';
  import { onMount } from 'svelte';
  import Carousel from '../components/Carousel.svelte';
  import { splitWordsOnCapitalLetters } from '../Utils/helpers';

  export let changePage;
  export let leftCategory = '';
  export let rightCategory = '';

  onMount(() => {
    if (isMobile) {
      leftCategory = 'Agriculture';
      rightCategory = 'Agriculture';
    }
  });

  let loading = true;
  let currentSide = 'left';
  let hoveredCategory = { name: '' };
  let selectedCategory = { name: '' };

  let left = {
    what: '',
    where: '',
  };

  let right = {
    what: '',
    where: '',
  };

  $: if (selectedCategory.name !== '') {
    if (currentSide === 'left') {
      leftCategory = selectedCategory.name;
    } else if (currentSide === 'right') {
      rightCategory = selectedCategory.name;
    }
  }

  $: onChange(right.what, left.what, right.where, left.where);

  function onChange(rightWhat, leftWhat, rightWhere, leftWhere) {
    if (leftWhere !== '' && leftWhat !== '') {
      currentSide = 'right';
      if (document.getElementById('selector-right')) {
        document.getElementById('selector-right').classList.add('show');
        document.getElementById('selector-right').classList.remove('hidden');
      }
      if (document.getElementById('selector-left')) {
        document.getElementById('selector-left').classList.remove('show');
        document.getElementById('selector-left').classList.add('hidden');
      }
    } else if (rightWhere !== '' && rightWhat !== '') {
      currentSide = 'left';
      if (document.getElementById('selector-left')) {
        document.getElementById('selector-left').classList.add('show');
        document.getElementById('selector-left').classList.remove('hidden');
      }
      if (document.getElementById('selector-right')) {
        document.getElementById('selector-right').classList.remove('show');
        document.getElementById('selector-right').classList.add('hidden');
      }
    }
  }

  onMount(() => {
    setTimeout(() => {
      loading = false;
    }, 3000);
  });

  function cleanUp() {
    left.what = '';
    left.where = '';
    right.what = '';
    right.where = '';
    selectedCategory = { name: '' };
    leftCategory = '';
    rightCategory = '';
    currentSide = 'left';
    document.getElementById('selector-right').classList.add('hidden');
    document.getElementById('selector-left').classList.remove('hidden');
  }
</script>

<main>
  {#if loading}
    <CharAnimatedBackground />
    <Loader />
  {:else}
    {#if isMobile}
      <div id="top-carousel">
        <Carousel bind:currentlySelected={leftCategory} />
      </div>
      <div id="bot-carousel">
        <Carousel bind:currentlySelected={rightCategory} />
      </div>
    {/if}
    {#if !isMobile}
    <h1 id="title">Choose Your Fighter</h1>
    {:else if left.where === '' || right.where === ''}
    <h1 id="title">Choose Subject & Position for players</h1>
    {/if}
    <h2 id="hovered-category-name">{hoveredCategory.name}</h2>
    <div id="player-zone-container">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        id="player-container-left"
        on:click={() => {
          if (document.getElementById('selector-left')) {
            document.getElementById('selector-left').classList.add('show');
            document.getElementById('selector-left').classList.remove('hidden');
          }
          if (document.getElementById('selector-right')) {
            document.getElementById('selector-right').classList.remove('show');
            document.getElementById('selector-right').classList.add('hidden');
          }
          console.log(document.getElementById('selector-left'));
          console.log(document.getElementById('selector-right'));
          selectedCategory = { name: '' };
          currentSide = 'left';
        }}
      >
        {#if leftCategory === '' && !isMobile}
          <img
            id="selector-left"
            class="selector-arrow show"
            src="../../assets/icons/selector-down.svg"
            alt="selector"
          />
        {:else}
          <h2 id="left-selected-category-name">{splitWordsOnCapitalLetters(leftCategory)}</h2>
        {/if}
        {#if !isMobile}
          <Player_Zone selectedPlayer={leftCategory} player="P1" />
        {/if}
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        id="player-container-right"
        on:click={() => {
          if (document.getElementById('selector-right')) {
            document.getElementById('selector-right').classList.add('show');
            document.getElementById('selector-right').classList.remove('hidden');
          }
          if (document.getElementById('selector-left')) {
            document.getElementById('selector-left').classList.remove('show');
            document.getElementById('selector-left').classList.add('hidden');
          }

          selectedCategory = { name: '' };
          currentSide = 'right';
        }}
      >
        {#if rightCategory === '' && !isMobile}
          <img
            id="selector-right"
            class="selector-arrow hidden"
            src="../../assets/icons/selector-up.svg"
            alt="selector"
          />
        {:else}
          <h2 id="right-selected-category-name">{splitWordsOnCapitalLetters(rightCategory)}</h2>
        {/if}

        {#if !isMobile}
          <Player_Zone selectedPlayer={rightCategory} player="P2" />
        {/if}
      </div>
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
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if right.what !== '' && left.what !== '' && right.where !== '' && left.where !== ''}
      <Versus {changePage} {left} {right} {leftCategory} {rightCategory} />
    {:else}
      {#if rightCategory !== ''}
        <SubSelector
          category={rightCategory}
          bind:what={right.what}
          bind:where={right.where}
          currentSide="right"
        />
      {/if}

      {#if leftCategory !== ''}
        <SubSelector
          category={leftCategory}
          bind:what={left.what}
          bind:where={left.where}
          currentSide="left"
        />
      {/if}
    {/if}

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

  *{
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

  #category-list {
    z-index: 10000;
    position: absolute;
    align-self: center;
    height: 25vh;
    bottom: 0;
    padding: 2.5vh 2.5vw;
  }

  #title {
    z-index: 100;
    margin-top: 5vh;
    font-size: 7vh;
    -webkit-text-stroke: 2px black;
    filter: drop-shadow(3px 3px 0px #000000aa);
  }

  #player-zone-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 15vw;
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 10000;
  }

  #player-container-left {
    position: relative;
    width: 30vw;
    height: 70vh;
    z-index: 100000;
    cursor: pointer;
    color: #fed703;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .selector-arrow {
    position: absolute;
    width: 10vw;
    z-index: 1000000;
    filter: drop-shadow(7px 7px 0px black);
    animation: upndown 2s infinite;
  }

  #selector-left {
    align-self: flex-start;
  }

  #selector-right {
    align-self: flex-end;
  }

  #player-container-right {
    position: relative;
    width: 30vw;
    height: 70vh;
    z-index: 100000;
    cursor: pointer;
    color: #fed703;
    display: flex;
    justify-content: center;
    align-items: center;
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

  #left-selected-category-name {
    position: absolute;
    align-self: flex-start;
    font-size: 4vh;
    color: #fed703;
    z-index: 500;
    padding-top: 5vh;
    filter: drop-shadow(1px 1px 0px #000000);
    -webkit-text-stroke: 1px black;
  }

  #right-selected-category-name {
    position: absolute;
    align-self: flex-end;
    font-size: 4vh;
    color: #052c46;
    z-index: 500;
    padding-bottom: 5vh;
    filter: drop-shadow(1px 1px 0px #000000);
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
    z-index: 10000;
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
    filter: drop-shadow(3px 3px 0px #000000);
    -webkit-text-stroke: 1px black;
  }
  .hidden {
    display: none;
  }

  .show {
    display: block;
  }

  #top-carousel {
    z-index: 1000000;
    position: absolute;
    left: 25%;
    top: 19.5%;
    transform: translate(-50%, -50%);
    width: fit-content;
  }

  #bot-carousel {
    z-index: 1000000;
    position: absolute;
    left: 25%;
    top: 75%;
    transform: translate(-50%, -50%);
    width: fit-content;
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

    *{
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

    #player-container-right {
      position: absolute;
      left: 50%;
      top: 83%;
      transform: translate(-50%, -50%);
      width: 100vw;
      height: 30vh;
    }

    #player-container-left {
      position: absolute;
      left: 50%;
      top: 44%;
      transform: translate(-50%, -50%);
      width: 100vw;
      height: 30vh;
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
