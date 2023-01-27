<script>
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
  import { onMount } from 'svelte';

  let sourceArr = [
   'peel',
   'seesaw',
   'damaged',
   'strut',
   'sunnies',
   'sunnies',
   'falling'
  ];

   function randomSource() {
    let randomIndex = Math.floor(Math.random() * sourceArr.length);
    return sourceArr[randomIndex];
   };

</script>

  <LottiePlayer
    src={`assets/banana-${randomSource()}.json`}
    autoplay="{true}"
    loop="{true}"
    reverse="{true}"
    controls="{false}"
    renderer="svg"
    background="transparent"
    height="{600}"
    width="{600}"
  />


<style>


</style>