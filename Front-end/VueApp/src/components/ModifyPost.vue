<template>
  <form class="form" method="put">
    <div id="containerModifyPost" class="containerModel1">
      <img class="publicationImageModify" v-bind:src=post.imageUrl>
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
      commentUniqueId: [],
      commentUserId: [],
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
    const post = JSON.parse(localStorage.getItem('postToModify'))
    const postId = post.postId
    const headerConfig = { headers: { Authorization: 'Bearer ' + tokenWithDatas.token } }
    // Afficher les champs
    axios
      .get('http://localhost:3000/api/posts/' + postId, headerConfig)
      .then((response) => {
        this.post = response.data
      })
  },
  methods: {
    onFileChange () {
      this.file = this.$refs.file.files[0]
      this.newImage = URL.createObjectURL(this.file)
    },
    modifyPost () {
    // Récupérer les données du localStorage
      const tokenWithDatas = JSON.parse(localStorage.getItem('userGroupomania'))
      const decryptedToken = jwt_decode(tokenWithDatas.token)
      const post = JSON.parse(localStorage.getItem('postToModify'))
      const postId = post.postId
      // Gestion de la Formdata
      const myFormModify = new FormData()
      // Partie Post
      const myDataToModifyPost = {
        'userId': decryptedToken.userId,
        'date': new Date().toLocaleDateString('fr'),
        'userName': decryptedToken.userCompleteName,
        'title': this.post.title,
        'description': this.post.description,
        'likes': post.likes,
        'dislikes': post.dislikes,
        'usersLike': post.usersLiked,
        'usersDislike': post.usersDisliked,
        'commentUniqueId': post.commentUniqueId,
        'commentUser': post.commentUser,
        'commentUserNames': post.commentUserNames,
        'commentDates': [],
        'commentDescriptions': []
      }
      myFormModify.append('post', JSON.stringify(myDataToModifyPost))
      // Partie Image - Test si nouvelle image ou non
      const file = this.file
      myFormModify.append('image', file)
      if (this.title !== null || this.description !== null) {
        // Envoyer la requête PUT - form data too !
        axios
          .put('http://localhost:3000/api/posts/' + postId, myFormModify, {
            headers: {
              'Content-type': 'multipart/form-data',
              Authorization: 'Bearer ' + tokenWithDatas.token
            }
          })
          .then((response) => {
            window.alert('Post modifié')
            this.$router.push('/Posts')
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      } else {
        // Indiquer de compléter un titre et une description
        this.errorMsg = 'Merci de renseigner un titre et une description'
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
.publicationImageModify {
  background-color: red;
  border-radius: 20px;
  max-height: 250px;
  max-width: 250px;
  margin-top:15px;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;
  display:block;
  border-radius: 10%;
  box-shadow: -3px 3px 3px #4E5166;
  max-height : 250px
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
