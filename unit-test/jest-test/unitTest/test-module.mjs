import * as chaiModule from "chai";
import chaiHttp from "chai-http";

const chai = chaiModule.use(chaiHttp);

//-----Create User unit Test-----

describe('Test 2 - HTTP POST create user when the username parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createUser')
            .send('{ "userType": "Paying"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 3 - HTTP POST create user when the username parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createUser')
            .send('{ "userName": "dapuliddddd", "userType": "Paying"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userName\" length must be less than or equal to 10 characters long');
    });
});

describe('Test 4 - HTTP POST create user when username parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createUser')
            .send('{ "userName": "dapulid&%", "userType": "Paying"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userName\" must only contain alpha-numeric characters');
    });
});


describe('Test 5 - HTTP POST create user when the userType parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createUser')
            .send('{ "userName": "dapuliddddd"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 6 - HTTP POST create user when the userType parameter does not match the specific restriction.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createUser')
            .send('{ "userName": "dapulid", "userType": "Payingr"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userType\" must be one of [Free, Paying]');
    });
});

//-----Read User unit Test-----

describe('Test 7 - HTTP GET read user when the username parameter exceeds the set length limit.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .get('/readUser/malinsssssssss')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userName\" length must be less than or equal to 10 characters long');
    });
});

describe('Test 8 - HTTP GET read user when the username parameter is not a valid string.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .get('/readUser/malin&')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userName\" must only contain alpha-numeric characters');
    });
});

//-----Update User unit Test-----

describe('Test 9 - HTTP POST update user when the username parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateUser')
            .send('{"usernameChange": "false", "userType": "Paying"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 10 - HTTP POST update user when the username parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateUser')
            .send('{"userName": "falsessssss", "usernameChange": "false", "userType": "Paying"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userName\" length must be less than or equal to 10 characters long');
    });
});

describe('Test 11 - HTTP POST update user when username parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateUser')
            .send('{"userName": "fals$", "usernameChange": "false", "userType": "Paying"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userName\" must only contain alpha-numeric characters');
    });
});


describe('Test 12 - HTTP POST update user when the usernameChange parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateUser')
            .send('{"userName": "false", "userType": "Paying"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 13 - HTTP POST update user when the usernameChange parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateUser')
            .send('{"userName": "false", "usernameChange": "falsessssssssssssss", "userType": "Paying"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"usernameChange\" length must be less than or equal to 10 characters long');
    });
});

describe('Test 14 - HTTP POST update user when usernameChange parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateUser')
            .send('{"userName": "fals", "usernameChange": "false$", "userType": "Paying"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"usernameChange\" must only contain alpha-numeric characters');
    });
});


describe('Test 15 - HTTP POST update user when the userType parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateUser')
            .send('{"userName": "fals", "usernameChange": "false""}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 16 - HTTP POST update user when the userType parameter does not match the specific restriction.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateUser')
            .send('{ "userName": "fals", "usernameChange": "false", "userType": "Payingr"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userType\" must be one of [Free, Paying]');
    });
});

//-----Delete User unit Test-----

describe('Test 17 - HTTP DELETE delete user when the username parameter exceeds the set length limit.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .delete('/deleteUser/malinsssssssss')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userName\" length must be less than or equal to 10 characters long');
    });
});

describe('Test 18 - HTTP DELETE delete user when the username parameter is not a valid string.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .delete('/deleteUser/malin&')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userName\" must only contain alpha-numeric characters');
    });
});

//-----Create Event unit Test-----

describe('Test 19 - HTTP POST create event when the username parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{""eventName": "the great push","eventCategory": "MMORPG","eventGameName": "WOW","numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 20 - HTTP POST create event when the username parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulidsssssssssssssssssssss","eventName": "the great push","eventCategory": "MMORPG","eventGameName": "WOW","numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userName\" length must be less than or equal to 10 characters long');
    });
});

describe('Test 21 - HTTP POST create event when username parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid$","eventName": "the great push","eventCategory": "MMORPG","eventGameName": "WOW","numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userName\" must only contain alpha-numeric characters');
    });
});


describe('Test 22 - HTTP POST create event when the eventName parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventCategory": "MMORPG","eventGameName": "WOW","numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 23 - HTTP POST create event when the eventName parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": "the great pushhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh","eventCategory": "MMORPG","eventGameName": "WOW","numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"eventName\" length must be less than or equal to 50 characters long');
    });
});

