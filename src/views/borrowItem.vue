<!--BorrowItem.vue-->
<template>
    <div>
        <v-layout row align-center justify-center>
            <v-flex xs12 md12 mt-6>
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
            align-start 
            justify-center
            mt-12
            >
            <v-flex xs12 md5>
                <v-card elevation-4>
                    <v-card-title class="primary white--text font-weight-bold">Items List</v-card-title>
                    <v-card-text class="mt-3">
                        <div class="font-italic">
                            <p>
                                Search for the item to be borrowed.<br/>
                                Then, click the checkbox of the desired item to be borrowed.<br><br>
                                If the desired item is not in the list, then the item is currently out of stock
                            </p>
                        </div>
                    </v-card-text>
                    
                    <v-layout row align-start justify-start px-6>
                        <v-flex xs12 md7>
                            <v-text-field
                                v-model="search"
                                append-icon="search"
                                dense outlined
                                rounded
                                color="primary"
                                placeholder="Start typing to see desired item..."
                                clearable
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs2 ml-4>
                            <!-- <v-btn
                                depressed
                                color="primary"
                                @click="searchItem"
                                :disabled="!search"
                            >Search item
                            </v-btn> -->
                        </v-flex>
                    </v-layout>
                    
                    <v-divider></v-divider>
                    
                    <v-layout row px-6 mt-4>
                        <v-flex xs12>
                            <v-data-table
                                v-model="selected"
                                :headers="headers"
                                :items="labItems"
                                :items-per-page="5"
                                :search="search"
                                :sort-by="'name'"
                                :loading="loading"
                                no-data-text="Sorry, the lab has no items to display..."
                                no-results-text="Sorry, no item is related to your search..."
                                show-select
                                item-key="name"
                                color="primary"
                            ></v-data-table>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>

            <v-flex xs12 md6 ml-10>
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
                                                    <v-flex xs6 mt-4>
                                                        <v-text-field
                                                            v-model="item.qty"
                                                            dense outlined
                                                            type="number"
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
                                                        scrollable
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
                                            <td>
                                                <v-tooltip top dark color="primary" transition="scroll-y-reverse-transition">
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn fab depressed x-small  class="mb-3" color="primary" @click="removeFromCheckout(item)" v-on="on">
                                                            <v-icon>delete</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Remove Item from Checkout</span>
                                                </v-tooltip>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-flex>
                    </v-layout>
                </v-card>

                <v-layout wrap align-center justify-start mt-9 v-show="selected.length">
                    <v-flex xs12>
                        <v-text-field 
                            v-model="otherBorrowers"
                            outlined rounded solo
                            placeholder="Type student number of the other borrowers seperated by comma (e.g: 201800501,201800543)"
                            hint="If there are no other borrowers, then leave this blank"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            v-model="prof"
                            outlined rounded solo
                            clearable required
                            label="Assigned Professor"
                            placeholder="Type the complete name of the professor you are assigned to..."
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            v-model="reason"
                            outlined rounded solo required
                            label="Reason for Borrowing"
                            placeholder="Please indicate the reason of borrowing the item/s..."
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row align-center justify-start mt-4 mb-4 px-4>
                    <v-flex xs5 offset-xs1>
                        <v-btn outlined x-large color="secondary" @click="backToPrevPage">
                            <v-icon left color="secondary">keyboard_backspace</v-icon>
                            CANCEL BORROWING ITEM 
                        </v-btn>
                    </v-flex>
                    <v-flex xs3 offset-xs1>
                        <v-btn
                            depressed 
                            x-large
                            color="primary"
                            :disabled="!selected.length"
                            @click="checkout"
                        >CHECKOUT
                            <v-icon right>add_shopping_cart</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>

        <v-overlay :value="overlay" :opacity="0.80">
            <div class="mb-3 title">Please Wait...</div>
            <v-progress-circular indeterminate size="90" class="ml-2"></v-progress-circular>
        </v-overlay>

        <v-dialog
            v-model="alertDialog"
            max-width="290px"
        >
            <v-card>
                <v-card-title class="primary">
                    <v-layout align-center justify-center>
                        <v-flex xs6>
                            <div class="font-weight-bold text-center white--text title">
                                {{ alertDialogTitle }}
                            </div>
                        </v-flex>
                    </v-layout>
                     
                </v-card-title>
                <v-card-text>
                    <v-layout align-center justify-center>
                        <v-flex xs12>
                            <div class="body-1 mt-4">{{ alertDialogMessage }}</div>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn 
                        block 
                        color="secondary" 
                        depressed 
                        @click="closeAlertDialog"
                    >OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import digiClock from '@/components/digiClock.vue';
import http from "@/http-common";

