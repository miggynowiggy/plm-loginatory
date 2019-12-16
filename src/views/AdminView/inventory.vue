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

        <v-layout wrap align-center justify-center mt-10>
            <v-flex xs12 md3>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold title secondary white--text">Total Items</v-card-title>
                    <v-layout wrap align-center px-4 pb-4 mt-4>
                        <v-flex xs7>
                            <div class="display-2 font-weight-thin">{{ totalItems }}</div>
                        </v-flex>

                        <v-flex xs5 align-content-end>
                            <v-avatar 
                                color="secondary" 
                                size="100"
                            >
                                <v-icon dark size="50">fa-boxes</v-icon>
                            </v-avatar>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>

            <v-flex xs12 md3 offset-md1>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold title secondary white--text">Total Borrowed Items</v-card-title>
                    <v-layout wrap align-center px-4 pb-4 mt-4>
                        <v-flex xs7>
                            <div class="display-2 font-weight-thin">{{ totalBorrowed }}</div>
                        </v-flex>

                        <v-flex xs5 align-content-end >
                            <v-avatar 
                                color="secondary" 
                                size="100"
                            >
                                <v-layout wrap align-center justify-center>
                                    <v-flex xs12>
                                        <v-icon dark size="40">fa-box</v-icon>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-icon dark size="40">fa-hand-holding</v-icon>
                                    </v-flex>
                                </v-layout>
                            </v-avatar>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>

            <v-flex xs12 md3 offset-md1>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold title secondary white--text">Total Returned Items</v-card-title>
                    <v-layout wrap align-center px-4 pb-4 mt-4>
                        <v-flex xs7>
                            <div class="display-2 font-weight-thin">{{ totalAvailable }}</div>
                        </v-flex>

                        <v-flex xs5 align-content-end>
                            <v-avatar 
                                color="secondary" 
                                size="100"
                            >
                                <v-layout wrap align-center justify-center>
                                    <v-flex xs12>
                                        <v-icon dark size="40">fa-box-open</v-icon>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-icon dark size="40">fa-hands</v-icon>
                                    </v-flex>
                                </v-layout>
                            </v-avatar>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        
        <v-divider class="mt-9"></v-divider>
        <v-divider class="mt-2"></v-divider>

        <v-layout align-center justify-center mt-4>
            <v-flex xs12 px-5>
                <v-layout align-center mb-4>
                    <v-flex xs9>
                        <div class="title font-weight-bold secondary--text">Current Inventory</div>
                        <div class="body-2 font-italic black--text">*click a row in this table to see the Item's Details</div>
                    </v-flex>
                    <v-flex xs3 align-self-center>
                        <v-btn
                            color="primary"
                            depressed block
                            rounded large
                            @click="showAddItemDialog"
                        >
                            <v-icon left>add_circle_outline</v-icon>
                            ADD AN ITEM TO INVENTORY
                        </v-btn>
                    </v-flex>
                </v-layout>

                <v-layout align-center justify-start mt-6>
                    <v-flex xs5>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            single-line
                            outlined 
                            rounded
                            placeholder="Type anything that relates to your desired item..."
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table
                    class="elevation-3"
                    :headers="inventoryHeaders"
                    :items="inventory"
                    :items-per-page="10"
                    :loading="loading"
                    :search="search"
                >
                    <template v-slot:item.action="{ item }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                            small
                            @click="deleteItem(item)"
                        >
                            delete
                        </v-icon>
                    </template>
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr
                                v-for="item in items" :key="item.baseSN"
                                :class="[item.availableQty === 0 ? 'red lighten-4' : '']"
                            >
                                <td>
                                    {{ item.name }}
                                </td>
                                <td>
                                    {{ item.baseSN }}
                                </td>
                                <td>
                                    {{ item.qty }}
                                </td>
                                <td>
                                    {{ item.borrowedQty }}
                                </td>
                                <td>
                                    {{ item.availableQty }}
                                </td>
                                <td>
                                    <v-tooltip top dark color="secondary" transition="scroll-y-reverse-transition">
                                        <template v-slot:activator="{ on }">
                                            <v-btn fab depressed x-small color="secondary" @click="showItemDetailsDialog(item)" v-on="on">
                                                <v-icon>visibility</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Show Details of this Item</span>
                                    </v-tooltip>

                                   <v-tooltip top dark color="secondary" transition="scroll-y-reverse-transition">
                                        <template v-slot:activator="{ on }">
                                            <v-btn fab depressed x-small color="secondary" class="ml-3" @click="showEditItemDialog(item)" v-on="on">
                                                <v-icon>edit</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Edit Details of this Item</span>
                                    </v-tooltip>

                                    <v-tooltip top dark color="primary" transition="scroll-y-reverse-transition">
                                        <template v-slot:activator="{ on }">
                                            <v-btn fab depressed x-small color="primary" class="ml-3" @click="showDeleteDialog(item)" v-on="on">
                                                <v-icon>delete</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Delete this Item</span>
                                    </v-tooltip>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>

        <v-divider class="mt-9"></v-divider>
        <v-divider class="mt-2"></v-divider>

        <!--- DIALOG DISPLAYS ----------->

        <v-dialog
            v-model="itemDialog"
            max-width="400px"    
        >
            <v-card>
                <v-card-title 
                    class="font-weight-bold 
                           title
                           primary 
                           white--text"
                >{{ itemDialogTitle }}
                </v-card-title>

                <div class="pa-6">
                    <v-layout row wrap align-center justify-center>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.name"
                                label="Item Name"
                                placeholder="Enter Name of the Item"
                                clearable
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.qty"
                                label="Item's Total Quantity"
                                placeholder="Enter the quantity of the item"
                                type="number"
                                clearable
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newItem.SN"
                                label="Item's SN"
                                placeholder="Enter the Item's Serial Number"
                                clearable
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs3>
                            <v-btn  
                                color="primary" 
                                outlined
                                @click="itemDialog = false"
                            >CANCEL</v-btn>
                        </v-flex>
                        <v-flex xs3 ml-5 v-if="itemDialogTitle === 'Add Item'">
                            <v-btn 
                                depressed 
                                color="primary"
                                @click="addItem"
                                :loading="btnLoading"
                                :disabled="areTextfieldsEmpty || newItem.qty <= 0"
                            >ADD ITEM</v-btn>
                        </v-flex>

                        <v-flex xs5 ml-5 v-else>
                            <v-btn 
                                depressed 
                                color="primary"
                                @click="editItem"
                                :loading="btnLoading"
                                :disabled="areTextfieldsEmpty || newItem.qty <= 0"
                            >CONFIRM CHANGES</v-btn>
                        </v-flex>
                    </v-layout>
                </div>
                
            </v-card>
        </v-dialog>

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
                <v-card-actions v-if="alertDialogTitle === 'Delete Item'">
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-btn 
                                block 
                                color="primary" 
                                depressed
                                :loading="btnLoading"
                                @click="deleteItem"
                            >Yes, DELETE THIS ITEM
                            </v-btn>
                        </v-flex>
                        <v-flex xs12 mt-3>
                            <v-btn 
                                block 
                                color="secondary" 
                                depressed 
                                @click="closeAlertDialog"
                            >CANCEL
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
                <v-card-actions v-else>
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

        <v-dialog
            v-model="itemDetailsDialog"
            max-width="500px"
        >
            <v-card>
                <v-card-title class="primary white--text font-weight-bold title">
                    Item's Details
                    <v-spacer></v-spacer>

                    <v-tooltip left light transition="scroll-x-reverse-transition">
                        <template v-slot:activator="{ on }">
                            <v-btn 
                                depressed 
                                dark 
                                small 
                                icon
                                @click="showDeleteDialog(itemDetails)"
                                v-on="on"
                            >
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </template>
                        <span>Delete this Item</span>
                    </v-tooltip>
                    
                    <v-divider vertical class="mx-3 white" ></v-divider>

                    <v-tooltip right light transition="scroll-x-transition">
                        <template v-slot:activator="{ on }">
                            <v-btn 
                                depressed 
                                dark 
                                small 
                                icon
                                @click="showEditItemDialog(itemDetails)"
                                v-on="on"
                            >
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </template>
                        <span>Edit Details of this Item</span>
                    </v-tooltip>
                </v-card-title>
                <div class="pa-6">
                    <div>
                        <b class="primary--text">Name:</b><br/> 
                        {{ itemDetails.name }}
                    </div>

                    <v-divider class="my-4"></v-divider>

                    <div class="mt-3">
                        <b class="primary--text">Serial Number:</b><br/> 
                        {{ itemDetails.baseSN }}
                    </div>
                    
                    <v-divider class="my-4"></v-divider>
                    
                    <v-layout align-center justify-center>
                        <v-flex xs4>
                            <div>
                                <b class="primary--text">Total Quantity:</b><br/> 
                                {{ itemDetails.qty }}
                            </div>
                        </v-flex>
                        <v-divider vertical class="mx-3"></v-divider>
                        <v-flex xs4>
                            <div>
                                <b class="primary--text">Total Borrowed:</b><br/> 
                                {{ itemDetails.borrowedQty }}
                            </div>
                        </v-flex>
                        <v-divider vertical class="mx-3"></v-divider>
                        <v-flex xs4>
                            <div>
                                <b class="primary--text">Total Available:</b><br/> 
                                {{ itemDetails.availableQty }}
                            </div>
                        </v-flex>
                    </v-layout>

                    <v-divider class="my-4"></v-divider>

                    <div class="font-weight-bold primary--text">Specific Items</div>
                    <v-layout align-center justify-center class="">
                        <v-flex  xs11>
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <th>Serial Number</th>
                                        <th>Condition</th>
                                        <th>Status</th>
                                    </thead>
                                    
                                    <tbody>
                                        <tr 
                                            v-for="item in itemDetails.allItems" :key="item.sn"
                                            :class="[item.status === 'borrowed' ? 'red lighten-4' : '', 
                                                     item.condition === 'damaged' ? 'green lighten-4' : ''
                                                    ]"
                                        >
                                            <td>{{ item.sn }}</td>
                                            <td>{{ item.condition }}</td>
                                            <td>{{ item.status }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-flex>
                    </v-layout>
                </div>
                <v-layout>
                    <v-flex>
                        <v-btn 
                            block 
                            depressed 
                            color="secondary"
                            @click="itemDetailsDialog = false"
                        >CLOSE</v-btn>
                    </v-flex>
                </v-layout>
                <!-- <v-card-actions>
                    <v-btn 
                        @click="itemDialog = false" 
                        color="secondary" 
                        depressed
                        block
                    >CLOSE</v-btn>
                </v-card-actions> -->
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="editDialog"
            max-width="550px"
            
        >
            <v-card>
                <v-card-title class="primary white--text">
                    Edit Items' Details 
                    <v-spacer/>
                    <v-icon 
                        color="white" 
                        @click="editDialog = false"
                        right
                    >close</v-icon>
                    <div class="caption font-italic">*type a new condition or status on the textbox along the desired item</div>
                </v-card-title>
                <v-layout align-center justify-center px-4>
                    <v-flex xs12>
                        <div 
                            v-if="!individualItems"
                            class="font-weight-bold title primary--text xs3"
                        >
                            THERE ARE NO ITEMS
                        </div>
                        <v-layout v-else align-center justify-center mt-4>
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <th>Serial Number</th>
                                        <th>Name</th>
                                        <th>Condition</th>
                                        <th>Status</th>
                                    </thead>
                                    
                                    <tbody>
                                        <tr 
                                            v-for="item in individualItems" :key="item.sn"
                                            :class="[
                                                     item.status === 'borrowed' ? 'red lighten-4' : '',
                                                     item.condition === 'damaged' ? 'green lighten-4' : ''
                                                    ]"
                                        >
                                            <td>{{ item.sn }}</td>
                                            <td>{{ item.name }}</td>
                                            <td>
                                                <v-text-field
                                                    v-model="item.condition"
                                                    outlined rounded dense
                                                    class="mt-3"
                                                ></v-text-field>
                                            </td>
                                            <td>
                                                <v-text-field
                                                    v-model="item.status"
                                                    outlined rounded dense
                                                    class="mt-3"
                                                ></v-text-field>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-divider class="my-4"></v-divider>
                <v-card-actions>
                    <v-layout align-center justify-center mb-2>
                        <v-flex xs5 offset-xs1>
                            <v-btn 
                                @click="editItem" 
                                color="primary"
                                depressed
                                :loading="btnLoading"
                                :disabled="btnLoading"
                            >
                                SUBMIT CHANGES
                                <v-icon right>check</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex xs4>
                            <v-btn 
                                @click="editDialog = false;"
                                color="secondary"
                                outlined
                            >
                                CANCEL
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import navDrawer from "@/components/navDrawer.vue";
    import digiClock from "@/components/digiClock.vue";
    import http from "@/http-common";
    import moment from 'moment';
    import swal from 'sweetalert2';

    export default {
        name: "inventory",
        async mounted() {
            this.loading = true;
            await this.getLabItems();
            this.loading = false;
        },
        data: () => ({
            loading: false,
            borrowerDialog: false,
            itemDialog: false,
            alertDialog: false,
            itemDetailsDialog: false,
            itemDialogTitle: null,
            alertDialogTitle: null,
            alertDialogMessage: null,
            editDialog: false,
            search: "",
            inventoryHeaders: [
                {
                    text: "Item Name",
                    align: "left",
                    sortable: "true",
                    value: "name"
                },
                { text: "Base Serial Number", value: "baseSN" },
                { text: "Total Quantity", sortable: "true",  value: "qty" }, 
                { text: "Total Borrowed", sortable: "true", value: "borrowedQty" },
                { text: "Available Quantity", sortable: "true", value: "availableQty" },
                { text: "Actions", value: "action", sortable: "false" }
            ],
            inventory: [],
            newItem: {
                name: null,
                qty: null,
                SN: null
            },
            itemDetails: {
                name: "",
                sn: "", 
                qty: 0,
                borrowedQty: 0,
                availableQty: 0, 
                allItems: []
            },
            deletedItem: {
                labID: null,
                baseSN: null,
            },
            btnLoading: false,
            individualItems: [],
        }),

        methods: {
            showAlertDialog(title, message) {
                this.alertDialog = true;
                this.alertDialogTitle = title;
                this.alertDialogMessage = message;
            },
            closeAlertDialog() {
                this.alertDialog = false;
                this.btnLoading = false;
                if(this.deletedItem) this.deletedItem = {};
            },
            showAddItemDialog() {
                this.itemDialog = true;
                this.itemDialogTitle = "Add Item";
            },
            showEditItemDialog(item) {
               this.getIndividualItems(item)
                .then(response => {
                    if(response.data === "NoItems") {
                        this.individualItems = null;
                    }
                    else {
                        this.individualItems = response.data;
                    }
                    this.itemDetailsDialog = false;
                    this.editDialog = true;
                    console.log(response.data);
                });
            },
            showDeleteDialog(item) {
                Object.assign(this.deletedItem, item);
                this.showAlertDialog("Delete Item", `Are you sure you want to delete ${item.name}?`);
                console.log(this.deletedItem);
            },
            showItemDetailsDialog(item) {
                this.getIndividualItems(item)
                .then(response => {
                    Object.assign(this.itemDetails, item);
                
                    if(response.data === "NoItems") {
                        this.itemDetails.allItems = null;
                    }
                    else {
                        this.itemDetails.allItems = response.data;
                    }

                    console.log(this.itemDetails);
                    this.itemDetailsDialog = true;
                });
            },
            async getIndividualItems(item) {
                const response = await http.get("inventory/getItem/" + item.baseSN + "," + this.labID)
                return response;
            },
            async getLabItems() {
                const response = await http.get("/inventory/getItems/" + this.labID);
                console.log(response.data);
                response.data.forEach(item => {
                    item.borrowedQty = item.qty - item.availableQty;
                });
                this.inventory = response.data; 
            },
            borrowedItems(items) {
                let output = "";
                items.forEach((item) => {
                    output += (item.name + ", ");
                });
                return output;
            },
            async deleteItem() {
                this.btnLoading = true;
                this.itemDetailsDialog = false;

                let response;

                try {
                    response = await http
                                .delete(`inventory/deleteItem/${this.deletedItem.baseSN},${this.deletedItem.labID}`);
                }
                catch(error) {
                    this.btnLoading = false;
                    this.showAlertDialog("Error!", "An error occured, please try again");
                    console.log(error);
                    this.deletedItem = {};
                    return;
                }

                if(response.data === "success") {
                    this.btnLoading = false;
                    this.showAlertDialog("Success!", `Item ${this.deletedItem.name} was successfully deleted`);
                }
                else {
                    this.btnLoading = false;
                    this.showAlertDialog("Error!", response.data);
                }

                this.deletedItem = {};

                this.getLabItems();
            },
            async editItem() {
                this.btnLoading = true;

                let response;
                let editedItems = this.individualItems;
                
                editedItems.forEach(item => {
                    item.prevBaseSN = item.baseSN;
                    item.prevSN = item.sn;
                });
                
                console.log(editedItems);

                try {
                    response = await http.put("/inventory/editItem", editedItems);
                }
                catch(error) {
                    console.log(error);
                    this.btnLoading = false;
                    this.showAlertDialog("Error!", error.message);
                    return;
                }

                if(response.data === "success") {
                    this.editDialog = false;
                    this.btnLoading = false
                    this.showAlertDialog("Success!", "Item was edited successfully!");
                }
                else {
                    this.btnLoading = false
                    this.showAlertDialog("Error!", response.data);
                }

                this.getLabItems();
            },
            async addItem() {
                this.btnLoading = true;

                this.newItem.labID = this.labID;
                this.newItem.itemSN = this.newItem.SN;
                this.newItem.sn = this.newItem.SN;
                //delete this.newItem.SN;

                console.log(this.newItem);

                let response;
                try {
                    response = await http.post("/inventory/addItem", this.newItem);
                }
                catch (error) {
                    console.log(error);
                    console.log(response);

                    this.showAlertDialog("Error!", "Item was not added due to an error, try again.");
                    this.btnLoading = false;
                    return;
                }

                if(response.data === "ExistingSN") {
                    this.showAlertDialog("Error!", "An Item with the same Serial Number already exists. Try another Serial Number instead.");    
                    this.btnLoading = false;
                    return;
                }

                console.log(response);
                this.newItem.availableQty = this.newItem.qty;
                this.newItem.borrowedQty = 0;
                this.newItem.baseSN = this.newItem.SN;

                this.inventory.push(this.newItem);

                this.btnLoading = false;
                this.itemDialog = false;
                
                this.showAlertDialog("Success!", this.newItem.name + " was added successfully!");
                this.newItem = {};

                this.getLabItems();
            },
            convertTimestamp(time) {
                return moment(time).format("(hh:mm A) MMM DD, YYYY ");
            }
        },

        computed: {
           areTextfieldsEmpty() {
               if(!this.newItem.name || !this.newItem.qty || !this.newItem.SN) {
                   return true;
               }
               return false;
           },
           labID() {
                const lab = this.$store.getters.GET_CURRENT_LAB;
                return lab.labID;
            },
            totalItems() {
                let total = 0;
                this.inventory.forEach(item => {
                    total += item.qty;
                });
                return total;
            },
            totalBorrowed() {
                let total = 0;
                this.inventory.forEach(item => {
                    total += item.borrowedQty;
                });
                return total;
            },
            totalAvailable() {
                let total = 0;
                this.inventory.forEach(item => {
                    total += item.availableQty;
                });
                return total;
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