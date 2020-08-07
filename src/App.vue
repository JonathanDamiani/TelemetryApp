<template>
   <main>
        <teleNavbar></teleNavbar>
        <router-view></router-view>
    </main>
</template>

<script>
    import Controller from '@/../lib/controller'
    import Store from '@/store.js'
    import teleNavbar from '@/views/Navbar.vue'


    class AppController extends Controller {

            constructor( name, subComponentList = []) {
                super( name, subComponentList );
            }
        }

      // export a definition for this view
    export default new AppController('teleApp', {teleNavbar});
</script>

<style>
    body, * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;   
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
    }
    section {
        padding: 20px;
    }

    h1 {
        font-size: 2em;
    }
</style>
