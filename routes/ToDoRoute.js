const express = require('express');
const router = express.Router();
const ToDo = require('../models/ToDo');

// CREATE TODO
router.post('/', async (req, res, next) => {
    try {
        const { title, description, isCompleted, dueDate } = req.body;

        const todo = await ToDo.create({
            title,
            description,
            isCompleted,
            dueDate
        });

        res.status(201).json(todo);
    }
    catch (err) {
        next(err);
    }
});


// READ ALL (with filters)
router.get('/', async (req, res, next) => {
    try {
        const { completed } = req.query;

        let filter = {};

        if (completed !== undefined) {
            filter.isCompleted = completed === 'true';
        }

        const todos = await ToDo.find(filter);

        res.status(200).json(todos);
    }
    catch (err) {
        next(err);
    }
});


// READ BY ID
router.get('/:id', async (req, res, next) => {
    try {
        const todo = await ToDo.findById(req.params.id);

        if (!todo) {
            return next(new Error("No Data found"));
        }

        res.status(200).json(todo);
    }
    catch (err) {
        next(err);
    }
});


// UPDATE TODO
router.put('/:id', async (req, res, next) => {
    try {
        const updatedToDo = await ToDo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedToDo) {
            return next(new Error("No Data found"));
        }

        res.status(200).json(updatedToDo);
    }
    catch (err) {
        next(err);
    }
});


// DELETE TODO
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedToDo = await ToDo.findByIdAndDelete(req.params.id);

        if (!deletedToDo) {
            return next(new Error("Unable to delete"));
        }

        res.status(200).json({
            message: "Todo deleted successfully"
        });
    }
    catch (err) {
        next(err);
    }
});


module.exports = router;