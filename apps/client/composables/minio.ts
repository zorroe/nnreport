import type { FileItem } from "@arco-design/web-vue";

import { Message } from "@arco-design/web-vue";

import { download } from "~/api/http";
import { addRecordApi, deleteFileApi, listFileApi, queryTotal } from "~/api/mediaFile";
import { minioUpload } from "~/api/minio";
import { extractFormat } from "~/utils/file";

export function useMinio() {
  const files = ref<any>([]);
  const previewOpen = ref(false);
  const previewUrl = ref("");
  const uploadOpen = ref(false);
  const fileToUpload = ref<FileItem[]>([]);
  const fileTypes = ref<string[]>(["jpg", "png", "jpeg", "gif"]);
  const totalNum = ref(0);

  const queryParams = ref({
    pageSize: 3,
    pageNum: 1,
    fileType: "",
    fileName: "",
    startTime: "",
    endTime: "",
  });

  const queryFile = async () => {
    files.value = await listFileApi(queryParams.value);
    await queryTotalNum();
  };

  const downloadFile = async (filename: string) => {
    const preSignedGetUrl = await $fetch("/api/minio/preSignedGetUrl", {
      params: { filename },
    });
    await download(preSignedGetUrl, filename);
  };

  const previewFile = async (filename: string) => {
    previewUrl.value = await $fetch("/api/minio/preSignedGetUrl", {
      params: { filename },
    });
    previewOpen.value = true;
  };

  const deleteFile = async (filename: string) => {
    await deleteFileApi(filename);
    queryFile().then();
  };

  const openUploadModal = () => {
    uploadOpen.value = true;
  };

  const confirmUpload = () => {
    fileToUpload.value.forEach(async (file) => {
      const format = extractFormat(file.name);
      const filename = `${crypto.randomUUID()}.${format}`;
      const preSignedUrl = await $fetch("/api/minio/preSignedUrl", { params: { filename } });
      const { code, msg } = (await minioUpload(preSignedUrl, file.file)) as any;
      if (code === 200) {
        const body = {
          filename,
          filetype: format,
        };
        await addRecordApi(body);
        Message.success(msg);
      } else {
        Message.error(msg);
      }
    });
    queryFile().then();
  };

  const handleClose = () => {
    fileToUpload.value = [];
    queryFile().then();
  };

  const queryTotalNum = async () => {
    totalNum.value = await queryTotal(queryParams.value);
    console.log(totalNum.value);
  };
  queryFile().then();

  return {
    files,
    previewUrl,
    previewOpen,
    uploadOpen,
    fileToUpload,
    queryParams,
    fileTypes,
    totalNum,
    queryFile,
    downloadFile,
    previewFile,
    deleteFile,
    openUploadModal,
    confirmUpload,
    handleClose,
  };
}
