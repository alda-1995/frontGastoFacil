<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    type: {
        type: String,
        default: "button",
        validator: (value) => ["link", "button", "submit"].includes(value),
    },
    href: {
        type: String,
        default: "#",
    },
    variant: {
        type: String,
        default: "flat",
    },
    size: {
        type: String,
        default: "large"
    },
    icon: {
        type: String,
        default: "",
    },
    color: {
        type: String,
        default: "secondary",
    },
    loading: {
        type: Boolean,
        default: false,
    },
    isBlock: {
        type: Boolean,
        default: false,
    },
    onClick: {
        type: Function,
        default: () => { },
    },
})

const handleClick = () => {
    if (typeof props.onClick === 'function') {
        props.onClick();
    }
};
</script>
<template>
    <v-btn :to="type === 'link' ? href : null" :loading="loading" class="v-btn"
    @click="type === 'button' ? handleClick() : null" :block="isBlock"
    :type="type" :size="size" :prepend-icon="icon"
    :color="color" :variant="variant">
        <slot></slot>
    </v-btn>
</template>