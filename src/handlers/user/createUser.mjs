import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

export const createUserLambdaHandler = async (event) => {

    const { userName, userType } = JSON.parse(event.body);
    var response = {};

    try {

        const readData = await ddbDocClient.query({
            TableName: tableName,
            KeyConditionExpression: "pk = :a",
            ExpressionAttributeValues: { ":a": userName }
        });

        if (readData.Count === 0) {

            await ddbDocClient.put({
                TableName: tableName,
                Item: {
                    pk: userName,
                    sk: userType
                }
            });

            response = {
                statusCode: 201,
                body: JSON.stringify({
                    requestDateTime: new Date(),
                    detail: `User: ${userName} was created successfully`
                })
            };
        } else {
            response = {
                statusCode: 400,
                body: JSON.stringify({
                    requestDateTime: new Date(),
                    detail: `User ${userName} is already registered.`
                })
            };
        }
    } catch (error) {
        return formatError(error);
    }

    return response;

};


function formatError(error) {

  var response = {
      "statusCode": error.statusCode,
      "headers": {
          "Content-Type": "text/plain",
          "x-amzn-ErrorType": error.code
      },
      "isBase64Encoded": false,
      "body": error.code + ": " + error.message
  };

  return response;

}