<h1 align="center">Welcome to LambdaS3Upload 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/sebastianserrano/lambda-s3#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/sebastianserrano/lambda-s3/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/sebastianserrano/lambda-s3/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> Upload file to s3 bucket via lambda function

### 🏠 [Homepage](https://github.com/sebastianserrano/lambda-s3#readme)

```
.
├── README.MD                   <-- This instructions file
├── event.json                  <-- API Gateway Proxy Integration event payload
├── upload                      <-- Source code for a lambda function
│   └── app.js                  <-- Lambda function code
│   └── package.json            <-- NodeJS dependencies and scripts
│   └── tests                   <-- Unit tests
│       └── upload.test.js
├── template.yaml               <-- SAM template
```

### Local development

**Invoking function locally using a local sample payload**

```bash
sam local invoke LambdaS3Upload --event event.json
```
 
**Invoking function locally through local API Gateway**

```bash
sam local start-api
```

If the previous command ran successfully you should now be able to hit the following local endpoint to invoke your function `http://localhost:3000/upload`

## Packaging and deployment

AWS Lambda NodeJS runtime requires a flat folder with all dependencies including the application. SAM will use `CodeUri` property to know where to look up for both application and dependencies:

```yaml
...
    LambdaS3Upload:
        Type: AWS::Serverless::Function
        Properties:
            CodeUri: upload/
            ...
```

Firstly, we need a `S3 bucket` where we can upload our Lambda functions packaged as ZIP before we deploy anything - If you don't have a S3 bucket to store code artifacts then this is a good time to create one:

```bash
aws s3 mb s3://BUCKET_NAME
```

Next, run the following command to package our Lambda function to S3:

```bash
sam package \
    --output-template-file packaged.yaml \
    --s3-bucket REPLACE_THIS_WITH_YOUR_S3_BUCKET_NAME
```

Next, the following command will create a Cloudformation Stack and deploy your SAM resources.

```bash
sam deploy \
    --template-file packaged.yaml \
    --stack-name lambda-s3-upload \
    --capabilities CAPABILITY_IAM
```

## Install

```sh
npm install
```

## Run tests

```sh
npm install
npm run test
```

## Author

👤 **Sebastian Serrano**

* Github: [@sebastianserrano](https://github.com/sebastianserrano)

## 📝 License

Copyright © 2019 [Sebastian Serrano](https://github.com/sebastianserrano).<br />
This project is [MIT](https://github.com/sebastianserrano/lambda-s3/blob/master/LICENSE) licensed.
