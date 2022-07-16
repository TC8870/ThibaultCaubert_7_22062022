<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Header, Footer
  }
}
</script>

<style>
/*Permet de gérer le style général car pas de rechargement de pages*/
/*Style général*/
* {
  font-family: 'Merriweather Sans', sans-serif;
}
body {
  background-image: linear-gradient(180deg, #FD2D01 0%, #FFD7D7 95%,#4E5166 98% );
  background-repeat: no-repeat;
  padding: 0px;
  margin : 0px;
}
p{
    width: 100%
}

/*Style pour les messages d'erreurs*/
.error {
  margin-top: 10px;
  color: red;
  font-size: 12px;
  text-align: center;}

/*Style pour le header*/
.logoTitreGroupomania
{ margin-top: 10px;
  border-radius: 20px;
  height: 200px;
}
header {
  background-color: #FD2D01;
  color : #FFD7D7;
  font-style: italic;
  display : flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding:0px;
  margin-left:20px;
  margin-right:20px;
}
  header h1 {
    font-size : 40px;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 0;
    }
  header p {
    width: 100%;
    font-size : 18px;
    padding-left: 10px;
    padding-right: 10px;
    flex-wrap: wrap;
    }

/*Style pour le nav*/
nav ul{
  margin-top: 0;
  padding-left: 0;
  padding-right: 0;
  display : flex;
  flex-direction: row;
  background-color: #FFD7D7;
}
  nav li {
    text-align: center;
    margin: 10px;
    width: 25%;
    list-style: none;
  }

/*Style des contenus dynamiques*/
  /*Containers*/
  .containerModel1{
    display: flex;
    background-color: #FFD7D7;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 5px;
    margin-bottom: 5px;
    padding-bottom : 5px;
    border-radius: 20px}
  .containerModel2{
    display: flex;
    flex-direction: column;
    width: 65%;
    margin-left: 5%;
    margin-right: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 20px}

  /*Textes*/
  .textmodel1{
    padding-left:10px;
    font-size: 18px;
    text-align: center;
  }
  .textmodel1 p{
      font-size: 10px;
  }

  /*Boutons*/
  .btnStyle1{
    margin-top: 5px;
    margin-bottom: 5px;
    width: 200px;
    height: 100px;
    border-radius: 20px
  }
  .connectbutton {
    width: 100%;
  }
  .zoneImageBtn{
    padding-bottom: 20px;
    display:flex;
    flex-direction: row;
  }
  .btnAddImage {
    margin-left: 10px;
    min-width:100px
  }

  /*Champs de formulaire*/
  .formulaireType{
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    padding-left: 15px;
    padding-right: 15px;
  }
  .InputForm{
    margin-top:5px;
    display: flex;
    width: 100%;
  }
.labelModel1 {
  width: 200px;
  margin : 5px;
  padding-bottom: 15px;
  }

/*Style des logos Groupomania*/
.logoGroupomania {
  background-color: red;
  border-radius: 20px;
  height : 250px;
  width: 250px;
  margin-top:15px;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;
  display:block;
  border-radius: 10%;
  box-shadow: 3px 3px 2px 2px #4E5166;
  max-height : 250px
}
.logoGroupomaniaCenter {
  margin-top: auto;
  margin-bottom: auto;}

/*Style pour le footer*/
footer {
  background-color: #4E5166;
  color : #FFD7D7;
  font-size : 10px;
  text-align: center;
  padding : 20px;
  margin-top:20px;
}

/*Responsive - 1020 px*/
@media (max-width: 1020px) {
  .containerModel1{
  display: flex;
  flex-direction: column;
  align-items: center;
  }
  .logoTitreGroupomania
  { height: 100px;
  margin-top: 10px}
}

/*Responsive - 500 px*/
@media (max-width: 500px) {
.logoTitreGroupomania
  { height: 50px;
  margin-top: 10px}
nav ul{
  display : flex;
  flex-direction: column;}
nav li {
    width: 100%;
  }
.logoGroupomania {
  height : 150px;
  width: 150px;
}
.zoneImageBtn{
    flex-direction: column;
  }
}

</style>
