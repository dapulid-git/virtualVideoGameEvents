import * as chaiModule from "chai";
import chaiHttp from "chai-http";

const chai = chaiModule.use(chaiHttp);

//-----Create User unit Test-----

describe('Test 1 - HTTP POST create user successful response', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createUser')
            .send('{ "userName": "dapulid", "userType": "Free"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(201);
    });
});

describe('Test 2 - HTTP POST create user business error response.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createUser')
            .send('{ "userName": "dapulid", "userType": "Free"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
    });
});


//-----Read User unit Test-----

describe('Test 3 - HTTP GET read user successful response', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .get('/readUser/dapulid')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(200);
    });
});



describe('Test 4 - HTTP GET read user business error response.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .get('/readUser/dapulidw')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
    });
});

//-----Update User unit Test-----

describe('Test 5 - HTTP POST update user successful response.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateUser')
            .send('{"userName": "dapulid","usernameChange": "dapulid10","userType": "Free"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(201);
    });
});

describe('Test 6 - HTTP POST update user business error response.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateUser')
            .send('{"userName": "dapulid","usernameChange": "dapulid10","userType": "Free"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
    });
});


// //-----Delete User unit Test-----

describe('Test 7 - HTTP DELETE delete user successful response.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .delete('/deleteUser/dapulid10')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(200);
    });
});

describe('Test 8 - HTTP DELETE delete user business error response.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .delete('/deleteUser/dapulid10')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
    });
});


//-----Create Event unit Test-----

describe('Test 9 - HTTP POST create event successful response.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "lapulid","eventName": "the great push","eventCategory": "MMORPG","eventGameName": "WOW","numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(201);
    });
});

describe('Test 10 - HTTP POST create event business error response.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "lapulids","eventName": "the great push","eventCategory": "MMORPG","eventGameName": "WOW","numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
    });
});



//-----Read Event unit Test-----

describe('Test 11 - HTTP GET read event successful response.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .get('/readEvent/cf130ff1-d7aa-485b-b671-a4717dbf78fe')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(200);
    });
});

describe('Test 12 - HTTP GET read event business error response.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .get('/readEvent/cf130ff1-d7aa-485b-b671-a4717dbf78f4')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
    });
});

//-----Update Event unit Test-----


describe('Test 13 - HTTP POST update event successful response.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "cf130ff1-d7aa-485b-b671-a4717dbf78fe","eventName": "CAndy crush event","eventCategory": "ARCADE","eventGameName": "CAndy crush", "numberOfTicket": 6000, "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(201);
    });
});

describe('Test 14 - HTTP POST update event business error response.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "cf130ff1-d7aa-485b-b671-a4717dbf78f2","eventName": "CAndy crush event","eventCategory": "ARCADE","eventGameName": "CAndy crush", "numberOfTicket": 6000, "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
    });
});


//-----Create monitoring Event unit Test-----

describe('Test 15 - HTTP POST create monitoring event successful response.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createMonitoringEvent')
            .send('{ "eventId": "cf130ff1-d7aa-485b-b671-a4717dbf78fe","userName": "lapulid","monitoringEventName": "DashBoard#2"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(201);
    });
});

describe('Test 16 - HTTP POST create monitoring event business error response.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createMonitoringEvent')
            .send('{ "eventId": "cf130ff1-d7aa-485b-b671-a4717dbf78f6","userName": "lapulid","monitoringEventName": "DashBoard#1"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
    });
});


// //-----Read monitoring Event unit Test-----

describe('Test 17 - HTTP GET read monitoring event successful response.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .get('/readMonitoringEvent/0245ac01-7156-4f53-a0ea-b8dd4dc90e55')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(200);
    });
});

describe('Test 18 - HTTP GET read monitoring event business error response.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .get('/readMonitoringEvent/8ee91ae1-3d7a-4e73-83ea-51a0730a4c32')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
    });
});

//-----Update monitoring Event unit Test-----

describe('Test 19 - HTTP POST Update monitoring event successful response.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateMonitoringEvent')
            .send('{"monitoringEventId": "0245ac01-7156-4f53-a0ea-b8dd4dc90e55","amountOfAudiences": 500,"amountOfParticipants": 200}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(201);

    });
});

describe('Test 20 - HTTP POST Update monitoring event business error response.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateMonitoringEvent')
            .send('{"monitoringEventId": "0245ac01-7156-4f53-a0ea-b8dd4dc90e53","amountOfAudiences": 500,"amountOfParticipants": 200}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);

    });
});