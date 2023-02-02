<script>
  import {
    mean,
    standardDeviation,
    getPearsonCorrelation,
    splitWordsOnCapitalLetters,
  } from '../Utils/helpers';
  import { meanQuote, stDevQuote } from '../Utils/humorous-desc';
  import categoryList from '../Utils/categoryList';
  import { getConclusion } from '../Utils/api-services';

  export let leftData;
  export let rightData;
  export let leftGraphData;
  export let rightGraphData;

  const leftWhat = splitWordsOnCapitalLetters(leftData.what);
  const rightWhat = splitWordsOnCapitalLetters(rightData.what);

  let conclusion;

  $: rIndex, conclude(); 

  async function conclude() {
    const response = await getConclusion(leftWhat, leftData.where, rightWhat, rightData.where, rIndex);
    conclusion = response
  }

  let arrRight = Object.values(rightGraphData);
  let arrLeft = Object.values(leftGraphData);

  let emojiLeft = categoryList.find((item) => {
    return item.name === leftData.cat;
  }).emoji;

  let emojiRight = categoryList.find((item) => {
    return item.name === rightData.cat;
  }).emoji;

  let meanLeft = largeNumbercompactor(mean(arrLeft));
  let meanRight = largeNumbercompactor(mean(arrRight));

  let standardDeviationLeft = largeNumbercompactor(standardDeviation(arrLeft));
  let standardDeviationRight = largeNumbercompactor(
    standardDeviation(arrRight)
  );

  let rIndex = getPearsonCorrelation(arrLeft, arrRight).toFixed(3);

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
  <div id="top-container">
    <div id="test">GRAPH</div>
    <h2 id="r">R-index = {rIndex}</h2>
    <h2 id="emoji">{emojiLeft} / {emojiRight}</h2>
  </div>
  <div id="paragraph-container">
    <p id="paragraph" class="r-index">
      The R-index is {rIndex}. Meaning that when
      {leftWhat} in {leftData.where}
      goes up,
      {rightWhat} in {rightData.where}
      {rIndex > 0.5 ? 'goes up' : rIndex < -0.5 ? 'goes down' : "doesn't care"}.
    </p>

    <div id="gridcontainer">
      <span id="header1" class="grid-item header"
        >{splitWordsOnCapitalLetters(leftData.what)} {emojiLeft}</span
      >
      <span id="header2" class="grid-item header"
        >{rightWhat} {emojiRight}</span
      >
      <span id="header3" class="grid-item header"
        >{leftWhat} <br /> & <br /> {rightData.what}</span
      >
      <span id="header4" class="grid-item header">🔎 Conclusion 🔎</span>

      <p id="text1" class="data1 grid-item">
        Mean : {meanLeft}
        <br />
        Standard Deviation (68% of data) : {standardDeviationLeft}
        <br />
        2 Standard deviations (95% of data) : {2 * standardDeviationLeft}
      </p>
      <p id="text2" class="data2 grid-item">
        Mean : {meanRight}
        <br />
        Standard Deviation (68% of data) : {standardDeviationRight}
        <br />
        2 Standard deviations (95% of data) : {2 * standardDeviationRight}
      </p>
      <p id="text3" class="grid-item">
        The R-index is a measure of the correlation between two variables.
      </p>
      <p id="text4" class="grid-item">{conclusion}</p>

    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 5vh;
    min-height: 70vh;
    padding: 3vh, 1vw;
    margin: 0 2vw 2vh 2vw;
  }

  #test {
    background-color: rgba(103, 103, 103, 0.384);
    height: 250px;
    width: 400px;
  }

  #top-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5vw;
    font-size: 18px;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #052c46;
    background-color: #fed703;
    border: none;
    padding: 2vh 4vw;
    line-height: 4vh;
    margin-top: 20px;
    border: 2px solid #052c46;
    border-radius: 12px;
    box-shadow: 8px 8px 0px 2px #000000aa;
  }

  #r {
    font-size: 2rem;
    font-weight: 500;
    color: #052c46;
  }

  #emoji {
    font-size: 2rem;
    font-weight: 700;
    color: #052c46;
  }

  #paragraph-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3vw;
    font-size: 18px;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #052c46;
    background-color: #fed703;
    border: none;
    padding: 4vh 4vw;
    line-height: 4vh;
    margin-top: 20px;
    border: 2px solid #052c46;
    border-radius: 12px;
    box-shadow: 8px 8px 0px 2px #000000aa;
  }

  #gridcontainer {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 75px;
  }

  .grid-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .header {
    font-size: 1.5rem;
    font-weight: 600;
  }

  #header1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  #header2 {
    grid-area: 2 / 1 / 3 / 2;
  }
  #header3 {
    grid-area: 3 / 1 / 4 / 2;
  }
  #header4 {
    grid-area: 4 / 1 / 5 / 2;
  }
  #text1 {
    grid-area: 1 / 2 / 2 / 3;
  }
  #text2 {
    grid-area: 2 / 2 / 3 / 3;
  }
  #text3 {
    grid-area: 3 / 2 / 4 / 3;
  }
  #text4 {
    grid-area: 4 / 2 / 5 / 3;
  }

  #paragraph {
    text-align: center;
  }

  #paragraph.r-index {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 15%;
    color: #052c46;
  }
</style>