describe('Test 24 - HTTP POST create event when eventName parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": 123 ,"eventCategory": "MMORPG","eventGameName": "WOW","numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});


describe('Test 25 - HTTP POST create event when the eventCategory parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": "the great push","eventGameName": "WOW","numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 26 - HTTP POST create event when the eventCategory parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": "the great push","eventCategory": "MMORPGGGGGG","eventGameName": "WOW","numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"eventCategory\" length must be less than or equal to 10 characters long');
    });
});

describe('Test 27 - HTTP POST create event when eventCategory parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": "the great push" ,"eventCategory": 123,"eventGameName": "WOW","numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});


describe('Test 28 - HTTP POST create event when the eventGameName parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": "the great push","eventCategory": "MMORPG","numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 29 - HTTP POST create event when the eventGameName parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": "the great push","eventCategory": "MMORPG","eventGameName": "WOWWOWWOWWOWWOWWOWWOW","numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"eventGameName\" length must be less than or equal to 20 characters long');
    });
});

describe('Test 30 - HTTP POST create event when eventGameName parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": "the great push","eventCategory": "MMORPG","eventGameName": 123,"numberOfTicket": 4000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 31 - HTTP POST create event when the numberOfTicket parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": "the great push","eventCategory": "MMORPG","eventGameName": "WOW", "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 32 - HTTP POST create event when the numberOfTicket parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": "the great push","eventCategory": "MMORPG","eventGameName": "WOW","numberOfTicket": 200000, "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"numberOfTicket\" must be less than or equal to 100000');
    });
});

describe('Test 33 - HTTP POST create event when numberOfTicket parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": "the great push","eventCategory": "MMORPG","eventGameName": "WOW","numberOfTicket": "dsdada", "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 34 - HTTP POST create event when the ticketPrice parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": "the great push","eventCategory": "MMORPG","eventGameName": "WOW","numberOfTicket": 4000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 35 - HTTP POST create event when the ticketPrice parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": "the great push","eventCategory": "MMORPG","eventGameName": "WOW","numberOfTicket": 20000, "ticketPrice": 200000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"ticketPrice\" must be less than or equal to 100000');
    });
});

describe('Test 36 - HTTP POST create event when numberOfTicket parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createEvent')
            .send('{"userName": "dapulid","eventName": "the great push","eventCategory": "MMORPG","eventGameName": "WOW","numberOfTicket": "dsdada", "ticketPrice": 32000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

//-----Read Event unit Test-----

describe('Test 37 - HTTP GET read event when the eventId parameter exceeds the set length limit.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .get('/readEvent/210517b4-3b37-47c3-bb9b-33ba0fb646486')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"eventId\" length must be less than or equal to 36 characters long');
    });
});

//-----Update Event unit Test-----


describe('Test 38 - HTTP POST update event when the eventId parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc13643","eventName": "CAndy crush event","eventCategory": "ARCADE","eventGameName": "CAndy crush", "numberOfTicket": 6000, "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"eventId\" length must be less than or equal to 36 characters long');
    });
});

describe('Test 39 - HTTP POST update event when the eventName parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventCategory": "ARCADE","eventGameName": "CAndy crush", "numberOfTicket": 6000, "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 40 - HTTP POST update event when the eventName parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": "CAndy crush eventtttttttttttttttttttttttttttttttttt","eventCategory": "ARCADE","eventGameName": "CAndy crush", "numberOfTicket": 6000, "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"eventName\" length must be less than or equal to 50 characters long');
    });
});

describe('Test 41 - HTTP POST update event when eventName parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": 123,"eventCategory": "ARCADE","eventGameName": "CAndy crush", "numberOfTicket": 6000, "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});


describe('Test 42 - HTTP POST update event when the eventCategory parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": "CAndy crush event","eventGameName": "CAndy crush", "numberOfTicket": 6000, "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 43 - HTTP POST update event when the eventCategory parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": "CAndy crush event","eventCategory": "ARCADEiiiii","eventGameName": "CAndy crush", "numberOfTicket": 6000, "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"eventCategory\" length must be less than or equal to 10 characters long');
    });
});

