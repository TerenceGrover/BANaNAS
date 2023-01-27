<script>
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';

  let controlsLayout = [
    'previousFrame',
    'playpause',
    'stop',
    'nextFrame',
    'progress',
    'frame',
    'loop',
    'spacer',
    'background',
    'snapshot',
    'zoom',
    'info',
  ];
</script>


<LottiePlayer
  src="assets/banana-peel.json"
  autoplay="{true}"
  loop="{true}"
  controls="{false}"
  renderer="svg"
  background="transparent"
  height="{600}"
  width="{600}"
/>


<style>


</style>