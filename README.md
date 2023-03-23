# Skohub Blog

This project is the source for the new skohub blog.
This project was created with the gatsby template [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog).

## Adding a new blog post

We have a few conventions for adding a new blog post:
Each post has an own folder under `content/blog` starting with the date of the blog post (YYYY-MM-DD). In this folder we add all images used in the blog post. The blog post itself is written as a markdown file named `index.md` so we'll get nice urls.

## Installation

Gatsby is build with Node.js.

### Install Node.js

#### Windows

Download and install the latest Node.js version from [the official Node.js website]( https://nodejs.org/en/).

#### Unix

[Install the lastest nvm version](https://github.com/nvm-sh/nvm#installing-and-updating).

Set default Node.js version. When nvm is installed, it does not default to a particular node version. You’ll need to install the version you want and give nvm instructions to use it.
See [here](https://github.com/nvm-sh/nvm#bash) to automatically switch to the correct node version (not necessary, but handy).

```
nvm install 18
nvm use 18
```

## Start developing

The site runs with:

```
cd skohub-blog
npm install
npm run develop
```

Or make use of Docker:

```
docker compose up
```

The site is now running at `http://localhost:8000`!

## Build

To create a production build and output the built static files into the public directory, run:

```
cd skohub-blog
npm install
npm run build
```

If you want to view the production build locally, run:

```
npm run serve
```

Once this starts, you can view your site at http://localhost:9000.

## Deployment

If you need to serve this blog from other than root, set `pathPrefix: ""` in `gatsby-config.js` and insert the right prefix.
