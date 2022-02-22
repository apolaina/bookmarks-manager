import React, { useCallback, useEffect, useState } from 'react';
import './App.less';
import { Layout } from 'antd';
import Title from 'antd/lib/typography/Title';
import { BookmarksAPI } from './utils/API/BookmarksAPI';

import Button from './components/Button/Button';
import Card from './components/Card/Card';
import Input from './components/Input/Input';

import { Asset } from './models/Asset';

import { StarOutlined } from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [url, setURL] = useState<string>('');
  const [bookmarks, setBookmarks] = useState<Array<Asset>>([]);
  const [error, setError] = useState<string>('');

  const isValidUrl = (url: string) => {
    return /flickr|flic\.kr|vimeo/.test(url);
  };

  const onSave = useCallback(async () => {
    setLoading(true);

    if (url && isValidUrl(url)) {
      const bookmarkData = await BookmarksAPI.get(url);

      if (
        bookmarkData &&
        !bookmarks.find(bookmark => bookmark.url === bookmarkData.url)
      ) {
        setError('');
        setBookmarks(prevState => [...prevState, bookmarkData]);
        setURL('');
        setLoading(false);
      } else {
        setError(
          'Ooops, an error occured or you are trying to add an already saved media ;)',
        );
        setLoading(false);
      }
    } else {
      setError('Sorry, this app accepts only Flickr & Vimeo links ¯\\_(ツ)_/¯');
      setLoading(false);
    }
  }, [bookmarks, url]);

  const onDelete = (assetTitle: string) => {
    console.log('delete');
    setBookmarks(prevState =>
      prevState.filter(bookmark => bookmark.title !== assetTitle),
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBookmarks(state => [...state]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [bookmarks]);

  return (
    <Layout className="app-layout">
      <Header>
        <Title type="secondary">Welcome on your bookmarks manager</Title>
        <div>
          <Input
            placeholder="Vimeo or Flickr URL"
            value={url}
            onChange={event => setURL(event.target.value!)}
          />
          <Button
            loading={isLoading}
            onClick={onSave}
            icon={<StarOutlined />}
            transparent>
            Save
          </Button>
          <p className="error">{error && error}</p>
        </div>
      </Header>
      <Content>
        <div className="card-container">
          {bookmarks &&
            bookmarks.map((asset: Asset) => (
              <Card
                key={asset.addedDate.getMilliseconds()}
                asset={asset}
                onDelete={() => onDelete(asset.title)}
              />
            ))}
        </div>
      </Content>
      <Footer>Made with ♡</Footer>
    </Layout>
  );
};

export default App;
