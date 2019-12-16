<template>
    <div>
        <navDrawer/>
        
        <v-layout align-end justify-end ma-6>
            <v-flex xs12 md7>
                <div id="title">DASHBOARD</div>
            </v-flex>
            <v-flex xs12 offset-md1 md6 align-content-end>
                <digiClock></digiClock>
            </v-flex>
        </v-layout>

        <v-layout wrap align-center justify-center>
            <v-flex xs12 md3>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold success white--text title">Total Visitors Today</v-card-title>
                    <v-layout wrap align-center px-4 pb-4 mt-4>
                        <v-flex xs7>
                            <div class="display-2 font-weight-thin">{{ totalVisitors }}</div>
                        </v-flex>

                        <v-flex xs5 align-content-end>
                            <v-avatar 
                                color="success" 
                                size="100"
                            >
                                <v-icon dark size="70">transfer_within_a_station</v-icon>
                            </v-avatar>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>

            <v-flex xs12 md3 offset-md1>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold success white--text title">Total Borrowed Items</v-card-title>
                    <v-layout wrap align-center px-4 pb-4 mt-4>
                        <v-flex xs7>
                            <div class="display-2 font-weight-thin">{{ totalBorrowed }}</div>
                        </v-flex>

                        <v-flex xs5 align-content-end >
                            <v-avatar 
                                color="success" 
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
                    <v-card-title class="font-weight-bold success white--text title">Total Available Items</v-card-title>
                    <v-layout wrap align-center px-4 pb-4 mt-4>
                        <v-flex xs7>
                            <div class="display-2 font-weight-thin">{{ totalAvailable }}</div>
                        </v-flex>

                        <v-flex xs5 align-content-end >
                             <v-avatar 
                                color="success" 
                                size="100"
                            >
                                <v-icon dark size="50">fa-boxes</v-icon>
                            </v-avatar>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout align-center justify-center mt-8>
            <v-flex xs12 md3>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold success white--text title">Total Unique Items</v-card-title>
                    <v-layout wrap align-center px-4 pb-4 mt-4>
                        <v-flex xs7>
                            <div class="display-2 font-weight-thin">{{ totalItems }}</div>
                        </v-flex>

                        <v-flex xs5 align-content-end >
                            <v-avatar color="success" size="100">
                                <v-icon dark size="70">local_mall</v-icon>
                            </v-avatar>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
            <v-flex xs12 md3 offset-md1>
                <v-card elevation-12>
                    <v-card-title class="font-weight-bold success white--text title">Total Transactions</v-card-title>
                    <v-layout wrap align-center px-4 pb-4 mt-4>
                        <v-flex xs7>
                            <div class="display-2 font-weight-thin">{{ totalTransactions }}</div>
                        </v-flex>

                        <v-flex xs5 align-content-end >
                            <v-avatar color="success" size="100">
                                <v-icon dark size="60">local_grocery_store</v-icon>
                            </v-avatar>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout align-center justify-center mt-6>
            <v-flex xs3>
                <v-btn 
                    color="secondary" 
                    @click="generateDialog = true" 
                    x-large rounded depressed
                >
                    GENERATE LAB REPORT
                    <v-icon class="ml-3">fa-file-download</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>

        <v-dialog v-model="generateDialog" width="680px"> 
            <v-card>
                <v-card-title class="primary white--text"> 
                    <div class="font-weight-bold">GENERATE LAB REPORT</div>
                </v-card-title>

                <v-layout align-center justify-center mt-3 px-4>
                    <v-flex xs6 ml-3>
                        <div class="font-weight-bold text-xs-center mb-4 subheading primary--text">
                            Choose a "FROM" date
                        </div>
                        <v-date-picker v-model="fromDate" color="primary" scrollable></v-date-picker>
                    </v-flex>

                    <v-divider vertical class="ml-2"></v-divider>
                    <v-divider vertical class="ml-2 mr-3"></v-divider>

                    <v-flex xs6>
                        <div class="font-weight-bold text-xs-center mb-4 subheading secondary--text">
                            Choose a "TO" date
                        </div>
                        <v-date-picker v-model="toDate" color="secondary" scrollable></v-date-picker>
                    </v-flex>
                </v-layout>

                <v-layout align-center justify-center mt-4>
                    <v-flex xs10>
                        <em class="caption font-underline">*this will get all attendance and inventory transactions within the range of the specified dates</em>
                    </v-flex>
                </v-layout>

                <v-card-actions>
                    <v-layout wrap align-center justify-center mt-3>
                    <v-flex xs3>
                        <v-btn 
                            color="primary" 
                            outlined rounded block 
                            @click="generateDialog = false"
                        >
                            <v-icon left>clear</v-icon>
                            CANCEL
                        </v-btn>
                    </v-flex>
                    <v-flex xs4 ml-5>
                        <v-btn 
                            color="primary" 
                            depressed block rounded
                            @click="exportExcel" 
                            :disabled="btnLoading" 
                            :loading="btnLoading"
                        >
                            GENERATE EXCEL FILE
                            <v-icon right class="mb-1 mt-1 mr-1">fa-file-excel</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-divider class="mt-8"></v-divider>


        <v-layout align-center justify-center mt-6>
            <v-flex xs12 px-6>
                <div class="font-weight-bold title secondary--text">Latest Visitors</div>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-start mt-3>
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
            <v-flex xs12 px-6>
                <v-data-table
                    id="table1"
                    class="elevation-3"
                    :headers="headers"
                    :items="attendance"
                    :items-per-page="10"
                    :sort-by="['timeIN']"
                    :sort-desc="true"
                    :loading="loading"
                    :search="search"
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
    import digiClock from  "@/components/digiClock.vue";
    import http from "@/http-common";
    import XLSX from "xlsx";
    import moment from "moment";
    import swal from 'sweetalert2';
    import 'sweetalert2/src/sweetalert2.scss'

    export default {
        async mounted() {
            this.loading = true;
            let response = await http.get("/attendance/" + this.labID);  
            
            response.data.forEach((attendance) => {
                attendance.name = `${attendance.firstName} ${attendance.lastName}`;
                delete attendance.firstName;
                delete attendance.lastName;
            });
            
            this.attendance = response.data;
            await this.getTotalBorrowed();
            await this.getTotalAvailable();
            
            response = await this.getBorrowers();
            this.totalTransactions = response.length;

            response = await http.get("/inventory/getItems/" + this.labID);
            this.totalItems = response.data.length;
            
            this.loading = false;
        },
        data: () => ({
            loading: false,
            btnLoading: false,
            generateDialog: false,
            toDate: null,
            fromDate: null,
            totalAvailable: 0,
            totalBorrowed: 0,
            search: "",
            attendance: [],
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
                    text: "Course",
                    value: "course",
                }, 
                {
                    text: "Time In",
                    value: "timeIN",
                    sortable: "true"
                },
                {
                    text: "Time Out",
                    value: "timeOUT",
                    sortable: "true"
                },
                {
                    text: "Duration (hr:min:sec)",
                    value: "duration"
                },
                {
                    text: "Purpose",
                    value: "purpose"
                }
            ],
            totalTransactions: 0,
            totalItems: 0,
        }),
        
        methods: {
            convertTimestamp(time) {
                return moment(time).format("(hh:mm A) MMM DD, YYYY ");
            }, 
            async getTotalBorrowed() {
                let response;
                try {
                    response = await http.get("/inventory/getBorrowedItems/" + this.labID);
                    this.totalBorrowed = response.data.length;
                }
                catch(error) {
                    console.log(error)
                    this.totalBorrowed = 0;
                }
            }, 
            async getTotalAvailable() {
                let response;
                try {
                    response = await http.get("/inventory/getAvailableItems/" + this.labID);
                    this.totalAvailable = response.data.length;
                }
                catch(error) {
                    console.log(error);
                    this.totalAvailable = 0;
                }
            },

            async getBorrowers() {
                let response;
                try {
                     response = await http.get(`/inventoryTransaction/getAll/${this.labID}`);
                }
                catch(error) {
                    console.log(error);
                    response.data = "NoTransactions";
                }
                //await http.get(`/inventoryTransaction/getByDateRange/${this.labID},${this.fromDate},${this.toDate}`)
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
            async exportExcel() {
                this.btnLoading = true;
                if(!this.fromDate && !this.toDate) {
                    swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Please pick a FROM and TO date...",
                        customClass: {
                            title: 'font-for-modal',
                            content: 'font-for-modal'
                        }
                    });
                    this.btnLoading = false;
                    return;
                }

                if(this.toDate < this.fromDate) {
                    swal.fire({
                        icon: "warning", 
                        title: "Invalid Date Range",
                        text: '"TO" date cant be less than the "FROM" date'
                    });
                    this.btnLoading = false;
                    return;
                }

                let filename = `LabReport-${this.labID}(${this.fromDate})(${this.toDate}).xlsx`;
                
                let workBook = XLSX.utils.book_new();

                let wsData1 = [
                    ["Student Number", "Name", "Course", "Time IN", "Time OUT", "Duration (hr:min:sec)", "Purpose"],
                    [null]
                ];

                let fromDate = moment(this.fromDate).format("x");
                let toDate = moment(this.toDate).format("x");
                
                let totalAttendance = 0;
                let attendanceNum = new Array(0,0,0,0,0,0);
                this.attendance.forEach(item => {
                    let TimeIN = moment(item.timeIN).format("x");

                    if(TimeIN <= toDate && TimeIN >= fromDate) {
                        let row = [];
                        row.push(item.visitorID);
                        row.push(item.name);
                        row.push(item.course);
                        row.push(this.convertTimestamp(item.timeIN));
                        row.push(this.convertTimestamp(item.timeOUT));
                        row.push(item.duration);
                        row.push(item.purpose);

                        wsData1.push(row);
                        totalAttendance++;
                        if(item.purpose === 'Lecture') attendanceNum[0]++;
                        else if(item.purpose === 'LabActivity') attendanceNum[1]++;
                        else if(item.purpose === 'LecAndLab') attendanceNum[2]++;
                        else if(item.purpose === 'Borrow Item/s') attendanceNum[3]++;
                        else if(item.purpose === 'Return Item/s') attendanceNum[4]++;
                        else attendanceNum[5]++;
                    }
                });

                let workSheet1Data = XLSX.utils.aoa_to_sheet(wsData1);
                XLSX.utils.book_append_sheet(workBook, workSheet1Data, "Lab Attendance");

                let ws2Data = [
                    ["Transaction ID", "Student Number", "Name", "Course", "Yr", "Items(Qty Borrowed)", "Items' SN", "Borrowed Date", "Return Date", "Status"],
                    [null]
                ]; 

                const response = await this.getBorrowers();
                console.log(response);

                let totalTransactions = 0;
                let transactionNum = new Array(0,0,0);
                response.forEach(item => {
                    let borrowedDateTime = moment(item.borrowedDateTime).format("x");

                    if(borrowedDateTime <= toDate && borrowedDateTime >= fromDate) {
                        let row = [];

                        row.push(item.transactionID);
                        row.push(item.visitorID);
                        row.push(item.name);
                        row.push(item.course);
                        row.push(item.yr);

                        let itemName = "", itemSN = "";
                        item.borrowedItems.forEach(i => {
                            itemName += (`${i.name}(${i.qty}), `);
                            itemSN += (i.sn + ", ");
                        });

                        row.push(itemName);
                        row.push(itemSN);
                        row.push(this.convertTimestamp(item.borrowedDateTime));
                        row.push(this.convertTimestamp(item.returnDateTime));
                        row.push(item.status);

                        ws2Data.push(row);
                        totalTransactions++;
                        if(item.status === 'returned') transactionNum[0]++;
                        else if(item.status === 'borrowing') transactionNum[1]++;
                        else if(item.status === 'overdue') transactionNum[2]++;
                        
                    }
                });

                console.log(ws2Data);

                let workSheet2Data = XLSX.utils.aoa_to_sheet(ws2Data);
                XLSX.utils.book_append_sheet(workBook, workSheet2Data, "Inventory Transactions");
                workBook.Sheets["Inventory Transactions"]['!cols'] = { wpx: 500 };

                let genDetails = [
                    ["Document Time Created", this.convertTimestamp(Date.now())],
                    ["Report Date Range"],
                    ["From Date", this.convertTimestamp(this.fromDate)],
                    ["To Date", this.convertTimestamp(this.toDate)],
                    ["Lab Name", this.lab.labName],
                    ["Lab ID", this.labID],
                    [null], [null],
                    ["Total Attendance Entry", totalAttendance],
                    ['Number of "Lecture" Attendance', attendanceNum[0]],
                    ['Number of "Lab Activity" Attendance', attendanceNum[1]],
                    ['Number of "Lec and Lab" Attendance', attendanceNum[2]],
                    ['Number of "Borrow Item/s" Attendance', attendanceNum[3]],
                    ['Number of "Return Item/s" Attendance', attendanceNum[4]],
                    ['Number of "Others" Attendance', attendanceNum[5]],
                    [null], [null],
                    ["Total Inventory Transactions", totalTransactions],
                    ['Number of "Returned" Transactions', transactionNum[0]],
                    ['Number of "Borrowing" Transactions', transactionNum[1]],
                    ['Number of "Overdue" Transactions', transactionNum[2]],
                ];

                genDetails = XLSX.utils.aoa_to_sheet(genDetails);
                XLSX.utils.book_append_sheet(workBook, genDetails, "Lab Report Details");

                XLSX.writeFile(workBook, filename);
                this.btnLoading = false;
                this.generateDialog = false;
                this.fromDate = null;
                this.toDate = null;
            },
        },

        computed: {
            totalVisitors() {
                let num = 0;
                this.attendance.forEach(entry => {
                    if( moment(Date.now()).format('MMM DD, YYYY') === moment(entry.timeIN).format('MMM DD, YYYY')) {
                        num++;
                    }
                });
                return num;
            }, 

            labID() {
                const lab = this.$store.getters.GET_CURRENT_LAB;
                return lab.labID;
            },

            lab() {
                return this.$store.getters.GET_CURRENT_LAB;
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

    #nums {
        font-size: 50px;
        font-weight: 100;
        text-align: start;
    }

    .font-for-modal {
        font-family: sans-serif;
    }

    .swal2-container {
        font-family: sans-serif;
    }

    .swal2-content {
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .swal2-title {
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
</style>