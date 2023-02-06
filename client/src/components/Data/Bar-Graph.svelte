<script>
  import { max, range } from 'd3-array';
  import { scaleLinear, scaleBand } from 'd3-scale';
  import { easeLinear } from 'd3-ease';
  import { select } from 'd3-selection';
  import { onMount } from 'svelte';

  export let data;
  const isMobile = window.innerWidth < 768;
  let width = window.innerWidth * 0.65;
  let height = window.innerHeight * 0.6;

  // get the years from the dataset
  let years = Object.keys(data);
  // get the countries from the dataset
  let countries = [];
  years.forEach((year) => {
    Object.keys(data[year]).forEach((country) => {
      if (!countries.includes(country)) {
        countries.push(country);
      }
    });
  });

  // get the maximum value for the bars
  let maxValue = max(Object.values(data[years[0]]));

  // create the scales for the x and y axis
  let xScale = scaleLinear().domain([0, maxValue]).range([0, width]);

  console.log(xScale(10))

  let yScale = scaleBand().domain(countries).range([0, height]).padding(0.1);

  console.log(years, countries, data);

  // create a function to update the bar chart
  function updateBarChart(year) {
    // get the values for the selected year
    let values = Object.values(data[year]);

    // join the data to the rectangles
    let bars = select('.bars')
      .selectAll('rect')
      .data(values, (d, i) => countries[i]);

    // handle the exit selection
    bars.exit().remove();

    // handle the update selection
    bars
      .transition()
      .duration(1000)
      .ease(easeLinear)
      .attr('y', (d, i) => yScale(countries[i]))
      .attr('width', (d) => xScale(d))
      .attr('height', yScale.bandwidth());

    // handle the enter selection
    bars
      .enter()
      .append('rect')
      .attr('y', height)
      .attr('width', 0)
      .attr('height', yScale.bandwidth())
      .transition()
      .duration(1000)
      .ease(easeLinear)
      .attr('y', (d, i) => yScale(countries[i]))
      .attr('width', (d) => xScale(d));
  }

  // use the onMount lifecycle method to initialize the bar chart
  onMount(() => {
    // add the rectangles to the chart

    select('.bars')
      .selectAll('rect')
      .data(Object.values(data[years[0]]))
      .enter()
      .append('rect')
      .attr('y', (d, i) => yScale(countries[i]))
      .attr('width', (d) => xScale(d))
      .attr('height', yScale.bandwidth())
      .attr('fill','steelblue');

    // add the year label to the chart
    select('.year-label').text(years[0]);
  });

  let index = 0;

  setInterval(() => {
    updateBarChart(years[index]);

    select('.year-label').text(years[index]);

    index = (index + 1) % years.length;
  }, 1000);
</script>

<div class="chart">
  <div class="bars" />
  <div class="year-label" />
</div>

<style>
  .chart {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: relative;
  }

  .bars {
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 90%;
  }

  .year-label {
    position: absolute;
    bottom: 0;
    right: 0;
  }

</style>
