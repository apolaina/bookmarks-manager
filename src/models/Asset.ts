import { AssetType } from './AssetType';

export interface Asset {
  thumbnailUrl: any;
  url: string;
  title: string;
  author: string;
  addedDate: Date;
  type: AssetType;
  duration?: number;
  height?: number;
  width?: number;
  uploadDate?: Date;
}
