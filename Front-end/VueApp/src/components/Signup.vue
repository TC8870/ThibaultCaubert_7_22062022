<template>
  <form class="form" method="post">
    <div id="containerSignup" class="containerModel1">
      <img src="../assets/icon-left-font.png" alt="logo de Groupomania" class="logoGroupomania logoGroupomaniaCenter" />
      <div class="containerModel2">
        <h2 class="textmodel1">Créer mon compte Groupomania</h2>
        <div class="formulaireType">
          <p>
            <label for="email" class="labelModel1">Email : </label>
            <input v-model="email" type="email" name="email" class="InputForm" id="email" placeholder="Saisir mon email ici" required>
          </p>
          <p>
            <label for="password" class="labelModel1">Password : </label>
            <input v-model="password" type="password" name="password" class="InputForm" id="password" placeholder="******" required>
          </p>
          <p>
            <label for="name" class="labelModel1">Nom : </label>
            <input v-model="name" type="string" name="name" class="InputForm" id="name" placeholder="Saisir mon nom ici" required>
          </p>
          <p>
            <label for="lastname" class="labelModel1">Prénom : </label>
            <input v-model="lastname" type="string" name="lastname" class="InputForm" id="lastname" placeholder="Saisir mon prénom ici" required>
          </p>
          <p>
            <label for="departement" class="labelModel1">Service : </label>
            <input v-model="departement" type="string" name="departement" class="InputForm" id="departement" placeholder="Saisir mon service ici" required>
          </p>
        </div>
        <button @click.prevent="userSignUp()" type="submit">Créer mon compte</button>
        <div v-show="errorMsg" class="error"> {{ errorMsg }}</div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'signUp',
  data () {
    return {
      email: '',
      password: '',
      name: '',
      lastname: '',
      departement: '',
      isAdministrator: false,
      errorMsg: ''
    }
  },
  methods: {
    userSignUp () {
      // Gestion des Regex
      const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/
      const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
      const userlastnameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
      // Test si champs vides + si regex OK
      if ((this.email !== null || this.password !== null || this.name !== null || this.lastname !== null || this.departement === '') &&
      (regexEmail.test(this.email) && regexPassword.test(this.password) && usernameRegex.test(this.name) && userlastnameRegex.test(this.lastname))) {
        this.errorMsg = ''
        axios
          .post('http://localhost:3000/api/users/signup', {
            email: this.email,
            password: this.password,
            name: this.name,
            lastname: this.lastname,
            departement: this.departement,
            isAdministrator: false
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            console.log(response)
            this.$router.push('/Login')
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      } else {
        this.errorMsg = 'Merci de renseigner tous les champs (email valide, mot de passe avec au minimum une majuscule et un caractère spécial, un nom et prénom sans chiffre)'
      }
    }
  }
}

</script>
