<script>

  import * as d3 from "d3";
  import { onMount } from "svelte";

  const data = [4, 8, 15, 16, 23, 42];

  onMount(() => {

    const x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, 420])

    const div = d3.select(".chart")
      .style("font", "10px sans-serif")
      .style("text-align", "right")
      .style("color", "white");

      div.selectAll("div")
      .data(data)
      .join("div")
        .style("background", "#fed703")
        .style("padding", "3px")
        .style("margin", "1px")
        .style("width", d => `${x(d)}px`)
        .text(d => d);
  });

</script>


<div class="chart"></div>