<script setup lang="ts">
import { type FileItem } from "@arco-design/web-vue";

import { useMinio } from "~/composables/minio";

const {
  files,
  previewUrl,
  previewOpen,
  uploadOpen,
  queryFile,
  fileToUpload,
  downloadFile,
  previewFile,
  deleteFile,
  openUploadModal,
  confirmUpload,
  handleClose,
} = useMinio();

const onChange = (fileList: FileItem[]) => {
  fileToUpload.value = fileList;
};
</script>

<template>
  <div>
    <a-space>
      <a-button
        type="primary"
        @click="openUploadModal"
        >上传图片
      </a-button>
    </a-space>
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
              <a-button @click="downloadFile(record.filename)">下载</a-button>
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
    <a-modal
      v-model:visible="uploadOpen"
      @ok="confirmUpload"
      @close="handleClose"
    >
      <template #title> 上传素材</template>
      <a-upload
        list-type="picture-card"
        :limit="5"
        :auto-upload="false"
        show-file-list
        @change="onChange"
        image-preview
      />
    </a-modal>
  </div>
</template>
