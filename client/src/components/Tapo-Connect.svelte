<script>
import { tapoLogin } from '../Utils/api-services.js'
export let clickedMonkey;
export let clickedCoffee;
export let clickedBulb;
export let credentials;
export let loggedIn;

async function handleLogin (e) {
  e.preventDefault();
  clickedBulb = false;
  loggedIn = true;
  const formData = new FormData(e.target);
  credentials = {
    username: formData.get('email'),
    password: formData.get('password'),
    ip: formData.get('ip')
  }
  // add login function here
  try {
    const res = await tapoLogin(credentials)
  } catch (err) {
  }
}

</script>

<main>
  <div id="content-container">
    {#if !loggedIn}
      <img id="bulb-icon" src="../../assets/icons/bulb-off.svg" alt="bulb" on:click={() => {
        clickedBulb = !clickedBulb;
        clickedMonkey = false;
        clickedCoffee = false;
      }}
      on:keydown={e => {
        if (e.key === 'Enter') {
          clickedBulb = !clickedBulb;
          clickedMonkey = false;
          clickedCoffee = false;
        }
      }}
      />
    {:else}
    <div id="glow-container">
      <div id="glow"></div>
      <img id="bulb-icon" src="../../assets/icons/bulb-on.svg" alt="bulb" on:click={() => {
        clickedBulb = !clickedBulb;
        clickedMonkey = false;
        clickedCoffee = false;
      }}
      on:keydown={e => {
        if (e.key === 'Enter') {
          clickedBulb = !clickedBulb;
          clickedMonkey = false;
          clickedCoffee = false;
        }
      }}
      />
      </div>
    {/if}
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
      <div id="ip">
        <img id="info" src="../../assets/icons/info.svg" alt="info" />
        <div id="device-ip">
          <p id="title">How to find your Device IP</p>
          <p id="steps">
            1. Open the Tapo app on your phone and go to the device you want to
            connect to.
            <br />
            2. Click on the device name and then click on the device settings.
            <br />
            3. Click on the "Device Info" tab.
            <br />
            4. Your device IP will be listed under "Device IP".
          </p>
        </div>
        <label for="ip">Device IP</label>
        <input name="ip" type="text" placeholder="Device IP" />
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
    height: 7.5vh;
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

  #password, #email, #ip, #login-container {
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

  #info {
    height: 2.5vh;
    padding-bottom: 2px;
    filter: drop-shadow(2px 2px 0px #000000);
    cursor: pointer;
  }
  

  #device-ip {
    display: none;
    position: absolute;
    align-self: flex-start;
    margin-top: 70px;
    background: rgba(187, 187, 187, 0.516);
    padding: 10px;
    border: 1px solid white;
    font-size: 2vh;
    gap: 10px;
    border-radius: 5px;
    filter: drop-shadow(2px 2px 0px #000000);
  }

  #info:hover + #device-ip {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #title {
    font-weight: bold;
  }

  #steps {
    font-size: 2vh;
    align-self: flex-start;
  }

  #glow {
  box-shadow: 0 0 20px #fed703;
  border-radius: 50%;
  height: 3vh;
  width: 3vh;
  position: absolute;
  z-index: -1;
  margin-top: 2vh;

}

#glow-container {
  position: relative;
  display: flex;
  justify-content: center;
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