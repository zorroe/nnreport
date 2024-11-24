export function useMinio() {
  const bucketList = ref();

  useFetch("/api/minio/bucketList").then((res) => {
    bucketList.value = res.data.value;
  });

  return {
    bucketList,
  };
}
