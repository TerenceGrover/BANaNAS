<script>
  import {
    mean,
    standardDeviation,
    getPearsonCorrelation,
    splitWordsOnCapitalLetters,
  } from '../Utils/helpers';
  import categoryList from '../Utils/categoryList';
  import { getConclusion } from '../Utils/api-services';

  export let leftData;
  export let rightData;
  export let leftGraphData;
  export let rightGraphData;

  let paragraph = 'Transparency';

  leftData.what = splitWordsOnCapitalLetters(leftData.what);
  rightData.what = splitWordsOnCapitalLetters(rightData.what);

  if (leftData.desc && rightData.desc) {
    if(leftData.desc.match(/\(([^)]+)\)/) && leftData.desc.match(/\(([^)]+)\)/).length > 2){
      //Join element 1 and 2
      leftData.unit = leftData.desc.match(/\(([^)]+)\)/)[1] + leftData.desc.match(/\(([^)]+)\)/)[2];
    } else {
      leftData.unit = leftData.desc.match(/\(([^)]+)\)/)[1];
    }

    if(rightData.desc.match(/\(([^)]+)\)/) && rightData.desc.match(/\(([^)]+)\)/).length > 2){
      //Join element 1 and 2
      rightData.unit = rightData.desc.match(/\(([^)]+)\)/)[1] + rightData.desc.match(/\(([^)]+)\)/)[2];
    } else {
      rightData.unit = rightData.desc.match(/\(([^)]+)\)/)[1];
    }
  } else {
    leftData.unit = '';
    rightData.unit = '';
  }

  leftData.unit = leftData.unit.replace('current', '');
  rightData.unit = rightData.unit.replace('current', '');

  console.log(leftData, rightData);

  function ParagraphSelector(newP) {
    paragraph = newP;
  }


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

  let lowestLeft = largeNumbercompactor(Math.min(...arrLeft.filter((item) => item > 0)));
  let lowestRight = largeNumbercompactor(Math.min(...arrRight.filter((item) => item > 0)));
  let highestLeft = largeNumbercompactor(Math.max(...arrLeft));
  let highestRight = largeNumbercompactor(Math.max(...arrRight));

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
    <h2 id="r">
      {emojiLeft} / {emojiRight} R-index =
      <i
        style={rIndex > 0
          ? 'color: green'
          : rIndex < 0
          ? 'color: red'
          : 'color: #052c46'}>{rIndex}</i
      >
    </h2>
    <div id="button-container">
      <button
        class="detail-buttons"
        on:click={() => ParagraphSelector('Transparency')}
        ><i>🔎</i><br /></button
      >
      <button
        class="detail-buttons"
        on:click={() => ParagraphSelector('Concept')}
        ><i>💡</i><br /></button
      >
      <button
        class="detail-buttons"
        on:click={() => ParagraphSelector('Creators')}
        ><i>☭</i><br /></button
      >
    </div>
  </div>
  <div id="right-container">
    <div id="top-container">
      <ol>
        <li id="bullet-1">
          {leftData.where}'s {leftData.what} has an average of {meanLeft} {leftData.unit}
        </li>
        <li id="bullet-2">
          {rightData.where}'s {rightData.what} has an average of {meanRight} {rightData.unit}
        </li>
        <li id="bullet-3">
        Everything is pointless and meaningless. Only bananas matter.  
        </li>
      </ol>
    </div>
    <div id="paragraph-container">
      <p id="paragraph">
        When
        {splitWordsOnCapitalLetters(leftData.what)} in {leftData.where}
        goes up by one {leftData.unit},
        {splitWordsOnCapitalLetters(rightData.what)} in {rightData.where}
        {rIndex > 0.5
          ? 'goes up by ' + rIndex + ' ' + rightData.unit
          : rIndex < -0.5
          ? 'goes down by ' + Math.abs(rIndex) + ' ' + rightData.unit
          : "could'nt care less"}.
      </p>
      <p>
        During the requested time frame, the lowest {leftData.what} in {leftData.where} was {lowestLeft} {leftData.unit} and the highest {leftData.what} was {highestLeft} {leftData.unit}.
      </p>
      <p>
        On the other hand, the lowest {rightData.what} in {rightData.where} was {lowestRight} {rightData.unit} and the highest {rightData.what} was {highestRight} {rightData.unit}.
      </p>
      <p>The R-index is a measure of the correlation between two variables.</p>
      <p>Jeff Bezos is a mass murderer.</p>
    </div>
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    grid-column-gap: 60px;
    width: 100%;
    min-height: 70vh;
    padding: 3vh, 1vw;
    margin: 0 2vw 2vh 2vw;
  }

  #left-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 5vh;
    font-size: 18px;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #052c46;
    background-color: #fed703;
    border: none;
    padding: 7vh 4vw;
    line-height: 4vh;
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

  i {
    font-style: normal;
    font-weight: 700;
  }

  #r {
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 6vh;
    color: #fed703;
    background-color: #052c46;
    padding: 4vh 2vw;
    margin-bottom: 20%;
    border-radius: 12px;
    box-shadow: 8px 8px 0px 2px #000000aa;
    text-decoration: underline;
    text-align: center;
  }

  #button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25vw;
    gap: 50px;
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

  ol{
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
  }

  #paragraph-container > p {
    font-family: 'Farro', sans-serif;
    text-align: justify;
  }
  
</style>
