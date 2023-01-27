<script>
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';

</script>

<main>

  <div id="loader">
    <div id="left">
      <LottiePlayer
      src={`assets/banana-falling.json`}
      autoplay="{true}"
      loop="{true}"
      controls="{false}"
      renderer="svg"
      background="transparent"
      height={window.innerHeight}
      width={window.innerWidth / 3}
      controlsLayout={null}
      />
    </div>
    <div id="center">
      <LottiePlayer
      src={`assets/banana-falling.json`}
      autoplay="{true}"
      loop="{true}"
      controls="{false}"
      renderer="svg"
      background="transparent"
      height={window.innerHeight}
      width={window.innerWidth / 3}
      controlsLayout={null}
      />
    </div>
    <div id="right">
      <LottiePlayer
      src={`assets/banana-falling.json`}
      autoplay="{true}"
      loop="{true}"
      controls="{false}"
      renderer="svg"
      background="transparent"
      height={window.innerHeight}
      width={window.innerWidth / 3}
      controlsLayout={null}
      />
  </div>
  
</main>

<style>

  main {
    position: absolute;
    height: 100vh;
    width: 100vw;
    overflow: none;
    z-index: 0;
  }

  #loader {
     position: absolute;
     height: 100vh;
     width: 70vw;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
  }

  #left {
     position: absolute;
     top: 50%;
     left: 0%;
     transform: translate(-50%, -50%);
  }

  #right {
     position: absolute;
     top: 50%;
     left: 100%;
     transform: translate(-50%, -50%);
  }

  #center {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%) rotate(180deg);
  }


</style>