<!--
VFS VUE Single File Component
Copyright (c) 2020. Jonathan Dean. All Rights Reserved.
-->
<template>
    <section>
        <h1>Charts</h1>
    </section>

</template>
<script>
    import Controller from '@/../lib/controller'

    class ChartsController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
        }
    }

    export default new ChartsController('teleCharts');

</script>
<style scoped>
</style>
