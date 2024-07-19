const express = require('express');
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require('../fakeDb');



// const ITEMS = [
//     {name: "popsicle", price: 1.45},
//     {name: "cheerios", price: 3.40}

// ]

router.get('/', (req, res) => {
res.json({items})
})


router.post("/", (req, res, next) => {
    try{
        if(!req.body.name || !req.body.price){
            throw new ExpressError("Enter a name and price first", 400)
        }
    
    const newItem = {
        name: req.body.name, 
        price: req.body.price
    };

    items.push(newItem);

    res.status(201).json({item: newItem});
    }
    catch(err){
        next(err);
    }
});


router.get("/:name", (req, res, next) => {
    const foundItem = items.find(item => item.name === req.params.name)
        if(!foundItem ){
            throw new ExpressError("Item Not Found or Invalid Item", 404)
        }
    res.json({items:foundItem});
});


router.patch("/:name", (req, res, next) =>{
    const foundItem = items.find(item => item.name === req.params.name)
        if(!foundItem){
            throw new ExpressError("Item Not Found", 404)
        }
    foundItem.name = req.body.name;
    res.json({items:foundItem});
});


router.delete("/:name", (req, res, next) => {
    const foundItem = items.find(item => item.name === req.params.name)
        if(!foundItem){
            throw new ExpressError("Item Not Found", 404)
        }
    items.splice(foundItem,1);
    res.json({message: "Deleted!"});
})















module.exports = router;