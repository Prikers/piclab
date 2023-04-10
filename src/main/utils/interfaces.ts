export interface Photo {
  name: string;
  fullname: string;
  parent: string | undefined;
  size: number | undefined;
  mtime: Date | undefined;
  mode: number | undefined;
}
