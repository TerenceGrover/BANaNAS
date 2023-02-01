<script>
  export let leftGraphData;
  export let rightGraphData;
  export let leftData;
  export let rightData;

  import Scrollbar from '../components/Scrollbar.svelte';
  import LineGraph2 from '../components/Data/Line-Graph2.svelte';
  import Scatterplot from './Data/Scatterplot.svelte';

  const graphs = [
    { name: 'Line Graph', component: LineGraph2 },
    { name: 'Scatterplot', component: Scatterplot },
  ];

  // TEMPORARY POSITION TO BE CHANGED BASED ON DATA POSSIBILITIES
  let position = Math.floor((graphs.length - 1) / 2);
  let maxPosition = graphs.length;

  function handlePosition(direction) {
    const container = document.getElementById('D3-container');
    container.classList.add(`slide-${direction}`);
    container.addEventListener('animationend', () => {
      container.classList.remove(`slide-${direction}`);
      if (
        (position > 0 && direction === 'left') ||
        (position < maxPosition && direction === 'right')
      ) {
        direction === 'left' ? position-- : position++;
      } else {
        direction === 'left' ? (position = 0) : (position = maxPosition);
      }
    });
  }
</script>

<main>
  <section id="top-section">
    <h2 id="top-sub-header">Graph Type</h2>
    <button id="filter-button">
      <img id="filter-icon" class="icon" src="../../assets/icons/filter.svg" alt="filter-icon" />
      <p id="filter-text">Filter by event</p>
      <img id="right-arrow" class="icon" src="../../assets/icons/right-arrow.svg" alt="right-arrow" />
    </button>
    <button
      on:click={() => {
        handlePosition('left');
        if (position > 0) {
          position--;
        } else {
          position = maxPosition;
        }
      }}
      id="left"
      class="scroll-buttons">{'<'}</button
    >
    {#if position === 0}
      <div id="D3-container">
        <div id="current-graph">
          <LineGraph2
            data1={leftGraphData}
            data2={rightGraphData}
            {leftData}
            {rightData}
          />
        </div>
      </div>
    {:else if position === 1}
      <div id="D3-container">
        <div id="current-graph">
          <Scatterplot
            data1={leftGraphData}
            data2={rightGraphData}
            {leftData}
            {rightData}
          />
        </div>
      </div>
    {/if}
    <button
      on:click={() => {
        handlePosition('right');
        if (position < maxPosition) {
          position++;
        } else {
          position = 0;
        }
      }}
      id="right"
      class="scroll-buttons">{'>'}</button
    >
    <div id="scroll-container">
      <Scrollbar graphNumber={maxPosition} bind:position />
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
    left: 2vw;;
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
    animation: pulse 2s infinite
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2vh 2vw;
    border: 3px solid white;
    box-shadow: 25px 25px #000000aa;
    border-radius: 12px;
    background-color: #00000044;
  }

  #D3-container {
    margin-bottom: 20px;
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
    animation: slide-right 0.5s;
  }

  .slide-left {
    animation: slide-left 0.5s;
  }

  @keyframes slide-left {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    25% {
      -webkit-transform: translateX(-38px);
      transform: translateX(-38px);
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
      -webkit-transform: translateX(0);
      transform: translateX(0);
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
      -webkit-transform: translateX(38px);
      transform: translateX(38px);
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
      -webkit-transform: translateX(0);
      transform: translateX(0);
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
</style>
