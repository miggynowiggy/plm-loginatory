<template>
    <div>
        <navDrawer></navDrawer>

        <v-layout align-center mt-6 mx-4>
            <v-flex xs12 md7>
                <div id="title">EQUIPMENTS DASHBOARD</div>
            </v-flex>
            <v-flex xs12 offset-md1 md6>
                <digiClock></digiClock>
            </v-flex>
        </v-layout>

        <v-layout align-center ma-6>
            <v-flex xs3>
                <v-btn
                    color="secondary"
                    depressed
                    rounded
                    @click="addItemDialog = true"
                >ADD ITEM/s TO INVENTORY
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
                <div class="title font-weight-bold primary--text">Borrowers</div>
                <v-data-table
                    class="elevation-3"
                    :headers="borrowersHeaders"
                    :items="borrowers"
                    :items-per-page="10"
                    item-key="id"
                >
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr
                                v-for="item in items" :key="item.visitorID"
                                @click="view(item)"
                                :class="[item.currentStatus === 'overdue' ? 'red lighten-4' : '']"
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
                                    {{ borrowedItems(item.borrowedItems) }}
                                </td>
                                <td>
                                    {{ item.returnDate }}
                                </td>
                                <td>
                                    {{ item.currentStatus }}
                                </td>
                            </tr>
                        </tbody>
                        
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>

        <v-layout align-center justify-center mt-6>
            <v-flex xs12 px-5>
                <div class="title font-weight-bold secondary--text">Current Inventory</div>
                <v-data-table
                    class="elevation-3"
                    :headers="inventoryHeaders"
                    :items="inventory"
                    :items-per-page="10"
                ></v-data-table>
            </v-flex>
        </v-layout>

        <v-dialog 
            v-model="borrowerDialog"
            max-width="400px"
        >
            <v-card>
                <v-card-title 
                    class="font-weight-bold title 
                           primary
                           white--text"
                >Borrower's Details
                </v-card-title>
                
                <div class="pa-6">
                    <div>
                        <b class="primary--text">Student Number:</b><br/> 
                        {{ selectedBorrower.visitorID }}
                    </div>
                    <div class="mt-3">
                        <b class="primary--text">Name:</b><br/> 
                        {{ selectedBorrower.name }}
                    </div>
                    <div class="mt-3">
                        <b class="primary--text">Course:</b><br/> 
                        {{ selectedBorrower.course }}
                    </div>
                    <div class="mt-3">
                        <b class="primary--text">Status:</b><br/> 
                        {{ selectedBorrower.currentStatus }}
                    </div>
                </div>
                

                <v-divider class="my-5"></v-divider>
                <div class="font-weight-bold px-5 secondary--text">Borrowed Item/s</div>
                
                <v-layout px-5 py-3>
                    <v-flex xs12 v-if="!selectedBorrower.borrowedItems.length">
                        <div>You did not borrow anything</div>
                    </v-flex>
                    <v-flex xs12 v-else>
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                </thead>
                                
                                <tbody>
                                    <tr v-for="item in selectedBorrower.borrowedItems" :key="item.id">
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.qty }}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex>
                        <v-btn block depressed color="secondary" @click="borrowerDialog = !borrowerDialog">CLOSE</v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="addItemDialog"
            max-width="400px"    
        >
            <v-card>
                <v-card-title 
                    class="font-weight-bold 
                           title
                           primary 
                           white--text"
                >Add an Item to Inventory
                </v-card-title>

                <div class="pa-6">
                    <v-layout row wrap align-center justify-center>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.name"
                                label="Item Name"
                                placeholder="Enter Name of the Item"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.qty"
                                label="Item's Total Quantity"
                                placeholder="Enter the quantity of the item"
                                type="number"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.SN"
                                label="Item's SN"
                                placeholder="Enter the Item's Serial Number"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs3>
                            <v-btn  
                                color="primary" 
                                outlined
                                @click="addItemDialog = false"
                            >CANCEL</v-btn>
                        </v-flex>
                        <v-flex xs3 ml-5>
                            <v-btn 
                                depressed 
                                color="primary"
                                @click="addItem"
                                :loading="btnLoading"
                                :disabled="areTextfieldsEmpty"
                            >ADD ITEM</v-btn>
                        </v-flex>
                    </v-layout>
                </div>
                
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import navDrawer from "@/components/navDrawer.vue";
    import digiClock from "@/components/digiClock.vue";

    export default {
        name: "inventory",
        data: () => ({
            borrowerDialog: false,
            addItemDialog: false,
            borrowersHeaders: [
                {
                    text: "Student ID",
                    align: "left",
                    sortable: "true",
                    value: "visitorID"
                },
                { text: "Name",  value: "name" }, 
                { text: "Course", value: "course" },
                { text: "Items", value: "borrowerdItems" },
                { text: "Return Date", value: "returnDate" },
                { text: "Status", value: "currentStatus" },
            ],
            inventoryHeaders: [
                {
                    text: "Item Name",
                    align: "left",
                    sortable: "true",
                    value: "name"
                },
                { text: "Total Quantity",  value: "qty" }, 
                { text: "Total Borrowed", value: "borrowedQty" },
                { text: "Available Aquantity", value: "availableQty" },
            ],
            borrowers: [
                {
                    "id": 26,
                    "visitorID": "201800559",
                    "name": "Mendoza, Juan Miguel",
                    "course": "BS Computer Science",
                    "borrowedItems": [
                        {name: "Petri Dish", qty: 5}, 
                        {name: "Test Tube", qty: 5}
                    ],
                    "returnDate": "2019-11-02 00:21:42",
                    "currentStatus": "borrowing",
                },
                {
                    "id": 20,
                    "visitorID": "201800600",
                    "name": "Nisperos, Jannel Arianna",
                    "course": "BS Sociology",
                    "borrowedItems": [{name: "Test Tube", qty: 10}],
                    "returnDate": "2019-10-02 00:21:42",
                    "currentStatus": "overdue",
                },
                {
                    "id": 27,
                    "visitorID": "201800615",
                    "name": "Tudtud, Jeniffer",
                    "course": "BS Physical Therapy",
                    "borrowedItems": [
                        {name: "Petri Dish", qty: 5}, 
                        {name: "Test Tube", qty: 5}, 
                        {name: "Stirring Rod", qty: 2}
                    ],
                    "returnDate": "2019-11-19 00:21:42",
                    "currentStatus": "returned",                
                },
                {
                    "id": 28,
                    "visitorID": "201800614",
                    "name": "Vida, Adam",
                    "course": "BS Psychology",
                    "borrowedItems": [
                        {name: "Balance Beam", qty: 1},
                        {name: "Test Tube", qty: 5},
                        {name: "Petri Dish", qty: 3},
                        {name: "Stirring Rod", qty: 2},
                    ],
                    "returnDate": "2019-11-29 00:21:42",
                    "currentStatus": "borrowing",
                },
            ],
            inventory: [
                {
                    name: "Test Tube",
                    qty: 50,
                    borrowedQty: 25,
                    availableQty: 25,
                },
                {
                    name: "Balance Beam",
                    qty: 5,
                    borrowedQty: 2,
                    availableQty: 3,
                },
                {
                    name: "Test Tube Rack",
                    qty: 10,
                    borrowedQty: 10,
                    availableQty: 0,
                },
                {
                    name: "Stirring Rod",
                    qty: 30,
                    borrowedQty: 25,
                    availableQty: 5,
                },
                {
                    name: "Gradual Cylinder",
                    qty: 50,
                    borrowedQty: 50,
                    availableQty: 0,
                },
                {
                    name: "Petri Dish",
                    qty: 10,
                    borrowedQty: 2,
                    availableQty: 8,
                }
            ],
            selectedBorrower: {
                borrowedItems: [],
            },
            newItem: {
                name: null,
                qty: null,
                SN: null
            },
            btnLoading: false,
        }),

        methods: {
            view(item) {
                console.log(item);
                this.borrowerDialog = true;
                this.selectedBorrower = item;
            },
            borrowedItems(items) {
                let output = "";
                items.forEach((item) => {
                    output += (item.name + ", ");
                });
                return output;
            },
            addItem() {
                this.btnLoading = true;
                let itemToBeAdded = this.newItem;
                itemToBeAdded.borrowedQty = 0;
                itemToBeAdded.availableQty = itemToBeAdded.qty - itemToBeAdded.borrowedQty;
                console.log(itemToBeAdded);

                this.inventory.push(itemToBeAdded);
                this.btnLoading = false;
                this.addItemDialog = false;
                this.newItem = {};
            }
        },

        computed: {
           areTextfieldsEmpty() {
               if(!this.newItem.name || !this.newItem.qty || !this.newItem.SN) {
                   return true;
               }
               return false;
           }
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