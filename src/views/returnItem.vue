<template>
    <div>
        <v-layout row align-center justify-center>
            <v-flex xs12 md10 mt-6>
                <div id="title">RETURN LABORATORY EQUIPMENT</div>
            </v-flex>
            <v-flex xs6 md4 mt-4>
                <digiClock/>
            </v-flex>
        </v-layout>

        <v-layout row align-center justify-center mt-10>
            <v-flex xs12 md10> 
                <v-card
                    elevation-20
                    color="secondary"
                >
                    <v-card-title class="white--text">Borrowed Items</v-card-title>
                    <v-card-text>
                        <div class="white--text"><b>FOR PARTIAL RETURN OF ITEMS:</b> Tick the checkbox of the items you want to return. Then click the <b>"Return Selected Items"</b> button.</div>
                        <div class="white--text mt-2"><b>FOR FULL RETURN OF ITEMS:</b> Kindly click directly the <b>"Return All Borrowed"</b> button without ticking any of the checkboxes</div>
                    </v-card-text>
                    
                    <v-layout 
                        row align-center justify-center
                        v-if="!borrowedItems.length"    
                    >
                        <v-flex xs6>
                            <div class="font-weight-bold primary--text">
                                You did not borrow anything
                            </div>
                        </v-flex>
                    </v-layout>

                    <v-layout 
                        row 
                        px-10
                        py-6
                        v-else
                    >
                        <v-flex xs12 >
                            <v-data-table
                                v-model="returnedItems"
                                :headers="headers"
                                :items="borrowedItems"
                                item-key="name"
                                show-select
                            ></v-data-table>
                        </v-flex>
                    </v-layout>
                </v-card>
                
                <v-layout row align-center justify-center mt-12>
                    <v-flex xs3 v-if="returnedItems.length && returnedItems.length < borrowedItems.length">
                        <v-btn 
                            color="secondary"
                            x-large
                            @click="returnItems('selected')"
                        >Return Selected Items
                        </v-btn>
                    </v-flex>

                    <v-flex xs3 v-else>
                        <v-btn 
                            color="primary"
                            x-large
                            @click="returnItems('all')"
                        >Return All Borrowed Items
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import digiClock from "@/components/digiClock.vue";

    export default {
        name: 'returnItem',
        mounted() {
            console.log("VISITORS ID from REASON ENCODING: ", this.$route.params.visitorID);
        },
        data: () => ({
            returnedItems: [],
            headers: [
                {
                    text: 'Item Name',
                    align: 'center',
                    sortable: false,
                    value: 'name'
                },
                {
                    text: "Quantity",
                    value: "qty"
                },
                {
                    text: "Return Date",
                    value: "returnDate"
                },
                {
                    text: "Return Time",
                    value: "returnTime"
                }
            ],
            borrowedItems: [
                {
                    name: "Test Tube",
                    qty: 50,
                    returnDate: "2019-11-21",
                    returnTime: "13:00",
                },
                {
                    name: "Balance Beam",
                    qty: 5,
                    returnDate: "2019-11-18",
                    returnTime: "11:30",
                },
                {
                    name: "Test Tube Rack",
                    qty: 0,
                    returnDate: "2019-11-15",
                    returnTime: "15:00",
                },
            ],
        }),

        methods: {
            returnItems(state) {
                //if the user will partially return some items
                if(state === 'selected') {
                    console.log(this.returnedItems);

                    return;
                }

                //if the user click the return all borrowed items button
                const returnedItems = this.borrowedItems;
                console.log(returnedItems);


                this.$router.push("/confirmExit");
            }
        },

        computed: {
            
        },

        components: {
            digiClock,
        }
    }
</script>

<style scoped>
    #title {
        /* position: absolute;
        width: 1207px;
        height: 127px;
        left: 160px;
        top: 53px; */

        font-family: Avenir LT Std;
        font-style: normal;
        font-weight: 750;
        font-size: 70px;
        line-height: 70px;
        text-align: center;

        color: #D25565;
    }
</style>