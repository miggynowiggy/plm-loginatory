<template>
    <div>
        <v-navigation-drawer
            fixed
            :clipped="$vuetify.breakpoint.mdAndUp"
            app
            v-model="drawer"
        >
            <v-list dense nav>

                <v-list-item
                    v-for="item in sections"
                    :key="item.name"
                    @click="$router.push(item.path)"
                    link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>help</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            Support
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            color="primary"
            dark
            app
            fixed
            :clipped-left="$vuetify.breakpoint.mdAndUp"
        >
            <v-app-bar-nav-icon 
                v-show="$vuetify.breakpoint.mdAndDown"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon>

            <v-toolbar-title style="pointer-events: none;">
                <span class="hidden-sm-and-down title">
                    {{ currentLab.labName }} Laboratory
                </span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            
            <v-toolbar-items>
                <v-btn color="primary" depressed @click="backToStudView">
                    Back to Student View
                    <v-icon right>swap_horizontal_circle</v-icon> 
                </v-btn>
            </v-toolbar-items>

            <v-toolbar-items>
                <v-divider inset vertical class="white mx-4"></v-divider>
            </v-toolbar-items>
            
            <v-toolbar-items>
                <v-btn color="primary" depressed @click="confirmingLogout">
                    Log Out
                    <v-icon right>vpn_key</v-icon> 
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        
        <v-dialog 
            v-model="confirmDialog"
            max-width="300px"
            persistent
        >
            <v-card>
                <v-card-title class="primary white--text title font-weight-bold">Confirm Log Out</v-card-title>
                <v-card-text class="body-1 mt-3">Are you sure you want to logout? This will sign-out the laboratory system in this computer</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed color="primary" @click="logout">YES</v-btn>
                    <v-btn outlined color="primary" @click="confirmLogout = false; confirmDialog = false">NO</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    
</template>

<script>
    export default {
        
        data: () => ({
            dialog: false,
            confirmDialog: false,
            confirmLogout: false,
            drawer: null,
            sections: [
                {
                    name: "Dashboard",
                    icon: "dashboard",
                    path: "/dashboard"
                },
                {
                    name: "Visitors",
                    icon: "people",
                    path: "/visitorsView"
                }, 
                {  
                    name: "Inventory",
                    icon: "shopping_basket",
                    path: "/inventory"
                }
            ],
        }),

        methods: {
            backToStudView() {
                console.log("BACK TO STUD VIEW has been pressed");
                this.$router.push('/read');
            },

            confirmingLogout() {
                this.confirmDialog = true;
            }, 

            logout() {  
                this.$store.commit("LOGOUT");
                this.$router.push('/');  
            },
        },

        computed: {
            currentLab() {
                return this.$store.getters.GET_CURRENT_LAB;
            },
        }
    }
</script>

<style scoped>

</style>