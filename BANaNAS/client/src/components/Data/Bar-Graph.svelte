<script>

  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  let mockData = [30, 86, 168, 281, 303, 365];
	let el;

  const mean = d3.mean(mockData);

	onMount(() => {
		d3.select(el)
			.selectAll("div")
			.data(mockData)
			.enter()
			.append("div")
			.style("width", function(d) {
				return d + "px";
			}
      )
			.text(function(d) {
				return d;
			});
	});
</script>

<div bind:this={el} class="chart"></div>
<span id="test-span">{mean}</span>

<style>

  #test-span {
    color: white;
  }

  .chart :global(div) {
      font: 10px sans-serif;
      background-color: #fed703;
      text-align: right;
      padding: 3px;
      margin: 1px;
      color: white;
    }

</style>