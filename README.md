# Digital Health Platform Technical Interview

The goal of this project is assess how you would architect a two APIs that exist as part of a larger project. We'll do a code review using screen sharing during your interview, and you should be ready to answer questions related to your approach, and be ready to explain how you might change the structure if given new requirements. 

This project is setup similar to how we develop our software at Teva, so you can find Swagger documents found in ./swagger for these APIs with example payloads. There's also a Postman collection provided to make it easier to test as you go.

### Assignment
Using the following project scaffolding implement two user stories:

#### Story 1

**User Story:** As a user I want the ability to see my account data.

**API:** /account

**Method:** GET

#### Story 2

**User Story:** As a user I want the ability to create an account.

**API:** /account/profile

**Method:** POST

#### Interview Requirements:

- Implement the APIs using the Serverless framework using NodeJS and TypeScript.
- Refactor the existing code in any way you see fit, but imagine this would be deployed into production.
- The current project configuration was provided merely as a convenience; replace or add any libraries you might need to complete the task.
- The project should function completely in offline mode.
- Don't worry about authentication.

## Development Environment

You'll need NodeJS. https://nodejs.org/en/

Run the following commands to get setup:

1. npm install serverless-dynamodb-local
2. npm install serverless-offline
3. serverless dynamodb install
4. npm install

## NPM Commands

### Run Project

This will start an offline version of DynamoDB and the existing serverless project.

1. npm run offline

### Test Project

1. npm run test

## DynamoDB Offline

This project uses an offline version of dyanmoDB. You can find seed data in ./seed/profiles.json, and you may modify in any way you might need to complete this task. The database is in memory, so the database will be repopulated between restarts of serverless.
