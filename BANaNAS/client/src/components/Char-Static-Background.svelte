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
    -webkit-clip-path: polygon(38% 50%, 62% 50%, 100% 0, 0 0, 0 100%);
    clip-path: polygon(38% 50%, 62% 50%, 100% 0, 0 0, 0 100%);
  }

  #right {
    background-color: #fed703;
    position: absolute;
    -webkit-clip-path: polygon(38% 50%, 62% 50%, 100% 0, 100% 100%, 0 100%);
    clip-path: polygon(38% 50%, 62% 50%, 100% 0, 100% 100%, 0 100%);
  }

  .backgound-element{
    position: absolute;
    top: 0;
    transition: all 1.8s cubic-bezier(0.77,0,0.26,1.01);
    width: 100vw;
    height: 100vh;
  }


</style>