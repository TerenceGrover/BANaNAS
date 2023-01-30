<script>
  import * as d3 from "d3";

  export let data1;
  export let data2;

  let width = 1000
  let height = 750

  const dataArray1 = Object.entries(data1).map(([year, value]) => ({
    year: +year,
    value: value || 0
  }));

  const dataArray2 = Object.entries(data2).map(([year, value]) => ({
    year: +year,
    value: value || 0
  }));

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataArray1.concat(dataArray2), d => d.year))
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataArray1.concat(dataArray2), d => d.value)
    ])
    .range([height, 0]);

  const line1 = d3
    .line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.value));

  const line2 = d3
    .line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.value));

</script>

<svg width={width} height={height}>
  <g class="chart">
    <path d={line1(dataArray1)} />
    <path d={line2(dataArray2)} />
  </g>
</svg>