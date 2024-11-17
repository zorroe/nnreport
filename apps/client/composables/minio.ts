export function useMinio() {
  const bucketList = ref();

  useFetch("/api/minio/bucketList").then((res) => {
    bucketList.value = res.data.value;
  });

  function uploadFile(file: File, bucketName: String) {
    $fetch("/api/minio/upload", {
      method: "POST",
      body: file,
      params: {
        bucket: bucketName,
      },
    });
  }

  return {
    bucketList,
    uploadFile,
  };
}
