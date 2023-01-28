<script>
  export let selectedPlayer;
  export let player

</script>

<main>

  <div id="content-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if selectedPlayer.length > 0}
      <div>Sprite goes here</div>
    {:else}
      <h1 id="player-1">{player}</h1>
    {/if}
  </div>

</main>

<style>
  #content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    z-index: 1000;
  }


  #player-1 {
    z-index: 10000;
    font-size: 12.5vw;
    filter: drop-shadow(30px 10px 4px #000000AA); 
  }

</style>