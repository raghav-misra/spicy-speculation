<template>
    <img :src="`/spices/${spiceNameToFile[name]}`"/>
</template>

<script setup lang="ts">
const spiceNameToFile ={
    "Pepper": "pepper.png",
    "Saffron": "saffron.png",
    "Cardamom": "cardamom.png",
    "Cayenne": "cayenne.png",
    "Ginger": "ginger.png",
    "Wolf's Spice": "wolf.png",
    "Cinnamon": "cinnamon.png",
    "Dragon Petals": "dragon_petals.png",
    "Queen's Herb": "queen.png",
    "Kibuseed": "kibuseed.png",
    "Vanilla": "vanilla.png"

} as Record<string,string>

defineProps<{
    name:string
}>()

</script>