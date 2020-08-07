<template>
   <main>
        <router-view></router-view>
    </main>
</template>

<script>
    import Controller from '@/../lib/controller'
    import Store from '@/store.js'

    class AppController extends Controller {

            constructor( name, subComponentList = []) {
                super( name, subComponentList );
            }
        }

      // export a definition for this view
    export default new AppController('teleApp');
</script>

<style>

</style>
