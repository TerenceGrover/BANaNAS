<script>
  import { scaleLinear, scaleBand } from 'd3-scale';
  import { onMount, onDestroy } from 'svelte';
  import { max } from 'd3-array';

  export let data1;
  export let data2;

  const isMobile = window.innerWidth < 768;

  let margin = { top: 20, right: 100, bottom: 120, left: 100 };
  let width = window.innerWidth * 0.65 - margin.left - margin.right;
  let height = window.innerHeight * 0.6 - margin.top - margin.bottom;

  $: width = window.innerWidth * 0.65 - margin.left - margin.right;
  $: height = window.innerHeight * 0.6 - margin.top - margin.bottom;

  // get the years from the two datasets
  let years1 = Object.keys(data1);
  let years2 = Object.keys(data2);

  // get the maximum value from both datasets
  let maxValue = max([...Object.values(data1), ...Object.values(data2)]);

  // create a scale for the x axis (years of data1)
  let xScale = scaleBand()
    .domain(years1)
    .range([0, width * 1.1]);

  // create a scale for the y axis (years of data2)
  let yScale = scaleBand().domain(years2).range([height, 100]);

  // create a color scale for the proximity values
  let colorScale = scaleLinear()
    .domain([0, maxValue])
    .range(['#052c46', '#fed703']);

  // helper function to get the proximity value for a given year
  function getProximityValue(year) {
    let value1 = data1[year];
    let value2 = data2[year];
    return Math.abs(value1 - value2);
  }

  const proximityTable = {
    0: 'Very far',
    1: 'Far',
    2: 'Mid',
    3: 'Close',
    4: 'Very Close',
  };
</script>

<!-- Create an SVG element to hold the heatmap -->
<svg class="line-graph" viewBox={`45 55 ${width - 40} ${height + 40}`}>
  <!-- Create a rectangle for each year in the datasets -->
  {#each years1 as year1}
    {#each years2 as year2}
      <rect
        x={xScale(year1)}
        y={yScale(year2)}
        width={xScale.bandwidth() * 1.2}
        height={yScale.bandwidth() * 1.2}
        fill={colorScale(getProximityValue(year1))}
      />
    {/each}
  {/each}

  <!-- Add the x axis with labels for the years of data1 -->
  <g class="x-axis" transform={`translate(0, 25)`}>
    {#each years1 as year}
      <text
        x={(xScale(year) + xScale.bandwidth() / 2) - 10}
        y={height}
        text-anchor="middle"
        fill="white"
        font-size="0.65rem"
        transform={`rotate(60, ${
          xScale(year) + xScale.bandwidth() / 2
        }, ${height})`}
      >
        {'--'+year.slice(2,4)}
      </text>
    {/each}
  </g>

  <!-- Add the color legend for the proximity values -->
  <g class="legend" transform={`translate(${width * 1.05}, 0)`}>
    {#each [0, maxValue / 4, maxValue / 2, (maxValue * 3) / 4, maxValue] as value, i}
      <rect
        x={i * 100 - width + 25}
        y={height + 38}
        width={20}
        height={20}
        fill={colorScale(value)}
      />
      <text
        x={i * 100 - width + 50}
        y={height + 50}
        dominant-baseline="middle"
        fill="white"
        font-size="10"
      >
        {proximityTable[i]}
      </text>
    {/each}
  </g>
</svg>

<style>
  .line-graph {
    width: 73vw;
    height: 60vh;
  }
</style>
