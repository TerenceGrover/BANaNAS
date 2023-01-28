<script>
  import Footer from '../components/Footer.svelte';
  import { transformMouseIntoCSSShadow } from '../utils/shadowTracking';
  export let changePage;
  let shadowStr = '0px 0px 0px 0px #000';

  function handleMove(e) {
    shadowStr = transformMouseIntoCSSShadow(e.clientX, e.clientY);
  }

  let paragraph = 'Transparency';

  function ParagraphSelector(newP) {
    paragraph = newP;
  }
</script>

<main on:mousemove={handleMove}>
  <section id="top-section">
    <h1 id="top-header" class="text-shadow-pop-br">BANaNAS</h1>
    <div id="top-sub-container">
      <h3 id="top-sub-header">
        Get the relation between any two kinds of data<br />With a twist
      </h3>
    </div>
    <button
      style={`box-shadow : ${shadowStr}`}
      id="get-started"
      on:click={() => changePage('character')}>Get Started</button
    >
  </section>

  <div id="divider">
    <span id="divider-text">Educate yourself</span>
  </div>

  <hr id="hr-divider" />

  <section id="sub-section">
    <div id="button-container">
      <button
        class="home-buttons"
        on:click={() => ParagraphSelector('Transparency')}
        ><i>🔎</i><br /> Transparency</button
      >
      <button class="home-buttons" on:click={() => ParagraphSelector('Concept')}
        ><i>💡</i><br /> Concept</button
      >
      <button
        class="home-buttons"
        on:click={() => ParagraphSelector('Creators')}
        ><i>☭</i><br /> Creators</button
      >
    </div>
    <div id="paragraph-container">
      {#if paragraph === 'Transparency'}
        <p class="description">
          Welcome to BANaNAS, <br /><br /> The web app that takes two random
          pieces of data from around the web and tries to find any correlation,
          no matter how wild or far-fetched. Created by a team of enthusiasts
          with a love for data analysis and a knack for finding connections
          where others see none. We use top secret algorithms such as [formula
          placeholder] to aggregate the data, but don't let that fool you, we're
          not professional statisticians. We're more like professional data
          detectives, with a little bit of Sherlock Holmes and a little bit of
          Inspector Gadget. Please keep in mind that the correlation found by
          BANaNAS should be taken with a grain of salt, and a dash of humor. We
          encourage users to check out the sources and do their own analysis,
          cause let's face it, correlation does not equal causation, but it's
          still fun to look for the links.
          <br />
          Sources:
          <br />
          [Source 1]
          <br />
          [Source 2]
          <br />
          [Source 3]
        </p>
      {:else if paragraph === 'Concept'}
        <p id="sub-info">
          BANaNAS, <br /><br /> The web app that takes the art of data correlation
          to new heights. Conceived and created by a team of four software engineering
          students with a passion for data analysis and a curious streak. The idea
          behind BANaNAS is to take two random pieces of data from around the web
          and see if they're related in any way. It's like a game of "Six Degrees
          of Kevin Bacon" but with data, and you never know what kind of interesting
          pattern you might uncover. We believe that data analysis should be accessible
          to everyone, not just the experts in the field. That's why we've created
          BANaNAS, a tool that allows users to explore data in a fun and interactive
          way. With BANaNAS, you never know what kind of connection you might make.
          It all started with a spark of inspiration and a lot of hard work, and
          we're excited to share BANaNAS with the world. So go ahead, give it a try
          and see what kind of interesting connections you can make.
        </p>
      {:else if paragraph === 'Creators'}
        <p id="sub-info">
          BANaNAS
          <br /><br />
          Created by :
          <br />
          <span
            ><a href="https://github.com/alexryanjones">Alex</a> : A design magician
            with a focus on frontend. His organization and forward thinking made
            it all come together as smooth as a good slice of Banana Bread.
          </span>
          <br />
          <span
            ><a href="https://github.com/Al366io"
              >Alessio (Alex but in Italian)</a
            > : A backend genius that can give endpoints faster than you can ask
            for them.
          </span>
          <br />
          <a href="https://github.com/sethjplatt">Seth</a> : Organized and
          efficient, he's the glue that holds the team together. With him
          working on the backend, you know the app is in good hands.
          <br />
          <a href="https://github.com/TerenceGrover">Terence</a> : A brilliant polymath fullstack developer, with some weird love for frontend, data visualization and bananas.
        </p>
      {/if}
    </div>
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
    -webkit-text-stroke: black 2px;
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

  #get-started {
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

  #get-started:hover {
    cursor: pointer;
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

  #divider-text {
    font-size: 38px;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #052c46;
    text-shadow: 2px 2px #ffffff;
  }

  #sub-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 100px;
    padding-left: 7vw;
    padding-right: 7vw;
    padding-top: 5vh;
    padding-bottom: 5vh;
    min-height: 75vh;
    background-color: #fed703;
    width: 100vw;
  }

  .home-buttons {
    font-size: 20px;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #052c46;
    background-color: #fed703;
    border: none;
    padding: 2vh 4vw;
    margin-top: 20px;
    border: 2px solid #052c46;
    border-radius: 12px;
    box-shadow: 6px 6px 0px 2px #000000aa;
    min-width: 250px;
    max-width: 200px;
  }

  .home-buttons:hover {
    cursor: pointer;
    background-color: #ffe23c;
  }

  #button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 25vw;
    gap: 100px;
    background-color: #fed703;
  }

  #paragraph-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    height: 100%;
    width: 75vw;
    background-color: #fed703;
    padding-bottom: 40px;
  }

  #paragraph-container > p {
    font-size: 18px;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #052c46;
    background-color: #fed703;
    border: none;
    padding: 2vh 4vw;
    line-height: 4vh;
    margin-top: 20px;
    border: 2px solid #052c46;
    border-radius: 12px;
    box-shadow: 8px 8px 0px 2px #000000aa;
  }

  i {
    font-style: normal;
    font-size: 24px;
  }

  .text-shadow-pop-br {
	-webkit-animation: text-shadow-pop-br 0.8s both;
	        animation: text-shadow-pop-br 0.8s both;
  }

  @keyframes text-shadow-pop-br {
  0% {
    text-shadow: 0 0 #ffffff, 0 0 #ffffff, 0 0 #ffffff, 0 0 #ffffff, 0 0 #ffffff, 0 0 #ffffff, 0 0 #ffffff, 0 0 #ffffff;
    -webkit-transform: translateX(0) translateY(0);
            transform: translateX(0) translateY(0);
  }
  100% {
    text-shadow: 1px 1px #ffffff, 1.5px 1.5px #ffffff, 2px 2px #ffffff, 2.5px 2.5px #ffffff, 3px 3px #ffffff, 3.5px 3.5px #ffffff, 4px 4px #ffffff, 4.5px 4.5px #ffffff;
    -webkit-transform: translateX(-4px) translateY(-4px);
            transform: translateX(-4px) translateY(-4px);
  }
}

</style>


