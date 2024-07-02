import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import Joi from "joi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const readEventSchema = Joi.object({
    eventId: Joi.string().required().min(1).max(36),
});

export const deleteEventLambdaHandler = async (event) => {

    const eventId = event.pathParameters.eventId;
    const { error, value } = readEventSchema.validate(event.pathParameters);

    var dataEventType = "event";
    var response = {};

    try {
        const readEventData = await ddbDocClient.query({
            TableName: tableName,
            KeyConditionExpression: "pk = :a and sk = :b",
            ExpressionAttributeValues: { ":a": eventId, ":b": dataEventType }
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
            if (readEventData.Count === 0) {
                response = {
                    statusCode: 400,
                    body: JSON.stringify({
                        requestDateTime: new Date(),
                        detail: `Event with id: ${eventId} not found.`
                    })
                };
            } else {
                await ddbDocClient.delete({
                    TableName: tableName,
                    Key: {
                        pk: eventId,
                        sk: dataEventType
                    }
                });

                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        requestDateTime: new Date(),
                        detail: `Event with id: ${eventId} was delete successfully`
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