describe('Test 44 - HTTP POST update event when eventCategory parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": "CAndy crush event","eventCategory": 123,"eventGameName": "CAndy crush", "numberOfTicket": 6000, "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});


describe('Test 45 - HTTP POST update event when the eventGameName parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": "CAndy crush event","eventCategory": "ARCADE", "numberOfTicket": 6000, "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 46 - HTTP POST update event when the eventGameName parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": "CAndy crush event","eventCategory": "ARCADE","eventGameName": "CAndy crushhhhhhhhhhh", "numberOfTicket": 6000, "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"eventGameName\" length must be less than or equal to 20 characters long');
    });
});

describe('Test 47 - HTTP POST update event when eventGameName parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": "CAndy crush event","eventCategory": "ARCADE","eventGameName": 123, "numberOfTicket": 6000, "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 48 - HTTP POST update event when the numberOfTicket parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": "CAndy crush event","eventCategory": "ARCADE","eventGameName": "CAndy crush","ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 49 - HTTP POST update event when the numberOfTicket parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": "CAndy crush event","eventCategory": "ARCADE","eventGameName": "CAndy crush", "numberOfTicket": 200000, "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"numberOfTicket\" must be less than or equal to 100000');
    });
});

describe('Test 50 - HTTP POST update event when numberOfTicket parameter is not a valid number.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": "CAndy crush event","eventCategory": "ARCADE","eventGameName": "CAndy crush", "numberOfTicket": "asda", "ticketPrice": 30000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 51 - HTTP POST update event when the ticketPrice parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": "CAndy crush event","eventCategory": "ARCADE","eventGameName": "CAndy crush", "numberOfTicket": 6000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

describe('Test 52 - HTTP POST update event when the ticketPrice parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": "CAndy crush event","eventCategory": "ARCADE","eventGameName": "CAndy crush", "numberOfTicket": 6000, "ticketPrice": 300000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"ticketPrice\" must be less than or equal to 100000');
    });
});

describe('Test 53 - HTTP POST update event when numberOfTicket parameter is not a valid number.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateEvent')
            .send('{"eventId": "5132583a-7224-4f45-8b9d-b533affc1364","eventName": "CAndy crush event","eventCategory": "ARCADE","eventGameName": "CAndy crush", "numberOfTicket": 6000, "ticketPrice": "asdas"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    });
});

//-----Delete Event unit Test-----

describe('Test 54 - HTTP DELETE delete event when the eventId parameter exceeds the set length limit.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .delete('/deleteEvent/b423afcf-a2a9-4fb8-b89b-f3f48777a8d53')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"eventId\" length must be less than or equal to 36 characters long');
    });
});

//-----Create monitoring Event unit Test-----

describe('Test 55 - HTTP POST create monitoring event when the eventId parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createMonitoringEvent')
            .send('{"userName": "dapulid","monitoringEventName": "DashBoard#3"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    }); 
});

describe('Test 56 - HTTP POST create monitoring event when the eventId parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createMonitoringEvent')
            .send('{ "eventId": "bf5fe907-5fe6-47fd-8baa-b0a038526cdde","userName": "dapulid","monitoringEventName": "DashBoard#3"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"eventId\" length must be less than or equal to 36 characters long');
    });
});

describe('Test 57 - HTTP POST create monitoring event when the userName parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createMonitoringEvent')
            .send('{ "eventId": "bf5fe907-5fe6-47fd-8baa-b0a038526cdd","monitoringEventName": "DashBoard#3"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    }); 
});

describe('Test 58 - HTTP POST create monitoring event when the userName parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createMonitoringEvent')
            .send('{ "eventId": "bf5fe907-5fe6-47fd-8baa-b0a038526cdd","userName": "dapulidwwww","monitoringEventName": "DashBoard#3"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userName\" length must be less than or equal to 10 characters long');
    });
});

describe('Test 59 - HTTP POST create monitoring event when the userName parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createMonitoringEvent')
            .send('{ "eventId": "bf5fe907-5fe6-47fd-8baa-b0a038526cdd","userName": "$","monitoringEventName": "DashBoard#3"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"userName\" must only contain alpha-numeric characters');
    });
});

describe('Test 60 - HTTP POST create monitoring event when the monitoringEventName parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createMonitoringEvent')
            .send('{ "eventId": "bf5fe907-5fe6-47fd-8baa-b0a038526cdd","userName": "dapulid"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    }); 
});

