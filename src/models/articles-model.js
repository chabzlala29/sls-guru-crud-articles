const dynamoose = require("dynamoose");

const schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    title: String,
    description: String
  },
  {
    timestamps: true,
  }
);

const ArticlesModel = dynamoose.model("articlestable", schema, {
  create: true,
  throughput: "ON_DEMAND",
});

module.exports = { ArticlesModel };
