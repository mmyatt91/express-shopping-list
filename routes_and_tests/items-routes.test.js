process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let item = { name: "Double Chocolate Chip Muffins", price: "2.50" };

beforeEach( async function() {
  items.push(item);
});

afterEach( async function() {
  items = [];
});

// GET - Render list of all items
describe("GET /items", async function() {
    test('Get list of all items', async function() {
        const resp = await request(app).get('/items')
        expect(resp.statusCode).toBe(200)
    })
})

// GET - Render single item 
describe("GET /items/:name", async function() {
    test('Get single item', async function() {
        const resp = await request(app).get(`/items/${item.name}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body.item).toEqual(item)
    })
    test('Respond w/ 404 if item cannot be found', async function() {
        const resp = await request(app).get(`/items/0`)
        expect(resp.statusCode).toBe(404)
    })
})

// POST - Add a new item to the list
describe("POST /items", async function() {
    test('Add a new item', async function() {
        const resp = await request(app).post('/items').send({name: "Chicken Tenderloins", price: 6.99})
        expect(resp.statusCode).toBe(201)
        expect(resp.body.item).toHaveProperty("name")
        expect(resp.body.item.name).toEqual("Chicken Tenderloins")
    })
})

// PATCH - Update an item in the list
describe("PATCH /items/:name", async function() {
    test('Get single item', async function() {
        const resp = await request(app).patch(`/items/${item.name}`).send({name: "Reese's", price: 1.29})
        expect(resp.statusCode).toBe(200)
        expect(resp.body.item).toEqual({ name: "Reese's"})
    })
    test('Respond w/ 404 if item cannot be found', async function() {
        const resp = await request(app).patch(`/items/0`)
        expect(resp.statusCode).toBe(404)
    })
})

// DELETE - Delete a single item in the list
describe("DELETE /items/:name", async function() {
    test('Get list of all items', async function() {
        const resp = await request(app).delete(`/items/${item.name}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({ message: "Item Deleted"})
    })
})


