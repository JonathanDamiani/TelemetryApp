// Copyright (c) 2020 Jonathan. All Rights Reserved.
'use strict';

export default class TelemetryRecord {

    constructor ( buildId = 0, playerId = 0, posX, posY, status, playerClass) {
        this.data = {
            buildId,
            playerId,
            pos: {
                x: posX,
                y: posY
            },
            status: status,
            playerClass: playerClass
        }
    }

    get buildId() { return this.data.buildId }
    set buildId (val) { this.data.buildId = val}

    get playerId() { return this.data.playerId }
    set playerId (val) { this.data.playerId = val}

    get pos() { return this.data.pos }
    set pos (val) { this.data.pos = val}

    get playerClass() { return this.data.playerClass }
    set playerClass (val) { this.data.playerClass = val}
}