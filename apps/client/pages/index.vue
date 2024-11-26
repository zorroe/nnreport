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
  queryParams,
  fileTypes,
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

const handleSelectDate = (date: any) => {
  if (date) {
    queryParams.value.startTime = date[0];
    queryParams.value.endTime = date[1];
  } else {
    queryParams.value.startTime = "";
    queryParams.value.endTime = "";
  }
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
    <a-form
      :model="queryParams"
      layout="inline"
    >
      <a-form-item
        field="fileType"
        label="文件类型"
      >
        <a-select
          placeholder="请选择文件类型"
          :style="{ width: '200px' }"
        >
          <a-option
            v-for="fileType in fileTypes"
            :key="fileType"
            :value="fileType"
            >{{ fileType }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="上传时间">
        <a-range-picker @change="handleSelectDate" />
      </a-form-item>
    </a-form>
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
