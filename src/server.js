import http from 'http'
import app from './app.js'
import config from './config/config.js'
import { init } from './db/mongoDB.js'

await init()
const serverHttp = http.createServer(app)
const PORT = config.port || 8080

serverHttp.listen(PORT, ()=>{
    console.log(`Listening on port: http://localhost:${PORT} 🚀`);
})