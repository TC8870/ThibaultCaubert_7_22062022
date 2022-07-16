// Importer les éléments pour Vue
import Vue from 'vue'
import Router from 'vue-router'

// Importer les différents composants
import Accueil from '@/components/Accueil'
import Signup from '@/components/Signup'
import SignupOK from '@/components/SignupOK'
import Login from '@/components/Login'
import ModifyAccount from '@/components/ModifyAccount'
import CreatePost from '@/components/CreatePost'
import ModifyPost from '@/components/ModifyPost'
import ShowPosts from '@/components/ShowPosts'

// Utilisation du Router de Vue
Vue.use(Router)

// Récapitulatif des objets qui définissent chaque route
// Structure :
// path: '/', => Adresse URL correspondant au composant
// name: 'Accueil', => Nom de cette route
// component: Accueil => Composant qui doit s'afficher quand le path est trouvé

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/SignupOK',
      name: 'SignupOK',
      component: SignupOK
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ModifyAccount',
      name: 'ModifyAccount',
      component: ModifyAccount
    },
    {
      path: '/Posts',
      name: 'ShowPosts',
      component: ShowPosts
    },
    {
      path: '/CreatePost',
      name: 'CreatePost',
      component: CreatePost
    },
    {
      path: '/Posts/ModifyPost',
      name: 'ModifyPost',
      component: ModifyPost
    }
  ]
})
