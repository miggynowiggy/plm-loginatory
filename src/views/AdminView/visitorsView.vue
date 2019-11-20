<template>
    <div>
        <navDrawer></navDrawer>

        <v-layout align-center mt-6 mx-4>
            <v-flex xs12 md7>
                <div id="title">VISITORS DASHBOARD</div>
            </v-flex>
            <v-flex xs12 offset-md1 md6>
                <digiClock></digiClock>
            </v-flex>
        </v-layout>

        <v-layout align-center ma-6>
            <v-flex xs2>
                <v-btn
                    color="secondary"
                    depressed
                    rounded
                >I DONT KNOW
                </v-btn>
            </v-flex>
            <v-flex xs2>
                <v-btn
                    color="secondary"
                    depressed
                    rounded
                >WAIT LANG!
                </v-btn>
            </v-flex>
        </v-layout>

        <v-layout align-center justify-center mt-12>
            <v-flex xs12 px-5>
                <v-data-table
                    class="elevation-3"
                    :headers="headers"
                    :items="attendance"
                    :items-per-page="10"
                    :calculate-widths="true"
                >
                </v-data-table>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import navDrawer from "@/components/navDrawer.vue";
    import digiClock from "@/components/digiClock.vue";

    export default {
        data: () => ({
            headers: [
                {
                    text: "Student ID",
                    align: "left",
                    sortable: "true",
                    value: "visitorID"
                },
                { text: "Name",  value: "name" }, 
                { text: "Course", value: "course" },
                { text: "Time In", value: "timeIN" },
                { text: "Time Out", value: "timeOUT" },
                { text: "Duration", value: "duration" },
                { text: "Purpose", value: "purpose" },
            ],
            attendance: [
                {
                    "id": 26,
                    "visitorID": "201800559",
                    "name": "Mendoza, Juan Miguel",
                    "course": "BS Computer Science",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:21:42",
                    "timeOUT": "2019-11-02 00:23:45",
                    "duration": "00:02:03",
                    "purpose": "LecAndLab"
                },
                {
                    "id": 20,
                    "visitorID": "201800600",
                    "name": "Nisperos, Jannel Arianna",
                    "course": "BS Sociology",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-15 00:25:07",
                    "timeOUT": "2019-11-15 00:43:56",
                    "duration": "00:18:49",
                    "purpose": "Wala lang trip ko lang kasi tumambay dito"
                },
                {
                    "id": 27,
                    "visitorID": "201800615",
                    "name": "Tudtud, Jeniffer",
                    "course": "BS Physical Therapy",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:24:35",
                    "timeOUT": "2019-11-02 00:24:44",
                    "duration": "00:00:09",
                    "purpose": "bakit bawal ba? nag-usap lang naman kami ng prof ko ahh..."
                },
                {
                    "id": 28,
                    "visitorID": "201800614",
                    "name": "Vida, Adam",
                    "course": "BS Psychology",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:25:07",
                    "timeOUT": "2019-11-02 00:43:56",
                    "duration": "00:18:49",
                    "purpose": "LabActivity"
                },
            ],
        }),

        methods: {
            
        },

        computed: {
            
        },

        components: {
            navDrawer,
            digiClock,
        }
    }
</script>

<style scoped>
    #title {
        font-family: Avenir LT Std;
        font-style: normal;
        font-weight: 750;
        font-size: 40px;
        line-height: 40px;
        /* or 44% */
        letter-spacing: -0.05px;

        color: #6F6F6F;
    }
</style>