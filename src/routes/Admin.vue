<!--
VFS VUE Single File Component
Copyright (c) 2020. Jonathan Dean. All Rights Reserved.
-->
<template>
    <section>
        <h1>Admin</h1>
        <form @submit.prevent="saveInfo(buildId, playerId, posX, posY, playerStatus, playerClass, dayCreated)" class="admin-form">
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
                <label>Day Created: </label>
                <input id="dayCreated" type="number" v-model="dayCreated">     
            </div>

            <div class="admin-form-field">
                <label>Status: </label>
                <select v-model="playerStatus">
                    <option>Online</option>
                    <option>Offline</option>
                </select>  
            </div>

            <div class="admin-form-field">
                <label>Player Class: </label>
                <select v-model="playerClass">
                    <option>Knight</option>
                    <option>Mage</option>
                    <option>Fighter</option>
                    <option>Rogue</option>
                </select>  
            </div>

            <button id="admin-form-btn" class="admin-form-btn" value="Submit">Save</button>
        </form>
        
        <h2>Players information</h2>
        <table class="table-info">
            <tr>
                <th>Player ID</th>
                <th>Build ID</th>
                <th>Pos X</th>
                <th>Pos Y</th>
                <th>Day Created</th>
                <th>Status</th>
                <th>Class</th>
            </tr>
            <tr v-for="item in allData" :key="item.playerId">
                <td>{{item.playerId}}</td>
                <td>{{item.buildId}}</td>
                <td>{{item.pos.x}}</td>
                <td>{{item.pos.y}}</td>
                <td>{{item.dayCreated}}</td>
                <td>{{item.status}}</td>
                <td>{{item.class}}</td>
            </tr>
        </table>
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
                playerStatus: "Online",
                playerClass: "Knight",
                dayCreated: "1",
                allData: []
            }

            this.injectActions(['saveRecord', 'getRecord', 'getAllRecords']);
            this.injectGetters(['teleRecord', 'allTeleRecords']);
        }

        saveInfo(buildId, playerId, posX, posY, playerStatus, playerClass, dayCreated) {
            let recData = new TelemetryRecord(buildId, playerId, posX, posY, playerStatus, playerClass, dayCreated);
            console.log(recData.data);
            this.saveRecord(recData);
            this.updateData();
        }

        vue_mounted()
        {
            this.updateData();
        }
        
        async updateData()
        {
            await this.getAllRecords();
            let dataFromFirebase = this.allTeleRecords;
            let data = []

            dataFromFirebase.forEach( (doc) => {
                data.push(doc.data());
            });

            this.allData = data;
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

    h2 {
        font-size: 24px;
        margin: 20px;
        text-align: center;
    }

    .table-info {
        margin: 0 auto;
    }

    .table-info, th, td {
        border-collapse: collapse;
        border: 2px solid black;
        text-align: center;
    }

    th, td {
        padding: 10px 20px;
    }

</style>
