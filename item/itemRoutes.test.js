process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require("../app");

let items = require('../fakeDb');

let item = { name: 'Cookies', price: 1.25}

beforeEach(function(){
    items.push(item);
});

afterEach(function(){
    items = []
});

// Get the list of items
describe("GET /items", () =>{
    test ("Gets a list of items", async function(){
        const resp = await request(app).get("/items");
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({items: [items]})
    });
});

// Get a item and retrieves its information
describe("GET /items/:name", ()=>{
    test("Get a item and return its information", async function(){
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual(item);
    });

    test("Respond with a 404 if item is not found", async function(){
        const resp = await request(app).get('/items/0');
        expect(resp.statusCode).toBe(404);
    });
});

// Creates a item 
describe("POST /items", ()=>{
    test("Create a item and add to list", async function(){
        const resp = await request(app).post('/items')
        .send({
            name:'Oreo',
            price:1.23
        });
        expect(resp.body.item).toHaveProperty('name');
        expect(resp.body.item).toHaveProperty('price');
        expect(resp.body.item.name).toBe('Oreo');
        expect(resp.body.item.price).toBe(1.23);
    });

// Update items
describe("PATCH /items/:name", () =>{
    test("Update item", async function(){
        const resp = await request(app).patch(`/items/${item.name}`)
        .send({
            name:'Cupcake',
            price: 2.30
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body.name).toEqual('Cupcake');
        expect(resp.body.price).toEqual(2.30);
    });

    test("Respond with a 404 if item is not found", async function(){
        const resp = await request(app).get('/items/0');
        expect(resp.statusCode).toBe(404);
    });
});

// Delete an item from the list
describe("DELETE /items/:name", () => {
    test("Delete a item", async function(){
        const resp = await request(app).delete(`/items/${item.name}`)
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({message: 'Deleted'});
    });
});
});


