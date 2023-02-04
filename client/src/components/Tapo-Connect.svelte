<script>
// import { tapoConnect, tapoTurnOn } from '../Utils/tapoApi.js'
export let clickedBulb;
export let credentials;

// let deviceToken;

// async function handleLogin () {
//   deviceToken = await tapoConnect('alexryanjones@gmx.com',
//   'KWRfyoaDx_WsA*P46A', '192.168.1.202')
//   await tapoTurnOn(deviceToken);
// }

async function handleLogin (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  credentials = {
    email: formData.get('email'),
    password: formData.get('password')
  }
  // add login function here
}

</script>

<main>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div id="content-container">
  <img id="bulb-icon" src="../../assets/icons/bulb.svg" alt="bulb" on:click={() => {
    clickedBulb = !clickedBulb
    }}/>
  {#if clickedBulb}
  <div id="form-container" class="fade-in">
    <form id="login-form" on:submit|preventDefault={(e) => {handleLogin(e)}}>
      <div id="email">
        <label for="email">Email</label>
        <input name="email" type="text" placeholder="Email" />
      </div>
      <div id="password">
        <label for="password">Password</label>
        <input name="password" type="password" placeholder="Password" />
      </div>
      <div id="login-container">
        <button id="login-button" type="submit">Login</button>
      </div>
    </form>
  </div>
  {/if}
  </div>

</main>

<style>

  #content-container {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    -webkit-text-stroke: black 0.5px;
    filter: drop-shadow(2px 2px 0px #000000);
    transition: width 2s
    
  }

  #bulb-icon {
    height: 5vh;
    filter: drop-shadow(2px 2px 0px #000000);
    cursor: pointer;
  }

  #form-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    font-family: 'Farro', sans-serif;
    color: #fed703;
    margin-top: 5px;
    font-size: 2.5vh;
  }

  #login-button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Farro', sans-serif;
    background-color: #052c46;
    color: #fed703;
    border: 1px solid white;
    width: 143px;
    height: 30px;
    border-radius: 5px;
    filter: drop-shadow(3px 3px 3px #000000);
    cursor: pointer;


  }

  #password, #email, #login-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-family: 'Farro', sans-serif;
    color: #fed703;
    filter: drop-shadow(2px 2px 0px #000000);
    margin-bottom: 5px;
    margin-left: 5px;
    gap: 5px;

  }

  .fade-in {
    animation: fade-in-fwd 0.5s;
  }

  .fade-out {
    animation: fade-out-backward 0.5s;
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