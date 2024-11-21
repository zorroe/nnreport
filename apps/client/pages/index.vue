<script setup lang="ts">
import { extractFileNameAndFormat } from "~/utils/file";

const { bucketList, uploadFile } = useMinio();

const selectFile = async (files: any) => {
  const file = files[0];
  const { filename, format } = extractFileNameAndFormat(file.name);
  if (filename && format) {
    const uuid = crypto.randomUUID();
    uploadFile(file, `${uuid}.${format}`);
  }
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
