const http = require('http')

const Todos = [
  {
    id: 1,
    name: 'john',
  },
  {
    id: 2,
    name: 'abc',
  },
  {
    id: 3,
    name: 'sample',
  },
]
const server = http.createServer((req, res) => {
  res.setHeader('X-Powered-By', 'Node.js')

  //   console.log(req)
  // const { headers, url, method } = req
  // console.log(headers, url, method)

  // ***** Please RUN this on CHROME Browser *****
  // res.setHeader('Content-Type', 'text/html')
  // res.write('<h1>Hello alias</h1>')

  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      success: true,
      data: Todos,
    })
  )
})

PORT = 8080

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
