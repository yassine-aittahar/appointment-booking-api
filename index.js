import { connect } from './utils/db'
import config from './config'
import { app } from './app'

let server
const port = normalizePort(process.env.PORT || config.server.port)
app.set('port', port)

const start = async () => {
  try {
    await connect()
    server = app.listen(config.server.port, () => {
      console.log(`REST API on http://localhost:${config.server.port}/api`)
    })
    server.on('error', onError)
    server.on('listening', onListening)
  } catch (e) {
    console.error(e)
  }
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)
  if (isNaN(port)) {
    // named pipe
    return val
  }
  if (port >= 0) {
    // port number
    return port
  }
  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      // eslint-disable-next-line no-unreachable
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      // eslint-disable-next-line no-unreachable
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.log('Listening on ' + bind)
}

export default start()
