<script>
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
  import { onMount } from 'svelte';
  import { getBananaFact } from '../Utils/api-services';

  let bananaFact;

  onMount(() => {
    getBananaFact().then((data) => {
      bananaFact = data;
    });
  });

  let sourceArr = ['peel', 'seesaw', 'damaged', 'strut', 'sunnies', 'boy'];

  function randomSource() {
    let randomIndex = Math.floor(Math.random() * sourceArr.length);
    return sourceArr[randomIndex];
  }
</script>

<main>
  <div id="loader">
    <LottiePlayer
      src={`assets/Loaders/banana-${randomSource()}.json`}
      autoplay={true}
      loop={true}
      controls={false}
      renderer="svg"
      background="transparent"
      height={400}
      width={400}
      controlsLayout={null}
    />
  </div>
  {#if bananaFact}
    <p id="fact"><b>"</b>{bananaFact.fact}<b>"</b></p>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    overflow: none;
  }

  b{
  font-size: 3rem;
  font-weight: bolder;
  }

  #loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  #fact {
    font-family: 'Farro', sans-serif;
    font-size: 1.5rem;
    color: #fed703;
    text-align: center;
    font-weight: bold;
    position: absolute;
    top: 82.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }
</style>
