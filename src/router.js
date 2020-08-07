/*
VUE App's MAIN Component.
Copyright (c) 2020 Jonathan Dean. All Rights Reserved.
*/
'use strict';

import Vue from 'vue'
import Router from 'vue-router';

Vue.use( Router );

import teleAdmin from '@/routes/Admin.vue'
import teleCharts from '@/routes/Charts.vue'

export default new Router({
    routes: [
        { path:"/",                      name:"Charts", component:  teleCharts},
        { path:"/admin",                 name:"Admin", component:  teleAdmin},
    ]
});