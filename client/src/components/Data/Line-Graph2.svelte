<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import {splitWordsOnCapitalLetters} from '../../utils/helpers';

  export let data1;
  export let data2;
  export let leftData;
  export let rightData;

  function compactBigNumber(num) {
    if (num > 1000) {
      return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
    } else {
      return num;
    }
  }

  const dataArray1 = Object.entries(data1).map(([year, value]) => ({
    year: +year,
    value: value || 0
  }));

  const dataArray2 = Object.entries(data2).map(([year, value]) => ({
    year: +year,
    value: value || 0
  }));


  onMount(async () => {

    // Set the dimensions of the canvas / graph
    var margin = { top: 60, right: 120, bottom: 100, left: 120 },
      width = window.innerWidth * 0.7 - margin.left - margin.right,
      height = window.innerHeight * 0.6 - margin.top - margin.bottom;

    // Set the ranges
    var x = d3
      .scaleLinear()
      .domain([
        d3.min(dataArray1, function(d) {
          return d.year;
        }),
        d3.max(dataArray1, function(d) {
          return d.year;
        })
      ])
      .range([0, width]);

    var yLeft = d3
      .scaleLinear()
      .domain([
        d3.min(dataArray1, function(d) {
          return d.value;
        }),
        d3.max(dataArray1, function(d) {
          return d.value;
        })
      ])
      .interpolate(d3.interpolateRound)
      .nice()
      .range([height, 0]);


    var yRight = d3
      .scaleLinear()
      .domain([
        d3.min(dataArray2, function(d) {
          return d.value;
        }),
        d3.max(dataArray2, function(d) {
          return d.value;
        })
      ])
      .interpolate(d3.interpolateRound)
      .nice()
      .range([height, 0]);

    // Define the left and right y-axis
    var yAxisLeft = d3.axisLeft(compactBigNumber(yLeft));
    var yAxisRight = d3.axisRight(compactBigNumber(yRight));

    // Define the bottom x-axis
    var xAxis = d3
      .axisBottom(x)
      .tickFormat(d3.format("d"))
      .tickPadding(10);

    // Define the two line generators
    var line1 = d3
      .line()
      .x(function(d) {
        return x(d.year);
      })
      .y(function(d) {
        return yLeft(d.value);
      });

    var line2 = d3
      .line()
      .x(function(d) {
        return x(d.year);
      })
      .y(function(d) {
        return yRight(d.value);
      });

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

    // Add the first line

    svg
      .append("path")
      .attr("class", "line")
      .attr("d", line1(dataArray1))
      .style("stroke", "#fe9400")
      .style('stroke-width', '3px')
      .style("fill", "#fe940055");

    // Add the second line

    svg
      .append("path")
      .attr("class", "line")
      .attr("d", line2(dataArray2))
      .style("stroke", "#f8ff2a")
      .style('stroke-width', '3px')
      .style("fill", "#f8ff2a55");

    // Add the first line label

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width - 100)
      .attr("y", -40)
      .style("fill", "#fe9400")
      .text(splitWordsOnCapitalLetters(leftData.what) + " in " + leftData.where);

    // Add the second line label

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width - 100)
      .attr("y", -20)
      .style("fill", "#f8ff2a")
      .text(splitWordsOnCapitalLetters(rightData.what) + " in " + rightData.where);

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
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .style("text-anchor", "middle")
      .style('fill', '#fff')
      .text("Value ($)1");

      // Add the second y-axis label

    svg
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", width + 40)
      .style("text-anchor", "middle")
      .style('fill', '#fff')
      .text("Value ($)2");

  });

</script>


<svg id="chart"></svg>

<style>

  *{
    color: white;
  }
  

  #chart {
    width: 67vw;
    height: 55vh;
  }

</style>
