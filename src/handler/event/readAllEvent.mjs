import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import Joi from "joi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const readEventSchema = Joi.object({
    eventId: Joi.string().required().min(1).max(36),
});

export const readAllEventLambdaHandler = async (event) => {

    //const userName = event.pathParameters.userName;
    //const { error, value } = readEventSchema.validate(event.pathParameters);

    var dataEventType = "event";
    var dataUserType = "user";
    var response = {};
    var arrayObjectEvent = [];
    var objectEvent = {};

    try {
        const readEventData = await ddbDocClient.query({
            TableName: tableName,
            IndexName: "sk-index",
            KeyConditionExpression: "sk = :a",
            ExpressionAttributeValues: { ":a": dataEventType }
        });

        // const readUserData = await ddbDocClient.query({
        //     TableName: tableName,
        //     IndexName: "userName-sk-index",
        //     KeyConditionExpression: "userName = :a and sk = :b",
        //     ExpressionAttributeValues: { ":a": userName, ":b": dataUserType }
        // });

        if (false) {
            response = {
                statusCode: 400,
                body: JSON.stringify({
                    requestDateTime: new Date(),
                    //detail: error.details[0].message
                })
            };
        } else {
            if (readEventData.Count === 0) {
                response = {
                    statusCode: 400,
                    body: JSON.stringify({
                        requestDateTime: new Date(),
                        detail: `Events not found.`
                    })
                };
            } else {

                for (let index = 0; index < readEventData.Items.length; index++) {
                    const element = readEventData.Items[index];

                    const readUserData = await ddbDocClient.query({
                        TableName: tableName,
                        KeyConditionExpression: "pk = :a and sk = :b",
                        ExpressionAttributeValues: { ":a": element.gsi1, ":b": dataUserType }
                    });

                    objectEvent = {
                        userName: readUserData.Items[0].userName,
                        eventCode: element.pk,
                        eventType: readUserData.Items[0].userType,
                        eventName: element.eventName,
                        eventCategory: element.eventCategory,
                        eventGameName: element.eventGameName,
                        numberOfTicket: element.numberOfTicket,
                        ticketPrice: element.ticketPrice
                    }


                    arrayObjectEvent.push(objectEvent);

                }

                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        requestDateTime: new Date(),
                        event: arrayObjectEvent
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