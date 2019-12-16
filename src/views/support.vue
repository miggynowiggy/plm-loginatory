<template>
    <div>
        <v-overlay value="true" z-index="0">
            <v-img 
                :src="require('@/assets/plm2.jpg')"
                alt="plmBG"
                gradient="to top right, rgba(200,36,58,.33), rgba(217,27,44,.7)"
                id="pic"
                height="100vh"
                width="100vw"
            ></v-img>
        </v-overlay>

        <v-layout align-center justify-center>
            <v-card 
                id="upper"
                hover raised shaped
            >
                <div id="deBlur">
                    <v-layout wrap align-center justify-center mt-12 >
                        <v-flex xs1 offset-xs1>
                            <v-avatar
                                size="120"
                            >
                                <v-img
                                    :src="require('@/assets/plmlogo2.png')"
                                    contain
                                ></v-img>
                            </v-avatar>
                        </v-flex>
                        <v-flex xs9>
                            <div id="header" class="text-center">LOGIN-ATORY</div>
                        </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-center mt-3>
                        <v-flex xs10>
                            <div class="title font-italic text-center">
                                A Simple Attendance and Inventory Management Web Application for the Laboratories of Pamantasan ng Lungsod ng Maynila
                            </div>
                        </v-flex>
                    </v-layout>

                    <v-divider class="my-6"></v-divider>

                    <v-layout wrap align-center justify-center mt-6 mb-3>
                        <v-flex xs3>
                            <v-avatar size="280" class="elevation-6">
                                <v-img
                                    :src="require('@/assets/avatar.jpg')"
                                ></v-img>
                            </v-avatar>
                        </v-flex>
                        <v-flex xs12 mt-5>
                            <div class="title font-italic text-center">DEVELOPED BY:</div>
                            <div class="font-weight-bold display-1 text-center secondary--text">Juan Miguel A. Mendoza</div>
                            <div class="subtitle-2 font-italic text-center">BS Computer Science, Pamantasan ng Lungsod ng Maynila</div>
                            <div class="subtitle-2 font-italic text-center">BSCS 2 - 1 <br> &copy;2019</div>
                        </v-flex>
                        <v-flex xs1 mt-6 offset-xs1>
                            <a
                                href="https://www.facebook.com/migginimiggi"
                                target="blank"
                            >
                                <v-avatar size="80">
                                    <v-img :src="require('@/assets/facebook.png')"></v-img>
                                </v-avatar>
                            </a>
                        </v-flex>
                        <v-divider inset vertical class="mx-3"></v-divider>
                        <v-flex xs3 mt-3>
                            <v-icon left x-large color="secondary">contact_mail</v-icon>
                            <span class="font-italic">mendozajuanmiguel11@gmail.com</span>
                        </v-flex>
                        <v-divider inset vertical class="mx-3"></v-divider>
                        <v-flex xs3 mt-3>
                            <v-btn outlined block large @click="$router.push('/dashboard')">BACK TO DASHBOARD</v-btn>
                        </v-flex>
                    </v-layout>
                </div>
            </v-card>
        </v-layout>
        
    </div>
</template>

<script>
export default {

}
</script>

<style>
    #pic {
        filter: blur(1.4px);
    }

    #upper  {
        top: 20px;
        z-index: 2;
        opacity: 0.8;
    }

    #deBlur  {
        z-index: 5;
        filter: blur(0);
        opacity: 1;
    }

    #header {
        font-family: Avenir LT Std;
        font-style: normal;
        font-weight: 750;
        font-size: 90px;
        line-height: 40px;
        /* or 44% */
        letter-spacing: -0.05px;

        color: rgb(197, 48, 55);
    }
</style>