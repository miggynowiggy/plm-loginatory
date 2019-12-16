<template>
    <div>
        <navDrawer></navDrawer>

        <v-layout align-center mt-6 mx-4>
            <v-flex xs12 md8>
                <div id="title">Inventory Transactions DASHBOARD</div>
            </v-flex>
            <v-flex xs12 offset-md1 md6>
                <digiClock></digiClock>
            </v-flex>
        </v-layout>

        <v-layout wrap align-center justify-center mt-10>
            <v-flex xs12 md3>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold subtitle-1 secondary white--text">Total "Borrowing" <br>Transactions</v-card-title>
                    <v-card-text>
                        <v-layout wrap align-center justify-start px-4 mt-4>
                            <v-flex xs8>
                                <div class="display-2 font-weight-thin">{{ totalBorrow }}</div>
                            </v-flex>

                            <v-flex xs1 align-content-end >
                                <v-avatar 
                                    color="secondary" 
                                    size="80"
                                >
                                    <v-icon dark size="60">rotate_right</v-icon>
                                </v-avatar>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs12 md3 offset-md1>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold subtitle-1 secondary white--text">Total "Returned" <br>Transactions</v-card-title>
                    <v-card-text>
                        <v-layout wrap align-center justify-start px-4 mt-4>
                            <v-flex xs8>
                                <div class="display-2 font-weight-thin">{{ totalReturn }}</div>
                            </v-flex>

                            <v-flex xs1 align-content-end >
                                <v-avatar 
                                    color="secondary" 
                                    size="80"
                                >
                                    <v-icon dark size="60">rotate_left</v-icon>
                                </v-avatar>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs12 md3 offset-md1>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold subtitle-1 secondary white--text">Total "Overdue" <br>Transactions</v-card-title>
                    <v-card-text>
                        <v-layout wrap align-center justify-start px-4 mt-4>
                            <v-flex xs8>
                                <div class="display-2 font-weight-thin">{{ totalOverdue }}</div>
                            </v-flex>

                            <v-flex xs1 align-content-end >
                                <v-avatar 
                                    color="secondary" 
                                    size="80"
                                >
                                    <v-icon dark size="60">timer_off</v-icon>
                                </v-avatar>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout align-center justify-center mt-10>
             <v-flex xs12 md3>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold subtitle-1 secondary white--text">Total Transactions</v-card-title>
                    <v-card-text>
                        <v-layout wrap align-center justify-start px-4 mt-4>
                            <v-flex xs8>
                                <div class="display-2 font-weight-thin">{{ borrowers.length }}</div>
                            </v-flex>

                            <v-flex xs1 align-content-end >
                                <v-avatar 
                                    color="secondary" 
                                    size="80"
                                >
                                    <v-icon dark size="45">fa-people-carry</v-icon>
                                </v-avatar>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-divider class="mt-9"></v-divider>
        <v-divider class="mt-2"></v-divider>

        <v-layout align-center justify-center mt-6>
            <v-flex xs12 px-5>
                <div class="title font-weight-bold primary--text">Borrowers</div>
                <div class="body-2 font-italic black--text mb-4">*click a row in this table to see a borrowers's details</div>
                <div>
                    <v-flex xs5 my-5>
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
                </div>
                <v-data-table
                    class="elevation-3"
                    :headers="borrowersHeaders"
                    :items="borrowers"
                    :items-per-page="5"
                    :sort-by="'borrowedDateTime'"
                    :group-desc="true"
                    item-key="id"
                    :loading="loading"
                    :search="search"
                    no-data-text="There is no transactions so far..."
                    no-results-text="There is no transaction related to your search..."
                >
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr
                                v-for="item in items" :key="item.id"
                                @click="view(item)"
                                :class="[item.status === 'overdue' ? 'red lighten-4' : '']"
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
                                <!-- <td>
                                    {{ item.transactionID }}
                                </td> -->
                                <td>
                                    {{ borrowedItems(item.borrowedItems) }}
                                </td>
                                <td>
                                    {{ convertTimestamp(item.borrowedDateTime) }}
                                </td>
                                <td>
                                    {{ convertTimestamp(item.returnDateTime) }}
                                </td>
                                <td>
                                    {{ item.status }}
                                </td>
                            </tr>
                        </tbody>
                        
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>

        <!--- DIALOG DISPLAYS ----------->

        <v-dialog 
            v-model="borrowerDialog"
            max-width="600px"
        >
            <v-card>
                <v-card-title 
                    class="font-weight-bold title 
                           primary
                           white--text"
                >Borrower's Details
                </v-card-title>
                
                <v-layout align-center justify-start px-6 mt-4>
                    <v-flex xs4>
                        <div>
                            <b class="primary--text">Transaction ID:</b><br/> 
                            {{ selectedBorrower.transactionID }}
                        </div>
                    </v-flex>
                    <v-flex xs4>
                        <div>
                            <b class="primary--text">Student Number:</b><br/> 
                            {{ selectedBorrower.visitorID }}
                        </div>
                    </v-flex>
                    <v-flex xs4>
                        <div >
                            <b class="primary--text">Name:</b><br/> 
                            {{ selectedBorrower.name }}
                        </div>
                    </v-flex>
                </v-layout>

                <v-divider class="my-3"></v-divider>

                <v-layout align-center justify-center px-6 mt-3>
                    <v-flex xs3>
                        <div>
                            <b class="primary--text">Course:</b><br/> 
                            {{ selectedBorrower.course }}
                        </div>
                    </v-flex>
                    <v-flex xs2>
                        <div>
                            <b class="primary--text">Year:</b><br/> 
                            {{ selectedBorrower.yr }}
                        </div>
                    </v-flex>
                    <v-flex xs3>
                        <div>
                            <b class="primary--text">Status:</b><br/> 
                            {{ selectedBorrower.status }}
                        </div>
                    </v-flex>
                    <v-flex xs4>
                        <div>
                            <b class="primary--text">Borrow Date:</b><br/> 
                            {{ convertTimestamp(selectedBorrower.borrowedDateTime) }}
                        </div>
                    </v-flex>
                </v-layout>
                
                <v-divider class="my-3"></v-divider>
                
                <v-layout wrap align-center justify-center mt-3>
                    <v-flex xs12 px-5 py-3>
                        <div class="font-weight-bold primary--text">
                            Other Borrowers
                        </div>
                        <div>
                            <v-simple-table>
                                <template>
                                    <thead>
                                        <th>Student Number</th>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>Yr</th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="student in selectedBorrower.otherBorrowers" :key="student.studNum">
                                            <td>{{ student.studNum }}</td>
                                            <td>{{ student.lastName }}, {{ student.firstName }}</td>
                                            <td>{{ student.course }}</td>
                                            <td>{{ student.yr }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </div>
                    </v-flex>
                </v-layout>
                
                <v-divider></v-divider>
                
                <v-layout wrap align-center justify-center px-5 py-3>
                    <v-flex xs12 mt-4>
                        <div class="font-weight-bold primary--text">Assigned Prof</div>
                        <div>{{ selectedBorrower.prof }}</div>
                    </v-flex>
                    <v-flex xs12 mt-4>
                        <div class="font-weight-bold primary--text">Reason for Borrowing</div>
                        <div>{{ selectedBorrower.reason }}</div>
                    </v-flex>
                </v-layout>

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
                                    <th class="text--center">Item Name</th>
                                    <th class="text--center">Quantity</th>
                                    <th class="text--center">SN</th>
                                    <th class="text--center">Return Date</th>
                                    <th class="text-center">Status</th>
                                </thead>
                                
                                <tbody>
                                    <tr 
                                        v-for="item in selectedBorrower.borrowedItems" :key="item.id"
                                        :class="[item.status === 'overdue' ? 'red lighten-4': '']"
                                    >
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.qty }}</td>
                                        <td>{{ item.sn }}</td>
                                        <td>{{ convertTimestamp(item.returnDateTime) }}</td>
                                        <td>{{ item.status }}</td>
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
                <!-- <v-card-actions>
                    <v-btn 
                        @click="borrowerDialog = false" 
                        color="secondary" 
                        depressed
                        block
                    >CLOSE</v-btn>
                </v-card-actions> -->
            </v-card>
        </v-dialog>

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
                                            :class="[item.status === 'borrowed' ? 'red lighten-4' : '']"
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
    </div>
