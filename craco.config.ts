import { CracoConfig } from '@craco/craco';

const CracoSwcPlugin = require('craco-swc');
const CracoLessPlugin = require('craco-less');

const config: CracoConfig = {
  plugins: [
    {
      plugin: CracoSwcPlugin,
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#ECA72C',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

export default config;
