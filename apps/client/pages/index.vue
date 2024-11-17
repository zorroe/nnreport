<script setup lang="ts">
const colorMode = useColorMode();

const { bucketList, uploadFile } = useMinio();

const file = ref();
const fileName = ref();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const selectFile = (files: any) => {
  const file = files[0];
  fileName.value = file.name;
  uploadFile(file, "report");
};
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
    <div>{{ bucketList }}</div>
    <UInput
      type="file"
      size="sm"
      icon="i-heroicons-folder"
      @change="selectFile"
      ref="file"
    />
  </div>
</template>
