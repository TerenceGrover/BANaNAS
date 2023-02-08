<script>
  import { onMount } from 'svelte';
  import Select from 'svelte-select';
  import { getSubCategories } from '../Utils/api-services';
  import { splitWordsOnCapitalLetters } from '../Utils/helpers';
  export let changePage;

  $: whatItems = [
    {
      value: 'First select a category below',
      label: 'First select a category below',
    },
  ];

  const isMobile = window.innerWidth < 768;

  export let what;
  export let category;

  let inputFields;

  onMount(() => {
    inputFields = document.getElementsByClassName('sub-input');
    what = '';
  });

  function reset() {
    what = '';
    if (inputFields) {
      inputFields[0].value = '';
    }
    getSubCategories(category).then((data) => {
      console.log(data);
      whatItems = Object.keys(data).map((item) => {
        return { value: item, label: splitWordsOnCapitalLetters(item) };
      });
    });
  }

  function handleclick() {
    isMobile
      ? changePage('data', { cat: category, what: what }, null, 'single')
      : changePage('data', { cat: category, what: what }, null, 'single');
  }

  $: if (category) {
    reset();
  }

  let topConfig = {
    autoUpdate: true,
  };
</script>

<main>
  <div id="sub-container">
    <div class="input-container">
      <label for="What">What : </label>
      {#if isMobile}
        <select class="sub-input" id="What" bind:value={what}>
          <!-- <option value="" disabled selected>Select a data point</option> -->
          {#if !whatItems}
            <option value="" disabled selected>Select a data point</option>
          {:else}
            <option value="" disabled selected>Select a data point</option>
            {#each whatItems as item}
              <option value={item.value}>{item.label}</option>
            {/each}
          {/if}
        </select>
      {:else}
        <Select
          items={whatItems}
          placeholder="Select a data point"
          class="sub-input"
          listAutoWidth={false}
          id="What"
          bind:value={what}
          floatingConfig={topConfig}
          clearable={false}
          containerStyles="--list-max-height:200px;--height: 38px"
        />
      {/if}
    </div>
    {#if what && what.label !== 'First select a category below'}
      <div id="button-container">
        <button id="go" on:click={() => handleclick()}> Go! </button>
      </div>
    {/if}
  </div>
</main>

<style>
  label {
    font-size: 20px;
    width: 85px;
    font-family: 'Farro', sans-serif;
    color: white;
    border: none;
    outline: none;
    cursor: auto;
  }

  .input-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 1.5vh;
    background-color: #fed703;
    border-radius: 10px;
    padding: 0vh 0vw 0 0.5vw;
  }

  #button-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.5vh;
  }
  #go {
    all: unset;
    text-align: center;
    height: 5vh;
    width: 10vw;
    border-radius: 8px;
    color: #052c46e9;
    background-color: #fed703;
    font-size: 3vh;
    font-family: 'Farro', sans-serif;
    cursor: pointer;
  }

  #sub-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 15vh;
    width: 25vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5vh;
    z-index: 100000;
    padding: 3vh 3vw;
    border: 3px solid white;
    border-radius: 16px;
    background-color: #3c5a6d42;
    filter: drop-shadow(4px 4px 0px #000000);
  }

  :global(input) {
    color: #fed703 !important;
  }

  :global(.sub-input) {
    font-size: 1.5vh !important;
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

  @media screen and (max-width: 768px) {
    #sub-container {
      position: absolute;
      height: 25vh;
      width: 45vw;
    }
    :global(.sub-input) {
      font-size: 14px !important;
      border-radius: 6px 6px 6px 6px !important;
      width: 100% !important;
      font-size: 1.2vh !important;
    }
    .input-container {
      flex-direction: column;
      border-radius: 6px;
      padding: 5px;
      gap: 5px;
    }
  }
</style>
