<template>
  <form class="form" method="post">
    <div id="containerLogin" class="containerModel1">
      <div class="containerModel2">
        <h2 class="textmodel1">Mur des publications</h2>
        <div :key="index" v-for="(post, index) in post" class="publicationModel">
          <div class="publicationBlocHeader">
            <h3 class="publicationTitre">{{ post.title }}</h3>
            <p class="publicationAuteur">Auteur :
              <br>
              {{ post.userName }}
            </p>
            <p class="publicationDate">Posté le {{ post.date }}</p>
            <div class="groupeIcones">
              <p class="publicationLike styleAsset">
                <a v-on:click="likePost(post)"><img src="../assets/thumbs-up-regular.svg" alt="logo like" class="fontIconAsset" /></a>
                {{ post.likes }}
              </p>
              <p class="publicationDislike styleAsset">
                <a v-on:click="dislikePost(post)"><img src="../assets/thumbs-down-regular.svg" alt="logo dislike" class="fontIconAsset" /></a>
                {{ post.dislikes }}
              </p>
              <p class="publicationEdit styleAsset">
                <router-link to="/Posts/ModifyPost">
                  <a v-if="userId == post.userId || isAdmin" v-on:click="editPost(post)">
                  <img src="../assets/edit-regular.svg" alt="logo modifier" class="fontIconAsset" /></a>
                </router-link>
              </p>
              <p class="publicationDelete styleAsset">
                <a v-if="userId == post.userId || isAdmin" v-on:click="deletePost(post)">
                <img src="../assets/window-close-solid.svg" alt="logo supprimer" class="fontIconAsset" /></a>
              </p>
            </div>
          </div>
          <div class="publicationBlocDescription">
            <p class="publicationDescription">{{ post.description }}</p>
            <img class="publicationImage" img v-bind:src=post.imageUrl>
          </div>
          <div class="newComment">
            <input v-model="newComment" type="string" name="newComment" class="InputForm"
              placeholder="Saisir mon commentaire ici">
          </div>
          <button @click.prevent="addComment(post)" type="submit" class="btnComment">Ajouter un commentaire</button>
          <div :key="index" v-for="(commentUniqueId, index) in post.commentUniqueId"
            class="publicationBlocCommentaire">
            <div class="publicationBlocCommentaireHeader">
              <p class="publicationCommentaireAuteur">De : {{ post.commentUserNames[index] }}</p>
              <p class="publicationCommentaireDate">Posté le : {{ post.commentDates[index] }}</p>
              <a v-if="userId == post.commentUserId[index] || isAdmin" v-on:click="deleteComment(post, [index])">
              <img src="../assets/window-close-solid.svg" alt="logo supprimer" class="fontIconAsset iconDeleteComment" /></a>
            </div>
            <div class="publicationBlocCommentaireDescription">
              <p class="publicationCommentaireDescription">{{ post.commentDescriptions[index] }}</p>
            </div>
          </div>
        </div>
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
  name: 'postsList',
  data () {
    return {
      post: '',
      newComment: '',
      userId: '',
      isAdmin: ''
    }
  },
  mounted () {
    // Permet de recharges les posts à la modification
    this.getAllPosts()
  },
  methods: {
    getAllPosts () {
      // Récupérer les données du localStorage
      const tokenWithDatas = JSON.parse(localStorage.getItem('userGroupomania'))
      const decryptedToken = jwt_decode(tokenWithDatas.token)
      this.userId = decryptedToken.userId
      this.isAdmin = decryptedToken.admin
      axios
        .get(('http://localhost:3000/api/posts'), { headers: { Authorization: 'Bearer ' + tokenWithDatas.token } })
        .then((response) => {
          // Affichage en ordre inverse (Tri par ordre décroissant de date)
          this.post = response.data.reverse()
        })
    },
    editPost (post) {
    // passer l'id du post en localStorage
      const IdPostToModify = {'postId': post._id}
      localStorage.setItem('postToModify', JSON.stringify(IdPostToModify))
      this.$router.push('/Posts/ModifyPost')
    },
    deletePost (post) {
    // Demander confirmation
      if (window.confirm('Confirmer la suppression du post ?')) {
        // Récupérer les données du localStorage
        const tokenWithDatas = JSON.parse(localStorage.getItem('userGroupomania'))
        const decryptedToken = jwt_decode(tokenWithDatas.token)
        const userId = decryptedToken.userId
        const isAdmin = decryptedToken.admin
        // Tester si autorisé
        if (userId === post.userId || isAdmin) {
          axios
            .delete('http://localhost:3000/api/posts/' + post._id, { headers: { Authorization: 'Bearer ' + tokenWithDatas.token } })
            .then((response) => {
              window.alert('Post supprimé')
              window.location.reload()
            })
            .catch((error) => {
              console.log(error.response.data)
            })
        } else {
          window.alert("Vous n'êtes pas autorisé")
        }
      }
    },
    likePost (post) {
    // Récupérer les données du localStorage
      const tokenWithDatas = JSON.parse(localStorage.getItem('userGroupomania'))
      const decryptedToken = jwt_decode(tokenWithDatas.token)
      // Test si déjà liké ou disliké - envoi du 0
      if (post.usersLiked.includes(decryptedToken.userId) || post.usersDisliked.includes(decryptedToken.userId)) {
        axios
          .post('http://localhost:3000/api/posts/' + post._id + '/like', {
            userId: decryptedToken.userId,
            like: 0
          }, {
            headers: { Authorization: 'Bearer ' + tokenWithDatas.token }
          })
          .then((response) => {
            this.getAllPosts()
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      } else {
        // Sinon envoi du 1 en tant que like
        axios
          .post('http://localhost:3000/api/posts/' + post._id + '/like', {
            userId: decryptedToken.userId,
            like: 1
          }, {
            headers: { Authorization: 'Bearer ' + tokenWithDatas.token }
          })
          .then((response) => {
            this.getAllPosts()
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      }
    },
    dislikePost (post) {
      // Récupérer les données du localStorage
      const tokenWithDatas = JSON.parse(localStorage.getItem('userGroupomania'))
      const decryptedToken = jwt_decode(tokenWithDatas.token)
      // Test si déjà liké ou disliké - envoi du 0
      if (post.usersLiked.includes(decryptedToken.userId) || post.usersDisliked.includes(decryptedToken.userId)) {
        axios
          .post('http://localhost:3000/api/posts/' + post._id + '/like', {
            userId: decryptedToken.userId,
            like: 0
          }, {
            headers: { Authorization: 'Bearer ' + tokenWithDatas.token }
          })
          .then((response) => {
            this.getAllPosts()
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      } else {
        axios
          .post('http://localhost:3000/api/posts/' + post._id + '/like', {
            userId: decryptedToken.userId,
            like: -1
          }, {
            headers: { Authorization: 'Bearer ' + tokenWithDatas.token }
          })
          .then((response) => {
            this.getAllPosts()
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      }
    },
    addComment (post) {
      // Récupérer les données du localStorage
      const tokenWithDatas = JSON.parse(localStorage.getItem('userGroupomania'))
      const decryptedToken = jwt_decode(tokenWithDatas.token)
      // Test si vide
      if (this.newComment === '') {
        window.alert('Aucun commentaire de saisi')
      } else {
        axios
          .post('http://localhost:3000/api/posts/' + post._id + '/comment', {
            commentUniqueId: Date.now() + '-' + Math.floor(Math.random() * 1000000),
            commentUserId: decryptedToken.userId,
            commentUserNames: decryptedToken.userCompleteName,
            commentDates: new Date().toLocaleDateString('fr'),
            commentDescriptions: this.newComment
          }, {
            headers: { Authorization: 'Bearer ' + tokenWithDatas.token }
          })
          .then((response) => {
            this.getAllPosts()
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      }
    },
    deleteComment (post, [index]) {
      // Demander confirmation
      if (window.confirm('Supprimer mon commentaire ?')) {
        // Récupérer les données du localStorage
        const tokenWithDatas = JSON.parse(localStorage.getItem('userGroupomania'))
        axios
          .post('http://localhost:3000/api/posts/' + post._id + '/comment/delete', {
            index: [index]
          }, {
            headers: { Authorization: 'Bearer ' + tokenWithDatas.token }
          })
          .then((response) => {
            this.getAllPosts()
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      }
    }
  }
}

</script>

<style>
/*Style pour les containers*/
.publicationModel{
  border-radius: 20px;
  margin : 10px;
  padding : 0px;
  border : 3px solid #FD2D01
}
.containerModel2{
  width: 100%;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
}

/*Partie Header Article*/
.publicationBlocHeader{
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  display:flex;
  flex: row;
  align-items: center;
  width: 100%;
  background-color: #FD2D01;
  color:white
  }
.publicationTitre{
  width: 500px;
  padding-left: 10px;
  }
.publicationAuteur{
  width: 500px;
  text-align: center;
  }
p.publicationDate{
  width: 120px;
  text-align: center;
  padding-right:10px;
  }
p.publicationLike{
  width: 60px;
  }
p.publicationDislike{
  width: 60px;
  }
p.publicationEdit{
  width: 50px;
  }
p.publicationDelete{
  width: 50px;
  }

/*Partie Description Article*/
.publicationBlocDescription{
  display: flex;
  flex-direction: row;
  width : 100%;
  margin:0;
  padding-left: 0;
  }
.publicationDescription{
  width: 80%;
  padding-left: 10px;
  }
.publicationBlocDescription img {
  margin-top:5px;
  margin-right:5px;
  margin-bottom: 5px;
  margin-left:5px;
  box-shadow: -3px 3px 3px #4E5166;
  border-radius: 10px;
  max-height: 250px;
  max-width: 250px;
}
.newComment input{
  margin-left: 2%;
  margin-right: 2%;
  width: 96%;
}
.btnComment {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 90%;
}

/*Partie Commentaire*/
.publicationBlocCommentaire{
  font-size: 12px;
  border-radius: 15px;
  border : 3px solid #4E5166;
  color:white;
  margin-top:5px;
  margin-bottom:5px;
  margin-left: 20px;
  margin-right: 5px;
  }
.publicationBlocCommentaireHeader{
  background-color: #4E5166;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-left:0px;
  display: flex;
  flex-direction: row;
  }
.publicationCommentaireAuteur{
  width: 400px;
  padding-left: 10px;
  }
.publicationCommentaireDate p{
  width: 40px;
  padding-right:10px
  }
.publicationBlocCommentaireDescription{
  width: 100%;
  }
.publicationCommentaireDescription{
  padding : 10px;
  margin:0px;
  color: #4E5166
  }

/*Style pour les icones*/
.groupeIcones {
  display: flex;
  flex: row;}
.fontIconAsset {
  display: flex;
  flex-direction: row;
  width : 20px;}
.fontIconAsset:hover {
  scale: 1.5}
.styleAsset {
  width: 40px;}
.publicationLike{
  margin-left: 5px;
  display: flex;
  flex-direction: row;}
.publicationDislike{
  display: flex;
  flex-direction: row;}
.iconDeleteComment {
  margin-top:8px;
  padding-right: 10px;}

/*Responsive*/
@media (max-width: 1020px) {
.publicationBlocHeader{
  flex-direction: column;
  }
.publicationBlocHeader p{
  margin:5px;
}
.publicationTitre{
  width: 400px;
}
.groupeIcones {
  width: 30%}
}

@media (max-width: 500px) {
.publicationTitre {
  width: 100%;
}
.publicationBlocDescription{
  flex-direction: column;
  align-items: center;
}
}

</style>
