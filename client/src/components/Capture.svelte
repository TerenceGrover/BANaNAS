<script>
  export let leftGraphData;
  export let rightGraphData;
  export let leftData;
  export let rightData;

  import LineGraph2 from './Data/Line-Graph2.svelte';
  import Matrix from './Data/Matrix.svelte';
  import Scatterplot from './Data/Scatterplot.svelte';
  import { splitWordsOnCapitalLetters } from '../Utils/helpers';

  import html2canvas from 'html2canvas';
  import { jsPDF } from 'jspdf';

  let filterToggle = false;
  let filterYears = [];
  let filterYearsOff = [];

  let captureMode = false;

  function handleDownload() {
    let captureEl = document.querySelector('#capture');
    let originalDisplay = captureEl.style.display;

    html2canvas(captureEl)
      .then((canvas) => {
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
        pdf.save('DataBanana.pdf');

        captureEl.style.display = originalDisplay;
      }).then(
        setTimeout(() => {
          captureMode = false;
        }, 150)
      )
      .catch((error) => {
        console.error(error);
        captureEl.style.display = originalDisplay;
      });
  }
</script>

<div id="b-container">
  <button
  on:click={() => {
    captureMode = true;
    setTimeout(() => {
      handleDownload();
    }, 1500);
  }}>
  {captureMode ? 'Downloading...'  : 'Download'}
  </button
>
</div>

{#if captureMode}

<div id="capture">
  <h1 id="capture-header">
    {splitWordsOnCapitalLetters(leftData.what) +
      ' in ' +
      leftData.where +
      '\n VS \n' +
      splitWordsOnCapitalLetters(rightData.what) +
      ' in ' +
      rightData.where}
  </h1>

  <div class="wrapper">
    <h3 id="sub-header">Line Graph</h3>
    <LineGraph2
      data1={leftGraphData}
      data2={rightGraphData}
      {leftData}
      {rightData}
      filterYears={filterToggle ? filterYears : filterYearsOff}
    />
  </div>
  <div class="wrapper">
    <h3 id="sub-header">Matrix</h3>
    <Matrix data1={leftGraphData} data2={rightGraphData} />
  </div>
  <div class="wrapper">
    <h3 id="sub-header">Scatterplot</h3>
    <Scatterplot
      data1={leftGraphData}
      data2={rightGraphData}
      {leftData}
      {rightData}
      filterYears={filterToggle ? filterYears : filterYearsOff}
    />
  </div>
</div>

{/if}

<style>
  #capture {
    position: absolute;
    z-index: -1;
    background-color: #fff;
    top: 1000000px;
    right: 1000000px;
  }

  #capture-header {
    text-align: center;
    font-size: 2rem;
    margin: 1rem;
    color: #000;
  }

  #sub-header {
    text-align: center;
    font-size: 1.5rem;
    color: #fff;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1vh 0;
    background-color: #052c46;
  }

  #b-container{
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    /* margin: 15px 0; */
  }

  button {
    font-size: 15px;
    font-family: 'Farro', sans-serif;
    font-weight: 400;
    color: #052c46;
    background-color: #fed703;
    border: none;
    padding: 1vh 2vw;
    border: 2px solid #052c46;
    border-radius: 6px;
    box-shadow: 6px 6px 0px 2px #000000aa;
    min-width: 150px;
    max-width: 150px;
    z-index: 3;
  }

  button:hover {
    cursor: pointer;
    background-color: #ffe23c;
  }
</style>
