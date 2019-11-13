# Appointment Booking API

Appointment Booking Backend Application using Express.js and MongoDB

## System Requirements

1. NodeJS
2. MongoDB

## Configuration
This is the main server configuration containing:
```
{
  env: 'testing' || 'development' || 'production'
  server: {
    port: 3000,
    host: 'localhost',
    https: false
  },
  jwt: {
    expiration: 86400,
    secret:
      'EOWrMcljCrojXMvIXwv+b1sHjRq+xwSyumbJwX39pJe+VfG2nQcIw5VKlQjLLc7ijdOSoF1qmbN66CdzmkXwyxzOFfy/vVWplk84w05YT/1RtyXwd3OO6o1QpknmO/LH8bLRtktzS2yMOF+2o9g+JaZKulRhDCPMu7wranYEj/hhqBfok96ASYukt0h4/Xv8SDIv63UMQ1il8JHEBG5puOzZfHMgaEtocAasKn0HwBccOoJaxiL/3gNMWAMp+I8lHsgRKRV9+vgrG6eUBtxnCv1zcCDnDqrHLmLi76JUBmzpqACm1JGF67VpxcCcNkhp7Pm1BDRf823TmiueBzyBPl7H0Yi/OkDAZy1tHITzQYNvCk2iK1IQDRtMlBsZPKh6aUn8V7+r0zxX/2K8MSwep5qM4VRSuM9N9n0/UcfFZLodQR6GFSUDbROR7cUTv19viKzxSqetnWwYBvV5QWhMusnbYL+9guJWh4lDd8gfw2EgjUzsCDM6ySDMHgrEZsp028NOM8yojAAxdB30btNjoiTzojwsfUBLVQBWzuDKE19E/xGsqEr+Iu73iSdphb3tOtYpuUMlxUV62UWwjyr/paFEefg3fAsZOCPC77at3aopNQXocoP/hSDqh4TqUqDoR/35VQWJsjlyuGE62wfpZMbFf8qB7oga+oYL6UQRbFI='
  },
  dbUri: 'mongodb://localhost:27017/booking'
}
```
## Running the server

0. Install dependencies
`npm install`

2. Clear database and generate data for development and testing
`npm run populate` 

3. Run in dev mode:
`npm run start`

## Testing 

The project is using jest and supertest testing framework. The test files are under the ``__tests__`` directory, 

Run All Tests :

```> npm test```

Run Routes Tests :

```> npm run test-routes```

Run Models Tests:

```> npm run test-models```

Run Controllers Tests:
```> npm run test-controllers```

Run Authentication Tests:
```> npm run test-auth```

## Dependencies

|Package Name|License|Description|
|------------|-------|-----------|
|bcrypt|MIT|Password hashing and salting|
|body-parser|MIT|Middleware Used for parsing HTTP Request body|
|cors|MIT|Middleware to enable CORS|
|express|MIT|Node JS REST Server framework|
|express-jwt|MIT|Middleware to parse JWTs into user|
|jsonwebtoken|MIT|Library to handle JWT Signing and validation|
|lodash|MIT|Utility class|
|mongoose|[Custom](https://github.com/cesanta/mongoose)|ODM interfacing MongoDB|
|validator|MIT|A library of string validation|


## Dev Dependencies

|Package Name|License|Description|
|------------|-------|-----------|
|@babel-cli  |MIT|Babel Transpiler Command Line|
|@babel-core |MIT|Babel Transpiler (to enable ES6 features)|
|@babel/node |MIT||
|morgan|MIT|Logging library|
|nodemon|MIT|Reruns app on save during development|
|eslint|MIT|Code analysis tool for identifying problematic|
|prettier|MIT|Format code|
|supertest|MIT|Api testing|
|jest|MIT|Simple JavaScript Testing Framework|

## TroubleShooting

If you face an error installing bcrypt package please follow instructions [in this page](https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions)
  

## API Reference

### Authentication
### /auth

#### POST
##### Summary:

user authentification

##### Description:

you may provide a valide email and password

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | please provide a username and password |
| 500 | Unknown Error |

### /sellers

#### GET
##### Summary:

get sellers list

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| filter | query | search seller | No | string |
| offset | query | page number | No | integer |
| limit | query | Page Size | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Invalid request |

#### PATCH
##### Summary:

define seller time slots

##### Description:

update time slots

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Request malformed |
| 401 | Unauthorized - Access token is missing or invalid |
| 403 | Forbidden |
| 500 | Unknown Error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /sellers/{sellerId}

#### GET
##### Summary:

Get seller details by id

##### Description:

Get a specific seller by id

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| sellerId | path | seller id | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Request malformed |
| 500 | Unknown Error |

### /appointments

#### GET
##### Summary:

get appointments of the connected user

##### Description:

get appointments by seller or buyer

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Request malformed |
| 401 | Unauthorized - Access token is missing or invalid |
| 403 | Forbidden |
| 500 | Unknown Error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

#### POST
##### Summary:

Create Appointment

##### Description:

Create Appointment

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Request malformed |
| 401 | Unauthorized - Access token is missing or invalid |
| 403 | Forbidden |
| 500 | Unknown Error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /appointments/seller/{sellerId}

#### GET
##### Summary:

get seller appointments

##### Description:

get appointments by seller

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| sellerId | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Request malformed |
| 401 | Unauthorized - Access token is missing or invalid |
| 403 | Forbidden |
| 500 | Unknown Error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /appointments/buyer/{buyerId}

#### GET
##### Summary:

get buyer appointments

##### Description:

get appointments by buyer

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| buyerId | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Request malformed |
| 401 | Unauthorized - Access token is missing or invalid |
| 403 | Forbidden |
| 500 | Unknown Error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /appointments/{appointmentId}

#### PATCH
##### Summary:

Accept or Reject

##### Description:

Confirm Appointment  accept or reject

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| appointmentId | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Request malformed |
| 401 | Unauthorized - Access token is missing or invalid |
| 403 | Forbidden |
| 500 | Unknown Error |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |
