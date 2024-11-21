<script setup lang="ts">
import { extractFileNameAndFormat } from "~/utils/file";

const { bucketList } = useMinio();

const selectFile = async (files: File[]) => {
  const file = files[0];
  const { filename, format } = extractFileNameAndFormat(file.name);
  const preSignUrl = await $fetch("/api/minio/preSignUrl");
};
</script>

<template>
  <div>
    <div>{{ bucketList }}</div>
    <UInput
      type="file"
      size="sm"
      icon="i-heroicons-folder"
      @change="selectFile"
    />
  </div>
</template>
