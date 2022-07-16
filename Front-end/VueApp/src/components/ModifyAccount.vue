<template>
  <form class="form" method="put">
    <div id="containerModifyAccount" class="containerModel1">
      <img src="../assets/icon-left-font.png" alt="logo de Groupomania" class="logoGroupomania logoGroupomaniaCenter" />
      <div class="containerModel2">
        <h2 class="textmodel1">Modifier mon compte Groupomania</h2>
        <div class="formulaireType">
          <p>
            <label for="email" class="labelModel1">Email : </label>
            <input v-model="user.email" type="email" name="email" class="InputForm" placeholder="Saisir mon email ici">
          </p>
          <p>
            <label for="name" class="labelModel1">Nom : </label>
            <input v-model="user.name" type="string" name="name" class="InputForm" placeholder="Saisir mon nom ici">
          </p>
          <p>
            <label for="lastname" class="labelModel1">Prénom : </label>
            <input v-model="user.lastname" type="string" name="lastname" class="InputForm"
              placeholder="Saisir mon prénom ici">
          </p>
          <p>
            <label for="departement" class="labelModel1">Service : </label>
            <input v-model="user.departement" type="string" name="departement" class="InputForm"
              placeholder="Saisir mon service ici">
          </p>
          <p>
            <label for="password" class="labelModel1">Mot de passe : </label>
            <input v-model="password" type="password" name="password" class="InputForm"
              placeholder="Renseigner mon mot de passe pour valider les modifications">
          </p>
        </div>
        <button @click.prevent="modifyAccount()" type="submit">Modifier mon compte</button>
        <div v-show="errorMsg" class="error">{{ errorMsg }}</div>
      </div>
    </div>
  </form>
</template>

<script>
// Désactiver le problèmdu camel case avec jwt-decode
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import axios from 'axios'

export default {
  name: 'modifyAccount',
  data () {
    return {
      email: '',
      password: '',
      name: '',
      lastname: '',
      departement: '',
      isAdministrator: false,
      errorMsg: '',
      user: ''
    }
  },
  mounted () {
    // Récupérer les données du localStorage
    const tokenWithDatas = JSON.parse(localStorage.getItem('userGroupomania'))
    const decryptedToken = jwt_decode(tokenWithDatas.token)
    // Afficher les champs
    axios
      .get('http://localhost:3000/api/users/' + decryptedToken.userId, {headers: {Authorization: 'Bearer ' + tokenWithDatas.token}})
      .then((response) => {
        this.user = response.data
      })
  },
  methods: {
    modifyAccount () {
      // Récupérer les données du localStorage
      const tokenWithDatas = JSON.parse(localStorage.getItem('userGroupomania'))
      const decryptedToken = jwt_decode(tokenWithDatas.token)
      // Gestion des Regex
      const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g
      const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
      const userlastnameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
      // Test si champs vides + si regex OK
      if ((this.email !== null || this.name !== null || this.lastname !== null || this.departement === '') &&
        (regexEmail.test(this.user.email) && usernameRegex.test(this.user.name) && userlastnameRegex.test(this.user.lastname))) {
        this.errorMsg = ''
        // Envoyer la requête PUT
        axios
          .put('http://localhost:3000/api/users/' + decryptedToken.userId, {
            email: this.user.email,
            password: this.password,
            name: this.user.name,
            lastname: this.user.lastname,
            departement: this.user.departement,
            isAdministrator: false
          }, {
            headers: { Authorization: 'Bearer ' + tokenWithDatas.token }
          }
          )
          .then((response) => {
          // Alerte de confirmation + logout pour avoir un nouveau token
            window.alert('Compte modifié')
            localStorage.clear('user')
            this.$router.push('/Login')
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      } else {
        this.errorMsg = 'Merci de renseigner tous les champs (email valide, un nom et prénom sans chiffres ni espaces)'
      }
    }
  }
}

</script>

<style>
.logoGroupomania {
  margin-top: auto;
  margin-bottom: auto;
}

@media (max-width: 1020px) {
  .logoGroupomania {
    margin-top: 10px
  }
}
</style>
