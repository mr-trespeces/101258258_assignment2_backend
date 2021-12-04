const EmployeeModel = require('../models/EmployeesModel')
const express = require('express')
const app = express()

// http://localhost:80801/api/v1/employees
app.get('/api/v1/employees', async (req, res) => {
    const employees = await EmployeeModel.find({})

    try {
        res.status(200).send(employees) 
    } catch (err) {
        throw res.status(500).send(err)
    }
})


app.post('/api/v1/employees', async (req, res) => {
    const employee = new EmployeeModel(req.body)

    try {
        await employee.save()
        res.status(201).send(employee)
    } catch (err) {
        res.status(500).send(err)
    }
})



app.get('/api/v1/employees/:employeeId', async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.employeeId)
        if (!employee) {
            res.status(404).send("No Employee with Id found")
        } else {
            res.status(200).send(employee)
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

app.put('/api/v1/employees/:employeeId', async (req, res) => {
    try {
        const employees = await EmployeeModel.findByIdAndUpdate(req.params.employeeId, req.body)
        await employees.save()
        res.status(200).send(employees)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.delete('/api/v1/employees/:employeeId', async (req, res) => {
    try {
        const employee = await EmployeeModel.findByIdAndDelete(req.params.employeeId)

        if (!employee) res.status(404).send("No Employee found")
        res.status(204).send("Employee resouce is deleted.")
    } catch (err) {  
        res.status(500).send(err)
    }
})

module.exports = app