export default {
    name: "borrowItem",
    async mounted() {
        this.loading = true;
        await this.getLabItems();
        console.log("VISITORS ID from REASON ENCODING: ", this.$route.params.visitorID);
        this.visitorID = this.$route.params.visitorID;
        this.visitor = this.$route.params.stuDetails;
        console.log(this.visitor);
        this.loading = false;
    },

    data: () => ({
        menu: false,
        search: null,
        selected: [],
        visitorID: null,
        visitor: {},
        checkoutDisable: true,
        overlay: false,
        loading: false,
        alertDialog: false,
        alertDialogTitle: null,
        alertDialogMessage: null,
        otherBorrowers: null,
        prof: null,
        reason: null,
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
            // {
            //     name: "Test Tube",
            //     availableQty: 50,
            //     status: "Available",
            // },
        ]
    }),
    
    methods: {  
        showAlertDialog(title, message) {
            this.alertDialog = true;
            this.alertDialogTitle = title;
            this.alertDialogMessage = message;
        },
        closeAlertDialog() {
            this.alertDialog = false;
            this.alertDialogTitle = null;
            this.alertDialogMessage = null;
        },
        removeFromCheckout(item) {
            const index = this.selected.indexOf(item);
            this.selected.splice(index, 1);
        },
        async checkout() {
            this.overlay = true;

            if(!this.prof || this.prof === ' ') {
                this.showAlertDialog("Warning!", "Please indicate your prof");
                this.overlay = false;
                return;
            }


            if(!this.reason || this.reason === ' ') {
                this.showAlertDialog("Warning!", "Please indicate your reason of borrowing the items!");
                this.overlay = false;
                return;
            }

            console.log("THIS.SELECTED before trunication", this.selected);

            this.selected.forEach((item) => {
                delete item.menu;
                delete item.menu2;
                delete item.availableQty;
                //delete item.borrowedQty;
                delete item.condition;
                
                item.borrowedQty = item.qty;
                item.SN = item.baseSN;
                item.returnDateTime = item.returnDate + " " + item.returnTime + ":00";

                delete item.sn;
                delete item.returnDate;
                delete item.returnTime;
                delete item.status;
                
                item.studNum = this.visitor.studNum;
                item.studName = this.visitor.lastName + ", " + this.visitor.firstName;
                item.course = this.visitor.course;
                item.yr = this.visitor.yr;
                item.otherBorrowers = this.otherBorrowers;
                item.prof = this.prof;
                item.reason = this.reason;
            });

            console.log("THIS.SELECTED before transmission: ", this.selected);

            let items;
            try {
                items = await http.post("/inventoryTransaction/borrowItem", this.selected);
            }
            catch(error) {
                console.log(error);
                this.overlay = false;
                this.showAlertDialog("Error!", error.message);
                this.selected = [];
                return;
            }

            console.log("ITEMS BORROWED: ", items.data);
            this.overlay = false;

            this.showAlertDialog("Success!", "Please wait for the reciept to print");
            this.selected = [];
            this.getLabItems();

            const labAttendance = {
                firstName: this.visitor.firstName,
                lastName: this.visitor.lastName,
                course: this.visitor.course,
                yr: this.visitor.yr,
                visitorID: this.visitor.studNum,
                labID: this.labID,
                purpose: "Borrow Item/s",
            } 

            try {
                const response = await http.post("/attendance/add", labAttendance);
                const stuDetails = response.data;

                console.log("FROM THE BACK END: ", stuDetails);

                this.$router.push({
                    name: 'confirmEntry', 
                    params: {stuDetails: this.visitor, state: "entry"}
                });
                this.btnLoading = false;
            }
            catch(error) {
                console.log(error);
                this.btnLoading = false;
                return;
            }

            this.$router.push(
                {
                    name: 'printReciept',
                    params: 
                    {
                        items: items.data
                    }
                }
            );
        },
        backToPrevPage() {
            this.$router.push(
                {
                    name: 'reasonEncoding',
                    params: 
                    {
                        stuDetails: this.visitor,
                        labID: this.labID
                    }
                }
            );
        },
        async getLabItems() {
            let response;

            try {
                response = await http.get("inventory/getItems/" + this.labID);
            }
            catch(error) {
                console.log("Error whille retrieving labItems in BorrowItems page");
                console.log(error);
                return;
            }

            if(response.data === "No Items") {
                this.labItems = null;
                return;
            }

            response.data.forEach(item => {
                if(item.availableQty > 0) 
                    item.status = 'Available';
                else 
                    item.status = 'Out of Stock';
                
                delete item.qty;
            });

            this.labItems = response.data.filter(item => item.status === 'Available');
        }, 
        areThereBlankFieldsInCheckout() {
            console.log("areThereBlankFieldsInCheckout was invoked");
            console.log(this.selected);
            let itemNum = 0;
            
            var i = 0;

            for(; i < this.selected.length; i++) {
                const item = this.selected[i];

                //if any of the fields 
                if(item.qty <= 0 || item.returnDate === undefined || item.returnTime === undefined) break;
            }

            if(i == this.selected.length) {
                this.checkoutDisable = false;
                return;
            }
            
            this.checkoutDisable = true;
        }
    },
    watch: {
        selected(val) {
            this.areThereBlankFieldsInCheckout();
        }
    },
    computed: {
        labID() {
            const lab = this.$store.getters.GET_CURRENT_LAB;
            return lab.labID;
        },
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