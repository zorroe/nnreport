<script setup lang="ts">
import { download } from "~/api/http";
import { addRecordApi, deleteFileApi, listFileApi } from "~/api/mediaFile";
import { minioUpload } from "~/api/minio";
import { extractFormat } from "~/utils/file";

const { bucketList } = useMinio();
const files = ref<any>([]);

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "filename",
    label: "文件名",
  },
  {
    key: "filetype",
    label: "文件类型",
  },
  {
    key: "preview",
    label: "预览",
  },
  {
    key: "createTime",
    label: "创建时间",
  },
  {
    key: "actions",
  },
];

const items = (row: any) => [
  [
    {
      label: "下载",
      click: () => downLoadFile(row.filename),
    },
    {
      label: "删除",
      click: () => deleteFile(row.filename),
    },
  ],
];

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
    await addRecordApi(body).then(() => {
      alert("上传成功");
    });
  }
};

const downLoadFile = async (filename: string) => {
  const preSignedGetUrl = await $fetch("/api/minio/preSignedGetUrl", {
    params: { filename },
  });
  await download(preSignedGetUrl, filename);
};

const deleteFile = async (id: number) => {
  await deleteFileApi(id);
};

const queryFile = async () => {
  files.value = await listFileApi();
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
    <UButton @click="queryFile">查询数据</UButton>
    <UTable
      :rows="files"
      :columns="columns"
    >
      <template #name-data="{ row }">
        <span>{{ row.name }}</span>
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>
