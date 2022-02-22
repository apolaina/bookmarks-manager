import React from 'react';
import { Skeleton } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { formatDate, formatDateToLocale } from '../../utils/fomatDate';
import { formatDuration } from '../../utils/formatDuration';

import Button from '../Button/Button';
import { Asset } from '../../models/Asset';
import { AssetType } from '../../models/AssetType';

import './Card.less';

interface Props {
  asset: Asset;
  onDelete: () => void;
}

const Card: React.FC<Props> = ({ asset, onDelete }) => (
  <div className="card">
    {asset.thumbnailUrl ? (
      <img alt="thumbnail" src={asset.thumbnailUrl} />
    ) : (
      <Skeleton.Image />
    )}

    <div className="card-content">
      <p className="card-content-title">{asset.title}</p>
      <p>{asset.author}</p>
      <a href={asset.url} target="_blank" rel="noreferrer">
        {asset.url}
      </a>

      {asset.addedDate && <p>Added | {formatDate(asset.addedDate)}</p>}
      {asset.uploadDate && (
        <p>Uploaded | {formatDateToLocale(asset.uploadDate)}</p>
      )}
      {asset.type === AssetType.Flickr && (
        <p>
          {asset.width} x {asset.height}
        </p>
      )}
      {asset.type === AssetType.Vimeo && asset.duration && (
        <p>Duration | {formatDuration(asset.duration)}</p>
      )}
    </div>
    <div className="card-footer">
      <Button icon={<DeleteOutlined />} onClick={onDelete}>
        Delete
      </Button>
    </div>
  </div>
);
export default Card;
