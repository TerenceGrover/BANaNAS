<script>
  import Footer from "../components/Footer.svelte";
  import { transformMouseIntoCSSShadow } from "../utils/shadowTracking";
  export let changePage;
  let shadowStr = "0px 0px 0px 0px #000";

  function handleMove(e) {
    shadowStr = transformMouseIntoCSSShadow(e.clientX, e.clientY);
  }

  let paragraph = "Transparency";

  function ParagraphSelector(newP) {
    paragraph = newP;
  }

  import Loader_1 from "../components/Loader-1.svelte";

</script>

<main on:mousemove={handleMove}>
  
  <section id="top-section">
    <h1 id="top-header">DATA</h1>
    <div id="top-sub-container">
    </div>
  </section>

  <div id="divider">
    <span id="divider-text">Analytics</span>
  <Loader_1 />

  </div>

  <hr id="hr-divider">

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
    padding-top: 5vh;
    height: 85vh;
    width: 100vw;
    background-color: #052c46;
  }

  #top-header {
    font-size: 7vh;
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

  #hr-divider {
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