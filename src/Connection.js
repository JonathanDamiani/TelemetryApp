// Copyright (c) 2020 Jonathan. All Rights Reserved.
'use strict';

import * as firebase from "firebase/app"

import "firebase/auth"
import "firebase/firestore"
// Estabilsh firebase connection

export default class Connection {
    constructor() {
        let firebaseConfig = {
            apiKey: "AIzaSyCxojWMOPuoB8xWugp0Fjx7de3EMEtjncY",
            authDomain: "telemetry-1724a.firebaseapp.com",
            databaseURL: "https://telemetry-1724a.firebaseio.com",
            projectId: "telemetry-1724a",
            storageBucket: "telemetry-1724a.appspot.com",
            messagingSenderId: "308449377471",
            appId: "1:308449377471:web:47bfb82e421a4fc5939a0a",
            measurementId: "G-0WLFNJE739"
        };

        firebase.initializeApp( firebaseConfig );

        this.datastore = firebase.firestore();
    }

    // Saving telemetry record to firebase
    postTeleRecord(teleRecord) {
        return new Promise( (resolve, reject ) => {
            let collection = this.datastore.collection ( "telemetry" ); 
            collection.doc(teleRecord.data.playerId).set(
                {
                    buildId: teleRecord.buildId,
                    playerId: teleRecord.playerId,
                    pos: teleRecord.pos,
                    status: teleRecord.data.status
                }
            )
            .then(() => {
                console.log("Document successfully written!");
                resolve(teleRecord.data)
            })
            .catch((error) => {
                reject(error);
                console.error("Error writing document: ", error);
            });
            
        })
    }

    // Get telemetry record from firebase
    getTeleRecord(id) {
        return new Promise( (resolve, reject ) => {
            let collection = this.datastore.collection ( "telemetry" ); 
            collection.doc(id).get()
            .then((res) => {
                console.log("Document returned!");
                resolve(res.data())
            })
            .catch((error) => {
                reject(error);
                console.error("Doc doesnt exist ", error);
            });
            
        })
    }
}