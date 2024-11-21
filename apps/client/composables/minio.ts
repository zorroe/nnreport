export function useMinio() {
  const bucketList = ref();

  useFetch("/api/minio/bucketList").then((res) => {
    bucketList.value = res.data.value;
  });

  function uploadFile(file: File, filename: string) {
    $fetch("/api/minio/upload", {
      method: "POST",
      body: file,
      params: {
        filename,
      },
    });
  }

  return {
    bucketList,
    uploadFile,
  };
}
