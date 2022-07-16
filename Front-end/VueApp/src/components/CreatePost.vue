<template>
  <form class="form" method="post">
    <div id="containerCreatePost" class="containerModel1">
      <img src="../assets/icon-left-font.png" alt="logo de Groupomania" class="logoGroupomania logoGroupomaniaCenter" />
      <div class="containerModel2">
        <h2 class="textmodel1">Publier un post</h2>
        <div class="formulaireType">
          <p>
            <label for="title" class="labelModel1">Titre : </label>
            <input v-model="title" type="string" name="title" class="InputForm" placeholder="Saisir mon titre ici">
          </p>
          <p>
            <label for="description" class="labelModel1">Mon texte : </label>
            <input v-model="description" type="string" name="description" class="InputForm" placeholder="Saisir ma description ici">
          </p>
          <div class="zoneImageBtn">
            <label for="file" class="labelModel1">Image : </label>
            <input @change="onFileChange()" type="file" ref="file" name="file" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png">
          </div>
        </div>
        <button @click.prevent="createPost()" type="submit">Créer mon post</button>
        <div v-show="errorMsg" class="error">{{ errorMsg }}</div>
      </div>
    </div>
  </form>
</template>

<script>
// Désactiver le problème du camel case avec jwt-decode
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import axios from 'axios'

export default {
  name: 'createPost',
  data () {
    return {
      title: '',
      description: '',
      imageUrl: '',
      likes: '',
      dislikes: '',
      usersLiked: '',
      usersDisliked: '',
      commentUserNames: '',
      commentDates: '',
      commentDescriptions: '',
      errorMsg: ''
    }
  },
  methods: {
    onFileChange () {
      this.file = this.$refs.file.files[0]
      this.newImage = URL.createObjectURL(this.file)
    },
    createPost () {
    // Récupérer les données du localStorage
      const tokenWithDatas = JSON.parse(localStorage.getItem('userGroupomania'))
      const decryptedToken = jwt_decode(tokenWithDatas.token)
      // Gestion de la Formdata
      const myForm = new FormData()
      // Partie Post
      const myDataToCreatePost = {
        'userId': decryptedToken.userId,
        'date': new Date().toLocaleDateString('fr'),
        'userName': decryptedToken.userCompleteName,
        'title': this.title,
        'description': this.description,
        'likes': 0,
        'dislikes': 0,
        'usersLike': [],
        'usersDislike': [],
        'commentUserNames': [],
        'commentDates': [],
        'commentDescriptions': []
      }
      myForm.append('post', JSON.stringify(myDataToCreatePost))
      // Partie Image
      const file = this.file
      myForm.append('image', file)
      // Test si champs vides
      if (this.title !== '' || this.description !== '' || this.newImage !== '') {
        this.errorMsg = ''
        // Si champs tous remplis
        axios
          .post('http://localhost:3000/api/posts', myForm, {
            headers: {
              Authorization: 'Bearer ' + tokenWithDatas.token,
              'Content-type': 'multipart/form-data'}
          })
          .then((response) => {
            window.alert('Votre post a été publié')
            this.$router.push('/Posts')
          })
          .catch((error) => {
            console.log(error.response.data)
          })
          // Si des champs sont vides
      } else {
        this.errorMsg = 'Merci de renseigner un titre et une description'
      }
    }
  }
}

</script>
