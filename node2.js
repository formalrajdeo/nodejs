const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end(
      JSON.stringify({
        success: true,
        message: 'Welcome to Home Page',
        data: null,
      })
    )
  }

  if (req.url === '/user') {
    const users = [
      { name: 'Doe', age: 23 },
      { name: 'Jhon', age: 18 },
    ]
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(
      JSON.stringify({
        success: true,
        message: 'USER Page',
        data: users,
      })
    )
  }
})

PORT = 8080

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
