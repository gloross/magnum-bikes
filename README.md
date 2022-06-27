# magnum-bikes

## Installation

1. Clone the repo:

```
git clone git@github.com:gloross/magnum-bikes.git
```

2. Install packages

```
yarn install
```
3. Use Shopify CLI to login

```
shopify login https://magnumebikes.myshopify.com/
```

## Development

Start the theme server:

```
yarn start
```

This will:
- Run the server
- Compile the JS and SCSS files
- Open a browser window pointed to theme URL - If not, use http://127.0.0.1:9292/
- Watch for changes and rebuild

## Cannot start the server?

If `yarn start` fails, create a "sections" folder in `/src/styles/`. This should  fix the error.

## Building

You need to build the files before pushing to Git or uploading the files to Shopify(by using Shopify CLI):

```
yarn build
```

This will compile the JS and SCSS files.

