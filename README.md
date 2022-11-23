# Serverless Guru Application CRUD REST API

### Local setup

1. Run `npm install`
2. Setup AWS keys locally for local testing and to have access to DynamoDB remotely:

`.env` file:

```bash
AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY>
AWS_SECRET_ACCESS_KEY=<SECRET_KEY>
```

3. Deploy manually to chosen stage

```bash
sls deploy --stage dev
```

3. Run `sls offline` to run local environment.
4. CURL for Create an Article:

```bash
curl --location --request PUT 'http://localhost:4000/articles/3bd530a0-6187-11ed-82bb-c7c7478d55fc' \
--header 'Content-Type: application/json' \
--data-raw '{
        "title": "(UPDATED 2) Passing my application as a Serverless Guru Engineer",
        "description": "(UPDATED 2) I'\''m not actually started with NodeJS developing web applications, I'\''m more of a Ruby developer, fortunately Ruby 2.7 is supported by AWS Lambda does learning Serverless Framework is favorable on my end. I also worked on a simple PDF Generator Lambda function created via NodeJS with the help of Knex module to communicate with our existing RDS DB."
}'
```

5. CURL for Listing all Articles:

```bash
curl --location --request GET 'http://localhost:4000/articles'
```

6. CURL for Show specific Article based on ID:

```bash
curl --location --request GET 'http://localhost:4000/articles/3bd530a0-6187-11ed-82bb-c7c7478d55fc'
```

7. CURL for Delete specific Article by ID:

```bash
curl --location --request DELETE 'http://localhost:4000/articles/3bd530a0-6187-11ed-82bb-c7c7478d55fc'
```

8. CURL for Updating specific Article by ID:

```bash
curl --location --request PUT 'http://localhost:4000/articles/3bd530a0-6187-11ed-82bb-c7c7478d55fc' \
--header 'Content-Type: application/json' \
--data-raw '{
        "title": "(UPDATED) Passing my application as a Serverless Guru Engineer",
        "description": "(UPDATED) I'\''m not actually started with NodeJS developing web applications, I'\''m more of a Ruby developer, fortunately Ruby 2.7 is supported by AWS Lambda does learning Serverless Framework is favorable on my end. I also worked on a simple PDF Generator Lambda function created via NodeJS with the help of Knex module to communicate with our existing RDS DB."
}'
```

### Automated deployment process via Github Actions:

1. Basically when you push something it will trigger a deployment workflow.
2. Stage parameter will be based on the branch name, so if we need to support multiple stages or environments (e.g.: dev, staging, master), we need to push to specific branch equivalent to the stage name.
