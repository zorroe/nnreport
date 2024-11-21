/**
 * 提取文件名和文件格式
 * @param filename 文件名
 * @returns 文件名和文件格式
 */
export const extractFileNameAndFormat = (filename: string) => {
  if (!filename || typeof filename !== "string") {
    return {
      filename: "",
      format: "unknown",
    };
  }

  const lastDotIndex = filename.lastIndexOf(".");

  if (lastDotIndex === -1) {
    return {
      filename: filename,
      format: "unknown",
    };
  }

  const name = filename.substring(0, lastDotIndex);
  const format = filename.substring(lastDotIndex + 1);

  return {
    filename: name,
    format: format,
  };
};

export const extractFormat = (filename: string) => {
  return extractFileNameAndFormat(filename).format;
};
