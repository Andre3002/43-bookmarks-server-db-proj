// See here for more tests to add https://github.com/Thinkful-Ed/bookmarks-server/blob/master/test/bookmarks-endpoints.spec.js

const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeBookmarksArray } = require('./bookmarks.fixtures')

describe.only('Bookmarks Endpoints', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('bookmarks').truncate())

    context('Given there are bookmarks in the database', () => {
        const testBookmarks = makeBookmarksArray()

        beforeEach('insert bookmarks', () => {
            return db
                .into('bookmarks')
                .insert(testBookmarks)
        })

        afterEach('cleanup', () => db('bookmarks').truncate())

        it('GET /bookmarks responds with 200 and all of the articles', () => {
            return supertest(app)
                .get('/bookmarks')
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(200, testBookmarks)
            // TODO: add more assertions about the body
        })

        it('GET /bookmarks/:bookmarks_id responds with 200 and the specified article', () => {
            const bookmark_Id = 2
            const expectedBookmark = testBookmarks[bookmark_Id - 1]
            return supertest(app)
                .get(`/bookmarks/${bookmark_Id}`)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(200, expectedBookmark)
        })
    })

    describe(`POST /articles`, () => {
        it(`creates a bookmark, responding with 201 and the new bookmark`, function () {
            return supertest(app)
                .post('/bookmarks')
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .send({
                    title: "The Odessey",
                    content: "Greek tragedy",
                    url: "www.test.com",
                    rating: 4
                })
                .expect(201)
        })
    })

})