import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import Joi from "joi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const readEventSchema = Joi.object({
    eventId: Joi.string().required().min(1).max(36),
    numberOfTicketsPurchased: Joi.number().required().min(1).max(1000000),
});

export const saleEventTicketLambdaHandler = async (event) => {

    const { eventId, numberOfTicketsPurchased } = event.queryStringParameters;
    const { error, value } = readEventSchema.validate(event.queryStringParameters);

    var dataEventType = "event";
    var dataTypeUser = "user";
    var response = {};

    try {
        const readEventData = await ddbDocClient.query({
            TableName: tableName,
            KeyConditionExpression: "pk = :a and sk = :b",
            ExpressionAttributeValues: { ":a": eventId, ":b": dataEventType }
        });

        const readUserData = await ddbDocClient.query({
            TableName: tableName,
            KeyConditionExpression: "pk = :a and sk = :b",
            ExpressionAttributeValues: { ":a": readEventData.Items[0].gsi1, ":b": dataTypeUser }
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

                if (readUserData.Items[0].userType === "Free") {

                    response = {
                        statusCode: 400,
                        body: JSON.stringify({
                            requestDateTime: new Date(),
                            detail: `the event with id: ${eventId} is free`
                        })
                    };

                } else {
                    if (readEventData.Items[0].numberOfTicket === 0) {
                        response = {
                            statusCode: 400,
                            body: JSON.stringify({
                                requestDateTime: new Date(),
                                detail: `Tickets sold out for the event with id: ${eventId}`
                            })
                        };
                    } else {
                        if (numberOfTicketsPurchased > readEventData.Items[0].numberOfTicket) {
                            response = {
                                statusCode: 400,
                                body: JSON.stringify({
                                    requestDateTime: new Date(),
                                    detail: `The amount you specified exceeds the number of current tickets for the event with id: ${eventId}`
                                })
                            };
                        } else {
                            var numberOfActualTicket = readEventData.Items[0].numberOfTicket - numberOfTicketsPurchased;
                            var ticketProfit = (readEventData.Items[0].ticketPrice * numberOfTicketsPurchased) + readEventData.Items[0].totalSalesValue;

                            await ddbDocClient.update({
                                TableName: tableName,
                                Key: { pk: eventId, sk: dataEventType },
                                UpdateExpression: 'set numberOfTicket = :a, totalSalesValue = :b',
                                ExpressionAttributeValues: {
                                    ":a": numberOfActualTicket,
                                    ":b": ticketProfit
                                }
                            });

                            response = {
                                statusCode: 200,
                                body: JSON.stringify({
                                    requestDateTime: new Date(),
                                    detail: {
                                        descripttion: `successful purchase for event with id: ${eventId}`,
                                        numberOfTicketsPurchased: numberOfTicketsPurchased,
                                        totalSalesValue: readEventData.Items[0].ticketPrice * numberOfTicketsPurchased
                                    }
                                })
                            };
                        }
                    }
                }
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
