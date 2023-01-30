<script>
  import Category_Collection from "../components/Category-Collection.svelte";
  export let changePage;
  import Loader from "../components/Loader-Falling.svelte";
  import Player_Zone from "../components/Player-Zone.svelte";
  import CharAnimatedBackground from "../components/Char-Animated-Background.svelte";
  import CharStaticBackground from "../components/Char-Static-Background.svelte";
  import { onMount } from "svelte";

  export let leftCategory = '';
  export let rightCategory = '';

  let loading = true;
  let currentSide = 'left';
  let hoveredCategory = {name: ''};
  let selectedCategory = {name: ''};
  
  $: if (selectedCategory.name !== '') {
    if (currentSide === 'left') {
      leftCategory = selectedCategory.name;
    } else if (currentSide === 'right') {
      rightCategory = selectedCategory.name;
    }
  }

  onMount(() => {
    setTimeout(() => {
      loading = false;},
      3500)
  })

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
      <div id="player-container-left" on:click={() => {
        if (document.getElementById('selector-right')) document.getElementById('selector-right').classList.toggle("hidden");
        if (document.getElementById('selector-left')) document.getElementById('selector-left').classList.toggle("hidden");

        console.log(document.getElementById('selector-right'))
        console.log(document.getElementById('selector-left'))

        selectedCategory = {name: ''};
        currentSide = 'left';
      }}>
        {#if leftCategory === ''}
          <img id="selector-left" class="" src="../../assets/icons/selector-down.svg" alt="selector"/>
        {:else}
          <h2 id="left-selected-category-name">{leftCategory}</h2>
        {/if}
        <Player_Zone selectedPlayer={leftCategory} player="P1"/>
      </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div id="player-container-right"on:click={() => {
        if (document.getElementById('selector-right')) document.getElementById('selector-right').classList.toggle("hidden");
        if (document.getElementById('selector-left')) document.getElementById('selector-left').classList.toggle("hidden");


        console.log(document.getElementById('selector-right'))
        console.log(document.getElementById('selector-left'))
        
        selectedCategory = {name: ''};
        currentSide = 'right';
      }}>
        {#if rightCategory === ''}
          <img id="selector-right" class="hidden" src="../../assets/icons/selector-up.svg" alt="selector"/>
        {:else}
          <h2 id="right-selected-category-name">{rightCategory}</h2>
        {/if}
        <Player_Zone selectedPlayer={rightCategory} player="P2"/>
      </div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h4 id="reset-categories" on:click={() => {
      selectedCategory = {name: ''};
      leftCategory = '';
      rightCategory = '';
      currentSide = 'left';
      document.getElementById('selector-right').classList.add("hidden");
      document.getElementById('selector-left').classList.remove("hidden");

      }}>Reset
      <img id="reset-icon" src="../../assets/icons/reset.svg" alt="reset-icon"/></h4>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img id="vs" src="../../assets/vs.png" alt="vs" on:click={() => changePage('data')}/>
    <div id="category-list">
      <Category_Collection
        bind:currentlyHovered={hoveredCategory}
        bind:currentlySelected={selectedCategory}
      />
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h4 id="home-button" on:click={() => changePage('home')}>
      <img id="home-icon" src="../../assets/icons/home.svg" alt="home-icon"/>
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
  }

  #vs {
    z-index: 10000;
    height: 60vh;
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  #vs:hover {
    transform: translate(-50%, -50%) scale(1.3) rotate(15deg);
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
    filter: drop-shadow(3px 3px 0px #000000AA); 


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

  #selector-left{
    position: absolute;
    width: 10vw;
    z-index: 1000000;
    align-self: flex-start;
    filter: drop-shadow(5px 5px 4px black);
    animation: pulse 2s infinite;
  }

  #selector-right{
    position: absolute;
    width: 10vw;
    z-index: 1000000;
    align-self: flex-end;
    filter: drop-shadow(5px 5px 4px black);
    animation: pulse 2s infinite;
  }

  #player-container-right {
    position: relative;
    width: 30vw;
    height: 70vh;
    z-index: 100000;
    cursor: pointer;
    color: #052C46;
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
    color: #052C46;
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
    color: #052C46;
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

</style>