import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import Joi from "joi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const readMonitoringEventSchema = Joi.object({
    monitoringEventId: Joi.string().required().min(1).max(36),
});


export const readMonitoringEventLambdaHandler = async (event) => {

    const monitoringEventId = event.pathParameters.monitoringEventId;
    const { error, value } = readMonitoringEventSchema.validate(event.pathParameters);
  
    var dataEventType = "event";
    const dataTypeMonitoringEvent = "monitoring"
    var response = {};

    try {
        const readMonitoringEventData = await ddbDocClient.query({
            TableName: tableName,
            KeyConditionExpression: "pk = :a and sk = :b",
            ExpressionAttributeValues: { ":a": monitoringEventId, ":b": dataTypeMonitoringEvent }
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

            if (readMonitoringEventData.Count === 0) {
                response = {
                    statusCode: 400,
                    body: JSON.stringify({
                        requestDateTime: new Date(),
                        detail: `Monitoring event with id: ${monitoringEventId} not found.`
                    })
                };
            } else {

                const readEventData = await ddbDocClient.query({
                    TableName: tableName,
                    KeyConditionExpression: "pk = :a and sk = :b",
                    ExpressionAttributeValues: { ":a": readMonitoringEventData.Items[0].gsi1, ":b": dataEventType }
                });

                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        requestDateTime: new Date(),
                        detail: {
                            eventId: readEventData.Items[0].pk,
                            monitoringEventName: readMonitoringEventData.Items[0].monitoringEventName,
                            eventName: readEventData.Items[0].eventName,
                            eventCategory: readEventData.Items[0].eventCategory,
                            eventGameName: readEventData.Items[0].eventGameName,
                            amountOfAudiences: readMonitoringEventData.Items[0].amountOfAudiences,
                            amountOfParticipants: readMonitoringEventData.Items[0].amountOfParticipants,
                            numberOfTicket: readEventData.Items[0].numberOfTicket,
                            ticketPrice: readEventData.Items[0].ticketPrice,
                            totalSalesValue: readEventData.Items[0].totalSalesValue
                        }
                    })
                };
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