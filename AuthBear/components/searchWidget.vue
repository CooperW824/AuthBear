
<script setup lang="ts">
import type TOTPKey from '~/types/totp';

const totpKeys = useTOTPKeys();

const searchQuery = ref("");

function searchMatch(accountName : String) {
    if (searchQuery.value) {
        return accountName.toLowerCase().includes(searchQuery.value.toLowerCase());
    }
    return false;
}

</script>

<template>
    <div class="flex flex-col justify-center items-center m-5">
        <div class="flex justify-center items-center">
        <input type="text" v-model="searchQuery" placeholder="Search..." class="input input-bordered w-full max-w-xs text-centered my-2">
        </div>

        <div class="flex flex-col w-96 items-center justify-center">
        <div v-for="(totpKey, index) in totpKeys" class="w-96">
            <TotpCard v-show="searchMatch(totpKey.accountName)" :key="index" :totpKey="totpKey"></TotpCard>
        </div>
    </div>
</div>
    
    


</template>