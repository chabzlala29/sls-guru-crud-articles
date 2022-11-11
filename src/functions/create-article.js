require('dotenv').config()

const { getSuccessResponse } = require("../helper/success");
const { getErrorResponse } = require("../helper/error");

const uuid = require("uuid");
const AWS = require("aws-sdk");
const dynamoose = require("dynamoose")
const ddb = new dynamoose.aws.ddb.DynamoDB();

const { ArticlesModel } = require("../models/articles-model")

module.exports.main = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { title, description }  = requestBody;

    const result = await ArticlesModel.create({
      id: uuid.v1(),
      title,
      description
    });

    return getSuccessResponse(result)
  } catch(err) {
    return getErrorResponse(err)
  }
}
