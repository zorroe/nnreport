<script setup lang="ts">
import { download } from "~/api/http";
import { addRecord } from "~/api/mediaFile";
import { minioUpload } from "~/api/minio";
import { extractFormat } from "~/utils/file";

const { bucketList } = useMinio();
const fileName = ref("8f5b693e-26b4-49c4-8b0e-5dc48b387245.exe");

const selectFile = async (files: File[]) => {
  const file = files[0];
  const format = extractFormat(file.name);
  const filename = `${crypto.randomUUID()}.${format}`;
  const preSignedUrl = await $fetch("/api/minio/preSignedUrl", { params: { filename } });
  await minioUpload(preSignedUrl, file);
};

const downLoadFile = async () => {
  const preSignedGetUrl = await $fetch("/api/minio/preSignedGetUrl", {
    params: { filename: fileName.value },
  });
  await download(preSignedGetUrl, fileName.value);
};

const testQuery = async () => {
  await addRecord("", "");
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
    <UInput v-model="fileName" />
    <UButton @click="downLoadFile">Button</UButton>
    <UButton @click="testQuery">发送请求</UButton>
  </div>
</template>
