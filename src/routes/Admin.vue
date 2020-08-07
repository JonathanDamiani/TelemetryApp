<!--
VFS VUE Single File Component
Copyright (c) 2020. Jonathan Dean. All Rights Reserved.
-->
<template>
    <section>
        <h1>Admin</h1>
    </section>

</template>
<script>
    import Controller from '@/../lib/controller'

    class AdminController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );

        }
    }

    export default new AdminController('teleAdmin');

</script>
<style scoped>
</style>
