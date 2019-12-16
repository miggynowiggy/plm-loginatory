<!--printReciept.vue-->
<template>
    <div>
        <v-layout align-center justify-center mt-12>
            <v-flex xs4>
                <v-card id="resibo" elevation="6" class="pa-2" outlined width="500px">
                    <v-layout wrap align-center justify-center pa-4>
                        <v-flex xs5>
                            <div><b>--BORROWER's RECEIPT--</b></div>
                        </v-flex>
                    </v-layout>
                    <v-divider class="mt-2"></v-divider>
                    <v-divider class="mt-2 mb-2"></v-divider>

                    <v-layout wrap align-center justify-start px-4>
                        <v-flex xs12>
                            <div>Borrower's Name: <b>{{ borrowedItems[0].studName }}</b></div>
                        </v-flex>
                        <v-flex xs12 mt-2>
                            <div>Other Borrowers': 
                                <b v-if="borrowedItems[0].otherBorrowers !== 'null'">{{ borrowedItems[0].otherBorrowers}}</b>
                                <b v-else>---------</b>
                            </div>
                        </v-flex>
                        <v-flex xs12 mt-2>
                            <div>Transaction ID: <b>{{ transactionID }}</b></div>
                        </v-flex>
                        <v-flex xs12 mt-2>
                            <div>Date Borrowed: <b>{{ convertTimestamp(borrowedItems[0].borrowedDateTime) }}</b></div>
                        </v-flex>
                    </v-layout>

                    <v-divider class="mt-3"></v-divider>
                    <v-divider class="mt-2"></v-divider>
                    
                    <v-layout wrap align-center justify-center px-3 mt-4 mb-4>
                        <v-flex xs4 mb-3>
                            <div><b>ITEMS TO BORROW</b></div>
                        </v-flex>
                        <v-flex xs12>
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <th>Item Name</th>
                                        <th>Qty to be Borrowed</th>
                                        <th>Serial Numbers</th>
                                        <th>Return Date</th>
                                    </thead>

                                    <tbody>
                                        <tr v-for="item in borrowedItems" :key="item.id">
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.borrowedQty }}</td>
                                            <td>{{ item.sn }}</td>
                                            <td>{{ convertTimestamp(item.returnDateTime) }}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-flex>
                    </v-layout>

                    <v-divider class="mt-3"></v-divider>
                    <v-divider class="mt-2"></v-divider>

                    <v-layout wrap align-center justify-start my-4 px-4>
                        <v-flex xs12>
                            <div>Assigned Prof: <b>{{ borrowedItems[0].prof }}</b></div>
                        </v-flex>
                        <v-flex xs12 mt-2>
                            <div>Reason: <b>{{ borrowedItems[0].reason }}</b></div>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>

            <v-flex xs7 d-flex>
                <v-layout wrap align-center justify-end>
                    <v-flex xs11>
                        <div class="header primary white--text py-3">Borrowing Items Successful!</div>
                    </v-flex>
                    <v-flex md10 mt-6>
                        <div class="header">Please wait for your receipt to be printed and present this receipt to the lab personnel...</div>
                    </v-flex>
                    <v-flex xs5 mt-6>
                        <v-icon size="200" round color="green lighten-1" class="mt-4">fa-arrow-circle-right</v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: "printReciept", 
    created() {
        this.borrowedItems = this.$route.params.items;
        console.log(this.borrowedItems);
        this.borrowedItems.forEach(item => {
            item.sn = item.sn.replace("/,/gi", ", ");
        });
        this.transactionID = this.borrowedItems[0].transactionID;

        setTimeout(() => {
            this.printReceipt();
        }, 1000);

        setTimeout(() => {
            this.$router.push("/read");
        }, 5000);
    },
    data() {
        return {
            transactionID: null,
            borrowedItems: [
                // {
                //     borrowedDateTime: "2019-12-05 16:47:13",
                //     borrowedQty: 1,
                //     course: "BS Socio",
                //     id: 19,
                //     labID: "gl406bi",
                //     name: "Balance Beam",
                //     returnDateTime: "2019-12-05 17:00:00",
                //     sn: "BLNCBM2018BI-4,",
                //     status: "borrowing",
                //     studName: "Nisperos, Jannel Ariana",
                //     studNum: "201800600",
                //     transactionID: "E8Y9-3CH",
                //     yr: 2
                // },
            ],      
        }
    },
    methods: {
        convertTimestamp(time) {
            return moment(time).format("(hh:mm A) MMM DD, YYYY");
        }, 

        printReceipt() {
            // Get HTML to print from element
            const prtHtml = document.getElementById('resibo').innerHTML;

            // Get all stylesheets HTML
            let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                stylesHtml += node.outerHTML;
            }

            // Open the print window
            const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

            WinPrint.document.write(`<!DOCTYPE html>
            <html>
            <head>
                ${stylesHtml}
            </head>
            <body>
                ${prtHtml}
            </body>
            </html>`);

            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
        }
    },
}
</script>

<style scoped>
    .header {
        font-family: Avenir LT Std;
        font-style: normal;
        font-weight: 750;
        font-size: 60px;
        line-height: 70px;
        text-align: right;

        color: #2E94B9;
    }

    #resibo {
        animation: 2s slideUp ease-in-out infinite alternate;
        width: 1500px;
    }

    #resibo2 {
        animation: 2s slideDown ease-in-out infinite alternate;
    }

    @keyframes slideUp {
        0% {
            margin-top: 0px;
        }

        100% {
            margin-top: 30px;
        }
    }

    @keyframes slideDown {
        0% {
            margin-top: 30px;
        }

        100% {
            margin-top: 0px;
        }
    }
</style>