# webpack-template #
FE project template built on webpack4.

## required environment ##
- Node.js

## install package ##
```bash
npm install
```

## local dev ##
```bash
npm run dev
npm run serve
```

## project structure ##
``` js
    .
    ├── build                     # webpack
    │   ├── webpack.base.conf.js      # base config
    │   ├── webpack.dev.conf.js       # dev config
    │   ├── webpack.prod.conf.js      # prod config
    ├── deploy                    # build directory
    ├── src
    │   ├── assets                # static
    │   │   ├── img
    │   ├── public                # entry html
    │   ├── styles                # styles
    │   │   ├── index                 # style entry
    │   ├── templates             # modules
    │   ├── utils                 # utils
    │   ├── views                 # pages
    │   ├── main.js               # entry file
    ├── .babelrc                  # babel config
    ├── .browserslistrc           # browser compatibility config
    ├── postcss.config.js         # css config
```

## development env ##
```bash
npm run build:yufa
```

## production env ##
```bash
npm run build
npm run build:prod
```
