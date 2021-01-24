const express = require('express')
const items = require('../shoppingList');
const shoppingList = require('../shoppingList');

const router = express.Router()

// 1. GET /items - Render list of items
router.get('/', function(req, res, next ) {
    try{
        return res.json( { items: shoppingList.findAll() })
    } catch(e) {
    return next(e)
    }
});

// 2. POST /items - Accept JSON data and add new item to list
router.post('/', function(req, res, next) {
    try{
        let newItem = new shoppingList(req.body.name, req.body.price)
        return res.json({ item: newItem})

    } catch(e){
    return next(e)
    }
})

// 3. GET /items/:name - Display a single item's name and price
router.get('/:name', function(req, res, next) {
    try{
        let singleItem = shoppingList.find(req.params.name)
        return res.json({item: singleItem})
    } catch(e){
    return next(e)
    }
}) 

// 4. PATCH /items/:name - Modify a single item's name and price
router.patch('/:name', function(req, res, next) {
    try{
        let singleItem = shoppingList.update(req.params.name, req.body)
        return res.json({'Item Updated': {item: singleItem}})
    } catch(e){
    return next(e)
    }
}) 

// 5. DELETE /items/:name - Delete a single item from the array
router.patch('/:name', function(req, res, next) {
    try{
        shoppingList.remove(req.params.name)
        return res.json({ message: 'Item Deleted' })
    } catch(e){
    return next(e)
    }
}) 

module.exports = router;


