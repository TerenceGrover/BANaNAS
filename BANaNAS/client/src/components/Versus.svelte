<script>

export let changePage;

</script>

<main>

  <img on:keydown={(e) => e.key === 'enter' && changePage('data')} id="vs" src="../../assets/vs.png" alt="vs" on:click={() => changePage('data')}/>

</main>

<style>

#vs {
    z-index: 10000;
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    cursor: pointer;
    object-fit: cover;
    height: 300px;
    width: 320px;
  }

  #vs:hover {
    transform: translate(-50%, -50%) scale(1.3) rotate(15deg);
  }

</style>