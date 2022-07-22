import express, {Application} from 'express'
import router from './router'
import path from 'path'
import cors from 'cors'
import compression from 'compression'

const app: Application = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(compression())

/** View engine setup */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(__dirname + '/public'))

app.use('/', router)

app.listen(port, () => {
    return console.log(`server is listening on ${port}`)
})