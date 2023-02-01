<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import {splitWordsOnCapitalLetters} from '../../Utils/helpers';

  export let data1;
  export let data2;
  export let leftData;
  export let rightData;
  export let filterYears;

  let dataArray1 = Object.entries(data1)
    .filter(([year, value]) => {
      if (filterYears.length>0) {
        return (filterYears.includes(+year) && value !== null)
      } else {
        return value !== null
      }
    })
    .map(([year, value]) => ({
      year: +year,
      value: value,
    }));


  const dataArray2 = Object.entries(data2)
    .filter(([year, value]) => {
      if (filterYears.length>0) {
        return (filterYears.includes(+year) && value !== null)
      } else {
        return value !== null
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


  onMount(async () => {

    // Set the dimensions of the canvas / graph
    var margin = { top: 60, right: 120, bottom: 100, left: 100 },
      width = window.innerWidth * 0.7 - margin.left - margin.right,
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
          .map((val, i) => val + (i ? 0.01 : -0.02) * val)
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
    var yAxisLeft = d3.axisLeft(yLeft).tickFormat(d3.format('.2s'));
    var yAxisRight = d3.axisRight(yRight).tickFormat(d3.format('.2s'));

    // Define the bottom x-axis
    var xAxis = d3
      .axisBottom(x)
      .tickFormat(d3.format("d"))
      .tickPadding(10);

    // Adds the svg canvas

    var svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add the left y-axis

    svg
      .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,0)")
      .call(yAxisLeft)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style('color', '#fe9400')
      .text("Value ($)");

    // Add the right y-axis

    svg
      .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ",0)")
      .call(yAxisRight)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");

    // Add the bottom x-axis

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Year");

    const div1 = d3.select("#tooltip1");
    const div2 = d3.select("#tooltip2");

    // points data1

    svg.selectAll("dot")
      .data(dataArray1)
      .enter()
      .append("circle")
      .attr("r", 3)
      .attr("cx", function(d) { return x(d.year); })
      .attr("cy", function(d) { return yLeft(d.value); })
      .style("stroke", "#fe9400")
      .style('stroke-width', '1px')
      .style("fill", "#fe940055")
      .on('mouseover', function (event, datum) {
        d3.select(this).transition()
          .duration('100')
          .attr("r", 7);
        div1.transition()
          .duration(100)
          .style("opacity", 1)
        div1.html((datum.year).toFixed(2))
          .style("left", (event.offsetX + 25) + "px")
          .style("top", (event.offsetY - 10) + "px")
      })
      .on('mouseout', function (event, datum) {
        d3.select(this).transition()
          .duration('200')
          .attr("r", 3);
        div1.transition()
          .duration('200')
          .style("opacity", 0);
      });

    // points data2

    svg.selectAll("dot")
      .data(dataArray2)
      .enter()
      .append("circle")
      .attr("r", 3)
      .attr("cx", function(d) { return x(d.year); })
      .attr("cy", function(d) { return yRight(d.value); })
      .style("stroke", "#f8ff2a")
      .style('stroke-width', '1px')
      .style("fill", "#f8ff2a55")
      .on('mouseover', function (event, datum) {
        d3.select(this).transition()
          .duration('100')
          .attr("r", 7);
        div2.transition()
          .duration(100)
          .style("opacity", 1)
        div2.html((datum.year).toFixed(2))
          .style("left", (event.offsetX + 25) + "px")
          .style("top", (event.offsetY - 10) + "px")
      })
      .on('mouseout', function (event, datum) {
        d3.select(this).transition()
          .duration('200')
          .attr("r", 3);
        div2.transition()
          .duration('200')
          .style("opacity", 0);
      });


    // Add the first line label

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width - 100)
      .attr("y", -40)
      .style("fill", "#fe9400")
      .text(leftData.where);

    // Add the second line label

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width - 100)
      .attr("y", -20)
      .style("fill", "#f8ff2a")
      .text(rightData.where);

    // Add the title

    svg
      .append("text")
      .attr("class", "title")
      .attr("x", width / 2)
      .attr("y", -20)
      .style("text-anchor", "middle")
      .style("font-size", "18px")
      .style("text-decoration", "underline")
      .style("text-decoration", "bold")
      .style('fill', '#fff')
      .text(splitWordsOnCapitalLetters(leftData.what) + " in " + leftData.where + " VS " + splitWordsOnCapitalLetters(rightData.what)  + " in " + rightData.where);

    // Add the x-axis label

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width / 2)
      .attr("y", height + 50)
      .style("text-anchor", "middle")
      .style('fill', '#fff')
      .text("Years");

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
      .attr('y', width + 40)
      .style('text-anchor', 'middle')
      .style('fill', '#f8ff2a')
      .text(rightData.desc);

  });

</script>

<main>
  <div id="tooltip1" style="opacity: 0;"></div>
  <div id="tooltip2" style="opacity: 0;"></div>

  <svg id="chart"></svg>
</main>

<style>

  *{
    color: white;
  }
  

  #chart {
    width: 67vw;
    height: 55vh;
  }

  #tooltip1 {
    position: fixed;
    text-align: center;
    padding: .2rem;
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
    padding: .2rem;
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
