<template>
    <div id="clock">
        <v-layout row align-center justify-start>
            <v-flex xs5 class="time">
                <div class="text-start">{{ time }}</div>
            </v-flex>
            
            <v-divider vertical light></v-divider>
            
            <v-flex xs6 ml-3 class="date">
                <div class="text-start">{{ date }}</div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>

export default {
    mounted() {
        setInterval(this.updateTime, 1000);
        this.updateTime();
    }, 

    data: () => ({
        week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        month: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'],
        date: "",
        time: "",
    }),

    methods: {
        updateTime() {
            var cd = new Date();
            var hour = this.zeroPadding(cd.getHours(), 2);
            if(hour >= "12") {
                let num = 0;
                if(hour > "12") num = 12;
                this.time = this.zeroPadding(cd.getHours() - num, 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2) + " PM";
            }
            else {
                let n = 0;
                if(hour === "00") n = 12;
                this.time = this.zeroPadding(cd.getHours() + n, 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2) + " AM";
            }
            this.date = "(" + this.week[cd.getDay()] + ") " + this.month[cd.getMonth()] + " " + this.zeroPadding(cd.getDate(), 2) + ", " + this.zeroPadding(cd.getFullYear(), 4);
        },

        zeroPadding(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }
    },
}
</script>

<style scoped>
    #clock {
        font-family: Avenir Next LT Pro;
        font-style: italic;
        font-weight: 500;
        color: #000000;
        width: 555px;
    }

    .time {
        font-size: 40px;
        line-height: 40px;
    }

    .date {
        font-size: 30px;
    }
</style>