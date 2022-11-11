require('dotenv').config()

const uuid = require("uuid");
const AWS = require("aws-sdk");

AWS.config.setPromisesDependency(require("bluebird"));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const title = requestBody.title;
  const description = requestBody.description;

  if (typeof title !== 'string' || typeof description !== 'string') {
    console.error('Validation Failed!');
    callback(new Error("Cannot create Article record due to validation errors."))
  }

  createArticle(articleInfo(title, description))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully created article with title ${title}`,
          articleId: res.id
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to create article with title ${title}`
        })
      })
    });
}

module.exports.list = (event, context, callback) => {
    var params = {
        TableName: process.env.ARTICLE_TABLE,
        ProjectionExpression: "id, title, description"
    };

    console.log("Scanning Article table.");

    const onScan = (err, data) => {

        if (err) {
            console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
            callback(err);
        } else {
            console.log("Scan succeeded.");
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    articles: data.Items
                })
            });
        }

    };

    dynamoDb.scan(params, onScan);
};

const createArticle = article => {
  console.log("Creating article...");
  const articleInfo = {
    TableName: process.env.ARTICLE_TABLE,
    Item: article
  };

  return dynamoDb.put(articleInfo).promise()
    .then(res => article);
};

const articleInfo = (title, description) => {
  const timestamp = new Date().getTime();

  return {
    id: uuid.v1(),
    title: title,
    description: description,
    createdAt: timestamp,
    updatedAt: timestamp
  }
};
