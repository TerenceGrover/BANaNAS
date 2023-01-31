<script>
  import * as d3 from "d3";
  export let data1;
  export let data2;

  // Convert data objects into arrays of objects
  const dataArray1 = Object.entries(data1).map(([year, value]) => ({
    year: +year,
    value: value || 0
  }));

  const dataArray2 = Object.entries(data2).map(([year, value]) => ({
    year: +year,
    value: value || 0
  }));

  const width = 500;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataArray1.concat(dataArray2), d => d.year))
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataArray1.concat(dataArray2), d => d.value)
    ])
    .range([height - margin.bottom, margin.top]);

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
  <g class="chart" transform={`translate(${margin.left}, 0)`}>
    <path d={line1(dataArray1)} />
    <path d={line2(dataArray2)} />

    <g
      class="x axis"
      transform={`translate(0, ${height - margin.bottom})`}
    >
      <path
        class="domain"
        d={`M${xScale.range()[0]},6V0H${xScale.range()[1]}V6`}
      />
    </g>

    <g class="y axis" transform={`translate(${margin.left}, 0)`}>
      <path
        class="domain"
        d={`M-${margin.left},${yScale.range()[0]}V${yScale.range()[1]}H-${margin.left}`}
      />
      <text fill="#000" x="-9" y="0" dy="0.71em" transform="rotate(-90)">
        Y Axis Description
      </text>
    </g>
  </g>
</svg>
