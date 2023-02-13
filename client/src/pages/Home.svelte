<script>
  import Footer from '../components/Footer.svelte';
  import { transformMouseIntoCSSShadow } from '../Utils/helpers';
  import { getBananas } from '../Utils/api-services';
  import DropBanana from '../components/Drop-Banana.svelte';
  import { onMount } from 'svelte';
  import TapoConnect from '../components/Tapo-Connect.svelte';
  import Coffee from '../components/Coffee.svelte';
  import Monkey from '../components/Monkey.svelte';
  export let changePage;
  export let clickedBulb = false;
  export let clickedCoffee = false;
  export let clickedMonkey = false;
  export let loggedIn = false;

  export let credentials;
  let shadowStr = '0px 0px 0px 0px #000';
  const isMobile = window.innerWidth < 768;

  function handleMove(e) {
    shadowStr = transformMouseIntoCSSShadow(e.clientX, e.clientY);
  }

  let teamBananas;

  getBananas().then((bananaData) => {
    teamBananas = bananaData;
  });

  let paragraph = 'Transparency';

  function ParagraphSelector(newP) {
    paragraph = newP;
  }

  if (!isMobile) {
    onMount(() => {
      canvas = document.querySelector('#canvas');
      ctx = canvas.getContext('2d');
    });

    let ctx;
    let canvas;

    let w,
      h,
      bananas = [];
    let mouse = {
      x: undefined,
      y: undefined,
    };

    let lastMouseX, lastMouseY;

    function init() {
      resizeReset();
      animationLoop();
    }

    function resizeReset() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function animationLoop() {
      ctx.clearRect(0, 0, w, h);

      if (
        mouse.x !== undefined &&
        mouse.y !== undefined &&
        (lastMouseX !== mouse.x || lastMouseY !== mouse.y)
      ) {
        bananas.push(new Banana());
        lastMouseX = mouse.x;
        lastMouseY = mouse.y;
      }
      for (let i = 0; i < bananas.length; i++) {
        if (Date.now() - bananas[i].time > 500) {
          bananas.splice(i, 1);
          i--;
        }
      }
      drawBananas();
      requestAnimationFrame(animationLoop);
    }

    function drawBananas() {
      for (let i = 0; i < bananas.length; i++) {
        bananas[i].draw();
      }
    }

    function mousemove(e) {
      mouse.x = e.x;
      mouse.y = e.y;
    }

    function mouseout() {
      mouse.x = undefined;
      mouse.y = undefined;
    }

    function getRandomInt(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    }

    class Banana {
      constructor() {
        this.text = '🍌';
        this.x = mouse.x + getRandomInt(-20, 20);
        this.y = mouse.y + getRandomInt(-20, 20);
        this.size = getRandomInt(3, 20);
        this.font = this.size + 'px Arial';
        this.style = '-webkit-text-stroke: 1px black;';
        this.style += 'filter: drop-shadow(2px 2px 1px rgba(0,0,0,0.5));';
        this.style += 'z-index: 1000;';
        this.time = Date.now();
      }
      draw() {
        ctx.fillStyle = this.style;
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
      }
    }

    window.addEventListener('DOMContentLoaded', init);
    window.addEventListener('resize', resizeReset);
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseout', mouseout);
  }
</script>

