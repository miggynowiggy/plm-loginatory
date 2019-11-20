<template>
    <v-toolbar
        color="primary"
        dark
        app
        :clipped="$vuetify.breakpoint.lgAndUp"
        fixed
    >
        <v-toolbar-title style="pointer-events: none;">
            <v-toolbar-side-icon
                @click.stop="drawer = !drawer"
                style="pointer-events: initial !important;"
            ></v-toolbar-side-icon>
            
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
            <v-btn color="primary" depressed @click="logout">
                Log Out
                <v-icon right>vpn_key</v-icon> 
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        name: "headerToolbar",
        data: () => ({
            drawer: null,
        }),

        methods: {
            backtoStudView() {
                console.log("BACK TO STUD VIEW has been pressed");
            },

            logout() {
                console.log("logout has been pressed");
            },
        },

        computed: {
            currentLab() {
                return this.$store.getters.GET_CURRENT_LAB;
            },
        },

    }
</script>

<style scoped>

</style>