<template>
    <div id="clock">
        <v-layout row align-center justify-start>
            <v-flex class="time">
                <div class="text-start">{{ time }}</div>
            </v-flex>
            
            <v-flex class="date">
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
            this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
            //this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ', ' + this.week[cd.getDay()];
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
        font-weight: normal;
        color: #000000;
    }

    .time {
        font-size: 42px;
        line-height: 40px;
    }

    .date {
        font-size: 26px;
    }
</style>