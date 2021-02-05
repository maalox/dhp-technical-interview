import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import AWS = require('aws-sdk');


// Fake Configuration just to get dynamoDB offline to start.
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx'
});

// DynamoDB Driver for offline mode.
export class DynamoDbDriver {

    private _documentClient: DocumentClient;

    constructor() {
        let options: any = {
            convertEmptyValues: true,
            disableAssumeRole: false,
            maxRetries: 9,
            httpOptions: {

                timeout: 5000
            }
        };

        options.region = 'localhost';
        options.endpoint = 'http://localhost:8000';

        this._documentClient = new AWS.DynamoDB.DocumentClient(options)
    }

    get client() {
        return this._documentClient;
    }
}

