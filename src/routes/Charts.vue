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

            this.injectActions(['getAllRecords']);
            this.injectGetters(['allTeleRecords']);
        }

        async vue_mounted()
        {
            await this.getAllRecords();
            let dataFromFirebase = this.allTeleRecords;
            let data = []

            dataFromFirebase.forEach( (doc) => {
                data.push(doc.data());
            });
        }
    }

    export default new ChartsController('teleCharts');

</script>
<style scoped>
</style>
