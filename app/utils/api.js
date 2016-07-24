import 'whatwg-fetch'

const api = {
  shorten: (url, shortcode = "") => new Promise((resolve, reject) => fetch('/api/shorten', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        url,
        shortcode: shortcode ? shortcode : undefined
      })
    })
    .then(res => {
      const status = +res.status
      if (status === 201) return res.json()
      if (status === 400) reject({ url: 'URL is not present'})
      if (status === 409) reject({ shortcode: 'The desired shortcode is already in use'})
      if (status === 422) reject({ shortcode: 'The shortcode is not valid'})
      if (status === 500) reject({ url: 'API error'})
    })
    .then(data => {
      const shortcode = data.shortcode
      if (shortcode) {
        resolve(shortcode)
      } else {
        throw new Error('Unexpected response')
      }
    })
    .catch(err => {
      reject({ url: 'Unexpected error. Sorry :(' })
    })),
  stats: code => fetch(`/api/${code}/stats`)
    .then(res => {
      const status = +res.status
      if (status === 200) return res.json()
      if (status === 404) throw new Error('The shortcode cannot be found in the system')
      throw new Error('API error')
    })
}

export default api