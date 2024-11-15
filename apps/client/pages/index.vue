<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div>
    <UAlert
    icon="i-heroicons-command-line"
    color="primary"
    variant="solid"
    title="Heads up!"
    description="You can add components to your app using the cli."
  />
    <UIcon name="i-mdi:account" class="w-5 h-5" />
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>
</template>
