<script>
  import { max, range } from 'd3-array';
  import { axisTop } from 'd3-axis';
  import { scaleLinear, scaleBand } from 'd3-scale';
  import { easeLinear } from 'd3-ease';
  import { select } from 'd3-selection';
  import { onMount, onDestroy } from 'svelte';

  export let data;
  export let metaData;

  let itv;
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
  let yScale = scaleBand().domain(countries).range([0, height]).padding(0.25);

  // create a function to update the bar chart
  function updateBarChart(year) {
    // get the values for the selected year
    let prevValues = [];
    let prevEntries = [];
    let values = Object.values(data[year]);
    let entries = Object.entries(data[year]);
    if (year !== years[0]) {
      prevValues = Object.values(data[year - 1]);
      prevEntries = Object.entries(data[year - 1]);
    }

    let mergedValues = values.map((value, index) => {
      if (!value && prevValues[index]) {
        return prevValues[index];
      } else {
        return value;
      }
    });

    let mergedEntries = entries.map((entry, index) => {
      if (!entry[1] && prevEntries[index]) {
        return prevEntries[index];
      } else {
        return entry;
      }
    });

    mergedValues.sort((a, b) => b - a);
    mergedEntries.sort((a, b) => b[1] - a[1]);

    // join the data to the rectangles
    let bars = select('.bars')
      .selectAll('rect')
      .data(mergedValues, (d, i) => {
        let entry = 2;
        try {
          entry = mergedEntries[i][1];
        } catch {
          entry = 0;
        }
        return entry;
      });

    // handle the exit selection
    bars.exit().remove();

    // handle the update selection
    bars
      .transition()
      .duration(1000)
      .ease(easeLinear)
      .attr('y', (d, i) => yScale(countries[i]) * 15)
      .attr('width', (d) => xScale(d))
      .attr('height', 30)
      .attr('fill', '#fed703');

    // handle the enter selection
    bars
      .enter()
      .append('rect')
      .attr('y', height)
      .attr('height', 30)
      .transition()
      .duration(1000)
      .ease(easeLinear)
      .attr('y', (d, i) => yScale(countries[i]) * 15)
      .attr('width', (d) => xScale(d))
      .attr('fill', '#fed703');

    // join the data to the text elements
    let texts = select('.bars')
      .selectAll('text')
      .data(mergedValues, (d, i) => countries[i]);

    // handle the exit selection
    texts.exit().remove();

    // handle the update selection
    texts
      .transition()
      .duration(1000)
      .ease(easeLinear)
      .attr('y', (d, i) => yScale(countries[i]) * 15 + 20)
      .text((d, i) => {
        return mergedEntries[i][0];
      });

    // handle the enter selection

    texts
      .enter()
      .append('text')
      .attr('x', 5)
      .attr('y', height)
      .text((d, i) => mergedEntries[i][0])
      .transition()
      .duration(1000)
      .ease(easeLinear)
      .attr('fill', '#052c46')
      .attr('font-size', 18)
      .attr('font-weight', 'bold')
      .attr('font-family', 'farro')
      .attr('y', (d, i) => yScale(countries[i]) * 15 + 20);
  }

  // use the onMount lifecycle method to initialize the bar chart
  onMount(() => {
    // add the rectangles to the chart

    let dataArray = Object.entries(data[years[0]]);
    dataArray.sort((a, b) => b[1] - a[1]);

    select('.bars')
      .selectAll('rect')
      .data(dataArray)
      .enter()
      .append('rect')
      .attr('y', (d, i) => yScale(d[0]) * 15)
      .attr('width', (d) => xScale(d[1]))
      .attr('height', 30)
      .attr('fill', '#fed703')
      .append('title')
      .text((d) => d[0] + ': ' + d[1]);

    select('.year-label').text(years[0]);

    // add countries name to the rectangles

    select('.bars')
      .selectAll('text')
      .data(dataArray)
      .enter()
      .append('text')
      .attr('x', 5)
      .attr('y', (d, i) => yScale(d[0]) * 15 + 20)
      .attr('fill', '#052c46')
      .attr('font-size', 18)
      .attr('font-family', 'farro')
      .text((d) => d[0]);

    // add the top x axis to the chart
    select('.bars')
      .append('g')
      .attr('transform', 'translate(0, 0)')
      .call(axisTop(xScale).ticks(10))
      .attr('stroke', 'white')

    //add title to the chart
    select('.bars')
      .append('text')
      .attr('x', width / 2)
      .attr('y', 0)
      .attr('fill', '#052c46')
      .attr('font-size', 30)
      .attr('font-family', 'farro')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'middle')
      .text(metaData.what.label + ' by country in' + ' ' + metaData.unit);

    // add the year label to the chart
    select('.year-label').text(years[0]).attr('font-size', 40);
    
    let index = 0;
    itv = setInterval(() => {
      updateBarChart(years[index]);

      select('.year-label').text(years[index]);
      console.log(years[index]);

      index = (index + 1) % years.length;
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(itv);
  });

</script>

<div class="chart">
  <svg class="bars" />
  <div class="year-label" />
</div>

<style>
  .chart {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 70vh;
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
