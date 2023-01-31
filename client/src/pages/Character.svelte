<script>
  import Category_Collection from '../components/Category-Collection.svelte';
  import Loader from '../components/Loader-Falling.svelte';
  import Versus from '../components/Versus.svelte';
  import Player_Zone from '../components/Player-Zone.svelte';
  import CharAnimatedBackground from '../components/Char-Animated-Background.svelte';
  import CharStaticBackground from '../components/Char-Static-Background.svelte';
  import SubSelector from '../components/Sub-Selector.svelte';
  import { onMount } from 'svelte';
  export let changePage;

  export let leftCategory = '';
  export let rightCategory = '';

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

  onMount(() => {
    setTimeout(() => {
      loading = false;
    }, 3500);
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
    <h1 id="title">Choose Your Fighter</h1>
    <h2 id="hovered-category-name">{hoveredCategory.name}</h2>

    <div id="player-zone-container">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        id="player-container-left"
        on:click={() => {
          if (document.getElementById('selector-right'))
            document
              .getElementById('selector-right')
              .classList.toggle('hidden');
          if (document.getElementById('selector-left'))
            document.getElementById('selector-left').classList.toggle('hidden');

          console.log(document.getElementById('selector-right'));
          console.log(document.getElementById('selector-left'));

          selectedCategory = { name: '' };
          currentSide = 'left';
        }}
      >
        {#if leftCategory === ''}
          <img
            id="selector-left"
            class="selector-arrow"
            src="../../assets/icons/selector-down.svg"
            alt="selector"
          />
        {:else}
          <h2 id="left-selected-category-name">{leftCategory}</h2>
        {/if}
        <Player_Zone selectedPlayer={leftCategory} player="P1" />
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        id="player-container-right"
        on:click={() => {
          if (document.getElementById('selector-right'))
            document
              .getElementById('selector-right')
              .classList.toggle('hidden');
          if (document.getElementById('selector-left'))
            document.getElementById('selector-left').classList.toggle('hidden');

          selectedCategory = { name: '' };
          currentSide = 'right';
        }}
      >
        {#if rightCategory === ''}
          <img
            id="selector-right"
            class="hidden selector-arrow"
            src="../../assets/icons/selector-up.svg"
            alt="selector"
          />
        {:else}
          <h2 id="right-selected-category-name">{rightCategory}</h2>
        {/if}
        <Player_Zone selectedPlayer={rightCategory} player="P2" />
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
    <div id="category-list">
      <Category_Collection
        bind:currentlyHovered={hoveredCategory}
        bind:currentlySelected={selectedCategory}
      />
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h4 id="home-button" on:click={() => changePage('home')}>
      <img id="home-icon" src="../../assets/icons/home.svg" alt="home-icon" />
      Home
    </h4>

    <CharStaticBackground />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    width: 100vw;
    overflow: none;
    font-family: 'Farro', sans-serif;
    color: #fed703;
    overflow: hidden;
  }

  #category-list {
    z-index: 10000;
    position: absolute;
    align-self: center;
    bottom: 5vh;
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
    color: #052c46;
    display: flex;
    justify-content: center;
    align-items: center;

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
    margin-top: 15vh;
    font-size: 5vh;
    color: #fed703;
  }

  #left-selected-category-name {
    position: absolute;
    align-self: flex-start;
    font-size: 4vh;
    color: #fed703;
    z-index: 500;
    padding-top: 5vh;
  }

  #right-selected-category-name {
    position: absolute;
    align-self: flex-end;
    font-size: 4vh;
    color: #052c46;
    z-index: 500;
    padding-bottom: 5vh;
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
    -webkit-text-stroke: 1px black;
  }
  .hidden {
    display: none;
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
</style>
