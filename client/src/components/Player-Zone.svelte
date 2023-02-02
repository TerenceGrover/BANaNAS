<script>
  export let selectedPlayer;
  export let player;

  const isMobile = window.innerWidth < 768;

  $: selectedPlayer, selectedPlayer = selectedPlayer.toLowerCase();

  let src = '';
  $: selectedPlayer,
    (src = `../../assets/jobs/${selectedPlayer}.svg`);
</script>

<main>
  <div id="content-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if selectedPlayer.length > 0}
      {#if selectedPlayer === 'socialdevelopment'}
        <div id="socialdevelopment">
          <img id="player" class="socialdevelopment1" {src} alt="sprite" />
          <img id="player" class="socialdevelopment2" {src} alt="sprite" />
          <img id="player" class="socialdevelopment3" {src} alt="sprite" />
        </div>
      {:else if selectedPlayer === 'gender'}
      <div id="gender">
          <img id="player" class="gender1" src="../../assets/jobs/male.svg" alt="sprite" />
          <img id="player" class="gender2" src="../../assets/jobs/female.svg" alt="sprite" />
        </div>
      {:else if selectedPlayer === 'weather'}
      <div id="weather">
          <img id="player" class="weather1" src="../../assets/jobs/cloudsun.svg" alt="sprite" />
          <img id="player" class="weather2" src="../../assets/jobs/weather.svg" alt="sprite" />
          <img id="player" class="weather3" src="../../assets/jobs/cloudthunder.svg" alt="sprite" />
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

  #socialdevelopment {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 55vh;
    width: 10vw;
  }

  .socialdevelopment1 {
    position: absolute;
    z-index: 1;
    padding-left: 15vw;
  }
  .socialdevelopment2 {
    position: absolute;
    z-index: 3;
  }

  .socialdevelopment3 {
    position: absolute;
    z-index: 2;
    padding-right: 15vw;
  }

  #gender {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 55vh;
    width: 10vw;
  }

  .gender1 {
    position: absolute;
    z-index: 2;
    margin-right: 15vw;
  }
  .gender2 {
    position: absolute;
    z-index: 3;
  }

  #weather {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 55vh;
    width: 10vw;
  }

  .weather1 {
    position: absolute;
    z-index: 1;
    padding-left: 15vw;
    margin-left: 5vw;
    margin-bottom: 35vh;
    -webkit-text-stroke: 3px black;

  }

  .weather2 {
    position: absolute;
    z-index: 3;
  }

  .weather3 {
    position: absolute;
    z-index: 2;
    padding-right: 15vw;
    margin-right: 5vw;
    margin-bottom: 30vh;
    -webkit-text-stroke: 3px black;

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
