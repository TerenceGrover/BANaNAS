<script>
  import { scaleLinear, scaleBand } from 'd3-scale';
  import { max } from 'd3-array';

  export let data1;
  export let data2;

  // set the dimensions and margins of the graph
  let width = 900;
  let height = 600;

  // get the years from the two datasets
  let years1 = Object.keys(data1);
  let years2 = Object.keys(data2);

  // get the maximum value from both datasets
  let maxValue = max([...Object.values(data1), ...Object.values(data2)]);

  // create a scale for the x axis (years of data1)
  let xScale = scaleBand().domain(years1).range([0, width * 1.1]);

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
</script>

<!-- Create an SVG element to hold the heatmap -->
<svg class="line-graph" viewBox={`25 25 ${width} ${height + 30}`}>
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
        x={xScale(year) + xScale.bandwidth() / 2}
        y={height}
        text-anchor="middle"
        fill="white"
        transform={`rotate(60, ${xScale(year) + xScale.bandwidth() / 2}, ${height})`}
      >
        {year}
      </text>
    {/each}
  </g>

  <!-- Add the y axis with labels for the years of data2 -->
  <!-- <g class="y-axis" transform={`translate(100, 0)`}>
    {#each years2 as year}
      <text
        x={0}
        y={yScale(year) + yScale.bandwidth() / 2}
        text-anchor="middle"
        dominant-baseline="central"
        fill="white"
      >
        {year}
      </text>
    {/each}
  </g> -->

  <!-- Add the color legend for the proximity values -->
  <g class="legend" transform={`translate(${width * 1.05}, 0)`}>
    {#each [0, maxValue / 4, maxValue / 2, (maxValue * 3) / 4, maxValue] as value}
      <rect
        x={width - 60}
        y={value * 2}
        width={20}
        height={20}
        fill={colorScale(value)}
      />
      <text x={30} y={value * 2 + 10} dominant-baseline="middle" fill="white">
        {
          typeof value === 'number'
            ? value.toFixed(2)
            : value}
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
