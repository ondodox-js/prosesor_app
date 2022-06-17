<template>
    <div
        class="py-12 px-8 h-screen bg-contain"
        :style="`background-image: url(${backgroud})`"
    >
        <div class="relative h-full flex flex-col">
            <router-link
                :to="{ name: 'Home' }"
                class="absolute left-0 -top-8 font-bold text-gray-400 hover:text-gray-50"
            >
                Kembali
            </router-link>
            <div class="text-center mb-8 text-white">
                <h6 class="uppercase font-bold text-3xl">
                    teknik penjadwalan sjf
                </h6>
                <p class="text-2xl">( Shortest Job First ) Non Preemptive</p>
            </div>
            <div class="flex-1 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div class="flex flex-col">
                    <form
                        action=""
                        class="flex-1 mb-4"
                        @submit.prevent="handleSubmit"
                        id="form"
                    >
                        <div class="flex justify-between mb-4">
                            <label
                                for="nama-proses"
                                class="font-bold text-white"
                                >Nama proses</label
                            >
                            <input
                                type="text"
                                class="border-2 rounded px-2"
                                id="nama-proses"
                                name="namaProses"
                            />
                        </div>
                        <div class="flex justify-between mb-4">
                            <label for="waktu-tiba" class="font-bold text-white"
                                >Waktu tiba</label
                            >
                            <input
                                type="text"
                                class="border-2 rounded px-2"
                                id="waktu-tiba"
                                name="waktuTiba"
                            />
                        </div>
                        <div class="flex justify-between mb-4">
                            <label for="burst-time" class="font-bold text-white"
                                >Burst time</label
                            >
                            <input
                                type="text"
                                class="border-2 rounded px-2"
                                id="burst-time"
                                name="burstTime"
                            />
                        </div>
                        <div class="flex justify-end mt-8 gap-4">
                            <button
                                class="px-4 py-1 bg-slate-300 hover:bg-slate-900 hover:text-white rounded"
                                type="button"
                                id="reset-btn"
                                @click="resetProses()"
                            >
                                Reset seluruh proses
                            </button>
                            <button
                                class="px-4 py-1 bg-slate-300 hover:bg-slate-900 hover:text-white rounded"
                                type="submit"
                            >
                                {{
                                    dataProses.length < 4
                                        ? 'Simpan proses'
                                        : 'Tentukan nilai'
                                }}
                            </button>
                        </div>
                    </form>
                    <div class="flex gap-4">
                        <div
                            class="flex-1 p-4 text-center bg-slate-300 rounded"
                        >
                            <p>Hasil nilai AWT</p>
                            <p v-if="getAwt !== null" class="font-bold">
                                {{ awtValue }} milidetik.
                            </p>
                            <p v-else>not found!</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="border-2 rounded h-full text-center">
                        <table
                            class="table-fixed w-full text-white"
                            v-if="dataProses.length !== 0"
                        >
                            <thead class="border-b">
                                <th>Nama proses</th>
                                <th>Arrival time</th>
                                <th>Burst time</th>
                            </thead>
                            <tbody>
                                <tr
                                    class="border-b"
                                    v-for="(proses, index) of dataProses"
                                    :key="index"
                                >
                                    <td>{{ proses.namaProses }}</td>
                                    <td>{{ proses.waktuTiba }}</td>
                                    <td>{{ proses.burstTime }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h3 v-else class="text-lg font-bold text-white mt-12">
                            Proses belum ada!
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            proses: [],
            awtValue: null,
        };
    },
    methods: {
        handleSubmit() {
            const form = document.querySelector('#form');
            const { namaProses, burstTime, waktuTiba } = form;

            this.proses.push({
                namaProses: namaProses.value,
                burstTime: parseInt(burstTime.value),
                waktuTiba: parseInt(waktuTiba.value),
            });

            if (this.dataProses.length >= 5) {
                this.maxHandle();
                return;
            }
            this.clearForm();
        },
        clearForm() {
            const form = document.querySelector('#form');
            form.reset();
            const { namaProses } = form;
            namaProses.focus();
        },
        resetProses() {
            this.updateInput(false);
            this.clearForm();
            this.proses = [];
            this.awtValue = null;
        },
        maxHandle() {
            this.updateInput(true);

            let dataProses = [...this.proses];
            dataProses.sort((i, j) => i.waktuTiba - j.waktuTiba);

            let num = dataProses[0].burstTime;
            dataProses.splice(0, 1);

            dataProses.sort((i, j) => i.burstTime - j.burstTime);

            let awtValue = 0;
            for (let proses of dataProses) {
                proses.wt = num - proses.waktuTiba;
                num += proses.burstTime;

                awtValue += proses.wt;
            }

            this.awtValue = awtValue / this.proses.length;
        },
        updateInput(reset) {
            const form = document.querySelector('#form');
            const { elements } = form;

            for (let el of elements) {
                if (el.id !== 'reset-btn') {
                    el.tagName === 'INPUT'
                        ? (el.readOnly = reset)
                        : (el.disabled = reset);
                }
            }
        },
    },
    computed: {
        backgroud() {
            return require('../assets/image/bg.jpg');
        },
        dataProses() {
            return this.proses;
        },
        getAwt() {
            return this.awtValue;
        },
    },
};
</script>
<style scoped>
th {
    padding: 1rem;
}
td {
    padding: 0.5rem;
}
</style>
