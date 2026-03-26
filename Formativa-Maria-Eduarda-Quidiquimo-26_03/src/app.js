const express = require('express')
const pool = require ('./config/database')

const app = express()
app.use(express.json())

const queryAsync =(sql, values = []) =>{
    return new Promise((resolve, reject) =>{
        pool.query(sql, values, (err, results) =>{
            if(err) reject(err)
            else resolve(results)
        })
    })
}

module.exports = app