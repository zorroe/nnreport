<script setup lang="ts">
const colorMode = useColorMode();

const upload = () => {
  $fetch("/api/upload2minio").then((res) => {
    console.log(res);
  });
};

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <div>
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
    />
    <UAlert
      icon="i-heroicons-command-line"
      color="primary"
      variant="solid"
      title="Heads up!"
      description="You can add components to your app using the cli."
    />

    <UAlert
      icon="i-heroicons-command-line"
      color="primary"
      variant="solid"
      title="Heads up!"
      description="You can add components to your app using the cli."
    />
    <UAlert
      icon="i-heroicons-command-line"
      color="primary"
      variant="solid"
      title="Heads up!"
      description="You can add components to your app using the cli."
    />
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="upload"
    />
  </div>
</template>
