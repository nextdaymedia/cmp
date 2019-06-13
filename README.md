# Modified AppNexus CMP for Next Day Media Publishers
CMP is a tool for publishers to engage users of their properties and gather & store end user consent.

## Publisher documentation
[This](docs/README.md) page describes how a publisher should implement the CMP on their site.

### Installation

**Notice:** Installation of the node modules requires a Node version between 4 and 10 (>4 - <10).

```sh
git clone https://github.com/nextdaymedia/cmp.git
cd cmp
yarn install
```

## Build for Production

```sh
yarn build
```

This produces production builds of the `cmp` script and the docs application:
+ `./build/ndmtag.bundle.js` - CMP script to include on your site
+ `./build/cmp.stub.bundle.js` - CMP stub script to simulate functions to include on your site
+ `./build/cmp.custom.bundle.js` - CMP script for custom popups to include on your site
+ `./build/cmp.ssp.bundle.js` - SSP script to include on your site
+ `./build/ssp.fallback.html` - SSP HTML
+ `./build/docs/` - Application hosting the documentation

## Documentation

Instructions to install the CMP as well as API docs and examples are available in the `docs`
application included with the repo.

```sh
yarn start
```

The documentation can be viewed at:
`http://localhost:5000/docs/`

## Development
You can start a development server that will monitor changes to all CMP and docs files with:
```sh
yarn dev
```

Development server can be accessed at:
`http://localhost:8080/`

## Testing

```sh
yarn test
```
