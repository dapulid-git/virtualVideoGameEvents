import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);

const tableName = process.env.USER_TABLE;

export const readUserLambdaHandler = async (event) => {

    const userName = event.pathParameters.userName;
    var response = {};

    try {

        const readData = await ddbDocClient.query({
            TableName: tableName,
            KeyConditionExpression: "pk = :a",
            ExpressionAttributeValues: { ":a": userName }
        });

        if (readData.Count === 0) {
            response = {
                statusCode: 400,
                body: JSON.stringify({
                    requestDateTime: new Date(),
                    detail: `User ${userName} not found.`
                })
            };
        } else {
            let readUserData = readData.Items;
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    requestDateTime: new Date(),
                    user: {
                        name: readUserData[0].pk,
                        type: readUserData[0].sk
                    }
                })
            };
        }
    } catch (error) {
        return formatError(error);
    }

    return response;

}


function validate(data, name, type, maximum, minimum) {

    var response = {};

    switch (type) {
        case "String":
            var patternStr = /^[0-9a-zA-ZáéíóúñÁÉÍÚÓÑ#@.,\-_\s]+$/;
            if (patternStr.test(data) === false) {
                response = {
                    statusCode: 400,
                    body: JSON.stringify({
                        title: "Bad Request",
                        code: 400,
                        detail: `the field ${name} must be a string`
                    })
                };
            } else if (data.length < minimum || data.length > maximum) {
                response = {
                    statusCode: 400,
                    body: JSON.stringify({
                        title: "Bad Request",
                        code: 400,
                        detail: `invalid length for field ${name}`
                    })
                };
            } else {
                response = "isValid";
            }
            break;
    }

    return response;

}


function formatError(error) {

    var response = {
        "statusCode": error.statusCode,
        "headers": {
            "Content-Type": "text/plain",
            "x-amzn-ErrorType": error.code
        },
        "isBase64Encoded": false,
        "body": error.code + ": " + error.message
    };

    return response;

}