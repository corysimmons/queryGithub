const axios = require('axios')
const rateLimit = require('axios-rate-limit')

const http = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

const axConfig = {
  auth: {
    username: 'corysimmons',
    password: '*************' // https://developer.github.com/v3/#authentication
  },
  method: 'get'
}

const queryGithub = async url => {
  const collection = []
  let i = 0
  let go = true

  while (go) {
    i++
    await http({
      ...axConfig,
      url: `${url}?page=${i}`
    })
      .then(res => {
        collection.push(...res.data)
        if (res.data < 30) {
          go = false
        }
      })
      .catch(e => {
        console.error(e)
        go = false
      })
  }

  return collection
}

// Usage
async function foo() {
  const results = await queryGithub('https://api.github.com/orgs/facebook/members')
  console.log(results)
}

foo()
