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

Download the lastest nvm version.
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
```

Set default Node.js version. When nvm is installed, it does not default to a particular node version. You’ll need to install the version you want and give nvm instructions to use it. This example uses the version 15 release, but more recent version numbers can be used instead.

```
nvm install 15
nvm use 15
```

### Install gatsby

```
npm install -g gatsby-cli
```

## Start developing

The site runs with:

```
cd skohub-blog
npm install
gatsby develop
```

The site is now running at `http://localhost:8000`!

## Build

To create a production build and output the built static files into the public directory, run:

```
cd skohub-blog
npm install
gatsby build
```

If you want to view the production build locally, run:

```
gatsby serve
```

Once this starts, you can view your site at http://localhost:9000.
