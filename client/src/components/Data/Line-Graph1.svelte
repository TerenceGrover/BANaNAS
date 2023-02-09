<script>
  import { onMount, onDestroy } from 'svelte';
  import * as d3 from 'd3';

  export let data;
  export let metaData;

  onMount(async () => {
    drawGraph();
    window.addEventListener('resize', handleResize);
  });

  onDestroy(() => {
    window.removeEventListener('resize', handleResize);
  });

  const handleResize = () => {
    d3.select('.line-graph-one').html('');
    drawGraph();
  };

  let dataArray1 = Object.entries(data).map(([year, value]) => ({
    year: +year,
    value: value,
  }));

  let aggregation = Object.values(data).reduce((acc, val) => acc + val, 0);

  const lowestYear = dataArray1[0].year;
  const highestYear = dataArray1[dataArray1.length - 1].year;

  function drawGraph() {
    // Set the dimensions of the canvas / graph
    let margin = { top: 60, right: 120, bottom: 100, left: 100 },
      width = window.innerWidth * 0.72 - margin.left - margin.right,
      height = window.innerHeight * 0.6 - margin.top - margin.bottom;

    // Set the ranges
    let x = d3
      .scaleLinear()
      .domain([lowestYear, highestYear])
      .range([10, width - 10]);

    let yLeft = d3
      .scaleLinear()
      .domain(
        d3
          .extent(dataArray1, function (d) {
            return d.value;
          })
          .map((val, i) => val + (i ? 0.02 : -0.02) * val)
      )
      .interpolate(d3.interpolateRound)
      .nice()
      .range([height, 0]);

    // Define the left and right y-axis
    let yAxisLeft = d3.axisLeft(yLeft).tickFormat(d3.format('.2s'));

    // Define the bottom x-axis
    let xAxis = d3.axisBottom(x).tickFormat(d3.format('d')).tickPadding(10);

    // Define the two line generators
    let line1 = d3
      .line()
      .x(function (d) {
        return x(d.year);
      })
      .y(function (d) {
        return yLeft(d.value);
      })
      .curve(d3.curveMonotoneX);

    // Adds the svg canvas

    let svg = d3
      .select('.line-graph-one')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Add the y-axis

    svg
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(0,0)')
      .call(yAxisLeft)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .style('color', '#fe9400')
      .text('Value ($)');

    // Add the x-axis

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .append('text')
      .attr('x', width)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .text('Year');

      if(aggregation) {
        svg
          .append('path')
          .attr('class', 'line')
          .attr('d', line1(dataArray1))
          .style('stroke', '#fe9400')
          .style('stroke-width', '4px')
          .style('fill', 'none')
          .transition()
          .duration(2000)
          .attrTween('stroke-dasharray', function () {
            var len = this.getTotalLength();
            return function (t) {
              return d3.interpolateString('0,' + len, len + ',0')(t);
            };
          });
      } else {
        svg
          .append('text')
          .attr('class', 'title')
          .attr('x', width / 2)
          .attr('y', height / 2)
          .style('text-anchor', 'middle')
          .style('font-size', '18px')
          .style('text-decoration', 'underline')
          .style('text-decoration', 'bold')
          .style('fill', '#fff')
          .text('No Data Available');
      }

    // Add the line


    // Add the title

    svg
      .append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', -45)
      .style('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('text-decoration', 'underline')
      .style('text-decoration', 'bold')
      .style('fill', '#fff')
      .text(metaData.what.label);
    svg
      .append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', -22.5)
      .style('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('text-decoration', 'underline')
      .style('text-decoration', 'bold')
      .style('fill', '#fff')
      .text('in');

    svg
      .append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', 0)
      .style('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('text-decoration', 'underline')
      .style('text-decoration', 'bold')
      .style('fill', '#fff')
      .text('The Whole World');

    // Add the x-axis label

    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', width / 2)
      .attr('y', height + 50)
      .style('text-anchor', 'middle')
      .style('fill', '#fff')
      .text('Years');

    // Add the y-axis label

    svg
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -40)
      .style('text-anchor', 'middle')
      .style('fill', '#fe9400')
      .text(metaData.desc);
  }
</script>

<main>
  <svg class="line-graph-one" />
</main>

<style>
  * {
    color: white;
  }

  .line-graph-one {
    width: 65vw;
    height: 55vh;
    background-color: #052c46;
    padding: 2vh 0;
  }
</style>
