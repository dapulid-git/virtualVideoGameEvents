import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import Joi from "joi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const createEventSchema = Joi.object({
    monitoringEventId: Joi.string().required().min(1).max(36),
});

export const deleteMonitoringEventLambdaHandler = async (event) => {

    const monitoringEventId = event.pathParameters.monitoringEventId
    const { error, value } = createEventSchema.validate(event.pathParameters);

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
                await ddbDocClient.delete({
                    TableName: tableName,
                    Key: {
                        pk: monitoringEventId,
                        sk: dataTypeMonitoringEvent
                    }
                });

                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        requestDateTime: new Date(),
                        detail: `Monitoring event with id: ${monitoringEventId} was delete successfully`
                    })
                };
            }
        }
    } catch (error) {
        let response = {
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