<script>
  import { onMount } from 'svelte';
  import Select from 'svelte-select';
  import { getSubCategories } from "../utils/api-services";
  import {splitWordsOnCapitalLetters} from '../utils/helpers';
  
  
  let whatItems
  let whereItems;
  let APIdata;
  
  export let what;
  export let where;
  export let category;
  export let currentSide;


  let inputFields 

  onMount(() => {
    inputFields = document.getElementsByClassName('sub-input');
    what = ''
    where = ''
  })

  function reset() {
    what = ''
    where = ''
    if (inputFields){
      inputFields[0].value = ''
      inputFields[1].value = ''
    }
    getSubCategories(category).then((data) => {
      APIdata = data;
      whatItems = Object.keys(data).map((item) => {
        return { value: item, label: splitWordsOnCapitalLetters(item) }
      })
    })
  }

  $: if (category) {
    reset()
  }

  $: if (what.value && !where.value) {
    whereItems = APIdata[what.value].available_countries
  }

  let topConfig = {
        placement: currentSide === 'right' ? 'top-start' : 'bottom-start'
    };
    
</script>

<main>
  <div id="sub-container" class={currentSide}>

    <div class="input-container">
      <label for="What">What : </label>
      <Select
      items={whatItems}
      placeholder="Select a data point"
      class="sub-input"
      listAutoWidth={false}
      id="What"
      bind:value = {what}
      floatingConfig={topConfig}
      clearable={false}
      />
      <!-- <input class="sub-input" type="text" id="What" /> -->
    </div>

    <div class="input-container" id={!what && 'disabled'}>
      <label for="Where">Where : </label>
      <Select
      items={whereItems}
      placeholder="Select a country"
      class="sub-input"
      listAutoWidth={false}
      id="Where"
      bind:value = {where}
      disabled={!what}
      floatingConfig={topConfig}
      />
    </div>
  </div>
</main>

<style> 
  label {
    font-size: 2.5vh;
    width: 85px;
    font-family: 'Farro', sans-serif;
    color: white;
    border: none;
    outline: none;
    cursor: auto;
  }

  #disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .left {
    top: 30%;
    left: 49%;
    margin-bottom: 20vh;
  }

  .right {
    top: 65%;
    left: 51%;
    margin-right: 30px;
  }

  .input-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 1.5vh;
    background-color: #fed703;
    border-radius: 10px;
    padding: 0vh 0vw 0 0.5vw;
  }

  #sub-container {
    position: absolute;
    height: 22vh;
    width: 25vw;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5vh;
    z-index: 10000;
    padding: 2vh 2vw;
    border: 3px solid white;
    border-radius: 16px;
    background-color: #3c5a6d42;
  }

  :global(input){
    color: #052c46 !important;
  }

  :global(.sub-input) {
    font-size: 2.5vh !important;
    font-family: 'Farro', sans-serif !important;
    color: #ffae00 !important;
    border: none !important;
    outline: none !important;
    cursor: auto !important;
    background-color: #052c46 !important;
    padding: 1vh 1vw 1vh !important;
    border-radius: 0 10px 10px 0 !important;
    width: 70% !important;
  }

  :global(.sub-input:disabled) {
    color: rgb(158, 158, 158) !important;
  }

</style>
