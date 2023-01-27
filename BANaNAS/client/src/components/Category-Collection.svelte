<svelte:options accessors/>

<script>
  export let currentlySelected = {name: ''};
  
  const categoryList = [
  {name: 'Agriculture', emoji: '🌾'},
  {name: 'Bananas', emoji: '🍌'},
  {name: 'Demographics', emoji: '📈'},
  {name: 'Economy', emoji: '💰'},
  {name: 'Education', emoji: '🎓'},
  {name: 'Energy/Sustainability', emoji: '💡'},
  {name: 'Entertainment', emoji: '🎭'},
  {name: 'Environment', emoji: '🌱'},
  {name: 'Finance', emoji: '💸'},
  {name: 'Health', emoji: '🫀'},
  {name: 'History', emoji: '📜'},
  {name: 'Science', emoji: '🔬'},
  {name: 'Space', emoji: '🚀'},
  {name: 'Transportation', emoji: '🚗'},
  {name: 'Weather', emoji: '🌤️'}
]

</script>

<main>
  <div id="category-container">
    <div class='row'>
    {#each categoryList.slice(0, 4) as category}
      <div class="category"
        on:mouseenter={() => currentlySelected.name = category.name}
        on:mouseleave={() => currentlySelected.name = ''}>
        {category.emoji}
      </div>
    {/each}
    </div>
    <div class='row'>
    {#each categoryList.slice(4, 10) as category}
      <div class="category"
        on:mouseenter={() => currentlySelected.name = category.name}
        on:mouseleave={() => currentlySelected.name = ''}>
        {category.emoji}
      </div>
    {/each}
    </div>
    <div class='row'>
    {#each categoryList.slice(10, 14) as category}
      <div class="category"
        on:mouseenter={() => currentlySelected.name = category.name}
        on:mouseleave={() => currentlySelected.name = ''}>
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
  gap: 10px;
  margin: 5px
}

.category {
  border: 5px solid #FFD600;
  font-size: 50px;
  border-radius: 50%;
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
}

.category:hover{
  transform: scale(1.2);
}

.category:not(:hover) {
  transform: translateX(-20px);
  transform: scale(0.8)
}


</style>
