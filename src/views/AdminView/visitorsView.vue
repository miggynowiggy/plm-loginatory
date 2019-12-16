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

        <v-layout wrap align-center justify-center ma-6>
            <v-flex xs2>
                <v-card>
                    <v-card-title class="secondary white--text body-2">Total Attendance</v-card-title>
                    <v-card-text class="pa-4 font-weight-thin display-1">
                        <v-layout align-center justify-start>
                            <v-flex xs6>
                                {{ attendance.length }}
                            </v-flex>
                            <v-flex xs6>
                                <v-avatar color="secondary" size="80">
                                <v-icon dark size="50">transfer_within_a_station</v-icon>
                            </v-avatar>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs2 offset-xs1>
                <v-card>
                    <v-layout wrap align-center justify-center pa-3 class="secondary white--text">
                        <v-flex xs12 mx-3>Attendance due to</v-flex>
                        <v-flex xs12 mx-3 class="font-weight-bold">Lecture</v-flex>
                    </v-layout>
                    <v-card-text class="pa-4 font-weight-thin display-1">
                        <v-layout align-center justify-start>
                            <v-flex xs6>
                                {{ totalLec }}
                            </v-flex>
                            <v-flex xs6>
                                <v-avatar color="secondary" size="80">
                                    <v-icon dark size="40">fa-chalkboard-teacher</v-icon>
                                </v-avatar>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs2 offset-xs1>
                <v-card>
                    <v-layout wrap align-center justify-center pa-3 class="secondary white--text">
                        <v-flex xs12 mx-3>Attendance due to</v-flex>
                        <v-flex xs12 mx-3 class="font-weight-bold">Lab Activity</v-flex>
                    </v-layout>
                    <v-card-text class="pa-4 font-weight-thin display-1">
                        <v-layout align-center justify-start>
                            <v-flex xs6>
                                 {{ totalLab }}
                            </v-flex>
                            <v-flex xs6>
                                <v-avatar color="secondary" size="80">
                                    <v-icon dark size="40">fa-mortar-pestle</v-icon>
                                </v-avatar>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs2 offset-xs1>
                <v-card>
                    <v-layout wrap align-center justify-center pa-3 class="secondary white--text">
                        <v-flex xs12 mx-3>Attendance due to</v-flex>
                        <v-flex xs12 mx-3 class="font-weight-bold">Lecture & Lab Activity</v-flex>
                    </v-layout>
                    <v-card-text id="stats" class="pa-4 font-weight-thin display-1">
                        <v-layout align-center justify-start>
                            <v-flex xs6>
                                 {{ totalLecLab }}
                            </v-flex>
                            <v-flex xs6>
                                <v-avatar color="secondary" size="80">
                                    <v-icon dark size="40">fa-vials</v-icon>
                                </v-avatar>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout wrap align-center justify-center my-6>
             <v-flex xs2 offset>
                <v-card>
                    <v-layout wrap align-center justify-center pa-3 class="secondary white--text">
                        <v-flex xs12 mx-3>Attendance due to</v-flex>
                        <v-flex xs12 mx-3 class="font-weight-bold">Borrowing of Item/s</v-flex>
                    </v-layout>
                    <v-card-text id="stats" class="pa-4 font-weight-thin display-1">
                        <v-layout align-center justify-start>
                            <v-flex xs6>
                                {{ totalBorrow }}
                            </v-flex>
                            <v-flex xs6>
                                <v-avatar color="secondary" size="80">
                                    <v-icon dark size="40">fa-box-open</v-icon>
                                </v-avatar>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs2 offset-xs1>
                <v-card>
                    <v-layout wrap align-center justify-center pa-3 class="secondary white--text">
                        <v-flex xs12 mx-3>Attendance due to</v-flex>
                        <v-flex xs12 mx-3 class="font-weight-bold">Returning of Item/s</v-flex>
                    </v-layout>
                    <v-card-text id="stats" class="pa-4 font-weight-thin display-1">
                        <v-layout align-center justify-start>
                            <v-flex xs6>
                                {{ totalReturn }}
                            </v-flex>
                            <v-flex xs6>
                                <v-avatar color="secondary" size="80">
                                    <v-icon dark size="40">fa-box</v-icon>
                                </v-avatar>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs2 offset-xs1>
                <v-card>
                    <v-layout wrap align-center justify-center pa-3 class="secondary white--text">
                        <v-flex xs12 mx-3>Attendance due to</v-flex>
                        <v-flex xs12 mx-3 class="font-weight-bold">Other Purpose</v-flex>
                    </v-layout>
                    <v-card-text id="stats" class="pa-4 font-weight-thin display-1">
                        <v-layout align-center justify-start>
                            <v-flex xs6>
                               {{ totalOthers }}
                            </v-flex>
                            <v-flex xs6>
                                <v-avatar color="secondary" size="80">
                                    <v-icon dark size="40">fa-braille</v-icon>
                                </v-avatar>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-divider class="mt-9"></v-divider>
        <v-divider class="mt-2"></v-divider>

        <v-layout align-center justify-start mt-4 px-6>
            <v-flex xs5 class="primary--text title font-weight-bold">VISITORS</v-flex>
        </v-layout>
        <v-layout align-center justify-start mt-4>
            <v-flex xs5 px-5>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    single-line
                    outlined 
                    rounded
                    placeholder="Type anything that relates to your desired attendance entry..."
                    hint="For dates use this format: YYYY-MM-DD in digits form (e.g: 2016-11-23 which is Nov 23, 2016)"
                >
                </v-text-field>
            </v-flex>
        </v-layout>

        <v-layout align-center justify-center mt-3>
            <v-flex xs12 px-5>
                <v-data-table
                    class="elevation-3"
                    :headers="headers"
                    :items="attendance"
                    :items-per-page="5"
                    :sort-by="['timeIN']"
                    :sort-desc="true"
                    :calculate-widths="true"
                    :loading="loading"
                    :search="search"
                    no-data-text="No Visitors"
                    no-results-text="There is no visitor related to your search..."
                >
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr
                                v-for="item in items" :key="item.id"
                            >
                                <td>
                                    {{ item.visitorID }}
                                </td>
                                <td>
                                    {{ item.name }}
                                </td>
                                <td>
                                    {{ item.course }}
                                </td>
                                <td>
                                    {{ convertTimestamp(item.timeIN) }}
                                </td>
                                <td>
                                    {{ convertTimestamp(item.timeOUT) }}
                                </td>
                                <td>
                                    {{ item.duration }}
                                </td>
                                <td>
                                    {{ item.purpose }}
                                </td>
                            </tr>
                        </tbody>
                        
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import navDrawer from "@/components/navDrawer.vue";
    import digiClock from "@/components/digiClock.vue";
    import http from "@/http-common";
    import moment from 'moment';

    export default {
        async mounted() {
            this.loading = true;
            const response = await http.get("/attendance/" + this.labID);  
            console.log("ATTENDANCE: ", response.data);
            response.data.forEach((attendance) => {
                attendance.name = `${attendance.firstName} ${attendance.lastName}`;
                delete attendance.firstName;
                delete attendance.lastName;
            });
            console.log("ATTENDANCE: ", response.data);
            this.attendance = response.data;
            this.computeTotal();
            this.loading = false;
        },
        data: () => ({
            loading: false,
            headers: [
                {
                    text: "Student ID",
                    align: "left",
                    sortable: "true",
                    value: "visitorID"
                },
                { text: "Name",  value: "name" }, 
                { text: "Course", value: "course" },
                { text: "Time In", sortable: "true", value: "timeIN" },
                { text: "Time Out", sortable: "true", value: "timeOUT" },
                { text: "Duration (hr:mins:sec)", value: "duration" },
                { text: "Purpose", value: "purpose" },
            ],
            attendance: [],
            totalLec: 0,
            totalLab: 0,
            totalLecLab: 0,
            totalBorrow: 0,
            totalReturn: 0,
            totalOthers: 0,
            search: "",
        }),

        methods: {
            convertTimestamp(time) {
                return moment(time).format("(hh:mm A) MMM DD, YYYY ");
            },
            computeTotal() {
                this.attendance.forEach(entry => {
                    if(entry.purpose === 'Lecture') this.totalLec++;
                    else if(entry.purpose === 'LabActivity') this.totalLab++;
                    else if(entry.purpose === 'LecAndLab') this.totalLecLab++;
                    else if(entry.purpose === 'Borrow Item/s') this.totalBorrow++;
                    else if(entry.purpose === 'Return Item/s') this.totalReturn++;
                    else this.totalOthers++;
                });
            }
        },

        computed: {
            labID() {
                const lab = this.$store.getters.GET_CURRENT_LAB;
                return lab.labID;
            },
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

    #stats {
        font-size: 28px;
    }
</style>