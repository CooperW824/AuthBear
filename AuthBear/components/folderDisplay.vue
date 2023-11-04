<script setup>
import draggable from 'vuedraggable'

const props = defineProps({
  folders : Array,
})

function onMoved(event) {
  console.log("moved", event);
}

onMounted(() => {
    console.log("here");
    console.log(props.folders[0][0]);
})

</script>

<template>
    <div>
      <div v-for="(folder, index) in folders" :key="index">
        <h3>Folder {{ index + 1 }}</h3>

        <draggable
            :list="folder" 
            group="index" 
            @end="onMoved" 
            item-key="accountName">
            <template #item="{element}">
                <TotpCard :accountName="element.accountName" :code="element.code"></TotpCard>
            </template>
        </draggable>
      </div>
    </div>
</template>
  
