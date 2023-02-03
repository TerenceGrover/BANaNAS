<script>
  import { onMount } from 'svelte';

  const isMobile = window.innerWidth < 768;

  onMount(() => {
    !isMobile
      ? setTimeout(() => {
          document.getElementById('left').style.left = '0';
          document.getElementById('left-under').style.left = '10px';
          document.getElementById('right').style.right = '0';
        }, 1000)
      : setTimeout(() => {
          console.log('mobile');
          document.getElementById('top-mobile').style.left = '0';
          document.getElementById('bot-mobile').style.right = '0';
          document.getElementById('bot-mobile').style.bottom = '0';
          document.getElementById('top-mobile').style.top = '0';

        }, 1000);
  });
</script>

<main>
  {#if isMobile}
    <div id="top-mobile" class="mobile-element" />
    <div id="bot-mobile" class="mobile-element" />
  {:else}
    <div id="left" class="backgound-element" />
    <div id="left-under" class="backgound-element" />
    <div id="right" class="backgound-element" />
  {/if}
</main>

<style>
  main {
    position: absolute;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    z-index: 10;
  }

  #left {
    background-color: #052c46;
    position: absolute;
    left: -100vw;
    clip-path: polygon(80% 0, 60% 50%, 41% 50%, 20% 100%, 0 100%, 0 0);
    z-index: 11;
  }

  #left-under {
    background: #fff;
    position: absolute;
    left: -99.5vw;
    top: 10px;
    clip-path: polygon(80% 0, 60% 50%, 41% 50%, 20% 100%, 0 100%, 0 0);
    z-index: 8;
  }

  #left-under:before {
    content: '';
    background: #000000aa;
    height: 100vh;
    width: 100vw;
    display: block;
    position: absolute;
    left: -0.25vw;
    top: -5px;
    clip-path: polygon(80% 0, 60% 50%, 41% 50%, 20% 100%, 0 100%, 0 0);
  }

  #right {
    background-color: #fed703;
    position: absolute;
    right: -100vw;
    clip-path: polygon(80% 0, 60% 50%, 40% 50%, 20% 100%, 100% 100%, 100% 0);
    z-index: 9;
  }

  .backgound-element {
    position: absolute;
    top: 0;
    transition: all 1.5s cubic-bezier(0.77, 0, 0.26, 1.01);
    width: 100vw;
    height: 100vh;
  }

  #top-mobile {
    background-color: #052c46;
    position: absolute;
    left: -100vw;
    top: -10vh;
    clip-path: polygon(0 0, 100% 0, 100% 50%, 40% 45%, 60% 55%, 0 50%);
    z-index: 11;
  }

  #bot-mobile {
    background-color: #fed703;
    position: absolute;
    right: -100vw;
    bottom: -10vh;
    clip-path: polygon(0 100%, 100% 100%, 100% 50%, 40% 45%, 60% 55%, 0 50%);
    z-index: 9;
  }

  .mobile-element {
    position: absolute;
    transition: all 1.5s cubic-bezier(0.77, 0, 0.26, 1.01);
    width: 100vw;
    height: 100vh;
  }
</style>
