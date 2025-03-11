<template>
  <div class=" gap-10 min-h-screen py-20">
     <div class="max-w-screen-md mx-auto px-6">
        <div class="flex flex-col gap-4 mb-10">
            <h3 class="text-3xl font-medium">
            Assalmualaikum Warohmatullahi Wabarakatuh
        </h3>
        <p class="">
            Bagi para warga yang ingin mudik atau meninggalkan rumah dalam waktu yang cukup lama, kami selaku pengurus RT akan mendata warga yang akan mudik untuk keperluan keamanan dan ketertiban lingkungan.
        </p>
        <p> Dan kami berharap atas kerjasamanya untuk mengisi form di bawah ini <span class="text-2xl"> 🙏</span></p>
        </div>
       
        <formMudik />
     </div>
  </div>
</template>

<script lang="ts" setup>
 import formMudik from '../components/form.vue';

</script>

<style>

</style>