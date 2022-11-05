module.exports.list = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello World! This is the articles page"
      }
    )
  }
};
