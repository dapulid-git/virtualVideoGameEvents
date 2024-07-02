import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import Joi from "joi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const readUserSchema = Joi.object({
    userName: Joi.string().required().alphanum().min(3).max(10),
});

export const deleteUserLambdaHandler = async (event) => {

    const userName = event.pathParameters.userName;
    const { error, value } = readUserSchema.validate(event.pathParameters);
    var dataTypeUser = "user";
    var dataTypeEvent = "event";
    const dataTypeMonitoringEvent = "monitoring"
    var response = {};

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

                if (readEventData.count === 0) {

                    await ddbDocClient.delete({
                        TableName: tableName,
                        Key: {
                            pk: readUserData.Items[0].pk,
                            sk: dataTypeUser
                        }
                    });

                    response = {
                        statusCode: 200,
                        body: JSON.stringify({
                            requestDateTime: new Date(),
                            detail: `User: ${userName} was delete successfully`
                        })
                    };
                } else {

                    var arraydataMonitoringEvent_1 = [];

                    for (let index = 0; index < readEventData.Items.length; index++) {
                        const element = readEventData.Items[index].pk;

                        const readMonitoringEventData = await ddbDocClient.query({
                            TableName: tableName,
                            IndexName: "gsi1-sk-index",
                            KeyConditionExpression: "gsi1 = :a and sk = :b",
                            ExpressionAttributeValues: { ":a": element, ":b": dataTypeMonitoringEvent }
                        });

                        arraydataMonitoringEvent_1.push(readMonitoringEventData);

                        if (readMonitoringEventData.Count === 0) {
                            await ddbDocClient.delete({
                                TableName: tableName,
                                Key: {
                                    pk: element,
                                    sk: dataTypeEvent
                                }
                            });
                        } else {
                            await deleteAll(readEventData, dataTypeMonitoringEvent);
                            await ddbDocClient.delete({
                                TableName: tableName,
                                Key: {
                                    pk: element,
                                    sk: dataTypeEvent
                                }
                            });
                        }
                    }

                    await ddbDocClient.delete({
                        TableName: tableName,
                        Key: {
                            pk: readUserData.Items[0].pk,
                            sk: dataTypeUser
                        }
                    });

                    response = {
                        statusCode: 200,
                        body: JSON.stringify({
                            requestDateTime: new Date(),
                            detail: `User: ${userName} was delete successfully`
                        })
                    };
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

async function deleteAll(readEventData, dataTypeMonitoringEvent) {

    var arraydataMonitoringEvent_1 = [];

    for (let index = 0; index < readEventData.Items.length; index++) {
        const element = readEventData.Items[index].pk;

        const readMonitoringEventData = await ddbDocClient.query({
            TableName: tableName,
            IndexName: "gsi1-sk-index",
            KeyConditionExpression: "gsi1 = :a and sk = :b",
            ExpressionAttributeValues: { ":a": element, ":b": dataTypeMonitoringEvent }
        });

        arraydataMonitoringEvent_1.push(readMonitoringEventData.Items);

    }

    var arraydataMonitoringEvent_2 = [];

    for (let index = 0; index < arraydataMonitoringEvent_1.length; index++) {
        const element = arraydataMonitoringEvent_1[index];

        for (let index = 0; index < element.length; index++) {
            const element2 = element[index];
            arraydataMonitoringEvent_2.push(element2);
        }
    }

    for (let index = 0; index < arraydataMonitoringEvent_2.length; index++) {
        const element = arraydataMonitoringEvent_2[index].pk;

        await ddbDocClient.delete({
            TableName: tableName,
            Key: {
                pk: element,
                sk: dataTypeMonitoringEvent
            }
        });

    }
}