<template>
        <div class="container">
                <div class="user" v-if="userInfo">
                    <p>Usuario</p>
                    <p>{{ userInfo.userDetails }}</p>
                    <p>{{ userInfo.identityProvider }}</p>
                </div>
                <div class="login" v-if="!userInfo">
                     <a href="/.auth/login/aad">Login</a>
                </div>  
                 <hr/>
                <h2>Lista</h2>
                <table>
                    <thead> 
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="dato in lista" v-bind:key="dato.id">
                            <th scope="row">{{dato.id}}</th>
                            <th scope="row">{{dato.nombre}}</th>
                        </tr>
                    </tbody>
                </table>
        </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Lista',
    data() {
        return{
            lista: null,
        };
    },
created: function(){
      try {
          axios
        .get('api/lista')
        .then(res=>{
            this.lista=res.data;
        })
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
      try {
           axios
          .get('.auth/me')
          .then(res=>{
            this.userInfo=res.data.clientPrincipal;
            console.log(this.userInfo);
        })
        } catch (error) {
          console.error('No profile could be found');
        }
    }
}
</script>

<style>
h2
{
    margin-bottom: 5%;
}
</style>