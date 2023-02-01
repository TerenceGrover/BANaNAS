<script>
  export let leftGraphData;
  export let rightGraphData;
  export let leftData;
  export let rightData;
  export let filterYears = [];
  export let filterYearsOff = [];
  export let filterToggle = true;

  import Scrollbar from '../components/Scrollbar.svelte';
  import LineGraph2 from '../components/Data/Line-Graph2.svelte';
  import Scatterplot from './Data/Scatterplot.svelte';
  import FilterSelector from './Filter-Selector.svelte';

  import { getFilterCategories } from '../Utils/api-services';

  let graphs = [
    {
      name: 'Line Graph',
      component: LineGraph2,
    },
    {
      name: 'Scatterplot',
      component: Scatterplot,
    },
  ];

  let filter = false;
  let filterCategories = [];

  // TEMPORARY POSITION TO BE CHANGED BASED ON DATA POSSIBILITIES
  let position = Math.floor((graphs.length - 1) / 2);
  let maxPosition = graphs.length - 1;

  function handlePosition(direction) {
    const container = document.getElementById('D3-container');
    container.classList.add(`slide-${direction}`);
    // container.classList.remove(`fade-in`);
    console.log('handlePosition: ', direction);
    console.log('position: ', position);
    console.log('maxPosition: ', maxPosition);

    container.addEventListener('animationend', () => {
      console.log('animationend: ', direction);
      container.classList.remove(`slide-${direction}`);
      if (direction === 'left') {
        position === 0 ? (position = maxPosition) : position--;
      } else {
        position === maxPosition ? (position = 0) : position++;
      }
    });
  }
</script>

<main>
  <section id="top-section">
    <h2 id="top-sub-header">Graph Type</h2>
    <button id="filter-button"
      on:click = {async () => {
        await getFilterCategories().then(res => filterCategories = res)
        filter = !filter;
        console.log(filterCategories);
      }}>
      <img
        id="filter-icon"
        class="icon"
        src="../../assets/icons/filter.svg"
        alt="filter-icon"
      />
      <p id="filter-text">Filter by event</p>
      <img
        id="right-arrow"
        class="icon"
        src="../../assets/icons/right-arrow.svg"
        alt="right-arrow"
      />
    </button>
    {#if filterYears.length > 0}
      <input id="switch" type="checkbox" />
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <label for="switch"
        on:click={() => {
          filterToggle = !filterToggle;
        }}>Toggle</label>
    {/if}
    <button
      on:click={() => {
        handlePosition('left');
      }}
      id="left"
      class="scroll-buttons">{'<'}</button
    >
    {#if filter}
      <FilterSelector
        {filterCategories}
        bind:filterYears={filterYears}
        bind:filter={filter}
        bind:filterYearsOff={filterYearsOff}
        />
    {:else}
      {#if position === 0}
        <div id="D3-container" class="fade-in">
          <div id="current-graph">
            <LineGraph2
              data1={leftGraphData}
              data2={rightGraphData}
              {leftData}
              {rightData}
              filterYears = { filterToggle ? filterYears : filterYearsOff}
            />
          </div>
        </div>
      {:else if position === 1}
        <div id="D3-container" class="fade-in">
          <div id="current-graph">
            <Scatterplot
              data1={leftGraphData}
              data2={rightGraphData}
              {leftData}
              {rightData}
              filterYears = { filterToggle ? filterYears : filterYearsOff}
            />
          </div>
        </div>
      {/if}
    {/if}
    <button
      on:click={() => {
        handlePosition('right');
      }}
      id="right"
      class="scroll-buttons">{'>'}</button
    >
    <div id="scroll-container">
      <Scrollbar graphNumber={maxPosition + 1} bind:position />
    </div>
  </section>

  <div class="slide-right slide-left" />
</main>

<style>
  #top-section {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 75vh;
    width: 100vw;
  }

  #top-sub-header {
    position: absolute;
    font-size: 2vh;
    font-family: 'Farro', sans-serif;
    color: #fff;
    margin: 7px 0px;
    align-self: flex-start;
  }

  #filter-button {
    position: absolute;
    display: flex;
    justify-content: flex-start;
    top: 2.5vh;
    left: 2vw;
    font-size: 3vh;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #fed703;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    align-self: flex-end;
    filter: drop-shadow(3px 3px 0px black);
    -webkit-text-stroke: 1px black;
    gap: 2px;
    cursor: pointer;
    
  }

input[type=checkbox]{
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: 75px;
  height: 34px;
  background: #fed703;
  display: block;
  border-radius: 34px;
  position: absolute;
  display: flex;
  top: 7vh;
  left: 2vw;
  filter: drop-shadow(3px 3px 0px black);
  border: 2px solid black;

}

label:after {
  content: '';
  position: absolute;
  top: 2.5px;
  right: 2.5px;
  width: 25px;
  height: 25px;
  background: #fff;
  border-radius: 25px;
  transition: 0.3s;
  border: 2px solid black;
}

input:checked + label {
  background: grey;

}

input:checked + label:after {
  right: calc(100% - 2.5px);
  transform: translateX(100%);
}

label:active:after {
  width: 6vh;
}

  #filter-text {
    padding-top: 2px;
  }

  .icon {
    height: 3vh;
    width: 3vh;
    margin: 0px 2px;
    padding-top: 2px;
    -webkit-text-stroke: 1px black;
  }

  #right-arrow {
    margin-left: 5px;
    animation: pulse 2s infinite;
  }

  .scroll-buttons {
    position: absolute;
    height: 10%;
    width: 5%;
    font-size: 5vh;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #fed703;
    background-color: transparent;
    border: none;
    border-radius: 8px;
  }

  #current-graph {
    position: absolute;
    transform: translate(-50%, -50%);
    padding: 2vh 2vw;
    border: 3px solid white;
    box-shadow: 22px 22px #000000aa;
    margin-top: 1vh;
    margin-bottom: 1.5vh;
    border-radius: 12px;
    background-color: #00000044;
  }

  .fade-in {
    animation: fade-in-fwd 0.5s;
  }

  .scroll-buttons:hover {
    cursor: pointer;
  }

  #left {
    left: 10px;
  }

  #right {
    right: 10px;
  }

  #scroll-container {
    position: absolute;
    bottom: 1vh;
    left: 50%;
    transform: translateX(-50%);
    height: 5%;
    width: 20%;
  }

  .slide-right {
    animation: slide-right 1s;
  }

  .slide-left {
    animation: slide-left 1s;
  }

  @keyframes slide-left {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    25% {
      -webkit-transform: translateX(-20px);
      transform: translateX(-20px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    38% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    52% {
      -webkit-transform: translateX(80px);
      transform: translateX(80px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    70% {
      -webkit-transform: translateX(100px);
      transform: translateX(100px);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    85% {
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
  }

  @keyframes slide-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    25% {
      -webkit-transform: translateX(20px);
      transform: translateX(20px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    38% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    52% {
      -webkit-transform: translateX(-80px);
      transform: translateX(-80px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    70% {
      -webkit-transform: translateX(-100px);
      transform: translateX(-100px);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    85% {
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes fade-in-fwd {
    0% {
      -webkit-transform: translateZ(-80px);
      transform: translateZ(-80px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      opacity: 1;
    }
  }
</style>
