<script>
  import { onMount, onDestroy } from 'svelte';
  import * as d3 from 'd3';
  import { splitWordsOnCapitalLetters } from '../../Utils/helpers';

  export let data1;
  export let data2;
  export let leftData;
  export let rightData;
  export let filterYears;

  const isMobile = window.innerWidth < 768;

  $: data1, console.log(data1);
  $: data2, console.log(data2);


  onMount(async () => {
    drawGraph();
    if (!isMobile) {
      window.addEventListener('resize', handleResize);
    }
  });

  onDestroy(() => {
    window.removeEventListener('resize', handleResize);
  });

  const handleResize = () => {
    d3.select('.line-graph').html('');
    drawGraph();
  };

  let dataArray1 = Object.entries(data1)
    .filter(([year, value]) => {
      if (filterYears.length > 0) {
        return filterYears.includes(+year) && value !== null;
      } else {
        return value !== null;
      }
    })
    .map(([year, value]) => ({
      year: +year,
      value: value,
    }));

  const dataArray2 = Object.entries(data2)
    .filter(([year, value]) => {
      if (filterYears.length > 0) {
        return filterYears.includes(+year) && value !== null;
      } else {
        return value !== null;
      }
    })
    .map(([year, value]) => ({
      year: +year,
      value: value,
    }));

  const lowestYear = Math.min(dataArray1[0].year, dataArray2[0].year);
  const highestYear = Math.max(
    dataArray1[dataArray1.length - 1].year,
    dataArray2[dataArray2.length - 1].year
  );

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

    let yRight = d3
      .scaleLinear()
      .domain(
        d3
          .extent(dataArray2, function (d) {
            return d.value;
          })
          .map((val, i) => val + (i ? 0.02 : -0.02) * val)
      )
      .interpolate(d3.interpolateRound)
      .nice()
      .range([height, 0]);

    // Define the left and right y-axis
    let yAxisLeft = d3.axisLeft(yLeft).tickFormat(d3.format('.2s'));
    let yAxisRight = d3.axisRight(yRight).tickFormat(d3.format('.2s'));

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

    let line2 = d3
      .line()
      .x(function (d) {
        return x(d.year);
      })
      .y(function (d) {
        return yRight(d.value);
      })
      .curve(d3.curveMonotoneX);

    // Adds the svg canvas

    let svg = d3
      .select('.line-graph')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Add the left y-axis

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

    // Add the right y-axis

    svg
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + width + ',0)')
      .call(yAxisRight)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end');

    // Add the bottom x-axis

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

      // Add the first line make it look like it is drawing

    svg
      .append('path')
      .attr('class', 'line')
      .attr('d', line1(dataArray1))
      .style('stroke', '#fe9400')
      .style('stroke-width', '4px')
      .style('fill', 'none')
      .transition()
      .duration(1500)
      .attrTween('stroke-dasharray', function () {
        var len = this.getTotalLength();
        return function (t) {
          return (d3.interpolateString('0,' + len, len + ',0')(t));
        };
      });


    // Add the second line

    svg
      .append('path')
      .attr('class', 'line')
      .attr('d', line2(dataArray2))
      .style('stroke', '#f8ff2a')
      .style('stroke-width', '4px')
      .style('fill', 'none')
      .transition()
      .duration(1500)
      .attrTween('stroke-dasharray', function () {
        var len = this.getTotalLength();
        return function (t) {
          return (d3.interpolateString('0,' + len, len + ',0')(t));
        };
      });

    // Add the first line label

    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', width - 30)
      .attr('y', -45)
      .style('fill', '#fe9400')
      .text(leftData.where);

    // Add the second line label

    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', width - 30)
      .attr('y', -25)
      .style('fill', '#f8ff2a')
      .text(rightData.where);

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
      .text(
        splitWordsOnCapitalLetters(leftData.what) + ' in ' + leftData.where
      );
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
      .text('VS');

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
      .text(
        splitWordsOnCapitalLetters(rightData.what) + ' in ' + rightData.where
      );

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
      .text(leftData.desc);

    // Add the second y-axis label

    svg
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', width + 50)
      .style('text-anchor', 'middle')
      .style('fill', '#f8ff2a')
      .text(rightData.desc);
  }
</script>

<main>
  <div id="tooltip1" style="opacity: 0;" />
  <div id="tooltip2" style="opacity: 0;" />

  <svg class="line-graph" />
</main>

<style>
  * {
    color: white;
  }

  .line-graph {
    width: 73vw;
    height: 55vh;
  }

  #tooltip1 {
    position: fixed;
    text-align: center;
    padding: 0.2rem;
    background: #052c46;
    color: #fe9400;
    border: 2px solid #fe9400;
    border-radius: 5px;
    pointer-events: none;
    font-size: 2vh;
    font-family: 'Farro', sans-serif;
    filter: drop-shadow(2px 2px 0px black);
  }

  #tooltip2 {
    position: fixed;
    text-align: center;
    padding: 0.2rem;
    background: #052c46;
    color: #fed703;
    border: 2px solid #fed703;
    border-radius: 5px;
    pointer-events: none;
    font-size: 2vh;
    font-family: 'Farro', sans-serif;
    filter: drop-shadow(2px 2px 0px black);
  }
</style>
