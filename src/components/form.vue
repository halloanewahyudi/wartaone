<template>
    <div>
       
        <form @submit.prevent="formSubmit" class="flex flex-col gap-6 w-full">
            <label for="nama"> Nama
                <input type="text" class="input mt-2" v-model="data.nama" placeholder="Tulis Nama" required>
            </label>

            <label for="tujuan"> Daerah Tujuan
                <input type="text" class="input mt-2" v-model="data.tujuan" placeholder="Mudik Kemana? " required>
            </label>

            <div class="flex items-center gap-6 w-full">
                <label for="berangkat">Berangkat
                    <Datepicker inputFormat="dd-MM-yyyy" v-model="data.berangkat" :clearable="true"
                        class="input block mt-2" placeholder="Berangkat kapan?" />
                </label>
                <label for="pulang">
                    Pulang
                    <Datepicker inputFormat="dd-MM-yyyy" v-model="data.pulang" :clearable="true"
                        class="input block mt-2" placeholder="Pulang kapan?" />
                </label>
            </div>

            <div>
                <p>Tinggal Blok Mana?</p>
                <div class="flex items-center rounded-lg overflow-hidden w-full border border-light/30 bg-primary-light mt-2">
                    <div class="w-full border-r border-light/30 cursor-pointer">
                        <input id="blokA" type="radio" v-model="data.alamat.blok" value="A" class="hidden">
                        <label @click="bukaBlok = true" for="blokA"
                            class="font-medium block p-2.5 text-center"
                            :class="data.alamat.blok == 'A' ? 'bg-gradient-to-t from-tertiary to-tertiary/80 text-light' : ''">
                            Blok A
                        </label>
                    </div>
                    <div class="w-full cursor-pointer">
                        <input id="blokB" type="radio" v-model="data.alamat.blok" value="B" class="hidden">
                        <label @click="bukaBlok = true" for="blokB"
                            class="font-medium block p-2.5 text-center"
                            :class="data.alamat.blok == 'B' ? 'bg-gradient-to-t from-tertiary to-tertiary/80 text-light' : ''">
                            Blok B
                        </label>
                    </div>
                </div>
            </div>

            <Transition>
                <div v-if="bukaBlok" class="flex flex-wrap gap-3 items-center">
                    <input disabled type="text" class="input mt-2"
                        :value="data.alamat.blok ? 'Blok ' + data.alamat.blok : ''">
                    <input type="text" class="input" v-model="data.alamat.no_blok"
                        :placeholder="`${data.alamat.blok} berapa?`">
                    <input type="text" class="input" v-model="data.alamat.no_rumah" placeholder="No Rumah">
                </div>
            </Transition>

            <div>
                <label>
                    <input type="checkbox" v-model="data.ada_yang_tinggal">
                    Adakah Keluarga yang tinggal di rumah?
                </label>
            </div>

            <div>
                <label for="keterangan">Keterangan</label>
                <textarea name="keterangan" cols="30" rows="4" class="input mt-2"
                    v-model="data.keterangan" placeholder="Jika ada yang ingin disampaikan">
                </textarea>
            </div>

            <button class="py-2.5 px-5 rounded-lg bg-secondary" :disabled="loading">
                <span v-if="loading">Mengirim...</span>
                <span v-else>Kirim 🚀</span>
            </button>

        </form>

        <pre>{{ data }}</pre>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Datepicker from 'vue3-datepicker';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const bukaBlok = ref(false);
const loading = ref(false);
const data = ref({
    nama: '',
    alamat: {
        blok: '',
        no_blok: '',
        no_rumah: '',
    },
    tujuan: '',
    berangkat: '',
    pulang: '',
    ada_yang_tinggal: false,
    keterangan: ''
});



const formSubmit = async () => {
    try {
        loading.value = true; // Menandai bahwa proses sedang berjalan
        const docRef = await addDoc(collection(db, "mudik"), data.value);
        console.log("Document written with ID: ", docRef.id);

        // Reset form setelah submit berhasil
        data.value = {
            nama: '',
            alamat: { blok: '', no_blok: '', no_rumah: '' },
            tujuan: '',
            berangkat: '',
            pulang: '',
            ada_yang_tinggal: false,
            keterangan: ''
        };

       router.push({ name: 'terkirim', params: { nama: data.value.nama } })
       // alert("Data berhasil dikirim!");
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Terjadi kesalahan, coba lagi.");
    } finally {
        loading.value = false; // Menghentikan loading setelah proses selesai
    }
};
</script>
