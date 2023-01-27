<script>

  export let changePage;

</script>

<main>

  <h1>Data</h1>
  <button on:click={() => changePage('home')}>Home</button>
  <button on:click={() => changePage('character')}>Back</button>

</main>