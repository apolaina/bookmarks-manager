import React, { useCallback, useEffect, useState } from 'react';
import './App.less';
import { Layout, Skeleton } from 'antd';
import Title from 'antd/lib/typography/Title';
import { BookmarksAPI } from './utils/API/BookmarksAPI';

import Button from './components/Button/Button';
import Input from './components/Input/Input';

import { Asset } from './models/Asset';
import { AssetType } from './models/AssetType';

import { DeleteOutlined } from '@ant-design/icons';
import { StarOutlined } from '@ant-design/icons';
import { formatDate } from './utils/fomatDate';
import { formatDuration } from './utils/formatDuration';

const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [url, setURL] = useState<string>('');
  const [bookmarks, setBookmarks] = useState<Array<Asset>>([]);
  const [error, setError] = useState<string>('');

  const onSave = useCallback(async () => {
    setLoading(true);
    const bookmarkData = await BookmarksAPI.get(url);

    if (
      bookmarkData &&
      !bookmarks.find(bookmark => bookmark.url === bookmarkData.url)
    ) {
      setError('');
      setBookmarks(prevState => [...prevState, bookmarkData]);
      setLoading(false);
    } else {
      setError(
        'Ooops, an error occured or you are trying to add an already saved media ;)',
      );
      setLoading(false);
    }
  }, [bookmarks]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBookmarks(state => [...state]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout className="app-layout">
      <Header>
        <Title type="secondary">Welcome on your bookmarks manager</Title>
      </Header>
      <Content>
        <div>
          <Input
            placeholder="Vimeo or Flickr URL"
            onChange={event => setURL(event.target.value!)}
          />
          <Button
            loading={isLoading}
            onClick={onSave}
            icon={<StarOutlined />}
            transparent>
            Save
          </Button>
        </div>
        <p className="error">{error && error}</p>

        <div className="card-container">
          {bookmarks &&
            bookmarks.map((asset: Asset) => (
              <div key={asset.addedDate.getMilliseconds()} className="card">
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

                  {asset.addedDate && (
                    <p>Added | {formatDate(asset.addedDate)}</p>
                  )}
                  {asset.uploadDate && (
                    <p>
                      Uploaded |{' '}
                      {asset.uploadDate.toLocaleDateString('en-CA', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
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
                  <Button icon={<DeleteOutlined />}>Delete</Button>
                </div>
              </div>
            ))}
        </div>
      </Content>
      <Footer>Made with ♡</Footer>
    </Layout>
  );
};

export default App;
