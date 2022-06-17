<template>
    <div
        class="py-12 px-8 h-screen bg-contain"
        :style="`background-image: url(${backgroud})`"
    >
        <div class="relative h-full flex flex-col">
            <div class="text-center text-white">
                <h6 class="uppercase font-bold text-3xl underline">
                    penjadwalan prosesor
                </h6>
            </div>
            <div class="flex items-center justify-center text-center flex-1">
                <p class="p-4 rounded bg-slate-900 text-white max-w-lg">
                    Penjadwalan proses merupakan komponen penting pada sistem
                    operasi, yang bertujuan untuk memaksimalkan penggunaan CPU
                    untuk melakukan pergantian proses yang dieksekusi dan
                    digunakan saat dua atau lebih proses mengirimkan sinyal yang
                    menandakan kedatangan proses tersebut secara simultan.
                </p>
            </div>
            <div class="flex justify-between">
                <router-link
                    :to="{ name: 'Fifo' }"
                    class="py-2 px-4 bg-gray-300 hover:bg-gray-900 hover:text-white font-bold rounded text-center"
                >
                    FIFO (First In First Out)
                </router-link>
                <router-link
                    :to="{ name: 'Sjf' }"
                    class="py-2 px-4 bg-gray-300 hover:bg-gray-900 hover:text-white font-bold rounded text-center"
                >
                    SJF (Shortest Job First) Non Premptive
                </router-link>
                <router-link
                    :to="{ name: 'Rr' }"
                    class="py-2 px-4 bg-gray-300 hover:bg-gray-900 hover:text-white font-bold rounded text-center"
                >
                    RR (Round Robin)
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        backgroud() {
            return require('../assets/image/bg.jpg');
        },
    },
};
</script>
