import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from "crypto"
import Joi from "joi";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client);
const tableName = process.env.USER_TABLE;

const createUserSchema = Joi.object({
  userName: Joi.string().required().alphanum().case('lower').min(3).max(10),
  userType: Joi.string().required().min(3).max(10).valid('Free', 'Paying'),
});

export const createUserLambdaHandler = async (event) => {

  const { userName, userType } = JSON.parse(event.body);
  const { error, value } = createUserSchema.validate(JSON.parse(event.body));

  var dataType = "user";
  var response = {};
  var UUID = randomUUID();

  const readData = await ddbDocClient.query({
    TableName: tableName,
    IndexName: "userName-sk-index",
    KeyConditionExpression: "userName = :a and sk = :b",
    ExpressionAttributeValues: { ":a": userName, ":b": dataType }
  });

  try {
    if (error) {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          requestDateTime: new Date(),
          detail: error.details[0].message
        })
      };
    } else {
      if (readData.Count === 0) {

        await ddbDocClient.put({
          TableName: tableName,
          Item: {
            pk: UUID,
            sk: dataType,
            userName: userName,
            userType: userType
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
    }
  } catch (error) {
    var response = {
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