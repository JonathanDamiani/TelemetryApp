/*
VUEX Data Store.
Copyright (c) 2020. Jonathan Dean, Kibble Online Inc. All Rights Reserved.
*/
import Vue from 'vue'
import Vuex from 'vuex'
import Connection from './Connection.js'
import TelemetryRecord from './models/TelemetryRecord.js'

Vue.use( Vuex )

const cloud = new Connection();

const store = new Vuex.Store({
    state: {
        currentRec: new TelemetryRecord(),
        teleRecord: {}
    },

    getters: {
        currentRec: state => state.currentRec,
        teleRecord: state => state.teleRecord
    },

    actions: {
        async saveRecord({commit}, newTeleRecord) {
            await cloud.postTeleRecord(newTeleRecord);
            // saving the data in firebase
            commit('SET_CURRENT', newTeleRecord);
        },

        async getRecord({commit, getters}) { 
            // await for the data to set in the vuex
            let data = await cloud.getTeleRecord(getters.currentRec.playerId);
            commit('SET_RECORD', data);
        }
    },

    mutations: {
        SET_CURRENT: (state,  newTeleRecord) => { state.currentRec = newTeleRecord},
        SET_RECORD: (state,  teleRecord) => { state.teleRecord = teleRecord}
    }
});

export default store;
