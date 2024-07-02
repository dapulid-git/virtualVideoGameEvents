import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from "crypto"
import Joi from "joi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const createEventSchema = Joi.object({
    userName: Joi.string().required().alphanum().min(3).max(10),
    eventName: Joi.string().required().min(3).max(50),
    eventCategory: Joi.string().required().min(3).max(10),
    eventGameName: Joi.string().required().min(3).max(20),
    numberOfTicket: Joi.number().required().min(1).max(100000),
    ticketPrice: Joi.number().required().min(1).max(100000)
});

export const createEventLambdaHandler = async (event) => {

    const { userName, eventName, eventCategory, eventGameName, numberOfTicket, ticketPrice } = JSON.parse(event.body);
    const { error, value } = createEventSchema.validate(JSON.parse(event.body));

    var dataTypeEvent = "event";
    var dataTypeUser = "user";
    var response = {};
    var UUID = randomUUID();

    try {

        const readUserData = await ddbDocClient.query({
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
            if (readUserData.Count === 0) {
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
                    ExpressionAttributeValues: { ":a": readUserData.Items[0].pk, ":b": dataTypeEvent }
                });

                if (readUserData.Items[0].userType === "Free") {
                    if (readEventData.Count === 0) {

                        await ddbDocClient.put({
                            TableName: tableName,
                            Item: {
                                pk: UUID,
                                sk: dataTypeEvent,
                                eventName: eventName,
                                eventCategory: eventCategory,
                                eventGameName: eventGameName,
                                numberOfTicket: numberOfTicket,
                                ticketPrice: 0,
                                totalSalesValue: 0,
                                gsi1: readUserData.Items[0].pk
                            }
                        });

                        response = {
                            statusCode: 201,
                            body: JSON.stringify({
                                requestDateTime: new Date(),
                                detail: `Event: ${eventName} was created successfully - Event code: ${UUID}`
                            })
                        };
                    } else if (readEventData.Count >= 1) {
                        response = {
                            statusCode: 400,
                            body: JSON.stringify({
                                requestDateTime: new Date(),
                                detail: `user ${userName} cannot create more events.`
                            })
                        };
                    }
                } else {
                    if (readEventData.Count === 0) {

                        await ddbDocClient.put({
                            TableName: tableName,
                            Item: {
                                pk: UUID,
                                sk: dataTypeEvent,
                                eventName: eventName,
                                eventCategory: eventCategory,
                                eventGameName: eventGameName,
                                numberOfTicket: numberOfTicket,
                                ticketPrice: ticketPrice,
                                totalSalesValue: 0,
                                gsi1: readUserData.Items[0].pk
                            }
                        });

                        response = {
                            statusCode: 201,
                            body: JSON.stringify({
                                requestDateTime: new Date(),
                                detail: `Event: ${eventName} was created successfully - Event code: ${UUID}`
                            })
                        };
                    } else if (readEventData.Count >= 5) {
                        response = {
                            statusCode: 400,
                            body: JSON.stringify({
                                requestDateTime: new Date(),
                                detail: `user ${userName} cannot create more events.`
                            })
                        };
                    } else {

                        await ddbDocClient.put({
                            TableName: tableName,
                            Item: {
                                pk: UUID,
                                sk: dataTypeEvent,
                                eventName: eventName,
                                eventCategory: eventCategory,
                                eventGameName: eventGameName,
                                numberOfTicket: numberOfTicket,
                                ticketPrice: ticketPrice,
                                totalSalesValue: 0,
                                gsi1: readUserData.Items[0].pk
                            }
                        });

                        response = {
                            statusCode: 201,
                            body: JSON.stringify({
                                requestDateTime: new Date(),
                                detail: `Event: ${eventName} was created successfully - Event code: ${UUID}`
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

};