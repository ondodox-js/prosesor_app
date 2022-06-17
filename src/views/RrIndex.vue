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
            <div class="text-center mb-8">
                <h6 class="uppercase font-bold text-3xl text-white">
                    teknik penjadwalan round robin
                </h6>
            </div>
            <div class="flex-1 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div class="flex flex-col">
                    <form
                        action=""
                        class="flex-1 mb-4"
                        id="form"
                        @submit.prevent="handleSubmit"
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
                        <div class="flex justify-between mb-4">
                            <label
                                for="nilai-quantum"
                                class="font-bold text-white"
                                >Nilai quantum</label
                            >
                            <input
                                type="text"
                                class="border-2 rounded px-2"
                                id="nilai-quantum"
                                name="nilaiQuantum"
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
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                    <div class="flex gap-4">
                        <div
                            class="flex-1 p-4 text-center bg-slate-300 rounded"
                        >
                            <p>Hasil nilai AWT</p>
                            <p v-if="getAwt !== null" class="font-bold">
                                {{ awt }} milidetik.
                            </p>
                            <p v-else>not found!</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="border-2 rounded h-full text-center">
                        <table
                            class="table-fixed w-full text-center text-white"
                            v-if="dataProses.length !== 0"
                        >
                            <thead class="border-b">
                                <th>Nama proses</th>
                                <th>Burst time</th>
                                <th>Quantum</th>
                            </thead>
                            <tbody>
                                <tr
                                    class="border-b"
                                    v-for="(proses, index) of dataProses"
                                    :key="index"
                                >
                                    <td>{{ proses.namaProses }}</td>
                                    <td>{{ proses.burstTime }}</td>
                                    <td>{{ proses.nilaiQuantum }}</td>
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
            processObj: [],
            process: [],
            bt: [],
            q: null,
            awt: null,
        };
    },
    methods: {
        handleSubmit() {
            const form = document.querySelector('#form');
            const { namaProses, burstTime, nilaiQuantum } = form;

            if (this.q === null) {
                nilaiQuantum.readOnly = true;
            }

            this.setData(namaProses, burstTime, nilaiQuantum);

            if (this.dataProses.length >= 5) {
                this.updateInput(true);
                this.findavgTime(
                    this.process,
                    this.process.length,
                    this.bt,
                    this.q
                );
            } else {
                this.clearForm();
            }
        },
        findWaitingTime(processes, n, bt, wt, quantum) {
            let rem_bt = new Array(n).fill(0);
            for (let i = 0; i < n; i++) rem_bt[i] = bt[i];
            let t = 0;
            // eslint-disable-next-line no-constant-condition
            while (true) {
                let done = true;
                for (let i = 0; i < n; i++) {
                    if (rem_bt[i] > 0) {
                        done = false;

                        if (rem_bt[i] > quantum) {
                            t += quantum;
                            rem_bt[i] -= quantum;
                        } else {
                            t = t + rem_bt[i];
                            wt[i] = t - bt[i];
                            rem_bt[i] = 0;
                        }
                    }
                }
                if (done == true) break;
            }
        },
        findavgTime(processes, n, bt, quantum) {
            let wt = new Array(n).fill(0);
            let total_wt = 0;

            this.findWaitingTime(processes, n, bt, wt, quantum);

            for (let i = 0; i < n; i++) {
                total_wt = total_wt + wt[i];
            }

            this.awt = total_wt / n;
        },
        setData(np, bt, nq) {
            let [namaProses, burstTime, nilaiQuantum] = [
                np.value,
                parseInt(bt.value),
                parseInt(nq.value),
            ];

            if (this.q === null) {
                this.q = nilaiQuantum;
            } else {
                nilaiQuantum = this.q;
            }

            this.processObj.push({
                namaProses,
                burstTime,
                nilaiQuantum,
            });

            this.process.push(namaProses);
            this.bt.push(burstTime);
        },
        clearForm() {
            const form = document.querySelector('#form');
            form.reset();
            const { namaProses } = form;
            namaProses.focus();
        },
        resetProses() {
            this.processObj = [];
            this.process = [];
            this.bt = [];
            this.awt = null;
            this.q = null;
            this.updateInput(false);
            this.clearForm();
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
            return this.processObj;
        },
        getAwt() {
            return this.awt;
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
