<script setup lang="ts">
import { minioUpload } from "~/api/minio";
import { extractFormat } from "~/utils/file";

const { bucketList } = useMinio();

const selectFile = async (files: File[]) => {
  const file = files[0];
  const format = extractFormat(file.name);
  const filename = `${crypto.randomUUID()}.${format}`;
  const preSignUrl = await $fetch("/api/minio/preSignUrl", { params: { filename } });
  minioUpload(preSignUrl, file);
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
