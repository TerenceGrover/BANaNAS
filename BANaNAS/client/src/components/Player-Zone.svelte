<script>
  export let selectedPlayer;
  export let player

  
  let src = ''
  $: selectedPlayer, src = `../../assets/jobs/${selectedPlayer.toLowerCase()}.svg`;
  $: selectedPlayer, console.log(`../../assets/jobs/${selectedPlayer.toLowerCase()}.svg`);

</script>

<main>

  <div id="content-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if selectedPlayer.length > 0}
      <img id="player" src={src} alt="sprite">
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

  #player{
    height: 50vh;
    margin-bottom: 15vh;
  }


  #player-1 {
    z-index: 10000;
    font-size: 12.5vw;
    filter: drop-shadow(5px 5px 4px #000000AA); 
  }

</style>