<script>
export let clickedMonkey;
export let clickedCoffee;
export let clickedBulb;

</script>

<main>
  <div id="content-container">
    <img id="coffee-icon" src="../../assets/icons/coffee.svg" alt="coffee" on:click={() => {
      clickedCoffee = !clickedCoffee
      clickedMonkey = false
      clickedBulb = false
    }} 
    on:keydown={e => {
      if (e.key === 'Enter') {
        clickedCoffee = !clickedCoffee
        clickedMonkey = false
        clickedBulb = false
      }
    }}
    />
    {#if clickedCoffee}
      <div id="buy" class="fade-in">
        <p on:click={() => window.open('https://www.buymeacoffee.com/BananasDevs')}
          on:keydown={e => {
            if (e.key === 'Enter') {
                window.open('https://www.buymeacoffee.com/BananasDevs')
            }
          }}>
          Buy the developers a coffee!
        </p>
      </div>
    {/if}
  </div>
</main>

<style>

  #content-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    -webkit-text-stroke: black 0.5px;
    filter: drop-shadow(2px 2px 0px #000000);
    transition: width 2s;
    font-family: 'Farro', sans-serif;
    color: #fed703;
    filter: drop-shadow(2px 2px 0px #000000);
    font-size: 2.5vh;
    gap: 15px;

  }

  #coffee-icon {
    filter: drop-shadow(2px 2px 0px #000000);
    cursor: pointer;
    height: 5vh;
  }


  .fade-in {
    animation: fade-in-fwd 0.5s;
  }

  @keyframes fade-in-fwd {
    0% {
      -webkit-transform: translateZ(-80px);
      transform: translateZ(-80px);
      transform: translateX(100px);
      opacity: 0;

    }
    100% {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      transform: translateX(0);

      opacity: 1;
    }
  }

  @keyframes fade-out-backward {
    0% {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      transform: translateX(0);
      opacity: 1;
      
    }
    100% {
      -webkit-transform: translateZ(-80px);
      transform: translateZ(-80px);
      transform: translateX(100px);
      opacity: 0;
    }
  }

</style>