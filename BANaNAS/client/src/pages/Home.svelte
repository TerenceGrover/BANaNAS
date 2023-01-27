<script>
  import Footer from "../components/Footer.svelte";
  export let changePage;

</script>

<main>
  
  <section id="top-section">
    <h1 id="top-header">BANaNAS</h1>
    <div id="top-sub-container">
      <h3 id="top-sub-header">Get the relation between any two kinds of data<br>With a twist</h3>
    </div>
    <button id="get-started" on:click={() => changePage('character')}>Get Started</button>
  </section>

  <div id="divider">
    <span id="divider-text">Educate yourself</span>
  </div>

  <hr id="hr-divider">

  <section id="sub-section">
    <h2>Sub Section</h2>
    <p>Some text</p>
  </section>

  <Footer />

</main>

<style>

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100vw;
  }

  #top-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 85vh;
    width: 100vw;
    background-color: #052c46;
  }

  #top-header {
    font-size: 11vh;
    font-family: 'Farro', sans-serif;
    color: #fed703;
  }

  #top-sub-container {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 10px;
    background-color: #052c46;
  }

  #top-sub-header {
    font-size: 18px;
    font-family: 'Farro', sans-serif;
    color: #fff;
  }

  #hr-divider {
    height: 3px;
    width: 100vw;
    background-color: #052c46;
    border: none;
  }

  #get-started{
    font-size: 36px;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #052c46;
    background-color: #fed703;
    border: none;
    border-radius: 8px;
    padding: 20px 40px;
    margin-top: 20px;
  }

  #divider {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15vh;
    width: 100vw;
    background-color: #fed703;
  }

  #divider-text{
    font-size: 38px;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #052c46;
  }

  #sub-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5vh;
    height: 80vh;
    background-color: #fed703;
    width: 100vw;
  }

</style>