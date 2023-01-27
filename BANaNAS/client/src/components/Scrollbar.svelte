<script>

  export let graphNumber = 5;

</script>

<main>

  <div id="scrollbar">
      <div id="scrollbar-track">
      </div>
      <div id="thumb-container">
        {#each Array(graphNumber) as _, i}
        <div class="scrollbar-thumb" style="height: 65%; width: 10%; background-color: rgba(255,255,255,0.3); border-radius: 50px;">
        </div>
        {/each}
      </div>
  </div>

</main>

<style>

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #scrollbar {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 2.5vh;
    width: 10vw;
    background-color: rgba(255,255,255,0.3);
    border-radius: 50px;
  }

  #scrollbar-track {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70%;
    width: 15%;
    background-color: rgb(212, 212, 212);
    border-radius: 50px;
  }

  #thumb-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 100%;
    width: 100%;
  }

</style>