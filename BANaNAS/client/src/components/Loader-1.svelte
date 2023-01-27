<script>
   import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';

  let sourceArr = [
   'peel',
   'seesaw',
   'damaged',
   'strut',
   'sunnies',
   'boy'
  ];

   function randomSource() {
    let randomIndex = Math.floor(Math.random() * sourceArr.length);
    return sourceArr[randomIndex];
   };

</script>

<main>

   <div id="loader">

      <LottiePlayer
      src={`assets/banana-${randomSource()}.json`}
      autoplay="{true}"
      loop="{true}"
      controls="{false}"
      renderer="svg"
      background="transparent"
      height="{300}"
      width="{300}"
      controlsLayout={null}
      />

   </div>
   
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

   #loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
   }


</style>