<main on:mousemove={handleMove}>
  <div id="left-icons-container">
    <Coffee bind:clickedBulb bind:clickedCoffee bind:clickedMonkey />
    <Monkey bind:clickedBulb bind:clickedCoffee bind:clickedMonkey />
  </div>
  <section id="top-section">
    <DropBanana />
    <h1 id="top-header" class="text-shadow-pop-br">BANaNAS</h1>
    <div id="top-sub-container">
      <h3 id="top-sub-header">
        Get the relation between any two kinds of data<br />With a twist
      </h3>
    </div>
    {#if isMobile}
      <div id="mobile-button">
        <button id="get-started"
          on:click={() => {
            changePage('character')
            }}
        >
          Get Started
        </button>
      </div>
    {:else}
    <div id="mode-select-container">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div id="single-player-container">
        <img
          src="../assets/jobs/male.svg"
          alt="single-monkey"
          id="single"
          class="players"
          on:click={() => changePage('single-player')}
        />
        <p id="single-player-label" class="label">Single Player</p>
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div id="multiplayer-container">
        <img
          src="../../assets/jobs/male.svg"
          alt="multi-monkey"
          id="multi-1"
          class="players"
          on:click={() => changePage('character')}
          style={`drop-shadow : ${shadowStr}`}
        />
        <img
          src="../../assets/jobs/female.svg"
          alt="multi-monkey"
          id="multi-2"
          class="players"
        />
        <p id="multiplayer-label" class="label">Multiplayer</p>
      </div>
    </div>
    {/if}
  </section>

  <div id="divider">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      id="divider-text"
      on:click={() => {
        document
          .getElementById('hr-divider')
          .scrollIntoView({ behavior: 'smooth' });
      }}>Educate yourself</span
    >
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
          The web app that takes two random pieces of data from around the web
          and tries to find any correlation, no matter how wild or far-fetched.
          Created by a team of enthusiasts with a love for data analysis and a
          knack for finding connections where others see none. We use top secret
          algorithms such as the <span><a href="https://en.wikipedia.org/wiki/Pearson_correlation_coefficient">
          Pearson correlation coefficient</a></span> to aggregate the data, but
          don't let that fool you, we're not professional statisticians. We're
          more like professional data detectives, with a little bit of Sherlock
          Holmes and a little bit of Inspector Gadget. Please keep in mind that
          the correlation found by BANaNAS should be taken with a grain of salt,
          and a dash of humor. We encourage users to check out the sources and
          do their own analysis, cause let's face it, correlation does not equal
          causation, but it's still fun to look for the links.
          <br />
          Sources:
          <br />
          <span
            ><a href="https://documents.worldbank.org/">World Bank API</a> - The
            Master of Data and the King of APIs.
          </span>
          <br />
          <span
            ><a href="https://www.shutterstock.com/g/heruka">HerukArt</a> - The
            Father of Monkeys. Our anonymous benefactor.
            <br />
            <a href="https://open-meteo.com/">Open Meteo API</a> - Rain
            or sun, this API is always there for you.
          </span>
        </p>
      {:else if paragraph === 'Concept'}
        <p id="sub-info">
          The web app that takes the art of data correlation to new heights.
          Conceived and created by a team of four software engineering students
          with a passion for data analysis and a curious streak. The idea behind
          BANaNAS is to take two random pieces of data from around the web and
          see if they're related in any way. It's like a game of "Six Degrees of
          Kevin Bacon" but with data, and you never know what kind of
          interesting pattern you might uncover. We believe that data analysis
          should be accessible to everyone, not just the experts in the field.
          That's why we've created BANaNAS, a tool that allows users to explore
          data in a fun and interactive way. With BANaNAS, you never know what
          kind of connection you might make. It all started with a spark of
          inspiration and a lot of hard work, and we're excited to share BANaNAS
          with the world. So go ahead, give it a try and see what kind of
          interesting connections you can make.
        </p>
      {:else if paragraph === 'Creators'}
        <div>
          <p id="sub-info">
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
              for them. This guy would never slip on a peel.
            </span>
            <br />
            <a href="https://github.com/sethjplatt">Seth</a> : Organized,
            efficient and nicknamed 'Big Banana' during highschool, he's the
            glue that holds the team together. With him working on the backend,
            you know the app is in good hands.
            <br />
            <a href="https://github.com/TerenceGrover">Terence</a> : A brilliant
            polymath fullstack developer, with some weird love for frontend, data
            visualization and bananas.
          </p>
          <table id="banana-table">
            <p
              id="table-header"
              style="grid-column-start: 1; grid-row-start: 1; grid-column-end: 5"
            >
              Bananas eaten during the making of this project:
            </p>
            <tr id="table-names" style="grid-row-start: 2; grid-row-end: 2;">
              <th
                class="table-cell"
                style="grid-column-start: 1; grid-column-end: auto;">Alex</th
              >
              <th
                class="table-cell"
                style="grid-column-start: 2; grid-column-end: auto;">Alessio</th
              >
              <th
                class="table-cell"
                style="grid-column-start: 3; grid-column-end: auto">Seth</th
              >
              <th
                class="table-cell"
                style="grid-column-start: 4; grid-column-end: auto;">Terence</th
              >
              <th
                class="table-cell"
                style="grid-column-start: 5; grid-column-end: auto;">Total</th
              >
            </tr>
            <tr id="table-bananas" style="grid-row-start: 3; grid-row-end: 3;">
              <td
                class="table-cell"
                style="grid-column-start: 1; grid-column-end: auto"
                >{teamBananas.alex} 🍌</td
              >
              <td
                class="table-cell"
                style="grid-column-start: 2; grid-column-end: auto"
                >{teamBananas.alessio} 🍌</td
              >
              <td
                class="table-cell"
                style="grid-column-start: 3; grid-column-end: auto"
                >{teamBananas.seth} 🍌</td
              >
              <td
                class="table-cell"
                style="grid-column-start: 4; grid-column-end: auto"
                >{teamBananas.terence} 🍌</td
              >
              <td
                class="table-cell"
                style="grid-column-start: 5; grid-column-end: auto"
                >{teamBananas.total} 🍌</td
              >
            </tr>
          </table>
        </div>
      {:else if paragraph === 'Concept'}
        <p id="sub-info">
          The web app that takes the art of data correlation to new heights.
          Conceived and created by a team of four software engineering students
          with a passion for data analysis and a curious streak. The idea behind
          BANaNAS is to take two random pieces of data from around the web and
          see if they're related in any way. It's like a game of "Six Degrees of
          Kevin Bacon" but with data, and you never know what kind of
          interesting pattern you might uncover. We believe that data analysis
          should be accessible to everyone, not just the experts in the field.
          That's why we've created BANaNAS, a tool that allows users to explore
          data in a fun and interactive way. With BANaNAS, you never know what
          kind of connection you might make. It all started with a spark of
          inspiration and a lot of hard work, and we're excited to share BANaNAS
          with the world. So go ahead, give it a try and see what kind of
          interesting connections you can make.
        </p>
      {/if}
    </div>
  </section>
  <div id="footer">
    <Footer />
  </div>
</main>

<style global>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100vw;
    overflow-x: hidden;
  }

  #canvas {
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  #right-icons-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    top: 2.5vh;
    right: 2.5vw;
    z-index: 4;
    cursor: pointer;
  }

  #left-icons-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    z-index: 2;
    top: 2.5vh;
    left: 2.5vw;
    z-index: 4;
    cursor: pointer;
    gap: 10px;
  }

  #top-section {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 85vh;
    width: 100vw;
    background-color: #052c46;
    gap: 2vh
  }

  #top-header {
    font-size: 11vh;
    font-family: 'Farro', sans-serif;
    color: #fed703;
    -webkit-text-stroke: black 2px;
    z-index: 3;
    filter: drop-shadow(5px 5px 0 black);
  }

  #top-sub-container {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 10px;
    background-color: #052c46;
  }

  #mobile-button {
    margin-top: 5vh;
    z-index: 50;
  }

  #get-started {
    font-size: 5vh;
    font-family: 'Farro', sans-serif;
    color: #052c46;
    font-weight: 500;
    border-radius: 15px;
    filter: drop-shadow(10px 10px 0 black);
    padding: 2.5vh 7.55vw;
    background-color: #fed703;
    border-style: none;
    border: 2px solid white;
  }

  #top-sub-header {
    font-size: 18px;
    font-family: 'Farro', sans-serif;
    color: #fff;
    z-index: 3;
    filter: drop-shadow(3px 3px 0 black);
  }

  #mode-select-container {
    display: flex;
    justify-content: space-between;
    max-width: 50vw;
    min-width: 200px;
    z-index: 4;
  }

  #single-player-label {
    cursor: pointer;
    z-index: 3;
    text-align: left;
  }

  #multiplayer-label {
    cursor: pointer;
    z-index: 3;
    text-align: right;
  }

  .label {
    border-radius: 5px;
    filter: drop-shadow(5px 5px 0px #000000);
    font-size: 5vh;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #fed703;
  }

  #single-player-container:hover {
    transform: scale(1.1);
  }

  #multiplayer-container:hover {
    transform: scale(1.1);
  }

  /* #single:hover + #single-player-label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #multiplayer-container:hover + #multiplayer-label {
    display: flex;
    flex-direction: column;
    align-items: center;
  } */

  .players {
    height: 25vh;
    cursor: pointer;
    z-index: 5;
  }

  #single {
    margin-left: 15px;
  }

  #multi-1 {
    z-index: 3;
    position: absolute;
    margin-left: 5vw;
  }

  #multi-2 {
    z-index: 4;
    margin-right: 5vw;
  }

  #hr-divider {
    height: 0.5vh;
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
    z-index: 3;
  }

  #divider-text {
    font-size: 38px;
    font-family: 'Farro', sans-serif;
    font-weight: 600;
    color: #052c46;
    text-shadow: 2px 2px #ffffff;
    animation: pulse 2s infinite;
    cursor: pointer;
    position: relative;
    z-index: 100;
  }

  #divider-text:hover {
    animation-play-state: paused;
    animation: tilt-shaking 0.5s infinite;
  }

  #sub-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5vw;
    padding-left: 4vw;
    padding-right: 4vw;
    padding-top: 5vh;
    padding-bottom: 5vh;
    min-height: 75vh;
    max-height: 75vh;
    background-color: #fed703;
    width: 100vw;
    z-index: 3;
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
    max-width: 250px;
    z-index: 3;
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
    width: 75vw;
    background-color: #fed703;
  }

  #paragraph-container > p,
  #paragraph-container > div {
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
    z-index: 3;
  }

  #banana-table {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fed703;
    margin-top: 5vh;
  }

  #table-header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #table-names {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    justify-content: center;
  }
  #table-bananas {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    justify-content: center;
  }

  .table-cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #footer {
    height: 9.5vh;
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
      text-shadow: 0 0 #ffffff, 0 0 #ffffff, 0 0 #ffffff, 0 0 #ffffff,
        0 0 #ffffff, 0 0 #ffffff, 0 0 #ffffff, 0 0 #ffffff;
      -webkit-transform: translateX(0) translateY(0);
      transform: translateX(0) translateY(0);
    }
    100% {
      text-shadow: 1px 1px #ffffff, 1.5px 1.5px #ffffff, 2px 2px #ffffff,
        2.5px 2.5px #ffffff, 3px 3px #ffffff, 3.5px 3.5px #ffffff,
        4px 4px #ffffff, 4.5px 4.5px #ffffff;
      -webkit-transform: translateX(-4px) translateY(-4px);
      transform: translateX(-4px) translateY(-4px);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
    }

    50% {
      transform: scale(1);
    }

    100% {
      transform: scale(0.95);
    }
  }

  @keyframes tilt-shaking {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(5deg);
    }
    50% {
      transform: rotate(0eg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @media screen and (max-width: 1080px) {
    #paragraph-container > p {
      font-size: 1.5vw;
    }
  }

  @media screen and (max-width: 800px) {
    #top-header {
      font-size: 9vh;
    }

    #sub-section {
      flex-direction: column;
      gap: 30px;
      padding-top: 2vh;
      padding-bottom: 5vh;
      height: auto;
      min-height: 80vh;
      max-height: none;
    }

    #paragraph-container {
      width: 80vw;
      height: 50vh;
      height: fit-content;
    }

    #paragraph-container > p {
      font-size: 13px;
      line-height: 3vh;
    }

    #button-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 90vw;
      gap: 25px;
      background-color: #fed703;
    }

    .home-buttons {
      font-size: 13.5px;
      padding: 1vh 2vw;
      margin-top: 10px;
      min-width: 27vw;
      max-width: 27vw;
    }

    #footer {
      height: 7.5vh;
      padding-left: 7.5vw;
    }
  }
</style>