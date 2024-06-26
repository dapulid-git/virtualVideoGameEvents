import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);

const tableName = process.env.USER_TABLE;

export const readUserLambdaHandler = async (event) => {

    const userId = event.pathParameters.userId;
    var response = {};
    var readParams = {
        TableName: tableName,
        Key: { userId: userId },
    };

    let isvalid = validate(userId, "userId", "String", 10, 2);


    if (isvalid === "isValid") {
        const readData = await ddbDocClient.get(readParams);

        if (readData.Item) {
            let item = readData.Item;
            response = {
                statusCode: 200,
                body: JSON.stringify(item)
            };
        } else {
            response = {
                statusCode: 400,
                body: JSON.stringify({
                    title: "Bad Request",
                    code: 400,
                    detail: `User with id ${userId} not found.`
                })
            };
        }
        return response;
    } else {
        return isvalid;
    }

};

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