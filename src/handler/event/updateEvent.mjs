import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import Joi from "joi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const updateEventSchema = Joi.object({
    eventId: Joi.string().required().min(1).max(36),
    eventName: Joi.string().required().min(3).max(50),
    eventCategory: Joi.string().required().min(3).max(10),
    eventGameName: Joi.string().required().min(3).max(20),
    numberOfTicket: Joi.number().required().min(1).max(100000),
    ticketPrice: Joi.number().required().min(1).max(100000)
});

export const updateEventLambdaHandler = async (event) => {

    const { eventId, eventName, eventCategory, eventGameName, numberOfTicket, ticketPrice } = JSON.parse(event.body);
    const { error, value } = updateEventSchema.validate(JSON.parse(event.body));

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
                await ddbDocClient.update({
                    TableName: tableName,
                    Key: { pk: eventId, sk: dataEventType },
                    UpdateExpression: 'set eventName = :a, eventCategory = :b, eventGameName = :c , numberOfTicket = :d, ticketPrice = :e',
                    ExpressionAttributeValues: {
                        ":a": eventName,
                        ":b": eventCategory,
                        ":c": eventGameName,
                        ":d": numberOfTicket,
                        ":e": ticketPrice
                    }
                });

                response = {
                    statusCode: 201,
                    body: JSON.stringify({
                        requestDateTime: new Date(),
                        detail: `Event with id: ${eventId} was update successfully`
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