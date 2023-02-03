<script>
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

</script>

<main>

  <div id="loader">
    {#if isMobile}
      <LottiePlayer
      src={`assets/Loaders/banana-falling.json`}
      autoplay={true}
      loop={true}
      controls={false}
      renderer="svg"
      background="transparent"
      height={1400}
      width={480}
      controlsLayout={null}
      />
    {:else}
      <div id="left">
        <LottiePlayer
        src={`assets/Loaders/banana-falling.json`}
        autoplay={true}
        loop={true}
        controls={false}
        renderer="svg"
        background="transparent"
        height={window.innerHeight}
        width={window.innerWidth / 3}
        controlsLayout={null}
        />
      </div>
      <div id="center">
        <LottiePlayer
        src={`assets/Loaders/banana-falling.json`}
        autoplay={true}
        loop={true}
        controls={false}
        renderer="svg"
        background="transparent"
        height={window.innerHeight}
        width={window.innerWidth / 3}
        controlsLayout={null}
        />
      </div>
      <div id="right">
        <LottiePlayer
        src={`assets/Loaders/banana-falling.json`}
        autoplay={true}
        loop={true}
        controls={false}
        renderer="svg"
        background="transparent"
        height={window.innerHeight}
        width={window.innerWidth / 3}
        controlsLayout={null}
        />
      </div>
    {/if}
  
</main>

<style>

  main{
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  }

  #loader {
    overflow: hidden;
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 50%;
    left: 50vw;
    transform: translate(-50%, -50%);
  }

  #left {
    position: absolute;
    top: 50%;
    left: 0vw;
    transform: translateY(-50%);
  }

  #right {
    position: absolute;
    top: 50%;
    right: 0vw;
    transform: translateY(-50%);
  }

  #center {
    position: absolute;
    transform: translate(-50%, -50%) rotate(180deg);
    top: 50%;
    left: 50%;
  }


</style>