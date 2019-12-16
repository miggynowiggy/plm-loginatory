<!--ReturnItem.vue-->
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

        <v-layout align-center justify-center mt-6>
            <!-- <v-flex xs4 offset-xs3 >
                <v-text-field
                    v-model="searchTranID"
                    outlined
                    rounded
                    clearable
                    focusable
                    :loading="loading"
                    color="primary"
                    placeholder="Enter transaction ID from your borrower's receipt..."
                    label="Enter Transaction ID"
                    @keyup.enter="searchTransactionID"
                >
                </v-text-field>
            </v-flex>
            <v-flex xs1 ml-6 py-2>
                <v-btn 
                    color="primary" 
                    depressed
                    :disabled="loading || !searchTranID" 
                    :loading="loading"
                    @click="searchTransactionID">Submit</v-btn>
            </v-flex> -->
            <v-flex xs3 py-2 offset-xs1>
                <v-btn 
                    color="primary" 
                    depressed outlined
                    @click="backToPrevPage"
                >
                    <v-icon left color="primary">navigate_before</v-icon>
                    BACK TO PREVIOUS PAGE</v-btn>
            </v-flex>
        </v-layout>

        <v-layout align-center justify-center mt-6>
            <v-flex xs10>
                <v-data-table
                    class="elevation-3"
                    :headers="transactionHeader"
                    :items-per-page="5"
                    item-key="id"
                    :loading="loading"
                    no-data-text="You have no recent"
                >
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr
                                v-for="item in transactionList" :key="item.id"
                                @click="searchTransactionID(item.transactionID)"
                                :class="[item.status === 'overdue' ? 'red lighten-4' : '']"
                            >
                                <td>
                                    {{ item.transactionID }}
                                </td>
                                <td>
                                    {{ convertTimestamp(item.borrowedDateTime) }}
                                </td>
                                <td>
                                    {{ convertTimestamp(item.returnDateTime) }}
                                </td>
                                <td>
                                    {{ appendItemNames(item.borrowedItems) }}
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

        <v-layout align-center justify-center v-if="showError || !borrowedItems.length" mt-6>
            <v-flex xs5>
                <div class="title font-weight-bold primary--text" v-if="showError">Invalid Transaction ID</div>
                <div class="title font-weight-bold primary--text" v-else-if="!transactionList.length">You have no recent transactions...</div>
                <div class="title font-weight-bold primary--text" v-else>Please click the row in the table above, with the transaction you want to process...</div>
            </v-flex>
        </v-layout>

        <v-layout row align-center justify-center mt-10 v-else>
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
                            >
                                <template v-slot:item.returnDateTime="{ item }">
                                    {{ convertTimestamp(item.returnDateTime) }}
                                </template>
                            </v-data-table>
                        </v-flex>
                    </v-layout>
                </v-card>
                
                <v-layout row align-center justify-center mt-6 mb-3>
                    <v-flex xs4 v-if="returnedItems.length && returnedItems.length < borrowedItems.length">
                        <v-btn 
                            color="secondary"
                            x-large block
                            :disabled="btnLoading"
                            :loading="btnLoading"
                            @click="returnItems('selected')"
                        >
                            Return Selected Items
                            <v-icon right large class="ml-5">redo</v-icon>
                        </v-btn>
                    </v-flex>

                    <v-flex xs4 v-else>
                        <v-btn 
                            color="primary"
                            x-large block
                            :disabled="btnLoading"
                            :loading="btnLoading"
                            @click="returnItems('all')"
                        >
                            Return All Borrowed Items
                            <v-icon right large class="ml-5">redo</v-icon>
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
    import digiClock from "@/components/digiClock.vue";
    import http from "@/http-common";
    import moment from 'moment';
    import swal from 'sweetalert2';

    export default {
        name: 'returnItem',
        async mounted() {
            this.loading = true;
            console.log("VISITORS ID from REASON ENCODING: ", this.$route.params.visitorID);
            this.visitor = this.$route.params.stuDetails;
            this.transactionList = await this.getBorrowers();
            this.loading = false;
        },
        data: () => ({
            visitor: {},
            transactionList: {},
            searchTranID: null,
            returnedItems: [],
            showError: false,
            loading: false,
            btnLoading: false,
            overlay: false,
            alertDialog: false,
            alertDialogTitle: null,
            alertDialogMessage: null,
            headers: [
                {
                    text: 'Item Name',
                    align: 'center',
                    sortable: false,
                    value: 'name'
                },
                {
                    text: "Quantity",
                    value: "borrowedQty"
                },
                {
                    text: "Return Date",
                    value: "returnDateTime"
                },
            ],
            transactionHeader: [
                {
                    text: 'Transaction Number',
                    align: 'center',
                    sortable: false,
                    value: 'name'
                },
                {
                    text: "Borrow Date and Time",
                    value: "qty"
                },
                {
                    text: "Return Date and Time",
                    value: "returnDateTime"
                },
                {
                    text: "Items",
                    value: "item"
                },
                {
                    text: "Status",
                    value: "status"
                },
            ],
            borrowedItems: [
                // {
                //     name: "Test Tube",
                //     qty: 50,
                //     returnDate: "2019-11-21",
                //     returnTime: "13:00",
                // },
            ],
        }),

        methods: {
            async getBorrowers() {
                let response;
                try {
                     response = await http.get(`/inventoryTransaction/getAllByStudNum/${this.visitor.studNum},${this.labID}`);
                }
                catch(error) {
                    console.log(error);
                    response.data = "NoTransactions";
                }

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
                            transaction[i].borrowedItems.push(
                                {
                                    name: item.name,
                                    qty: item.borrowedQty,
                                    sn: item.sn.replace(/,/g, ", "),
                                    returnDateTime: item.returnDateTime
                                }
                            );
                        }
                        else {
                            continue;
                        }
                    }
                }
                console.log(transaction);
                return transaction;
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
            showAlertDialog(title, message) {
                this.alertDialog = true;
                this.alertDialogTitle = title;
                this.alertDialogMessage = message;
            }, 
            closeAlertDialog() {
                if(this.alertDialogTitle === 'Success!') {
                    this.$router.push({
                        name: 'confirmEntry', 
                        params: {stuDetails: this.visitor, state: "entry"}
                    });
                }

                this.alertDialog = false;
                this.alertDialogTitle = null;
                this.alertDialogMessage = null;
            },
            async searchTransactionID(transactionID) {
                this.showError = false;
                this.loading = true;

                let response;

                try {
                    response = await http.get("inventoryTransaction/getTransaction/" + transactionID.toUpperCase() + "," + this.labID);
                    console.log(response);
                }
                catch(error) {
                    console.log(error);
                    this.loading = false;
                    this.showError = true;
                    return;
                }

                if(response.data === "NoTransactions") {
                    this.showError = true;
                    this.loading = false;
                    return;
                }

                if(response.data.length <= 0) {
                    this.showError = true;
                    this.loading = false;
                    return;
                }

                this.borrowedItems = response.data.filter(item => item.status !== 'returned');

                this.loading = false;
            },
            async returnItems(state) {
                this.btnLoading = true;
                this.overlay = true;

                let toBeReturned = [];
                let response;

                if(state === 'selected') {
                    //if the user will partially return some items
                    toBeReturned = this.returnedItems;
                }
                else {
                    //if the user click the return all borrowed items button
                    toBeReturned = this.borrowedItems;
                }

                console.log(toBeReturned);
                
                try {
                    response = await http.put("inventoryTransaction/returnItem", toBeReturned);
                }
                catch(error) {
                    console.log(error);
                    this.btnLoading = false;
                    this.overlay = false;
                    this.showAlertDialog("Error!", error.message);
                    return;
                }
                if(response.data !== 'success') {
                    this.btnLoading = false;
                    this.overlay = false;
                    this.showAlertDialog("Error!", "Items were NOT recorded, please try again...");
                    return;
                }
                

                const labAttendance = {
                    firstName: this.visitor.firstName,
                    lastName: this.visitor.lastName,
                    course: this.visitor.course,
                    yr: this.visitor.yr,
                    visitorID: this.visitor.studNum,
                    labID: this.labID,
                    purpose: "Return Item/s",
                }
                
                try {
                    const response = await http.post("/attendance/add", labAttendance);
                    const stuDetails = response.data;

                    console.log("FROM THE BACK END: ", stuDetails);
                    
                    this.btnLoading = false;
                    this.overlay = false;
                    //this.showAlertDialog("Success!", "Items were recorded \"RETURNED\", please proceed to the lab personnel to return the item/s");
                    const ok = 
                    await swal.fire({
                        icon: 'success',
                        title: "Success!",
                        text: "Item/s were recorded as 'Returned'. Please proceed to the lab personnel to return the items.",
                        showConfirmButton: true,
                        confirmButtonText: "OK",
                    });

                    if(ok.value) {
                        this.$router.push({
                            name: 'confirmEntry', 
                            params: {stuDetails: this.visitor, state: "entry"}
                        });
                    }

                    this.btnLoading = false;
                }
                catch(error) {
                    console.log(error);
                    this.btnLoading = false;
                    return;
                }
            },
            appendItemNames(borrowedItemList) {
                let name = "";
                borrowedItemList.forEach(item => {
                    name += (item.name + ", ");
                });
                return name;
            },
            convertTimestamp(time) {
                return moment(time).format("(hh:mm A) MMM DD, YYYY ");
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

        color: #D25565;
    }
</style>