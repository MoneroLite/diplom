require('dotenv').config() // конфигурационный файл
const express = require('express') // express
const sequelize = require('./db') // импорт БД
const models = require('./models/models') // модели БД
const cors = require('cors') // для отправки запросов из браузера
const fileUpload = require('express-fileupload') // пакет для загрузки файлов(картинок)
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

//получение порта из конфигупационного файла .env
const PORT = process.env.PORT || 5000
// запуск приложения
const app = express()

//настройка cors для того, что бы отправлять запросы из браузера
app.use(cors())
// для того, чтобы приложение могло парсить json формат
app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'static/category')))
app.use(express.static(path.resolve(__dirname, 'static/users')))
// для возможности загрузки файлов
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        // подключение к бд
        await sequelize.authenticate()
        // сверяет состояние бд 
        await sequelize.sync() 
        app.listen(PORT, () => {console.log(`сервер запустила на порту: ${PORT}`)})
    } catch (err) {
        console.log(err)
    }
}

start()