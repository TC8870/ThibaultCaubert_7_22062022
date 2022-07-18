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
        <li v-if="userId !== ''">
          <router-link to="/ModifyAccount">Mon compte</router-link>
        </li>
        <li v-if="userId !== ''">
          <router-link to="/Posts">Actualités</router-link>
        </li>
        <li v-if="userId !== ''" >
          <router-link to="/CreatePost">Ajouter un post</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
// Désactiver le problème du camel case avec jwt-decode
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

export default {
  components: {
  },
  data: function () {
    return {
      userId: ''
    }
  },
  mounted () {
    // Récupérer les données du localStorage
    const tokenWithDatas = JSON.parse(localStorage.getItem('userGroupomania'))
    const decryptedToken = jwt_decode(tokenWithDatas.token)
    this.userId = decryptedToken.userId
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