</template>

<script>
    import navDrawer from "@/components/navDrawer.vue";
    import digiClock from "@/components/digiClock.vue";
    import http from "@/http-common";
    import moment from 'moment';

    export default {
        name: "inventory",
        async mounted() {
            this.loading = true;
            await this.getLabItems();
            await this.getBorrowers();
            this.loading = false;
        },
        data: () => ({
            borrowerDialog: false,
            itemDialog: false,
            alertDialog: false,
            itemDetailsDialog: false,
            itemDialogTitle: null,
            alertDialogTitle: null,
            alertDialogMessage: null,
            loading: false,
            search: "",
            borrowersHeaders: [
                {
                    text: "Student ID",
                    align: "left",
                    sortable: "true",
                    value: "visitorID"
                },
                { text: "Name",  value: "name" }, 
                { text: "Course", value: "course" },
                //{ text: "Transaction ID", value: "transactionID" },
                { text: "Items", value: "borrowerdItems" },
                { text: "Borrowed Date", value: "borrowedDateTime" },
                { text: "Return Date", value: "returnDateTime" },
                { text: "Status", value: "status" },
            ],
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
            borrowers: [
                // {
                //     "id": 26,
                //     "visitorID": "201800559",
                //     "name": "Mendoza, Juan Miguel",
                //     "course": "BS Computer Science",
                //     "borrowedItems": [
                //         {name: "Petri Dish", qty: 5}, 
                //         {name: "Test Tube", qty: 5}
                //     ],
                //     "returnDate": "2019-11-02 00:21:42",
                //     "currentStatus": "borrowing",
            ],
            inventory: [],
            selectedBorrower: {
                borrowedItems: [],
            },
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
                this.itemDetailsDialog = false;
                this.itemDialog = true;
                this.itemDialogTitle = "Edit Item Details";
                Object.assign(this.newItem, item);
                this.newItem.SN = this.newItem.baseSN;
                this.newItem.prevBaseSN = this.newItem.baseSN;
                console.log(item);
            },
            showDeleteDialog(item) {
                Object.assign(this.deletedItem, item);
                this.showAlertDialog("Delete Item", `Are you sure you want to delete ${item.name}?`);
                console.log(this.deletedItem);
            },
            showItemDetailsDialog(item) {
                console.log(item);
                http.get("inventory/getItem/" + item.baseSN + "," + this.labID)
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
            async getLabItems() {
                const response = await http.get("/inventory/getItems/" + this.labID);
                console.log(response.data);
                response.data.forEach(item => {
                    item.borrowedQty = item.qty - item.availableQty;
                });
                this.inventory = response.data; 
            },
            async getBorrowers() {
                const response = await http.get("inventoryTransaction/getAll/" + this.labID);
                console.log(response.data);

                if(response.data === "NoTransactions") {
                    this.borrowers = [];
                    return;
                }
                else {
                    this.borrowers = response.data;
                }

                let transactionIDs = response.data.map(item => item.transactionID);
                transactionIDs = [...new Set(transactionIDs)];
                console.log(transactionIDs);

                let transaction = [];
                for(let i = 0; i < transactionIDs.length; i++) {
                    transaction.push({
                        borrowedItems: []
                    });
                }

                for(let i = 0; i < transactionIDs.length; i++) {
                    const id = transactionIDs[i];
                    let reset = false;

                    for(let j = 0; j < response.data.length; j++) {
                        const item = response.data[j];

                        if(item.transactionID === id) {
                            transaction[i].id = item.id;
                            transaction[i].transactionID = id;
                            transaction[i].visitorID = item.studNum;
                            transaction[i].name = item.studName;
                            transaction[i].course = item.course;
                            transaction[i].yr = item.yr;
                            transaction[i].borrowedDateTime = item.borrowedDateTime;
                            transaction[i].returnDateTime = item.returnDateTime;
                            transaction[i].status = item.status;
                            transaction[i].otherBorrowers = item.otherBorrowers;
                            transaction[i].prof = item.prof;
                            transaction[i].reason = item.reason;
                            transaction[i].borrowedItems.push(
                                {
                                    name: item.name,
                                    qty: item.borrowedQty,
                                    sn: item.sn.replace(/,/g, ", "),
                                    returnDateTime: item.returnDateTime,
                                    status: item.status
                                }
                            );
                        }
                        else {
                            continue;
                        }
                    }
                }
                console.log(transaction);
                this.borrowers = transaction;
            },
            async view(item) {
                console.log(item);

                let studNum;
                const students = [];
                if(item.otherBorrowers !== null) {
                    studNum = item.otherBorrowers.split(",");
                    
                    for(let i = 0; i < studNum.length; i++) {
                        const num = studNum[i];

                        let response; 
                        try {
                            response = await http.get("/students/" + num);
                            students.push(response.data);
                        }
                        catch(error) {
                            students.push({studNum: num, studName: 'invalid'});
                        }
                    }
                }
                item.otherBorrowers = students;
                this.selectedBorrower = item;
                this.borrowerDialog = true;
                
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
                let editedItem = Object.assign({}, this.newItem);;
                console.log(editedItem);
                delete editedItem.availableQty;
                delete editedItem.borrowedQty;
                editedItem.sn = editedItem.SN;
                editedItem.baseSN = editedItem.SN;
                delete editedItem.SN;

                try {
                    response = await http.put("/inventory/editItem", editedItem);
                }
                catch(error) {
                    console.log(error);
                    this.btnLoading = false;
                    this.showAlertDialog("Error!", error.message);
                    return;
                }

                if(response.data === "success") {
                    this.itemDialog = false;
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
            totalBorrow() {
                let total = 0;
                this.borrowers.forEach(item => {
                    if(item.status === 'borrowing') total++;
                });
                return total;
            }, 
            totalReturn() {
                let total = 0;
                this.borrowers.forEach(item => {
                    if(item.status === 'returned') total++;
                });
                return total;
            }, 
            totalOverdue() {
                let total = 0;
                this.borrowers.forEach(item => {
                    if(item.status === 'overdue') total++;
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

    #stats {
        font-size: 28px;
    }
</style>