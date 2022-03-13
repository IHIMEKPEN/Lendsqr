// File index.test.js
const createJWKSMock = require('../app.js').default
const createApp = require('./api')
const supertest = require('supertest')
const { assert } = require('chai')

describe('Some tests for authentication for our api', () => {
    let jwksMock, server, request
    beforeEach(() => {
        ; ({ jwksMock, server, request } = createContext())
    })
    afterEach(async () => await tearDown({ jwksMock, server }))

    test('should not get access without correct token', async () => {
        // We start intercepting queries (see below)
        jwksMock.start()
        const { status } = await request.put('/users/fundwallet')
        assert.equal(status, 401)
    })
    test('should get access with mock token when jwksMock is running', async () => {
        // Again we start intercepting queries
        jwksMock.start()
        const access_token = jwksMock.token({
            aud: 'private',
            iss: 'master',
        })
        const { status } = await request
            .put('/users/fundwallet')
            .set('access_token', `Bearer ${access_token}`)
        assert.equal(status, 200)
    })
    
})



const createContext = () => {
    // This creates the local PKI
    const jwksMock = createJWKSMock('https://hardfork.eu.auth0.com/')

    // We start our app.
    const server = createApp({
        jwksUri: 'https://hardfork.eu.auth0.com/.well-known/jwks.json',
    }).listen()

    const request = supertest(server)
    return {
        jwksMock,
        request,
        server,
    }
}

const tearDown = async ({ jwksMock, server }) => {
    await server.close()
    await jwksMock.stop()
}