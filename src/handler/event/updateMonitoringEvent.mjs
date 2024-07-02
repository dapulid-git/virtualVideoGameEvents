import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import Joi from "joi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const createEventSchema = Joi.object({
    monitoringEventId: Joi.string().required().min(1).max(36),
    amountOfAudiences: Joi.number().positive().required().min(1).max(1000000),
    amountOfParticipants: Joi.number().positive().required().min(1).max(1000000),
});

export const updateMonitoringEventLambdaHandler = async (event) => {

    const { monitoringEventId, amountOfAudiences, amountOfParticipants } = JSON.parse(event.body);
    const { error, value } = createEventSchema.validate(JSON.parse(event.body));

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
                await ddbDocClient.update({
                    TableName: tableName,
                    Key: { pk: monitoringEventId, sk: dataTypeMonitoringEvent },
                    UpdateExpression: 'set amountOfAudiences = :a, amountOfParticipants = :b',
                    ExpressionAttributeValues: {
                        ":a": amountOfAudiences,
                        ":b": amountOfParticipants
                    }
                });

                response = {
                    statusCode: 201,
                    body: JSON.stringify({
                        requestDateTime: new Date(),
                        detail: `Event with id: ${monitoringEventId} was update successfully`
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