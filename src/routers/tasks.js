const express = require('express')
const router = express.Router()
const pool = require("../utils/database")

//Getting all
router.get('/', (req, res) => {
    const query = "SELECT * FROM todolist ORDER BY id ASC"
    pool.query(
        query,(error, results) => {
            if (error){
                res.json({status: "Not found!"})
            } else{
                res.json(results)
            }
        }
    )
}) 

//Getting one
router.get('/:id', (req, res) => {
    const id = req.params.id
    const query = "SELECT * FROM todolist WHERE id = ?"
    pool.query(
        query, Object.values(id), (error, results) => {
            if (error){
                res.json({status: "Not found!"})
            } else{
                res.json({status: "Success", data: id})
            }
        }
    )
})

//Creating one
router.post('/', async (req, res) => {
    const data = {
        tasks: req.body.tasks,
        done: false,
    }
    const query = "INSERT INTO todolist (tasks, done) VALUES (?, ?)"
    pool.query(
    query, Object.values(data), (error) => {
        if (error){
            res.json({status: "Failure", reason: error.code})
        } else{
            res.json({status: "Success", data: data})
        }
    }
)
}) 

//Updating task
router.patch('/task/:id', (req, res) => {
    const data = {
        tasks: req.body.tasks,
        id: req.params.id
    }
    const query = "UPDATE todolist SET tasks = ? WHERE id = ?"
    pool.query(
        query, [data.tasks, data.id], (error, results) => {
            if (error){
                res.json({status: "Failure", reason: error.code})
            } else{
                res.json({status: "Success", data: data})
            }
        }
    )
}) 

//Updating done
router.patch('/done/:id', (req, res) => {
    const data = {
        done: req.body.done,
        id: req.params.id
    }
    const query = "UPDATE todolist SET done = ? WHERE id = ?"
    pool.query(
        query, [data.done, data.id], (error, results) => {
            if (error){
                res.json({status: "Failure", reason: error.code})
            } else{
                res.json({status: "Success", data: data})
            }
        }
    )
})

//Updating id
router.patch('/id/:id', (req, res) => {
    const data = {
        dataid: req.body.dataid,
        id: req.params.id
    }
    const query = "UPDATE todolist SET id = ? WHERE id = ?"
    pool.query(
        query, [data.dataid, data.id], (error, results) => {
            if (error){
                res.json({status: "Failure", reason: error.code})
            } else{
                res.json({status: "Success", data: data})
            }
        }
    )
})

//Deleting one
router.delete('/:id', (req, res) => {
    const id = req.params.id
    const query = "DELETE FROM todolist WHERE id = ?"
    pool.query(
    query, [id], (error, results) => {
        if (error){
            res.json({status: "Failure", reason: error.code})
        } else{
            res.json({status: "Success", data: id})
        }
    }
)
}) 

module.exports = router