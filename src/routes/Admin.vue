<!--
VFS VUE Single File Component
Copyright (c) 2020. Jonathan Dean. All Rights Reserved.
-->
<template>
    <section>
        <h1>Admin</h1>
        <form @submit.prevent="saveInfo(buildId, playerId, posX, posY, playerStatus)" class="admin-form">
            <div class="admin-form-field">
                <label>Build ID: </label>
                <input id="buildId" type="number" v-model="buildId">     
            </div>

            <div class="admin-form-field">
                <label>Player ID: </label>
                <input id="playerId" type="text" v-model="playerId">     
            </div>

            <div class="admin-form-field">
                <label>Pos X: </label>
                <input id="posX" type="number" v-model="posX">     
            </div>

            <div class="admin-form-field">
                <label>Pos Y: </label>
                <input id="posY" type="number" v-model="posY">     
            </div>

            <div class="admin-form-field">
                <label>Status: </label>
                <input id="playerStatus" type="text" v-model="playerStatus">     
            </div>

            <button id="admin-form-btn" class="admin-form-btn" value="Submit">Save</button>
        </form>

        <div class="data-container">
            <button @click="getRecord" class="admin-form-btn">Get Data</button>
            <p>{{teleRecord}}</p>
        </div>
    </section>

</template>
<script>
    import Controller from '@/../lib/controller'
    import TelemetryRecord from '../models/TelemetryRecord.js'

    class AdminController extends Controller {
        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
                buildId: 0,
                playerId: "",
                posX: 0,
                posY: 0,
                playerStatus: "Offline"
            }

            this.injectActions(['saveRecord', "getRecord"]);
            this.injectGetters(['teleRecord']);
        }

        saveInfo(buildId, playerId, posX, posY, playerStatus) {
            let recData = new TelemetryRecord(buildId, playerId, posX, posY, playerStatus);
            this.saveRecord(recData);
        }
    
    }

    export default new AdminController('teleAdmin');

</script>
<style scoped>
    .admin-form {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        align-items: center;
    }

    .admin-form-field {
        margin-right: 20px;
    }

    .admin-form-field > label {
        font-weight: bold;
    }

    .admin-form-btn {
        padding: 5px 30px;
        font-weight: bold;
    }

</style>
