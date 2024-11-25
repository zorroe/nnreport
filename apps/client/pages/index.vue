<script setup lang="ts">
import { download } from "~/api/http";
import { addRecordApi, deleteFileApi, listFileApi } from "~/api/mediaFile";
import { minioUpload } from "~/api/minio";
import { extractFormat } from "~/utils/file";

const files = ref<any>([]);

const previewOpen = ref(false);
const previewUrl = ref("");

const selectFile = async (files: File[]) => {
  const file = files[0];
  const format = extractFormat(file.name);
  const filename = `${crypto.randomUUID()}.${format}`;
  const preSignedUrl = await $fetch("/api/minio/preSignedUrl", { params: { filename } });
  const { code } = (await minioUpload(preSignedUrl, file)) as any;
  if (code === 200) {
    const body = {
      filename,
      filetype: format,
    };
    await addRecordApi(body);
  }
};

const downLoadFile = async (filename: string) => {
  const preSignedGetUrl = await $fetch("/api/minio/preSignedGetUrl", {
    params: { filename },
  });
  await download(preSignedGetUrl, filename);
};

const deleteFile = async (filename: string) => {
  await deleteFileApi(filename);
};

const previewFile = async (filename: string) => {
  previewUrl.value = await $fetch("/api/minio/preSignedGetUrl", {
    params: { filename },
  });
  previewOpen.value = true;
};

const queryFile = async () => {
  files.value = await listFileApi();
};
</script>

<template>
  <div>
    <input
      type="file"
      @onChange="selectFile"
    />
    <a-button
      type="primary"
      @click="queryFile"
      >Primary
    </a-button>
    <a-table :data="files">
      <template #columns>
        <a-table-column
          title="ID"
          data-index="id"
        ></a-table-column>
        <a-table-column
          title="文件名"
          data-index="filename"
        ></a-table-column>
        <a-table-column
          title="文件类型"
          data-index="filetype"
        ></a-table-column>
        <a-table-column
          title="上传时间"
          data-index="createTime"
        ></a-table-column>
        <a-table-column title="操作">
          <template #cell="{ record }">
            <a-space>
              <a-button @click="previewFile(record.filename)">预览</a-button>
              <a-button @click="downLoadFile(record.filename)">下载</a-button>
              <a-button @click="deleteFile(record.filename)">删除</a-button>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <template v-if="previewOpen">
      <a-image-preview
        :src="previewUrl"
        :default-scale="0.8"
        v-model:visible="previewOpen"
      />
    </template>
  </div>
</template>
