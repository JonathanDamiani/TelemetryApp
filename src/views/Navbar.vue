<!--
Copyright (c) 2020. Jonathan Dean. All Rights Reserved.
-->
<template>
    <nav class="nav-container">
         <ul class="nav-list">
            <li v-for="(item, index) in navMenu" :key="index">
                <router-link :to="{ name:item.section }">{{ item.section }}</router-link>
            </li>
        </ul>
    </nav>

</template>
<script>
    import Controller from '@/../lib/controller'

    class NavbarController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList )
            this.vm = {
                navMenu:[
                    { section: "Charts" },
                    { section: "Admin" },
                ]
            };
        }
    }
    export default new NavbarController('teleNavbar', );

</script>

<style scoped>
    .nav-container {
        background-color: lightgrey;
        padding: 10px;
    }

    .nav-list {
        display: flex;
        list-style: none;
    }

    .nav-list > li {
        margin-left: 20px;
    }

    .nav-list > li > a {
        font-size: 1.5em;
        font-weight: bold;
        text-decoration: none;
        text-transform: uppercase;
        color: blue;
    }

    .nav-list > li > a:hover {
        color: darkblue;
        text-decoration: line-through;
    }

</style>