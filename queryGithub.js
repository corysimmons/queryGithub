const axios = require('axios')
const rateLimit = require('axios-rate-limit')
const querystring = require('querystring')

const http = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

export const queryGithub = (githubAuthConfig, url, method = 'get') => {
  return http({
    ...githubAuthConfig,
    method,
    url
  })
    .then(async res => {
      const str = res.headers.link.split(' ')[2]
      const lastLink = str.substring(1, str.length - 2)
      const queryPart = lastLink.split('?')[1]
      const numPages = Number(querystring.parse(queryPart).page)
      const collection = []
      for (let i = 1; i <= numPages; i++) {
        await http({
          ...githubAuthConfig,
          method,
          url: `${url}?page=${i}`
        })
          .then(res => collection.push(...res.data))
          .catch(e => console.error(e))
      }
      return collection
    })
    .catch(e => console.error(e))
}
