const express = require('express')
const ejs = require('ejs')
const fetch = require('node-fetch')

const app = express()

app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

const PORT = process.env.PORT || 4100

// app.get('/', async (req, res) => {
//     const ress = await fetch('https://jsonplaceholder.typicode.com/posts')
//     const data = await ress.json()

//     const resData = data.map(r => {
//         return {
//             title: r.title
//         }
//     })

//     res.send(resData)

// })

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => console.log(PORT))