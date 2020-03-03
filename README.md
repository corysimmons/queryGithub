# queryGithub
Rate limits and queries Github's API v3.

## Install
copy/paste `queryGithub.js` somewhere in project

## Usage
```js
import { queryGithub } from './queryGithub'

const githubAuthConfig = {
  auth: {
    username: 'corysimmons',
    password: process.env.tokenized_password // it's not your usual pwd. gotta do curl or something https://developer.github.com/v3/#authentication
  }
}

async function foo() {
  const facebookOrgMembers = await queryGithub(githubAuthConfig, 'https://api.github.com/orgs/facebook/members')
  console.log(facebookOrgMembers)
}

foo()
```