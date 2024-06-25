import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);

const tableName = process.env.USER_TABLE;

export const createUserLambdaHandler = async (event) => {

  const { userId, userName, userType } = JSON.parse(event.body);

  var response = {};

  var readParams = {
    TableName: tableName,
    Key: { userId: userId }
  };

  var createParams = {
    TableName: tableName,
    Item: {
      userId: userId,
      userName: userName,
      userType: userType
    }
  };

  try {
    const readData = await ddbDocClient.get(readParams);

    if (readData.Item) {
      if (readData.Item.userId === userId) {
        response = {
          statusCode: 400,
          body: JSON.stringify({
            title: "Bad Request",
            code: 400,
            detail: `User with id: ${userId} is already registered.`
          })
        };
      }
    } else {
      await ddbDocClient.put(createParams);

      response = {
        statusCode: 201,
        body: JSON.stringify({
          detail: `User: ${userName} with id: ${userId} was created successfully`
        })
      };
    }

  } catch (err) {
    throw new Error(err.stack);
  }

  return response;
};
