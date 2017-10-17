#!/usr/bin/env node

const {
  _ : colors
} = require('minimist')(process.argv.slice(2));

console.log(colors);
