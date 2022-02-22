export enum AssetType {
  Vimeo = 'Vimeo',
  Flickr = 'Flickr',
}

export const getAssetType = (mimeType: string) => {
  switch (mimeType) {
    case 'Vimeo':
      return AssetType.Vimeo;
    default:
    case 'Flickr':
      return AssetType.Flickr;
  }
};
