<script>
  import {
    mean,
    splitWordsOnCapitalLetters,
  } from '../Utils/helpers';
  import categoryList from '../Utils/categoryList';
  import { getConclusion } from '../Utils/api-services';
  import LineGraph1 from './Data/Line-Graph1.svelte';

  export let metaData;
  export let worldAvg;

  let paragraph = 'Transparency';

  // metaData.what = metaData.what.label;

  if (metaData.desc.match(/\(([^)]+)\)/)) {
    if (metaData.desc.match(/\(([^)]+)\)/).length > 2) {
      //Join element 1 and 2
      metaData.unit =
        metaData.desc.match(/\(([^)]+)\)/)[1] +
        metaData.desc.match(/\(([^)]+)\)/)[2];
    } else {
      metaData.unit = metaData.desc.match(/\(([^)]+)\)/)[1];
    }

  } else {
    metaData.unit = '';
  }

  let conclusion = 'Concluding...';

  // $: rIndex, conclude();

  // async function conclude() {
  //   const response = await getConclusion(
  //     leftWhat,
  //     leftData.where,
  //     rightWhat,
  //     rightData.where,
  //     rIndex
  //   );
  //   conclusion = response;
  // }

  let arr = Object.values(worldAvg);

  let emoji = categoryList.find((item) => {
    return item.name === metaData.cat;
  }).emoji;

  let meanData = largeNumbercompactor(mean(arr));

  let lowest = largeNumbercompactor(
    Math.min(...arr.filter((item) => item > 0))
  );
  let highest = largeNumbercompactor(Math.max(...arr));

  function largeNumbercompactor(number) {
    if (number > 1000000) {
      return (number / 1000000).toFixed(2) + 'M';
    } else if (number > 1000) {
      return (number / 1000).toFixed(2) + 'K';
    } else {
      return +number.toFixed(3);
    }
  }
</script>

<main>
  <div id="wrapper">
  <div id="left-container" >
    <LineGraph1 data = {worldAvg} {metaData} />
  </div>
  <div id="right-container">
    <div id="top-container">
      <ol>
        <li id="bullet-1">
          {emoji} The World's {metaData.what.label} has an average of {meanData}
          {emoji}
          {metaData.unit}
        </li>
        <li id="bullet-3">
          Hot take : The world's only value is its banana production
        </li>
      </ol>
    </div>
  </div>
</div>
<div id="paragraph-container">
  <p id="paragraph">
    During the requested time frame, the lowest {metaData.what.label} in the World
    was {lowest}
    {metaData.unit}
  </p>
  <p>
    During the requested time frame, the highest {metaData.what.label} in the World
    was {highest}
    {metaData.unit}
  </p>
  <p>{conclusion}</p>
</div>

</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 65vh;
    padding: 3vh, 1vw;
    margin: 0 2vw 2vh 2vw;
    gap: 2.5vh;
  }

  #wrapper{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  #left-container {
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    border: none;
    padding: 7vh 4vw;
    width: 100%;
    gap: 2vw;
    padding: 2vh 2vw;
    border: 2px solid #052c46;
    background-color: #052c46;
    border-radius: 12px;
    box-shadow: 8px 8px 0px 2px #000000aa;
  }

  #right-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vh;
    font-size: 18px;
    font-weight: 600;
    padding: 2vh 4vw;
    line-height: 4vh;
  }

  ol {
    margin: 0, 2vw;
  }

  ol > li {
    text-align: start;
    color: #052c46;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    font-size: 18px;
  }

  #paragraph-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vh;
    font-size: 16px;
    font-weight: 600;
    color: #fed703;
    background-color: #052c46;
    border: none;
    padding: 4vh 4vw;
    line-height: 4vh;
    margin-top: 10px;
    border: 2px solid #052c46;
    border-radius: 12px;
    box-shadow: 8px 8px 0px 2px #000000aa;
    width: 100%;
  }

  #paragraph-container > p {
    font-family: 'Farro', sans-serif;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    main {
      display: flex;
      flex-direction: column;
    }

    #left-container {
      gap: 1.5vh;
      padding: 3vh 4vw;
    }

    #right-container {
      gap: 1.5vh;
    }
  }
</style>
