<script>

  import {mean, standardDeviation, getPearsonCorrelation, splitWordsOnCapitalLetters} from '../Utils/helpers';
  import categoryList from '../Utils/categoryList';

  export let leftData;
  export let rightData;
  export let leftGraphData;
  export let rightGraphData;

  let arrRight = Object.values(rightGraphData);
  let arrLeft = Object.values(leftGraphData);

  let emojiLeft = categoryList.find((item) => {
    return item.name === leftData.cat;
  }).emoji;

  let emojiRight = categoryList.find((item) => {
    return item.name === rightData.cat;
  }).emoji;

  let meanLeft = largeNumbercompactor(mean(arrLeft))
  let meanRight = largeNumbercompactor(mean(arrRight))

  let standardDeviationLeft = largeNumbercompactor(standardDeviation(arrLeft))
  let standardDeviationRight = largeNumbercompactor(standardDeviation(arrRight))

  let rIndex = getPearsonCorrelation(arrLeft, arrRight);

  function largeNumbercompactor(number) {
    if (number > 1000000) {
      return (number / 1000000).toFixed(2) + 'M';
    } else if (number > 1000) {
      return (number / 1000).toFixed(2) + 'K';
    } else {
      return number;
    }
  }

</script>

<main>

  
  <div id="top-container">
    <div id='test'>GRAPH</div>
    <h2 id='r'>R-index = {rIndex}</h2>
    <h2 id='emoji'>{emojiLeft} / {emojiRight}</h2>
  </div>

  <div id="paragraph-container">
    <p id="paragraph">
      The R-index is a measure of the correlation between two variables. The closer the R-index is to 1, the more correlated the two variables are. The closer the R-index is to 0, the less correlated the two variables are.
      the R-index can also be negative, meaning that the two variables are negatively correlated.
    </p>
    <p id="paragraph">
      The R-index is {rIndex}. Meaning that the {splitWordsOnCapitalLetters(leftData.what)} in {leftData.where} and the {splitWordsOnCapitalLetters(rightData.what)} in {rightData.where} are {rIndex > 0.5 ? 'highly' : 'not'} correlated.
    </p>
    <p id="paragraph">
      The mean of the {splitWordsOnCapitalLetters(leftData.what)} in {leftData.where} is {meanLeft} and the standard deviation is {standardDeviationLeft}.
    </p>
    <p id="paragraph">
      The mean of the {splitWordsOnCapitalLetters(rightData.what)} in {rightData.where} is {meanRight} and the standard deviation is {standardDeviationRight}.
    </p>
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
    padding: 3vh, 1vh;
  }

  #test{
    background-color: rgba(103, 103, 103, 0.384);
    height: 250px;
    width: 400px;
  }

  #top-container{
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

  #emoji{
    font-size: 2rem;
    font-weight: 700;
    color: #052c46;
  }

  #paragraph-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vh;
    font-size: 18px;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #052c46;
    background-color: #fed703;
    border: none;
    padding: 2vh 6vw;
    line-height: 4vh;
    margin-top: 20px;
    border: 2px solid #052c46;
    border-radius: 12px;
    box-shadow: 8px 8px 0px 2px #000000aa;
    text-align: justify;
  }


</style>