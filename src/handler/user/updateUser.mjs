import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import Joi from "joi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const createUserSchema = Joi.object({
    userName: Joi.string().required().alphanum().case('lower').min(3).max(10),
    usernameChange: Joi.string().required().alphanum().case('lower').min(3).max(10),
    userType: Joi.string().required().min(3).max(10).valid('Free', 'Paying'),
});

export const updateUserLambdaHandler = async (event) => {

    const { userName, usernameChange, userType } = JSON.parse(event.body);
    const { error, value } = createUserSchema.validate(JSON.parse(event.body));
    var response = {};
    var dataTypeUser = "user";
    var dataTypeEvent = "event";

    try {
        const readData = await ddbDocClient.query({
            TableName: tableName,
            IndexName: "userName-sk-index",
            KeyConditionExpression: "userName = :a and sk = :b",
            ExpressionAttributeValues: { ":a": userName, ":b": dataTypeUser }
        });

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

                const readEventData = await ddbDocClient.query({
                    TableName: tableName,
                    IndexName: "gsi1-sk-index",
                    KeyConditionExpression: "gsi1 = :a and sk = :b",
                    ExpressionAttributeValues: { ":a": readData.Items[0].pk, ":b": dataTypeEvent }
                });


                const readDataUsernameChange = await ddbDocClient.query({
                    TableName: tableName,
                    IndexName: "userName-sk-index",
                    KeyConditionExpression: "userName = :a and sk = :b",
                    ExpressionAttributeValues: { ":a": usernameChange, ":b": dataTypeUser }
                });

                if (readData.Items[0].userType === "Paying") {
                    if (readEventData.Count <= 1) {

                        if (readDataUsernameChange.Count === 0 || usernameChange === "false") {
                            await ddbDocClient.update({
                                TableName: tableName,
                                Key: { pk: readData.Items[0].pk, sk: dataTypeUser },
                                UpdateExpression: 'set userName = :a, userType = :b',
                                ExpressionAttributeValues: {
                                    ":a": usernameChange,
                                    ":b": userType
                                }
                            });

                            response = {
                                statusCode: 201,
                                body: JSON.stringify({
                                    requestDateTime: new Date(),
                                    detail: `User: ${userName} was update successfully`
                                })
                            };
                        } else {
                            response = {
                                statusCode: 400,
                                body: JSON.stringify({
                                    requestDateTime: new Date(),
                                    detail: `user ${usernameChange} already exists`
                                })
                            };
                        }
                    } else {
                        response = {
                            statusCode: 400,
                            body: JSON.stringify({
                                requestDateTime: new Date(),
                                detail: `User ${userName} cannot be upgraded to a free user as long as they have more than 1 event created. #: ${readEventData.Count}`
                            })
                        };
                    }
                } else {
                    if (readDataUsernameChange.Count === 0 || usernameChange === "false") {
                        await ddbDocClient.update({
                            TableName: tableName,
                            Key: { pk: readData.Items[0].pk, sk: dataTypeUser },
                            UpdateExpression: 'set userName = :a, userType = :b',
                            ExpressionAttributeValues: {
                                ":a": usernameChange,
                                ":b": userType
                            }
                        });

                        response = {
                            statusCode: 201,
                            body: JSON.stringify({
                                requestDateTime: new Date(),
                                detail: `User: ${userName} was update successfully`
                            })
                        };
                    } else {
                        response = {
                            statusCode: 400,
                            body: JSON.stringify({
                                requestDateTime: new Date(),
                                detail: `user ${usernameChange} already exists`
                            })
                        };
                    }
                }
            }
        }
    } catch (error) {
        response = {
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
