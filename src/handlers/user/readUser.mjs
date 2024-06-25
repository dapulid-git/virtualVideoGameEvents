export const readUserLambdaHandler  = async (event) => {
  console.log(event);
  const response = {
    statusCode: 201,
    body: JSON.stringify({
      detail: `holaaa`
    })
  };

  return response;
}
