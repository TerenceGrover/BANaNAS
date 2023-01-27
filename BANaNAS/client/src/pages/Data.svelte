<script>
  import Footer from "../components/Footer.svelte";
  import { transformMouseIntoCSSShadow } from "../utils/shadowTracking";
  export let changePage;

  import Loader_1 from "../components/Loader-1.svelte";

</script>

<main>
  
  <header id="top-section">
    <h1 id="top-header">DATA</h1>
    <h2 id="top-sub-header">Graph Type</h2>
    <div id="top-sub-container">
    </div>
    <hr id="hr-top-divider">
  </header>

  <div id="divider">
    <span id="divider-text">Analytics</span>

  </div>

  <hr id="hr-sub-divider">

  <section id="sub-section">
    
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
    justify-content: flex-start;
    padding-top: 2vh;
    height: 85vh;
    width: 100vw;
    background-color: #052c46;
  }

  #top-header {
    font-size: 4vh;
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

  #hr-top-divider {
    height: 2px;
    width: 100vw;
    background-color: #fed703;
    border: none;
  }

  #hr-sub-divider {
    height: 3px;
    width: 100vw;
    background-color: #052c46;
    border: none;
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
    flex-direction: row;
    align-items: center;
    padding-top: 5vh;
    min-height: 80vh;
    background-color: #fed703;
    width: 100vw;
  }

</style>