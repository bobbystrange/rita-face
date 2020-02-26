#!/usr/bin/env bash

yarn add react-router react-router-dom prop-types
yarn add history jquery lodash axios
yarn add bootstrap markdown-it highlight.js react-timeline-scribble

# icons
git clone https://github.com/FortAwesome/Font-Awesome.git --depth 1
cp -r Font-Awesome/svgs/* public/static/images
rm -rf Font-Awesome
# style
md -p public/static/css/highlight
md -p public/static/images
cp node_modules/highlight.js/styles/* public/static/css/highlight
