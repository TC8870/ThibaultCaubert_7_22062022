<template>
  <div id="containerAccueil" class="containerModel1">
    <img src="../assets/icon-left-font.png" alt="logo de Groupomania" id="logoHeader" class="logoGroupomania" />
    <div class="messageAccueil">
      <p id="textAccueil"> Groupomania est fier de vous présenter son nouveau réseau social d'entreprise !</p>
    </div>
    <div id="btnchoice">
      <button id="btnConnect" class="btnStyle1">
        <router-link to="/Login">Se connecter</router-link>
      </button>
      <button id="createAccount" class="btnStyle1">
        <router-link to="/Signup">Créer un compte</router-link>
      </button>
    </div>
  </div>
</template>

<style>
#textAccueil {
  min-width: 400px;
  max-width: 1000px;
  font-size: 25px;
  text-align: center;
  vertical-align: center;
  margin-top: auto;
  margin-bottom: auto;
  padding: 10px;
}

#btnchoice {
  display: flex;
  flex-direction: column;
  text-align: center;
  vertical-align: center;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 5px;
  padding: 20px;
}

/*Responsive 1020px*/
@media (max-width: 1020px) {
  #textAccueil {
    font-size: 20px;
  }
}

/*Responsive 500px*/
@media (max-width: 500px) {
  .messageAccueil {
    width: 100%;
    background-color: blue;
  }

  #textAccueil {
    min-width: 0px;
    max-width: 500px;
  }
}
</style>
