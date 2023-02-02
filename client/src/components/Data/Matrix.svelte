<script>

  import { onMount } from 'svelte';

  export let data1;
  export let data2;
  export let leftData;
  export let rightData;
  export let filterYears;

  const drawCorrelationMatrix = () => {
    const matrixData = [];

    dataArray1.forEach((d1, i) => {
      dataArray2.forEach((d2, j) => {
        if (d1.year === d2.year) {
          matrixData.push({
            x: d1.value,
            y: d2.value,
            year: d1.year,
          });
        }
      });
    });

    // Compute the Pearson correlation between both arrays
    const xArray = matrixData.map((d) => d.x);
    const yArray = matrixData.map((d) => d.y);
    const correlation = d3.correlation(xArray, yArray);

    // Create the correlation matrix
    const matrix = [
      [1, correlation],
      [correlation, 1],
    ];

    // Add the matrix to the canvas
    let svg = d3.select('.correlation-matrix');

    // If the svg doesn't exist, create it
    if (svg.empty()) {
      svg = d3
        .select('#correlation-matrix')
        .append('svg')
        .attr('class', 'correlation-matrix');
    }

    // Update the dimensions of the svg
    svg.attr('width', 200).attr('height', 200);

    // Add a circle for each value in the matrix
    svg
      .selectAll('circle')
      .data(matrix)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => {
        return i * 100 + 50;
      })
      .attr('cy', (d, i) => {
        return 100 - d[1] * 50 + 50;
      })
      .attr('r', 5)
      .style('fill', 'blue');
  };

  onMount(async () => {
    drawCorrelationMatrix();
  });

</script>
