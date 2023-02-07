<script>
  export let leftGraphData;
  export let rightGraphData;
  export let leftData;
  export let rightData;

  import LineGraph2 from './Data/Line-Graph2.svelte';
  import Matrix from './Data/Matrix.svelte';
  import Scatterplot from './Data/Scatterplot.svelte';

  import html2canvas from 'html2canvas';
  import { jsPDF } from 'jspdf';

  let filterToggle = false;
  let filterYears = [];
  let filterYearsOff = [];

  function handleDownload() {
    let captureEl = document.querySelector('#capture');
    let originalDisplay = captureEl.style.display;
    captureEl.style.display = 'block';

    html2canvas(captureEl, {
      allowTaint: true,
      ignoreElements: function (node) {
        return node.style.display === 'none';
      },
    })
      .then((canvas) => {
        // Generate the PDF
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
        pdf.save('DataBanana.pdf');

        captureEl.style.display = originalDisplay;
      })
      .catch((error) => {
        console.error(error);
        captureEl.style.display = originalDisplay;
      });
  }
</script>

<button
  on:click={() => {
    setTimeout(() => {
      handleDownload();
    }, 100);
  }}>Download</button
>

<div id="capture" style="display:none">
  <LineGraph2
    data1={leftGraphData}
    data2={rightGraphData}
    {leftData}
    {rightData}
    filterYears={filterToggle ? filterYears : filterYearsOff}
  />

  <Matrix data1={leftGraphData} data2={rightGraphData} />

  <Scatterplot
    data1={leftGraphData}
    data2={rightGraphData}
    {leftData}
    {rightData}
    filterYears={filterToggle ? filterYears : filterYearsOff}
  />
</div>

<style>
</style>
