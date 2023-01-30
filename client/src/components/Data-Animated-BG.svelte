<script>

  import { onMount } from "svelte";

  onMount(() => {
    setTimeout(() => {
      document.getElementById('left').style.left = '-100vw';
      document.getElementById('right').style.right = '-100vw';
      console.log('added')
    }, 250)
  })

</script>

<main>

  <div id='left' class="backgound-element"></div>
  <div id='right' class="backgound-element"></div>

</main>

<style>

  main {
    position: absolute;
    height: 100vh;
    width: 100vw;
    overflow: none;
    z-index: 10;
  }

  #left {
    background-color: #052c46;
    position: absolute;
    left: 0vw;
    clip-path: polygon(80% 0, 60% 50%, 41% 50%, 20% 100%, 0 100%, 0 0);
  }

  #right {
    background-color: #fed703;
    position: absolute;
    right: 0vw;
    clip-path: polygon(80% 0, 60% 50%, 40% 50%, 20% 100%, 100% 100%, 100% 0);
  }

  .backgound-element{
    position: absolute;
    top: 0;
    transition: all 1.8s cubic-bezier(0.77,0,0.26,1.01);
    width: 100vw;
    height: 100vh;
  }


</style>