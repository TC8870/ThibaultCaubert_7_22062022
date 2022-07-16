<template>
  <form class="form" method="put">
    <div id="containerModifyPost" class="containerModel1">
      <img src="../assets/icon-left-font.png" alt="logo de Groupomania" class="logoGroupomania logoGroupomaniaCenter" />
      <div class="containerModel2">
        <h2 class="textmodel1">Modifier mon post</h2>
        <div class="formulaireType">
          <p>
            <label for="title" class="labelModel1">Titre : </label>
            <input v-model="post.title" type="string" name="title" class="InputForm" placeholder="Saisir mon titre ici">
          </p>
          <p>
            <label for="description" class="labelModel1">Mon texte : </label>
            <input v-model="post.description" type="string" name="description" class="InputForm" placeholder="Saisir mon texte ici">
          </p>
          <div class="zoneImageBtn">
            <label for="file" class="labelModel1">Image : </label>
            <input @change="onFileChange()" type="file" ref="file" name="file" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png">
          </div>
        </div>
        <button @click.prevent="modifyPost()" type="submit">Modifier mon post</button>
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
  name: 'modifyPost',
  data () {
    return {
      title: '',
      description: '',
      imageUrl: '',
      likes: '',
      dislikes: '',
      usersLiked: [],
      usersDisliked: [],
      commentUserNames: [],
      commentDates: [],
      commentDescriptions: [],
      errorMsg: '',
      post: ''
    }
  },
  mounted () {
    // Récupérer les données du localStorage
    const tokenWithDatas = JSON.parse(localStorage.getItem('userGroupomania'))
    const decryptedToken = jwt_decode(tokenWithDatas.token)
    const post = JSON.parse(localStorage.getItem('postToModify'))
    const postId = post.postId
    const headerConfig = { headers: { Authorization: 'Bearer ' + decryptedToken } }
    // Afficher les champs
    axios
      .get('http://localhost:3000/api/posts/' + postId, headerConfig)
      .then((response) => {
        this.post = response.data
        console.log(response.data)
      })
  },
  methods: {
    onFileChange () {
      this.file = this.$refs.file.files[0]
      this.newImage = URL.createObjectURL(this.file)
    },
    modifyPost () {
    // Récupérer les données du localStorage
      const user = JSON.parse(localStorage.getItem('userGroupomania'))
      const post = JSON.parse(localStorage.getItem('postToModify'))
      const AccessToken = user.token
      const postId = post.postId
      // Test si champs vides -- à compléter
      if (this.titre !== null || this.description !== null) {
        // Envoyer la requête PUT - form data too !
        axios
          .put('http://localhost:3000/api/posts/' + postId, {
            userId: post.userId,
            date: new Date().toLocaleDateString('fr'),
            userName: post.name,
            title: this.title,
            description: this.description,
            imageUrl: this.newImage,
            likes: post.likes,
            dislikes: post.dislikes,
            usersLiked: post.usersLiked,
            usersDisliked: post.usersDisliked,
            // Commentaires
            commentUserNames: post.commentUserNames,
            commentDates: post.commentDates,
            commentDescriptions: post.commentDescriptions
          }, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + AccessToken
            }
          })
          .then((response) => {
            console.log(post)
            console.log(this.title)
            window.alert('Post modifié')
            this.$router.push('/Posts')
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

<style>
.zoneImageBtn{
  display: flex;
  flex-direction: row;
  }

@media (max-width: 1020px) {
  .zoneImageBtn{
  display: flex;
  flex-direction: column;
  align-items: center;
  }
button {
    margin-top: 10px;
  }
}

</style>
