<script>
  export let selectedPlayer;
  export let player;

  let src = '';
  $: selectedPlayer,
    (src = `../../assets/jobs/${selectedPlayer.toLowerCase()}.svg`);
</script>

<main>
  <div id="content-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if selectedPlayer.length > 0}
      {#if selectedPlayer === 'Demographics'}
        <div id="demographics">
          <img id="player" class="demo1" {src} alt="sprite" />
          <img id="player" class="demo2" {src} alt="sprite" />
          <img id="player" class="demo3" {src} alt="sprite" />
        </div>
      {:else}
        <img id="player" {src} alt="sprite" />
      {/if}
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

  #player {
    height: 55vh;
    width: 30vw;
  }

  #demographics {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 55vh;
    width: 10vw;
  }

  .demo1 {
    position: absolute;
    z-index: 1;
    padding-left: 15vw;
  }
  .demo2 {
    position: absolute;
    z-index: 3;
  }

  .demo3 {
    position: absolute;
    z-index: 2;
    padding-right: 15vw;
  }

  img {
    filter: drop-shadow(10px 10px 0px #000000aa);
    animation: jello-vertical 0.8s;
  }

  #player-1 {
    z-index: 10000;
    font-size: 12.5vw;
    filter: drop-shadow(5px 5px 0px #000000aa);
    -webkit-text-stroke: 3px black;
  }

  @keyframes jello-vertical {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(0.8, 1.2, 1);
            transform: scale3d(0.8, 1.2, 1);
  }
  40% {
    -webkit-transform: scale3d(1.2, 0.8, 1);
            transform: scale3d(1.2, 0.8, 1);
  }
  50% {
    -webkit-transform: scale3d(0.85, 1.15, 1);
            transform: scale3d(0.85, 1.15, 1);
  }
  65% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  75% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
}

</style>
