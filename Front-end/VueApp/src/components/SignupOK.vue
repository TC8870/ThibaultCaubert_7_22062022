<template>
  <form class="form" method="post">
    <div id="containerSignup" class="containerModel1">
      <div class="containerModel2">
        <h2 class="textmodel1">Votre compte a bien été créé</h2>
        <button>
          <router-link to="/login">Se connecter</router-link>
        </button>
      </div>
    </div>
  </form>
</template>

<style>
.logoGroupomania {
  margin-top: auto;
  margin-bottom: auto;
}

.containerModel2 {
  width: 90%;
}

@media (max-width: 1020px) {
  .logoGroupomania {
    margin-top: 10px
  }
}
</style>
