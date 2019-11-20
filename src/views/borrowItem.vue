<template>
    <div>
        <v-layout row align-center justify-center>
            <v-flex xs12 md10 mt-6>
                <div id="title">BORROW LABORATORY EQUIPMENT</div>
            </v-flex>
            <v-flex xs6 md4 mt-4>
                <digiClock/>
            </v-flex>
        </v-layout>

        <v-layout 
            row 
            wrap 
            px-5 
            align-center 
            justify-center
            mt-12
            >
            <v-flex xs12 md6>
                <v-card elevation-4>
                    <v-card-title>Items List</v-card-title>
                    <v-card-text>
                        <div>Search for the item to be borrowed. Then, click the checkbox of the desired item to be borrowed</div>
                    </v-card-text>
                    
                    <v-layout row align-start justify-start px-6>
                        <v-flex xs12 md6>
                            <v-text-field
                                v-model="search"
                                dense outlined
                                rounded
                                color="primary"
                                placeholder="Enter name of the item to be borrowed"
                                clearable
                                @keyup.enter="serachItem"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs2 ml-4>
                            <v-btn
                                depressed
                                color="primary"
                                @click="searchItem"
                                :disabled="!search"
                            >Search item
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    
                    <v-divider></v-divider>
                    
                    <v-layout row px-6 mt-4>
                        <v-flex xs12>
                            <v-data-table
                                v-model="selected"
                                :headers="headers"
                                :items="labItems"
                                :items-per-page="10"
                                show-select
                                item-key="name"
                                color="primary"
                            ></v-data-table>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>

            <v-flex xs12 ml-6 md5>
                <v-card 
                    elevation-10
                    color="secondary"
                    dark
                >
                    <v-card-title>Item Checkout</v-card-title>
                    <v-card-text>
                        <div>Confirm the items to be checkout</div>
                    </v-card-text>
                    
                    <v-layout 
                        row align-center justify-center pa-3
                        v-if="!selected.length"    
                    >
                        <v-flex xs7>
                            <div class="font-weight-bold white--text body">
                                You have'nt selected any item/s on the Item List
                            </div>
                        </v-flex>
                    </v-layout>

                    <v-layout 
                        row 
                        px-6 
                        py-3
                        v-else
                    >
                        <v-flex xs12>
                            <v-simple-table light>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-center">Item Name</th>
                                            <th class="text-center">Quantity</th>
                                            <th class="text-center">Return Date</th>
                                            <th class="text-center">Return Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in selected" :key="item.name">
                                            <td>{{ item.name }}</td>
                                            <td>
                                                <v-layout row align-center justify-center>
                                                    <v-flex xs4 mt-4>
                                                        <v-text-field
                                                            v-model="item.qty"
                                                            dense outlined
                                                        ></v-text-field>
                                                    </v-flex>
                                                </v-layout>
                                            </td>
                                            <td>
                                                <v-menu
                                                    color="secondary"
                                                    ref="menu"
                                                    v-model="item.menu"
                                                    :close-on-content-click="true"
                                                    :return-value="item.returnDate"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            :value="item.returnDate"
                                                            label="Pick a return date"
                                                            prepend-icon="event"
                                                            readonly
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        color="secondary"
                                                        v-model="item.returnDate"
                                                        reactive
                                                        show-current
                                                    ></v-date-picker>
                                                </v-menu>
                                            </td>
                                            <td>
                                                <v-menu
                                                    ref="menu"
                                                    v-model="item.menu2"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    :return-value="item.returnTime"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        v-model="item.returnTime"
                                                        label="Pick a Return Time"
                                                        prepend-icon="access_time"
                                                        readonly
                                                        v-on="on"
                                                    ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="item.menu2"
                                                        v-model="item.returnTime"
                                                        full-width
                                                        @click:minute="$refs.menu.save(item.returnTime)"
                                                    >
                                                        <v-spacer></v-spacer>
                                                        <v-btn 
                                                            depressed 
                                                            color="primary" 
                                                            @click="item.menu2 = false"
                                                        >cancel</v-btn>
                                                        
                                                        <v-btn 
                                                            depressed 
                                                            color="primary"
                                                            @click="item.menu2 = false"
                                                        >OK</v-btn>
                                                    </v-time-picker>
                                                </v-menu>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-flex>
                    </v-layout>
                </v-card>

                <v-layout row align-center justify-center mt-4>
                    <v-flex xs2>
                        <v-btn
                            depressed 
                            x-large
                            color="primary"
                            :disabled="!selected.length"
                            @click="checkout"
                        >CHECKOUT
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import digiClock from '@/components/digiClock.vue';

export default {
    name: "borrowItem",
    mounted() {
        console.log("VISITORS ID from REASON ENCODING: ", this.$route.params.visitorID);
    },
    data: () => ({
        menu: false,
        search: null,
        selected: [],
        headers: [
            {
                text: 'Item Name',
                align: 'left',
                sortable: 'true',
                value: 'name',
            },
            {
                text: 'Available Quantity',
                value: 'availableQty'
            },
            {
                text: 'Status',
                value: 'status'
            }
        ],
        labItems: [
            {
                name: "Test Tube",
                availableQty: 50,
                status: "Available",
            },
            {
                name: "Balance Beam",
                availableQty: 5,
                status: "Available",
            },
            {
                name: "Test Tube Rack",
                availableQty: 0,
                status: "Out of Stock",
            },
            {
                name: "Stirring Rod",
                availableQty: 0,
                status: "Out of Stock",
            },
            {
                name: "Gradual Cylinder",
                availableQty: 3,
                status: "Available",
            },
            {
                name: "Petri Dish",
                availableQty: 10,
                status: "Available",
            }
        ]


    }),
    methods: {  
        searchItem() {

        },
        checkout() {
            this.selected.forEach((item) => {
                delete item.menu;
                delete item.menu2;
            });
            console.log(this.selected);

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

        color: #2E94B9;
    }
</style>