<template>
    <div>
        <!--Avatar Display-->
        <v-layout row wrap align-center justify-center mt-6 ml-2>
            <v-flex xs2 offset-xs1>
                <div class="avatar">
                    <v-avatar size="180">
                        <v-img
                            :src="user.imgURL"
                            alt="avatar"
                        ></v-img>
                    </v-avatar>
                </div>
            </v-flex>
            <v-flex xs5 mt-4>
                <div class="greeting">
                    <p>GOOD DAY</p>
                    <p>{{ user.firstName }}!</p>
                </div>
            </v-flex>
        </v-layout>

        <v-layout row align-center justify-center mt-5 ml-2>
            <v-flex xs4>
                <digiClock/>
            </v-flex>
        </v-layout>
        
        <v-layout row align-center justify-center mt-5>
            <v-flex xs5>
                <div class="selectionCard">
                    <v-card>
                        <v-card-title>
                            <div class="text-center">What is your PURPOSE of visiting this Lab?</div>
                        </v-card-title>

                        <v-card-text>
                            <div class="pa-5">
                                <v-layout row wrap align-center justify-center>
                                    <v-flex xs4>
                                        <v-btn 
                                            color="primary" 
                                            rounded
                                            depressed
                                            :disabled="reason === 'Lecture'" 
                                            @click="selectedReason('Lecture')"
                                        >
                                            Lecture
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-btn 
                                            color="primary" 
                                            rounded
                                            depressed
                                            :disabled="reason === 'LabActivity'" 
                                            @click="selectedReason('LabActivity')"
                                        >
                                            Lab Activity
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-btn
                                            color="primary" 
                                            rounded
                                            depressed
                                            :disabled="reason === 'LecAndLab'" 
                                            @click="selectedReason('LecAndLab')"
                                        >
                                            Lecture and Lab
                                        </v-btn>
                                    </v-flex>
                                </v-layout>

                                <v-layout row wrap align-center justify-center mt-6>
                                    <v-flex xs4>
                                        <v-btn 
                                            color="primary" 
                                            rounded
                                            depressed
                                            :disabled="reason === 'BorrowItem'" 
                                            @click="selectedReason('BorrowItem')"
                                        >
                                            Borrow Item/s
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-btn
                                            color="primary" 
                                            rounded
                                            depressed
                                            :disabled="reason === 'ReturnItem'" 
                                            @click="selectedReason('ReturnItem')"
                                        >
                                            Return Item/s
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-btn 
                                            color="primary" 
                                            rounded 
                                            depressed
                                            :disabled="reason === 'others'"
                                            @click="selectedReason('others')"
                                        >
                                            Others
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-layout row v-show="reason === 'others'" mt-5 align-center justify-center>
                        <v-flex xs9>
                            <v-textarea
                                v-model="customReason"
                                placeholder="Please state your reason of visiting the lab aside from the reasons listed above..."
                                outlined
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row align-start justify-center mt-5>
                        <v-flex xs2>
                            <v-btn depressed outlined x-large color="secondary" @click="$router.go(-1)"> 
                                BACK
                            </v-btn>
                        </v-flex>
                        <v-flex xs2 ml-4>
                            <v-btn depressed x-large color="secondary" @click="submitReason" :loading="btnLoading" :disabled="btnLoading || !reason">
                                CONFIRM
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </div>
            </v-flex>
        </v-layout>
   </div>
</template>

<script>
//import avatar from "@/assets/avatar.jpg";
import digiClock from "@/components/digiClock.vue";
import http from "../http-common";

export default {
    name: "reasonEncoding",
    mounted() {
        this.user = this.$route.params.stuDetails;
        this.labID = this.$route.params.labID;
        console.log(this.user);
        console.log(this.labID);
    },
    data: () => ({
        user: {},
        showTxtBox: false,
        customReason: "",
        reasonList: ["Lecture", "Lab Activity", "Lec and Lab", "Borrow Item/s", "Return Item/s", "Others"],
        reason: null,
        labID: null,
    }),
    
    methods: {
        selectedReason(value) {
            this.customReason = "";
            this.reason = value;
        }, 

        async submitReason() {
            this.btnLoading = true;
            
            const labAttendance = {
                visitorID: this.user.studNum,
                labID: this.labID,
                purpose: this.customReason === "" ? this.reason : this.customReason,
            } 

            console.log(labAttendance);
            
            try {
                const response = await http.post("/attendance/add", labAttendance);
                const stuDetails = response.data;

                console.log("FROM THE BACK END: ", stuDetails);

                this.$router.push({
                    name: 'confirmEntry', 
                    params: {stuDetails: this.user}
                });
                this.btnLoading = false;
            }
            catch(error) {
                console.log(error);
                this.btnLoading = false;
            }


        },
    },

    computed: {
        
    },

    components: {
        digiClock
    }
}
</script>

<style scoped>
    .avatar {
        /* position: absolute;
        width: 250px;
        height: 250px;
        left: 350px;
        top: 52px; */
    }

    .greeting {
        /* position: absolute;
        width: 555px;
        height: 143px;
        left: 520px;
        top: 60px; */

        font-family: Avenir LT Std;
        font-style: normal;
        font-weight: 750;
        font-size: 60px;
        line-height: 55px;
        /* or 89% */
        text-transform: uppercase;

        color: #D25565;
    }

    /* .selectionCard {
        position: absolute;
        width: 500px;
        height: 363.02px;
        left: 387px;
        top: 260px;
    } */

    .clock {
        /* position: absolute;
        left: 530px;
        top: 200px; */
    }
</style>