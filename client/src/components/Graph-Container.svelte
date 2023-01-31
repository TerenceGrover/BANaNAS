<script>

  export let leftGraphData;
  export let rightGraphData;
  export let leftData;
  export let rightData;

  import Scrollbar from '../components/Scrollbar.svelte';
  // import BarGraph from '../components/Data/Bar-Graph.svelte';
  // import LineGraph from '../componexnts/Data/Line-Graph.svelte';
  import LineGraph2 from '../components/Data/Line-Graph2.svelte';
  import Scatterplot from './Data/Scatterplot.svelte';

  // TEMPORARY POSITION TO BE CHANGED BASED ON DATA POSSIBILITIES
  let position = 2;
  let maxPosition = 4;

</script>

<main>

  <section id="top-section">
  <h2 id="top-sub-header">Graph Type</h2>
    <button
      on:click={() => {
        if (position > 0) {
          position--;
        } else {
          position = maxPosition;
        }
      }}
      id="left"
      class="scroll-buttons">{'<'}</button
    >
    <div id="D3-container">
      <div id="current-graph">
        <!-- <BarGraph /> -->
        <!-- <LineGraph2 data1={leftGraphData} data2={rightGraphData} {leftData} {rightData} /> -->
        <Scatterplot data1={leftGraphData} data2={rightGraphData} {leftData} {rightData} />
      </div>
    </div>
    <button
      on:click={() => {
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
      <Scrollbar bind:position />
    </div>
  </section>


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

  #current-graph{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding : 2vh 2vw;
    border: 3px solid white;
    box-shadow: 25px 25px #000000aa;
    border-radius: 12px;
    background-color: #00000044;
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

</style>