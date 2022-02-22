import { Asset } from '../../models/Asset';
import { getAssetType } from '../../models/AssetType';

export class BookmarksAPI {
  static async get(url: string) {
    const response: Response = await fetch(
      `https://noembed.com/embed?url=${url}`,
      {
        method: 'GET',
      },
    );

    const assetProps = await response.json();

    if (assetProps.error) {
      console.log('ERROR---', assetProps.error);
      return;
    }

    const asset: Asset = {
      thumbnailUrl: assetProps.thumbnail_url,
      url: assetProps.url,
      title: assetProps.title,
      author: assetProps.author_name,
      addedDate: new Date(),
      type: getAssetType(assetProps.provider_name),
      width: assetProps.width,
      height: assetProps.height,
      duration: assetProps.duration || 0,
    };

    if (assetProps.upload_date) {
      asset.uploadDate = new Date(assetProps.upload_date);
    }

    return asset;
  }
}
