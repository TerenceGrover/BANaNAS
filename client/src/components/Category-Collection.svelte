<svelte:options accessors/>

<script>
  export let currentlyHovered = {name: ''};
  export let currentlySelected = {name: ''};
  import categoryList from "../Utils/categoryList";

</script>

<main>
  <div id="category-container">
    <div class='row'>
    {#each categoryList.slice(0, 5) as category}
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
    {#each categoryList.slice(5, 11) as category}
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
    {#each categoryList.slice(11, 16) as category}
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
  gap: 2vw
}

.category {
  border: 5px solid #052C46;
  font-size: 35px;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
  filter: drop-shadow(2px 2px 0px #000000);
  cursor: pointer;
  animation: pulse 2s infinite;

}

.category:hover{
  transform: scale(1.25) rotate(10deg);
  animation: shake 0.6s linear;
  transition: none !important;
}

  @keyframes pulse {
	0% {
		transform: scale(0.95);
	}

	50% {
		transform: scale(1.05);
	}

	100% {
		transform: scale(0.95);
	}
}

</style>
