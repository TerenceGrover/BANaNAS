<script>
  export let changePage;
  export let left;
  export let right;
  export let leftCategory;
  export let rightCategory;

  const isMobile = window.innerWidth < 768;

  function handleclick() {
    console.log(
      'left',
      left,
      'right',
      right,
      'leftCategory',
      leftCategory,
      'rightCategory',
      rightCategory
    );
    isMobile
      ? changePage(
          'data',
          { cat: leftCategory, what: left.what, where: left.where },
          { cat: rightCategory, what: right.what, where: right.where }
        )
      : changePage(
          'data',
          { cat: leftCategory, what: left.what.value, where: left.where.value },
          {
            cat: rightCategory,
            what: right.what.value,
            where: right.where.value,
          }
        );
  }
</script>

<main>
  <img
    on:keydown={(e) => e.key === 'enter' && changePage('data')}
    id="vs"
    src="../../assets/vs.png"
    alt="vs"
    on:click={() => handleclick()}
  />
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
    animation: bouce 1s ease-in-out infinite;
  }

  @keyframes bouce {
    0% {
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.3) rotate(-10deg);
    }
    100% {
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }
  }

  @media screen and (max-width: 768px) {
    #vs {
      height: 150px;
      width: 170px;
    }
  }
</style>
