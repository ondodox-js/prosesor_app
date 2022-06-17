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
                    teknik penjadwalan fifo
                </h6>
                <p class="text-2xl">( First In First Out )</p>
            </div>
            <div class="flex-1 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div class="flex flex-col">
                    <form
                        @submit.prevent="handleSubmit()"
                        class="flex-1 mb-4"
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
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-4 text-center bg-slate-300 rounded">
                            <p>Hasil nilai AWT</p>
                            <p v-if="getAwt !== null" class="font-bold">
                                {{ awtValue }} milidetik.
                            </p>
                            <p v-else>not found!</p>
                        </div>
                        <div class="p-4 text-center bg-slate-300 rounded">
                            <p>Hasil nilai TAT</p>
                            <p v-if="getTat !== null" class="font-bold">
                                {{ tatValue }} milidetik.
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
                                <th>Burst time</th>
                            </thead>
                            <tbody>
                                <tr
                                    class="border-b"
                                    v-for="(item, index) of dataProses"
                                    :key="index"
                                >
                                    <td>{{ item.namaProses }}</td>
                                    <td>{{ item.burstTime }}</td>
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
            tatValue: null,
        };
    },
    methods: {
        async handleSubmit() {
            const form = document.querySelector('#form');
            const { namaProses, burstTime } = form;

            this.proses.push({
                namaProses: namaProses.value,
                burstTime: parseInt(burstTime.value),
            });

            if (this.dataProses.length >= 5) {
                await this.maxHandle();
            }

            this.clearForm();
        },
        resetProses() {
            this.proses = [];
            this.updateInput(false);
            this.clearForm();
        },
        clearForm() {
            const form = document.querySelector('#form');
            form.reset();
            const { namaProses } = form;
            namaProses.focus();
            this.awtValue = null;
            this.tatValue = null;
        },
        maxHandle() {
            this.updateInput(true);
            setTimeout(() => {
                this.awtValueProcess();
                this.tatValueProcess();
            }, 1000);
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
        awtValueProcess() {
            let num = 0;
            let prosesNum = 0;
            for (let i = 0; i < this.proses.length - 1; i++) {
                num += this.proses[i].burstTime;
                prosesNum += num;
            }

            this.awtValue = prosesNum / this.proses.length;
        },
        tatValueProcess() {
            let num = this.proses[0].burstTime;
            let prosesNum = this.proses[0].burstTime;
            for (let i = 1; i < this.proses.length; i++) {
                num += this.proses[i].burstTime;
                prosesNum += num;
            }

            this.tatValue = prosesNum / this.proses.length;
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
        getTat() {
            return this.tatValue;
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
