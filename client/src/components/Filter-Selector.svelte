<script>
  import { claim_svg_element } from 'svelte/internal';
  import { splitWordsOnCapitalLetters } from '../utils/helpers.js';

  export let filterCategories;
  export let filteredYears = [];

  let categoryList = Object.keys(filterCategories).map((category) => ({
    value: category,
    label: splitWordsOnCapitalLetters(category),
  }));

  let activeColumns = 1;
  let columnWidth = 100/activeColumns;
  let selectedCategory;
  let subCategories;
  let selectedSubCategory;

  if (selectedCategory) {
    activeColumns = 2;
  }

  if (selectedSubCategory) {
    activeColumns = 3;
  }
  
  function loadSubCategories(category) {
    for (const filter of Object.values(filterCategories[category].available_filters)) {
      subCategories = []
      subCategories.push(filter);
    }
  }


</script>

<main>
  <table id="table-container">
    <column class="column" id="category" style="width: {columnWidth}%;">  
      <div class="column-title">Category</div>
      <list class="list-container">
        {#each categoryList as category}
          <option class="list-item"
            on:click={() => {
              selectedCategory = category.value
              loadSubCategories(category.value)
              }}>{category.label}</option>
        {/each}
      </list>
    </column>
    {#if selectedCategory}
    <column class="column" id="event" style="width: {columnWidth}%;">  
        <div class="column-title">Event</div>
        <list class="list-container">
          {#each subCategories as subCategory}
            <option class="list-item"
              on:click={() => {
                selectedSubCategory = subCategory
              }}>{subCategory.name}</option>
          {/each}
        </list>
      </column>
      {/if}
      {#if selectedSubCategory}
        <column class="column" id="country" style="width: {columnWidth}%;">
          <div class="column-title">{selectedSubCategory.name}</div>
          <list class="list-container">
            {#each selectedSubCategory.values as options}
              <option class="list-item">{options}</option>
            {/each}
          </list>
        </column>
      {/if}
  </table>


</main>


<style>
  #table-container{
    display: flex;
    justify-content: center;
    font-family: 'Farro', sans-serif;
    width: 67vw;
    height: 55vh;
    overflow: hidden;
    border: 3px solid white;
    box-shadow: 22px 22px #000000aa;
    margin-top: 1vh;
    margin-bottom: 1.5vh;
    border-radius: 12px;
    background-color: #00000044;


  }

  .column {
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    text-align: center;
    transition: width 1s ease-in-out;
    animation: slide-left 1s;

  }
  
  .list-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
  }

  .column-title {
    font-size: 2.5vh;
    font-weight: bold;
    color: #fed703;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 7.5vh;
    padding: 10px 0.5vw;
    border: 1px solid #aec6d58d;
    background-color: #0c84cfca;
  }

  .list-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 40px;
    padding: 20px 0.5vw;
    border: 1px solid #aec6d58d;
    cursor: pointer;
    flex-grow: 0;
  }
  
  option:nth-child(odd) {
    background-color: #114362ca;
    color: #aec6d5;
  }

  option:nth-child(even) {
    background-color: #186696ca;
    color: white;
  }
    
</style>