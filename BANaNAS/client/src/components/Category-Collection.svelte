<svelte:options accessors/>

<script>
  export let currentlyHovered = {name: ''};
  export let currentlySelected = {name: ''};
  
  const categoryList = [
  {name: 'Agriculture', emoji: '🌾'},
  {name: 'Bananas', emoji: '🍌'},
  {name: 'Demographics', emoji: '📈'},
  {name: 'Economy', emoji: '💰'},
  {name: 'Education', emoji: '🎓'},
  {name: 'Energy', emoji: '💡'},
  {name: 'Entertainment', emoji: '🎭'},
  {name: 'Environment', emoji: '🌱'},
  {name: 'Finance', emoji: '💸'},
  {name: 'Health', emoji: '🫀'},
  {name: 'History', emoji: '📜'},
  {name: 'Science', emoji: '🔬'},
  {name: 'Space', emoji: '🚀'},
  {name: 'Sports', emoji: '⚽'},
  {name: 'Transportation', emoji: '🚗'},
  {name: 'Weather', emoji: '🌤️'}
]

</script>

<main>
  <div id="category-container">
    <div class='row'>
    {#each categoryList.slice(0, 4) as category}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="category"
        on:mouseenter={() => currentlyHovered.name = category.name}
        on:mouseleave={() => currentlyHovered.name = ''}
        on:click={() => currentlySelected.name = category.name}
      >
        {category.emoji}
      </div>
    {/each}
    </div>
    <div class='row'>
    {#each categoryList.slice(4, 10) as category}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="category"
        on:mouseenter={() => {currentlyHovered.name = category.name}}
        on:mouseleave={() => currentlyHovered.name = ''}
        on:click={() => currentlySelected.name = category.name}
      >
        {category.emoji}
      </div>
    {/each}
    </div>
    <div class='row'>
    {#each categoryList.slice(10, 15) as category}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="category"
        on:mouseenter={() => currentlyHovered.name = category.name}
        on:mouseleave={() => currentlyHovered.name = ''}
        on:click={() => currentlySelected.name = category.name}
      >
        {category.emoji}
      </div>
    {/each}
    </div>
  </div>
</main>

<style>
  #category-container {
  display: flex;
  flex-direction: column;
  width: 40vw;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.category {
  border: 5px solid #052C46;
  font-size: 50px;
  border-radius: 50%;
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
  filter: drop-shadow(5px 5px 4px #000000);
  cursor: pointer;
}

.category:hover{
  transform: scale(1.2);
  animation: shake 0.6s linear;
}

</style>
