<!--
VFS VUE Single File Component
Copyright (c) 2020. Jonathan Dean. All Rights Reserved.
-->
<template>
    <section>
        <h1>Charts</h1>
        <div class="charts-container">
            <GChart
                type="PieChart"
                :options="pieChartOptions"
                :data="pieChartData"
            />
            <GChart
                type="BarChart"
                :options="barChartOptions"
                :data="barChartData"
            />
            <GChart
                type="LineChart"
                :options="lineChartOptions"
                :data="lineChartData"
            />
            <GChart
                type="ScatterChart"
                :options="scatterChartOptions"
                :data="scatterChartData"
            />
        </div>
    </section>

</template>
<script>
    import Controller from '@/../lib/controller'
    import { GChart } from 'vue-google-charts'

    class ChartsController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );

            this.vm = {
                pieChartData: [],
                pieChartOptions: {
                    title: 'Players per Class',
                    width:600,
                    height:600
                },
                barChartData: [],
                barChartOptions: {
                    title: 'Players online and offline per Class',
                    width: 800,
                    height:600
                },
                lineChartData: [],
                lineChartOptions: {
                    title: 'Player created by day from day 1',
                    width: 900,
                    height:600
                },
                scatterChartData: [],
                scatterChartOptions: {
                    title: 'Position of player',
                    width: 900,
                    height:600
                }
            }

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

            this.HandlePieChartData(data);

            this.HandleBarChartData(data);

            this.HandleLineChartData(data);

            this.handleScatterChart(data);
        }

        HandlePieChartData(data) {
            let myPieChartData = [];
            
            myPieChartData[0] = ["Class", "Number of players"];
            
            let numberOfKnights = (data.filter((item) => item.class == "Knight")).length;
            let numberOfMages = (data.filter((item) => item.class == "Mage")).length;
            let numberOfFighters = (data.filter((item) => item.class == "Fighter")).length;
            let numberOfRogues = (data.filter((item) => item.class == "Rogue")).length;

            myPieChartData.push(["Knights", numberOfKnights]);
            myPieChartData.push(["Mages", numberOfMages]);
            myPieChartData.push(["Fighters", numberOfFighters]);
            myPieChartData.push(["Rogues", numberOfRogues]);

            this.pieChartData = myPieChartData
        }

        HandleBarChartData(data) {
            let myBarChartData = [];
            
            myBarChartData[0] = ["Class", "Online", "Offline"];

            let numberOfflineKnights = (data.filter((item) => item.class == "Knight" && item.status == "Offline")).length;
            let numberOfflineMages = (data.filter((item) => item.class == "Mage" && item.status == "Offline")).length;
            let numberOfflineFighters = (data.filter((item) => item.class == "Fighter" && item.status == "Offline")).length;
            let numberOfflineRogues = (data.filter((item) => item.class == "Rogue" && item.status == "Offline")).length;

            let numberOnlineKnights = (data.filter((item) => item.class == "Knight" && item.status == "Online")).length;
            let numberOnlineMages = (data.filter((item) => item.class == "Mage" && item.status == "Online")).length;
            let numberOnlineFighters = (data.filter((item) => item.class == "Fighter" && item.status == "Online")).length;
            let numberOnlineRogues = (data.filter((item) => item.class == "Rogue" && item.status == "Online")).length;

            myBarChartData.push(["Knights", numberOnlineKnights, numberOfflineKnights]);
            myBarChartData.push(["Mages", numberOnlineMages, numberOfflineMages]);
            myBarChartData.push(["Fighters", numberOnlineFighters, numberOfflineFighters]);
            myBarChartData.push(["Rogues", numberOnlineRogues, numberOfflineRogues]);

            this.barChartData = myBarChartData;
        }

        HandleLineChartData(data) {
            let myLineChartData = [];

            let lastDay = 1;

            data.forEach(item => {
                if (item.dayCreated > lastDay)
                {
                    lastDay = item.dayCreated;
                }
            });

            myLineChartData[0] = ["Days", "Players by day"];
            
            for (let i = 1; i <= lastDay ; i++) {
                myLineChartData.push([i, (data.filter((item) => item.dayCreated == i)).length]);
            }
            this.lineChartData = myLineChartData;
        }

        handleScatterChart (data) {
            let myScatterChartData = [];

            myScatterChartData[0] = ["", "Player Position"];
            console.log(data);
            data.forEach(item => {
                myScatterChartData.push([parseInt(item.pos.x), parseInt(item.pos.y)])
            });
            this.scatterChartData = myScatterChartData;
        }
    }

    export default new ChartsController('teleCharts', {GChart});

</script>
<style scoped>
    .charts-container {
        display: flex;
        flex-wrap: wrap;
    }
</style>
