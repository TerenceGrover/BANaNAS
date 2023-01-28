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
  $: leftCategory, console.log(leftCategory);

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
    <h2 id="left-selected-category-name">{leftCategory}</h2>
    <h2 id="right-selected-category-name">{rightCategory}</h2>
    <div id="player-zone-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div id="player-container-left" on:click={() => {
        document.getElementById('halo-left').classList.add("halo");
        document.getElementById('halo-right').classList.remove("halo");
        selectedCategory = {name: ''};
        currentSide = 'left';
      }}>
        <Player_Zone selectedPlayer={leftCategory} player="P1"/>
        <div id="halo-left" class="halo"></div>
      </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div id="player-container-right" class="" on:click={() => {
        document.getElementById('halo-right').classList.add("halo");
        document.getElementById('halo-left').classList.remove("halo");
        selectedCategory = {name: ''};
        currentSide = 'right';
      }}>
        <Player_Zone selectedPlayer={rightCategory} player="P2"/>
        <div id="halo-right" class=""></div>
      </div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h4 id="reset-categories" on:click={() => {
      selectedCategory = {name: ''};
      leftCategory = '';
      rightCategory = '';
      currentSide = 'left';
      document.getElementById('player-container-left').classList.add("halo");
      document.getElementById('player-container-right').classList.remove("halo");
      }}>Reset</h4>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img id="vs" src="../../assets/vs.png" alt="vs"/>
    <div id="category-list">
      <Category_Collection
        bind:currentlyHovered={hoveredCategory}
        bind:currentlySelected={selectedCategory}
      />
    </div>
    <button on:click={() => changePage('home')}>Home</button>
    
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
    transform: translate(-50%, -50%) scale(1.3);
    rotate: (15deg);
  }

  #category-list {
    z-index: 10000;
    position: absolute;
    align-self: center;
    top: 70vh
  }

  #title {
    z-index: 100;
    margin-top: 5vh;
    font-size: 7vh;
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
    margin-top: 0vh;
    width: 30vw;
    height: 70vh;
    z-index: 100000;
    animation: pulse 2s infinite;
    padding-top: 20vh;
    cursor: pointer;
    color: #fed703;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  #halo-left {
    border-radius: 50%;
    height: 10vw;
    width: 30vw;
  }

  #player-container-right {
    width: 30vw;
    height: 70vh;
    z-index: 100000;
    animation: pulse 2s infinite;
    padding-top: 20vh;
    cursor: pointer;
    color: #052C46;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

  }

    #halo-right {
    border-radius: 50%;
    height: 10vw;
    width: 30vw;
  }

  .halo {
    -webkit-box-shadow:0px 0px 189px 47px rgba(0, 0, 0, 0.5) inset;
    -moz-box-shadow: 0px 0px 189px 47px rgba(0, 0, 0, 0.5) inset;
    box-shadow: 0px 47px 189px 47px rgba(0, 0, 0, 0.5) inset;
    filter: blur(10px)
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
    height: 100vh;
    width: 50vw;
    font-size: 4vh;
    color: #fed703;;
    z-index: 500;
    left: 0;
    display: flex;
    justify-content: center;
    padding-top: 20vh;
    padding-right: 7.5vw;
  }


  #right-selected-category-name {
    position: absolute;
    height: 100vh;
    width: 50vw;
    font-size: 4vh;
    color: #052C46;
    z-index: 500;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 20vh;
    padding-left: 7.5vw;

  }

  #reset-categories {
    position: absolute;
    z-index: 10000;
    top: 5vh;
    right: 7.5vw;
    font-size: 3vh;
    color: #052C46;
    cursor: pointer;
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