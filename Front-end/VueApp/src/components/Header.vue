<template>
  <div>
    <header>
      <img src="../assets/icon-left-font - Copie.png" alt="logo titre de Groupomania" class="logoTitreGroupomania" />
      <h1>L'intranet de votre entreprise</h1>
      <div id="slogan">
        <p>Votre espace de partage collectif ! Echangez avec chacun de vos collègues, partagez vos émotions, vos
          réussites !</p>
      </div>
      <div id="logOutContainer">
        <button @click.prevent="userLogOut()" type="submit" class="connectbutton btnLogOut">Se déconnecter</button>
      </div>
    </header>
    <nav>
      <ul>
        <li>
          <router-link to="/">Accueil</router-link>
        </li>
        <li>
          <router-link to="/ModifyAccount">Mon compte</router-link>
        </li>
        <li>
          <router-link to="/Posts">Actualités</router-link>
        </li>
        <li>
          <router-link to="/CreatePost">Ajouter un post</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  components: {
  },
  data: function () {
    return {
    }
  },
  methods: {
    userLogOut () {
      localStorage.removeItem('userGroupomania')
      this.$router.push('/Login')
    }
  }
}
</script>

<style>
#logOutContainer {
  width: 100%;
}

.btnLogOut {
  width: 150px;
  margin: 10px;
  float: right;
  color: #4E5166;
}
</style>
