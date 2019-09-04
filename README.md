# Modified AppNexus CMP for Next Day Media Publishers

[![Build Status](https://travis-ci.org/nextdaymedia/cmp.svg?branch=master)](https://travis-ci.org/nextdaymedia/cmp)

CMP is a tool for publishers to engage users of their properties and gather & store end user consent.

## Publisher documentation
[This](docs/README.md) page describes how a publisher should implement the CMP on their site.

### Installation

**Notice:** Installation of the node modules requires Node 10.

```sh
git clone https://github.com/nextdaymedia/cmp.git
cd cmp
yarn install
cp config/config.dist.js config/config.js
```

Replace the placeholders in `config/config.js`.

## Build for Production

```sh
yarn build
```

This produces production builds of the `cmp` scripts:
+ `./build/cmp.stub.bundle.js` - CMP stub script to  include in the head of your site
+ `./build/cmp.ndmtag.bundle.js` - CMP script to include in the body of your site
+ `./build/ssp.fallback.html` - HTML for SSP fallback

## Development
You can start a development server that will monitor changes to all CMP files with:
```sh
yarn dev
```

Development server can be accessed at:
`http://localhost:8080/`

## Testing

```sh
yarn test
```
