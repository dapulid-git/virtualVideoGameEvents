import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from "crypto"
import Joi from "joi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const createEventSchema = Joi.object({
    eventId: Joi.string().required().min(1).max(36),
    userName: Joi.string().required().alphanum().min(3).max(10),
    monitoringEventName: Joi.string().required().min(5).max(50),
});


export const createMonitoringEventLambdaHandler = async (event) => {

    const { eventId, userName, monitoringEventName } = JSON.parse(event.body);
    const { error, value } = createEventSchema.validate(JSON.parse(event.body));

    const dataTypeEvent = "event";
    const dataTypeUser = "user";
    const dataTypeMonitoringEvent = "monitoring"
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

            const readAllEventData = await ddbDocClient.query({
                TableName: tableName,
                IndexName: "gsi1-sk-index",
                KeyConditionExpression: "gsi1 = :a and sk = :b",
                ExpressionAttributeValues: { ":a": readUserData.Items[0].pk, ":b": dataTypeEvent }
            });

            var readEventDataFromQuery = "";

            for (let index = 0; index < readAllEventData.Items.length; index++) {
                const element = readAllEventData.Items[index];

                if (element.pk === eventId) {
                    readEventDataFromQuery = element.pk
                }

            }

            if (readUserData.Items[0].userType === "Free") {
                if (readEventDataFromQuery === "") {
                    response = {
                        statusCode: 400,
                        body: JSON.stringify({
                            requestDateTime: new Date(),
                            detail: `Event with id: ${eventId} not found.`
                        })
                    };
                } else {

                    const readMonitoringEventData = await ddbDocClient.query({
                        TableName: tableName,
                        IndexName: "gsi1-sk-index",
                        KeyConditionExpression: "gsi1 = :a and sk = :b",
                        ExpressionAttributeValues: { ":a": readEventDataFromQuery, ":b": dataTypeMonitoringEvent }
                    });

                    if (readMonitoringEventData.Count === 0) {
                        await ddbDocClient.put({
                            TableName: tableName,
                            Item: {
                                pk: UUID,
                                sk: dataTypeMonitoringEvent,
                                monitoringEventName: monitoringEventName,
                                amountOfAudiences: 0,
                                amountOfParticipants: 0,
                                gsi1: readEventDataFromQuery
                            }
                        });

                        response = {
                            statusCode: 201,
                            body: JSON.stringify({
                                requestDateTime: new Date(),
                                detail: `Monitoring event  ${monitoringEventName} was created successfully with id ${UUID}`
                            })
                        };
                    } else {
                        if (readMonitoringEventData.Count >= 1) {
                            response = {
                                statusCode: 400,
                                body: JSON.stringify({
                                    requestDateTime: new Date(),
                                    detail: `user ${userName} cannot create more monitoring events.`
                                })
                            };
                        } else {
                            await ddbDocClient.put({
                                TableName: tableName,
                                Item: {
                                    pk: UUID,
                                    sk: dataTypeMonitoringEvent,
                                    monitoringEventName: monitoringEventName,
                                    amountOfAudiences: 0,
                                    amountOfParticipants: 0,
                                    gsi1: readEventDataFromQuery
                                }
                            });

                            response = {
                                statusCode: 201,
                                body: JSON.stringify({
                                    requestDateTime: new Date(),
                                    detail: `Monitoring event  ${monitoringEventName} was created successfully`
                                })
                            };
                        }
                    }
                }
            } else {
                if (readEventDataFromQuery === "") {
                    response = {
                        statusCode: 400,
                        body: JSON.stringify({
                            requestDateTime: new Date(),
                            detail: `Event with id: ${eventId} not found.`
                        })
                    };
                } else {

                    const readMonitoringEventData = await ddbDocClient.query({
                        TableName: tableName,
                        IndexName: "gsi1-sk-index",
                        KeyConditionExpression: "gsi1 = :a and sk = :b",
                        ExpressionAttributeValues: { ":a": readEventDataFromQuery, ":b": dataTypeMonitoringEvent }
                    });

                    if (readMonitoringEventData.Count === 0) {
                        await ddbDocClient.put({
                            TableName: tableName,
                            Item: {
                                pk: UUID,
                                sk: dataTypeMonitoringEvent,
                                monitoringEventName: monitoringEventName,
                                amountOfAudiences: 0,
                                amountOfParticipants: 0,
                                gsi1: readEventDataFromQuery
                            }
                        });

                        response = {
                            statusCode: 201,
                            body: JSON.stringify({
                                requestDateTime: new Date(),
                                detail: `Monitoring event  ${monitoringEventName} was created successfully`
                            })
                        };
                    } else {
                        if (readMonitoringEventData.Count >= 5) {
                            response = {
                                statusCode: 400,
                                body: JSON.stringify({
                                    requestDateTime: new Date(),
                                    detail: `user ${userName} cannot create more monitoring events.`
                                })
                            };
                        } else {
                            if (readMonitoringEventData.Items[0].monitoringEventName === monitoringEventName && readMonitoringEventData.Items[0].gsi1 === readEventDataFromQuery) {
                                response = {
                                    statusCode: 400,
                                    body: JSON.stringify({
                                        requestDateTime: new Date(),
                                        detail: `There is already a monitor for event id: ${eventId} with that name.`
                                    })
                                };
                            } else {
                                await ddbDocClient.put({
                                    TableName: tableName,
                                    Item: {
                                        pk: UUID,
                                        sk: dataTypeMonitoringEvent,
                                        monitoringEventName: monitoringEventName,
                                        amountOfAudiences: 0,
                                        amountOfParticipants: 0,
                                        gsi1: readEventDataFromQuery
                                    }
                                });

                                response = {
                                    statusCode: 201,
                                    body: JSON.stringify({
                                        requestDateTime: new Date(),
                                        detail: `Monitoring event  ${monitoringEventName} was created successfully id: ${UUID}`
                                    })
                                };
                            }
                        }
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