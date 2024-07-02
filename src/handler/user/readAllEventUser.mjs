import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import Joi from "joi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const readUserSchema = Joi.object({
    userName: Joi.string().required().alphanum().case('lower').min(3).max(10),
});

export const readAllEventUserLambdaHandler = async (event) => {

    const userName = event.pathParameters.userName;
    const { error, value } = readUserSchema.validate(event.pathParameters);

    var dataType = "user";
    var response = {};

    const readData = await ddbDocClient.query({
        TableName: tableName,
        KeyConditionExpression: "pk = :a and sk = :b",
        ExpressionAttributeValues: { ":a": userName, ":b": dataType }
    });

    try {

        if (error) {
            response = {
                statusCode: 400,
                body: JSON.stringify({
                    requestDateTime: new Date(),
                    detail: error.details[0].message
                })
            };
        } else {
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
                            type: readUserData[0].userType
                        }
                    })
                };
            }
        }
    } catch (error) {
        var response = {
            statusCode: 400,
            body: JSON.stringify({
                requestDateTime: new Date(),
                detail: error.code + ": " + error.message
            })
        };

        return response;
    }

    return response;

}