describe('Test 61 - HTTP POST create monitoring event when the monitoringEventName parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/createMonitoringEvent')
            .send('{ "eventId": "bf5fe907-5fe6-47fd-8baa-b0a038526cdd","userName": "dapulid","monitoringEventName": "DashBoard#DashBoard#DashBoard#DashBoard#DashBoard#1"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"monitoringEventName\" length must be less than or equal to 50 characters long');
    });
});

//-----Read monitoring Event unit Test-----

describe('Test 62 - HTTP GET read monitoring event when the monitoringEventId parameter exceeds the set length limit.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .get('/readMonitoringEvent/6536e32a-e0ac-4edd-bf85-55c6ad055c1d2')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"monitoringEventId\" length must be less than or equal to 36 characters long');
    });
});

//-----Update monitoring Event unit Test-----

describe('Test 63 - HTTP POST Update monitoring event when the monitoringEventId parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateMonitoringEvent')
            .send('{"amountOfAudiences": 500,"amountOfParticipants": 10}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    }); 
});

describe('Test 64 - HTTP POST Update monitoring event when the amountOfAudiences parameter does not exist in the body.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateMonitoringEvent')
            .send('{"monitoringEventId": "8acc476c-208a-4683-949a-3f6d864379a8","amountOfParticipants": 10}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    }); 
});

describe('Test 65 - HTTP POST Update monitoring event when the amountOfAudiences parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateMonitoringEvent')
            .send('{"monitoringEventId": "8acc476c-208a-4683-949a-3f6d864379a8","amountOfAudiences": "$","amountOfParticipants": 10}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    }); 
});

describe('Test 66 - HTTP POST Update monitoring event when the amountOfAudiences parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateMonitoringEvent')
            .send('{"monitoringEventId": "8acc476c-208a-4683-949a-3f6d864379a8","amountOfAudiences": 2000000,"amountOfParticipants": 10}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"amountOfAudiences\" must be less than or equal to 1000000');
    }); 
});

describe('Test 67 - HTTP POST Update monitoring event when the amountOfAudiences parameter parameter must be positive.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateMonitoringEvent')
            .send('{"monitoringEventId": "8acc476c-208a-4683-949a-3f6d864379a8","amountOfAudiences": -500,"amountOfParticipants": 10}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"amountOfAudiences\" must be a positive number');
    }); 
});


describe('Test 68 - HTTP POST Update monitoring event when the amountOfParticipants parameter is not a valid string.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateMonitoringEvent')
            .send('{"monitoringEventId": "8acc476c-208a-4683-949a-3f6d864379a8","amountOfAudiences": 500,"amountOfParticipants": "$"}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].message).to.equal('Invalid request body');
    }); 
});

describe('Test 69 - HTTP POST Update monitoring event when the amountOfParticipants parameter exceeds the set length limit.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateMonitoringEvent')
            .send('{"monitoringEventId": "8acc476c-208a-4683-949a-3f6d864379a8","amountOfAudiences": 500,"amountOfParticipants": 2000000}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"amountOfParticipants\" must be less than or equal to 1000000');
    }); 
});

describe('Test 70 - HTTP POST Update monitoring event when the amountOfParticipants parameter parameter must be positive.', function () {
    it('POST', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .post('/updateMonitoringEvent')
            .send('{"monitoringEventId": "8acc476c-208a-4683-949a-3f6d864379a8","amountOfAudiences": 500,"amountOfParticipants": -10}')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"amountOfParticipants\" must be a positive number');
    }); 
});


//-----Delete monitoring Event unit Test-----

describe('Test 71 - HTTP DELETE delete monitoring event when the monitoringEventId parameter exceeds the set length limit.', function () {
    it('GET', async function () {
        let res = await chai.request.execute('https://au2vif1iac.execute-api.us-east-1.amazonaws.com/Dev')
            .delete('/deleteMonitoringEvent/3caa5bf8-d1c7-499a-8b8c-57e205f52fa72')
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-api-key', 'DYdoOBhbE67zBm0RUzcPQrFUOrJGm6R4Bsm6WdO7')

        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res['_body'].detail).to.equal('\"monitoringEventId\" length must be less than or equal to 36 characters long');
    });
});