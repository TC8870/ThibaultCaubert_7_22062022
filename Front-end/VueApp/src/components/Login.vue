<template>
  <div id="containerLogin" class="containerModel1">
    <img src="../assets/icon-left-font.png" alt="logo de Groupomania" class="logoGroupomania" />
    <div class="containerModel2">
      <h2 class="textmodel1">Se connecter à mon compte</h2>
      <div class="formulaireType">
        <p>
          <label for="email" class="labelModel1">Adresse Email : </label>
          <input v-model="email" type="email" name="email" class="InputForm" placeholder="Saisir mon email ici">
        </p>
        <p>
          <label for="password" class="labelModel1">Mot de passe : </label>
          <input v-model="password" type="password" name="password" class="InputForm" placeholder="******">
        </p>
      </div>
      <button @click.prevent="userLogin()" type="submit" class="connectbutton">Se connecter</button>
      <div v-show="errorMsg" class="error">{{ errorMsg }}</div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    userLogin () {
      // Test si valeurs vides
      if (this.email !== null || this.password !== null) {
        this.errorMsg = ''
        // Si champs tous remplis
        Axios
          .post('http://localhost:3000/api/users/login', {
            email: this.email,
            password: this.password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            const infoConnexionUser = {
              token: response.data.token
            }
            // On ajoute les infos de l'User au LocalStorage
            localStorage.setItem('userGroupomania', JSON.stringify(infoConnexionUser))
            this.$router.push('/Posts')
            // On rafraichit pour permettre d'actualiser la visibilité des menus
            location.reload()
          })
          .catch(() => {
            this.loading = false
            this.errorMsg = 'Email/Mot de passe invalide'
          })
          // Si champs non remplis
      } else {
        this.errorMsg = 'Merci de renseigner un Email/Mot de passe'
      }
    }
  }
}

</script>
