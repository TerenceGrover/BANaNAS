<script>

  let x1 = Math.random() * window.innerWidth;
  let x2 = Math.random() * window.innerWidth;
  let rotate = Math.random() * 360;
  let delay = Math.random() * 4.5 + 0.5;
  let y = window.innerHeight;

  function dropBanana() {
    x1 = Math.random() * window.innerWidth;
    x2 = Math.random() * window.innerWidth;
    rotate = Math.random() * 360;
    delay = Math.random() * 4.5 + 0.5;
    y = window.innerHeight;
  }

  setInterval(dropBanana, 5500 + delay * 1000);

</script>


<object id="b1" style="
  top: {y}px;
  left: {x1}px;
  transform: rotate({-rotate}deg);
  "
  title = "dropping banana"
  data="assets/icons/drop-banana.svg"
  width="100"
  height="100"
  >
  <!-- Your SVG contents here -->
</object>

<object id="b2" style="
  top: {y}px;
  left: {x2}px;
  transform: rotate({rotate}deg);
  "
  title = "dropping banana"
  data="assets/icons/drop-banana.svg"
  width="100"
  height="100"
  >
  <!-- Your SVG contents here -->
</object>


<style>
  #b1 {
    position: absolute;
    animation: drop1 3.5s infinite;
    z-index: 1;
  }

  #b2 {
    position: absolute;
    animation: drop2 3s infinite;
    z-index: 1;
  }


  @keyframes drop1 {
    0% {
      top: -10vh;
      transform: rotate(0deg);
    }
    99.999% {
      top: 100vh;
      transform: rotate(-720deg);
    }
    100% {
      top: 0;
      transform: rotate(0deg);
    }
  }

  @keyframes drop2 {
    0% {
      top: -10vh;
      transform: rotate(0deg);
    }
    99.999% {
      top: 90vh;
      transform: rotate(720deg);
    }
    100% {
      top: 0;
      transform: rotate(0deg);
    }
  }
</style>