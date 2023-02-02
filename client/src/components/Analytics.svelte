<script>
  import {
    mean,
    standardDeviation,
    getPearsonCorrelation,
    splitWordsOnCapitalLetters,
  } from '../Utils/helpers';
  import categoryList from '../Utils/categoryList';

  export let leftData;
  export let rightData;
  export let leftGraphData;
  export let rightGraphData;

  let paragraph = 'Transparency';

  function ParagraphSelector(newP) {
    paragraph = newP;
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
  <div id="left-container">
    <div id="test">GRAPH</div>
    <h2 id="r">{emojiLeft} / {emojiRight} R-index = {rIndex}</h2>
    <div id="button-container">
      <button
        class="detail-buttons"
        on:click={() => ParagraphSelector('Transparency')}
        ><i>🔎</i><br /> Transparency</button
      >
      <button
        class="detail-buttons"
        on:click={() => ParagraphSelector('Concept')}
        ><i>💡</i><br /> Concept</button
      >
      <button
        class="detail-buttons"
        on:click={() => ParagraphSelector('Creators')}
        ><i>☭</i><br /> Creators</button
      >
    </div>
  </div>
  <div id="left-container">
    <div id="top-container">
      <ol>
        <li id="bullet-1">
          {leftData.where}'s {leftData.what} has an average of {meanLeft}
        </li>
        <li id="bullet-2">
          {rightData.where}'s {rightData.what} has an average of {meanRight}
        </li>
        <li id="bullet-3">
          As {leftData.where}'s {leftData.what} increases by one, {rightData.where}'s
          {rightData.what}
          {rIndex > 0.5
            ? 'increases by ' + rIndex
            : rIndex < -0.5
            ? 'decreases by ' + Math.abs(rIndex)
            : 'does not change'}
        </li>
      </ol>
    </div>
    <div id="paragraph-container">
      <p id="paragraph">
        The R-index is {rIndex}. Meaning that when
        {splitWordsOnCapitalLetters(leftData.what)} in {leftData.where}
        goes up,
        {splitWordsOnCapitalLetters(rightData.what)} in {rightData.where}
        {rIndex > 0.5
          ? 'goes up'
          : rIndex < -0.5
          ? 'goes down'
          : "doesn't care"}.
      </p>
      <p id="text1">
        Mean : {meanLeft}
        <br />
        Standard Deviation (68% of data) : {standardDeviationLeft}
        <br />
        2 Standard deviations (95% of data) : {2 * standardDeviationLeft}
      </p>
      <p id="text2">
        Mean : {meanRight}
        <br />
        Standard Deviation (68% of data) : {standardDeviationRight}
        <br />
        2 Standard deviations (95% of data) : {2 * standardDeviationRight}
      </p>
      <p id="text3">
        The R-index is a measure of the correlation between two variables.
      </p>
      <p id="text4">Jeff Bezos is a mass murderer.</p>
    </div>
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    grid-column-gap: 75px;
    width: 100%;
    min-height: 70vh;
    padding: 3vh, 1vw;
    margin: 0 2vw 2vh 2vw;
  }

  #test {
    background-color: rgba(103, 103, 103, 0.384);
    height: 250px;
    width: 400px;
  }

  #left-container {
    display: flex;
    flex-direction: column;
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
  }

  i {
    font-style: normal;
  }

  #r {
    font-size: 2rem;
    font-weight: 500;
    color: #052c46;
    text-decoration: underline;
  }

  #button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 25vw;
    gap: 100px;
    background-color: #fed703;
  }

  .detail-buttons {
    font-size: 20px;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #052c46;
    background-color: #fed703;
    border: none;
    padding: 2vh 4vw;
    margin-top: 20px;
    border: 2px solid #052c46;
    border-radius: 12px;
    box-shadow: 6px 6px 0px 2px #000000aa;
    min-width: 180px;
    max-width: 200px;
    text-align: center;
  }

  .detail-buttons:hover {
    cursor: pointer;
    background-color: #ffe23c;
  }

  ol > li {
    font-family: 'Farro', sans-serif;
    font-weight: 500;
    font-size: 1.2rem;
    border: none;
    text-align: center;
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

  #paragraph {
    text-align: center;
  }
</style>
