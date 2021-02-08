"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDbDriver = void 0;
var AWS = require("aws-sdk");
// Fake Configuration just to get dynamoDB offline to start.
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx'
});
// DynamoDB Driver for offline mode.
var DynamoDbDriver = /** @class */ (function () {
    function DynamoDbDriver() {
        var options = {
            convertEmptyValues: true,
            disableAssumeRole: false,
            maxRetries: 9,
            httpOptions: {
                timeout: 5000
            }
        };
        options.region = 'localhost';
        options.endpoint = 'http://localhost:8000';
        this._documentClient = new AWS.DynamoDB.DocumentClient(options);
    }
    Object.defineProperty(DynamoDbDriver.prototype, "client", {
        get: function () {
            return this._documentClient;
        },
        enumerable: false,
        configurable: true
    });
    return DynamoDbDriver;
}());
exports.DynamoDbDriver = DynamoDbDriver;
//# sourceMappingURL=dynamodb.js.map