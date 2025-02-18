const request = require("supertest");
const { app, server } = require("./index");

describe("api endpoints", () => {
    afterAll((done) => {
        if(server) {
            server.close(done);
        } else{
            done();
        }
    });

    it('should return response from /api/auth', async () => {
        const res = await request(app).get("/api/auth");
        expect(res.status).toBe(200);
    });

    it('should return response from /api/users', async () => {
        const res = await request(app).get("/api/users");
        expect(res.status).toBe(200);
    });
});