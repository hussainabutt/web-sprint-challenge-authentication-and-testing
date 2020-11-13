const request = require('supertest')
const auth = require('./auth-router')

describe('[Register] endpoint', () => {
    it('works', () => {
        return request(auth).post('/register')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '12')
    })
})