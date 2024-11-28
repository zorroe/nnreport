export class CreateMediaFileDto {
  id?: String;
  filename: String;
  filetype?: String;
  preview?: String;
  createTime?: String;
  updateTime?: String;
  deleted?: String;
}

export class QueryMediaFileDto {
  pageSize: number;
  pageNum: number;
  fileType?: string;
  fileName?: string;
  startDate?: Date;
  endDate?: Date;
}
