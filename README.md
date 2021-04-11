This is a simple template for static websites or simple web apps. Mostly, it was meant for learning purposes.

It can be used with either JavaScript or TypeScript. 
There's a config file on the root directory to specify entries and/or other html pages. 

The util folder contains a simple function which extends the HtmlWebpackPlugin.

## Clone this repository

```
git clone https://github.com/PaoloBozzini/static-website-boilerplate.git
```

Then install the dependencies

```
npm install
```

## Scripts

```JSON

{
      "scripts": {
      "start": "webpack serve",
      "watch": "webpack --watch",
      "build": "webpack",
      "build:prod": "NODE_ENV=production webpack",
      "clean": "rm -rf dist",
      "prettier": "prettier --check .",
      "prettier:fix": "prettier --write .",
      "lint": "eslint .",
      "lint:fix": "eslint . --fix",
      "prepare": "husky install"
   }
}
```
