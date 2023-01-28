<script>
  import Category_Collection from "../components/Category-Collection.svelte";
  export let changePage;
  import Loader from "../components/Loader-Falling.svelte";
  import CharAnimatedBackground from "../components/Char-Animated-Background.svelte";
  import CharStaticBackground from "../components/Char-Static-Background.svelte";
  import { onMount } from "svelte";

  let loading = true;
  let currentSide = 'left';

  onMount(() => {
    setTimeout(() => {
      loading = false;},
      3500)
  })

  let hoveredCategory = {name: ''};
  let selectedCategory = {name: ''};
  $: selectedCategory, console.log(selectedCategory.name);
  let leftCategory = '';
  let rightCategory = '';
  $: if (selectedCategory.name !== '') {
    if (currentSide === 'left') {
      leftCategory = selectedCategory.name;
    } else if (currentSide === 'right') {
      rightCategory = selectedCategory.name;
    }
  }

</script>

<main>

  {#if loading}
  <CharAnimatedBackground />
  <Loader />
  {:else}
    <h1 id="title">Choose Your Fighter</h1>
    <h2 id="hovered-category-name">{hoveredCategory.name}</h2>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h4 id="reset-categories" on:click={() => {
      selectedCategory = {name: ''};
      leftCategory = '';
      rightCategory = '';
      currentSide = 'left';
      document.getElementById('halo-left').classList.add("halo");
      document.getElementById('halo-right').classList.remove("halo");
      }}>Reset</h4>
      <h2 id="left-selected-category-name">{leftCategory}</h2>
    <div id="left-content-container">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div id="halo-left" class="halo" on:click={() => {
        currentSide = 'left'
        document.getElementById('halo-left').classList.add("halo");
        document.getElementById('halo-right').classList.remove("halo");
        selectedCategory = {name: ''};
        }}><h1 id="player-1">P1</h1>
      </div>
    </div>
    <h2 id="right-selected-category-name">{rightCategory}</h2>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div id="right-content-container">
      <div id="halo-right" class="" on:click={() => {
        currentSide = 'right';
        document.getElementById('halo-left').classList.remove("halo");
        document.getElementById('halo-right').classList.add("halo");
        selectedCategory = {name: ''};
        }}><h1 id="player-2">P2</h1>
      </div>
    </div>
    <img id="vs" src="../../public/assets/vs" alt="vs"/>
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
    z-index: 100;
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

  #hovered-category-name {
    position: absolute;
    z-index: 1000000000;
    margin-top: 15vh;
    font-size: 5vh;
    color: #fed703;
  }

  .halo {
    -webkit-box-shadow:0px 0px 189px 47px rgba(199,214,209,0.26);
    -moz-box-shadow: 0px 0px 189px 47px rgba(199,214,209,0.26);
    box-shadow: 0px 47px 189px 47px rgba(199,214,209,0.26);
  }

  #left-content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    z-index: 1000;
    height: 70vh;
    width: 30vw;
    top: 15vh;
    left: 5vw;
  }

  #left-selected-category-name {
    position: absolute;
    height: 100vh;
    width: 40vw;
    font-size: 4vh;
    color: #fed703;;
    z-index: 500;
    left: 0;
    display: flex;
    justify-content: center;
    padding-top: 20vh;
  }

  #halo-left {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    height: 70vh;
    width: 30vw;
    animation: pulse 2s infinite;
    cursor: pointer;
  }

  #player-1 {
    z-index: 10000;
    font-size: 12.5vw;
    color: #fed703;
    filter: drop-shadow(30px 10px 4px #000000AA); 
  }

  #right-content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    z-index: 10000;
    height: 70vh;
    width: 30vw;
    top: 15vh;
    right: 5vw;
  }

  #player-2 {
    z-index: 10000;
    font-size: 12.5vw;
    color: #052C46;
    filter: drop-shadow(10px 10px 2px #000000AA); 
  }

  #halo-right {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    height: 70vh;
    width: 30vw;
    animation: pulse 2s infinite;
    cursor: pointer;
  }

  #right-selected-category-name {
    position: absolute;
    height: 100vh;
    width: 40vw;
    font-size: 4vh;
    color: #052C46;
    z-index: 500;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 20vh;
  }

  #reset-categories {
    position: absolute;
    z-index: 10000;
    top: 5vh;
    right: 7.5vw;
    font-size: 3vh;
    color: #fed703;
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