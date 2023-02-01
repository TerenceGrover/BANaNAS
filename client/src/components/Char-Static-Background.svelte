<script>
  const isMobile = window.innerWidth < 768;
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
    overflow: none;
    z-index: 1;
  }


  #left {
    background-color: #052c46;
    position: absolute;
    clip-path: polygon(80% 0, 60% 50%, 41% 50%, 20% 100%, 0 100%, 0 0);
  }

  #right {
    background-color: #fed703;
    position: absolute;
    clip-path: polygon(80% 0, 60% 50%, 40% 50%, 20% 100%, 100% 100%, 100% 0);
  }
  
  .backgound-element{
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
  }

  #top-mobile {
    background-color: #052c46;
    position: absolute;
    left: 0;
    top: 0;
    clip-path: polygon(0 0, 100% 0, 100% 50%, 40% 45%, 60% 55%, 0 50%);
  }

  #bot-mobile {
    background-color: #fed703;
    position: absolute;
    right: 0;
    bottom: 0;
    clip-path: polygon(0 100%, 100% 100%, 100% 50%, 40% 45%, 60% 55%, 0 50%);
  }

  .mobile-element {
    position: absolute;
    width: 100vw;
    height: 100vh;
  }


</style>