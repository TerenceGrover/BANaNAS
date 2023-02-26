<script>
  import {
    mean,
    getPearsonCorrelation,
    splitWordsOnCapitalLetters,
  } from '../Utils/helpers';
  import categoryList from '../Utils/categoryList';
  import { getConclusion, BananoGram, getMetrics } from '../Utils/api-services';

  export let leftData;
  export let rightData;
  export let leftGraphData;
  export let rightGraphData;

  let globalAverageLeft;
  let globalAverageRight;


  if (leftData.desc.match(/\(([^)]+)\)/) && rightData.desc.match(/\(([^)]+)\)/)) {
    if (
      leftData.desc.match(/\(([^)]+)\)/) &&
      leftData.desc.match(/\(([^)]+)\)/).length > 2
    ) {
      //Join element 1 and 2
      leftData.unit =
        leftData.desc.match(/\(([^)]+)\)/)[1] +
        leftData.desc.match(/\(([^)]+)\)/)[2];
    } else {
      leftData.unit = leftData.desc.match(/\(([^)]+)\)/)[1];
    }
    if (
      rightData.desc.match(/\(([^)]+)\)/) &&
      rightData.desc.match(/\(([^)]+)\)/).length > 2
    ) {
      //Join element 1 and 2
      rightData.unit =
        rightData.desc.match(/\(([^)]+)\)/)[1] +
        rightData.desc.match(/\(([^)]+)\)/)[2];
    } else {
      rightData.unit = rightData.desc.match(/\(([^)]+)\)/)[1];
    }
  } else {
    leftData.unit = '';
    rightData.unit = '';
  }

  leftData.unit = leftData.unit.replace('current', '');
  rightData.unit = rightData.unit.replace('current', '');

  const leftWhat = splitWordsOnCapitalLetters(leftData.what);
  const rightWhat = splitWordsOnCapitalLetters(rightData.what);

  let conclusion = 'Concluding...';

  $: rIndex, conclude();

  async function getGlobalAverage() {
    const responseLeft = await getMetrics(leftData.cat, leftData.what, "World");
    const responseRight = await getMetrics(rightData.cat, rightData.what, "World");
    let leftValues;
    let rightValues;
    if (responseLeft) {
      leftValues = Object.values(responseLeft).filter(data => data !== null)
    }
    if (responseRight) {
      rightValues = Object.values(responseRight).filter(data => data !== null)
    }
    globalAverageLeft = mean(leftValues);
    globalAverageRight = mean(rightValues);
  }

  async function conclude() {
    const response = await getConclusion(
      leftWhat,
      leftData.where,
      rightWhat,
      rightData.where,
      rIndex
    );
    conclusion = response;
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

  let lowestLeft = largeNumbercompactor(
    Math.min(...arrLeft.filter((item) => item > 0))
  );
  let lowestRight = largeNumbercompactor(
    Math.min(...arrRight.filter((item) => item > 0))
  );
  let highestLeft = largeNumbercompactor(Math.max(...arrLeft));
  let highestRight = largeNumbercompactor(Math.max(...arrRight));

  let lowestYear = Object.keys(rightGraphData)[0]
  let highestYear = Object.keys(rightGraphData)[(arrRight.length)-1]

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

  getGlobalAverage();
  BananoGram(leftData.what, rightData.what, leftData.where, rightData.where, String(rIndex));

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
          : 'color: #fed703'}>{rIndex > 0 ? '+' + rIndex : rIndex}</i
      >
    </h2>
    <div id="global-info-container">
      <div id="global-left" class="global-average">
        {emojiLeft}
        Since records began, {leftData.where}'s {leftWhat} has been
        {meanLeft - globalAverageLeft > 0 ? 'above' : 'below'} the
        global average by {Math.abs(meanLeft - globalAverageLeft).toFixed(2)}
        {leftData.unit}.
      </div>
      <div id="global-right" class="global-average">
        {emojiRight}
        {rightWhat} in {rightData.where} has been
        {meanRight - globalAverageRight > 0 ? 'above' : 'below'} the
        global average by {Math.abs(meanRight - globalAverageRight).toFixed(2)}
        {rightData.unit} in between {lowestYear} and {highestYear}.
      </div>
    </div>
  </div>
  <div id="right-container">
    <div id="top-container">
      <ol>
        <li id="bullet-1">
          {leftData.where}'s {leftWhat} has an average of {meanLeft}
          {leftData.unit}.
        </li>
        <li id="bullet-2">
          {rightData.where}'s {rightWhat} has an average of {meanRight}
          {rightData.unit}.
        </li>
        <li id="bullet-3">
          Everything is pointless and meaningless. Only bananas matter.
        </li>
      </ol>
    </div>
    <div id="paragraph-container">
      <p id="paragraph">
        When
        {leftWhat} in {leftData.where}
        goes up by 1 {leftData.unit},
        {rightWhat} in {rightData.where}
        {rIndex > 0
          ? 'goes up by ' + rIndex + ' ' + rightData.unit
          : 'goes down by ' + Math.abs(rIndex) + ' ' + rightData.unit}.
      </p>
      <p>
        During the requested time frame, the lowest {leftWhat} in {leftData.where}
        was {lowestLeft}
        {leftData.unit} and the highest {leftWhat} was {highestLeft}
        {leftData.unit}.
      </p>
      <p>
        On the other hand, the lowest {rightWhat} in {rightData.where} was {lowestRight}
        {rightData.unit} and the highest {rightWhat} was {highestRight}
        {rightData.unit}.
      </p>
      <p>The R-index is a measure of the correlation between two variables.</p>
      <p>{conclusion}</p>
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
    justify-content: space-evenly;
    font-size: 18px;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #052c46;
    background-color: #fed703;
    border: none;
    padding: 2vh 4vw;
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
    margin-bottom: 10%;
    border-radius: 12px;
    box-shadow: 8px 8px 0px 2px #000000aa;
    text-decoration: underline;
    text-align: center;
  }

  #global-info-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5vh;
  }

  .global-average {
    font-size: 16px;
    font-weight: 500;
    color: #fed703;
    background-color: #052c46;
    padding: 4vh 2vw;
    border-radius: 12px;
    box-shadow: 8px 8px 0px 2px #000000aa;
    text-align: center;
    line-height: 2.5vh;
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
    margin: 0 2vw;
  }

  #paragraph-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

  @media screen and (max-width: 768px) {

    main {
      display: flex;
      flex-direction: column;
    }

    #r{
      margin-bottom: 10%;
    }

    #left-container{
      gap: 1.5vh;
      padding: 3vh 4vw;
    }

    #right-container{
      gap: 1.5vh;
    }

  }
</style>
