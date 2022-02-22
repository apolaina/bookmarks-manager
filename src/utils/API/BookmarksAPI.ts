import { Asset } from '../../models/Asset';
import { getAssetType } from '../../models/AssetType';

export class BookmarksAPI {
  static async get(url: string): Promise<Asset> {
    const response: Response = await fetch(
      `https://noembed.com/embed?url=${url}`,
      {
        method: 'GET',
      },
    );

    const assetProps = await response.json();

    const asset = {
      thumbnailUrl: assetProps.thumbnail_url,
      url: assetProps.url,
      title: assetProps.title,
      author: assetProps.author_name,
      addedDate: new Date(),
      uploadDate: new Date(assetProps.upload_date) || null,
      type: getAssetType(assetProps.provider_name),
      width: assetProps.width,
      height: assetProps.height,
      duration: assetProps.duration || 0,
    };

    console.log(asset);

    return asset;
  }
}
