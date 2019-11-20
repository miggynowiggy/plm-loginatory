<template>
    <div>
        <navDrawer/>
        
        <v-layout align-center ma-5>
            <v-flex xs6>
                <div id="title">DASHBOARD</div>
            </v-flex>
        </v-layout>

        <v-layout wrap align-center justify-center>
            <v-flex xs12 md3>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold">TOTAL UNIQUE VISITORS</v-card-title>
                    <v-layout wrap align-center px-4 pb-4>
                        <v-flex xs7>
                            <div id="nums">{{ totalVisitors }}</div>
                            <div class="ml-3 font-italic">as of today...</div>
                        </v-flex>

                        <v-flex xs5 align-content-end>
                            <v-avatar color="success" size="100">
                                <v-icon dark size="90">supervised_user_circle</v-icon>
                            </v-avatar>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>

            <v-flex xs12 md3 offset-md1>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold">TOTAL BORROWED ITEMS</v-card-title>
                    <v-layout wrap align-center px-4 pb-4>
                        <v-flex xs7>
                            <div id="nums">{{ totalBorrowed }}</div>
                            <div class="ml-3 font-italic">as of today...</div>
                        </v-flex>

                        <v-flex xs5 align-content-end >
                            <v-avatar color="success" size="100">
                                <v-icon dark size="90">redo</v-icon>
                            </v-avatar>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>

            <v-flex xs12 md3 offset-md1>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold">TOTAL RETURNED ITEMS</v-card-title>
                    <v-layout wrap align-center px-4 pb-4>
                        <v-flex xs7>
                            <div id="nums">{{ totalReturned }}</div>
                            <div class="ml-3 font-italic">as of today...</div>
                        </v-flex>

                        <v-flex xs5 align-content-end >
                            <v-avatar color="success" size="100">
                                <v-icon dark size="90">undo</v-icon>
                            </v-avatar>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>

        <v-divider class="mt-8"></v-divider>


        <v-layout align-center justify-center mt-6>
            <v-flex xs10>
                <div class="font-weight-bold title">Latest Visitors</div>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-center mt-3>
            <v-flex xs10>
                <v-data-table
                    class="elevation-3"
                    :headers="headers"
                    :items="attendance"
                    :items-per-page="10"
                >
                </v-data-table>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import navDrawer from "@/components/navDrawer.vue";
    import HeaderToolbar from "@/components/headerToolbar.vue";

    export default {
        data: () => ({
            attendance: [
                {
                    "id": 6,
                    "visitorID": "201800601",
                    "name": "Mendoza, Juan Miguel",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-01 20:09:32",
                    "timeOUT": "2019-11-01 20:13:17",
                    "duration": "00:03:45",
                    "purpose": "trip ko lang naman kumain bakit ba?"
                },
                {
                    "id": 7,
                    "visitorID": "201800601",
                    "name": "Mendoza, Juan Miguel",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-01 20:13:31",
                    "timeOUT": "2019-11-01 20:13:43",
                    "duration": "00:00:12",
                    "purpose": "trip ko lang naman kumain bakit ba?"
                },
                {
                    "id": 12,
                    "visitorID": "201800600",
                    "name": "Mendoza, Juan Miguel",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-01 22:25:09",
                    "timeOUT": "2019-11-01 22:26:42",
                    "duration": "00:01:33",
                    "purpose": "hehehehehe masaya lang"
                },
                {
                    "id": 24,
                    "visitorID": "201800600",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:15:32",
                    "timeOUT": "2019-11-02 00:17:19",
                    "duration": "00:01:47",
                    "purpose": "Lecture"
                },
                {
                    "id": 25,
                    "visitorID": "201800601",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:18:07",
                    "timeOUT": "2019-11-02 00:18:18",
                    "duration": "00:00:11",
                    "purpose": "LecAndLab"
                },
                {
                    "id": 26,
                    "visitorID": "201800613",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:21:42",
                    "timeOUT": "2019-11-02 00:23:45",
                    "duration": "00:02:03",
                    "purpose": "LecAndLab"
                },
                {
                    "id": 27,
                    "visitorID": "201800615",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:24:35",
                    "timeOUT": "2019-11-02 00:24:44",
                    "duration": "00:00:09",
                    "purpose": "null"
                },
                {
                    "id": 28,
                    "visitorID": "201800614",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:25:07",
                    "timeOUT": "2019-11-02 00:43:56",
                    "duration": "00:18:49",
                    "purpose": "LabActivity"
                },
                {
                    "id": 29,
                    "visitorID": "201800600",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:27:08",
                    "timeOUT": "2019-11-02 00:27:18",
                    "duration": "00:00:10",
                    "purpose": "Lecture"
                },
                {
                    "id": 30,
                    "visitorID": "201800559",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:28:36",
                    "timeOUT": "2019-11-02 00:28:45",
                    "duration": "00:00:09",
                    "purpose": "LecAndLab"
                },
                {
                    "id": 31,
                    "visitorID": "201800601",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:29:52",
                    "timeOUT": "2019-11-02 00:30:02",
                    "duration": "00:00:10",
                    "purpose": "LecAndLab"
                },
                {
                    "id": 32,
                    "visitorID": "201800559",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:36:12",
                    "timeOUT": "2019-11-02 00:36:27",
                    "duration": "00:00:15",
                    "purpose": "LecAndLab"
                },
                {
                    "id": 33,
                    "visitorID": "201800603",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:37:48",
                    "timeOUT": "2019-11-02 00:38:00",
                    "duration": "00:00:12",
                    "purpose": "LabActivity"
                },
                {
                    "id": 34,
                    "visitorID": "201800605",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-02 00:40:24",
                    "timeOUT": "2019-11-02 00:40:33",
                    "duration": "00:00:09",
                    "purpose": "LecAndLab"
                },
                {
                    "id": 36,
                    "visitorID": "201800614",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-05 10:08:17",
                    "timeOUT": "2019-11-05 10:08:32",
                    "duration": "00:00:15",
                    "purpose": "LabActivity"
                },
                {
                    "id": 42,
                    "visitorID": "201800559",
                    "labID": "gl404ch",
                    "timeIN": "2019-11-14 19:12:02",
                    "timeOUT": null,
                    "duration": null,
                    "purpose": "LecAndLab"
                }
            ],
            headers: [
                {
                    text: "Student ID",
                    align: "center",
                    sortable: "true",
                    value: "visitorID"
                },
                {
                    text: "Name",
                    value: "name",
                }, 
                {
                    text: "Time In",
                    value: "timeIN"
                },
                {
                    text: "Time Out",
                    value: "timeOUT"
                },
                {
                    text: "Duration",
                    value: "duration"
                },
                {
                    text: "Purpose",
                    value: "purpose"
                }
            ]
        }),
        
        methods: {

        },

        computed: {
            totalVisitors() {
                return 100;
            }, 

            totalBorrowed() {
                return 200;
            }, 

            totalReturned() {
                return 300;
            }
        },

        components: {
            navDrawer,
            HeaderToolbar,
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

    #nums {
        font-size: 50px;
        font-weight: 100;
        text-align: start;
    }
</style>