import { expect } from 'chai';
import sinon from 'sinon';
import { AccountResponse, ApiResponse, ProfileCreation } from '../src/handler';

const LambdaTester = require('lambda-tester');

const account = require('../src/handler').account;
const profile = require('../src/handler').profile;
const profileUpdate = require('../src/handler').profileUpdate;
const dependent = require('../src/handler').dependent;

describe('Account Test', () => {
    it('success', async () => {

        await LambdaTester(account)
            .event({})
            .expectResult((result: ApiResponse) => {
                expect(result.statusCode).to.equal(200);

                let accountResponse: AccountResponse = JSON.parse(result.body) as AccountResponse;

                expect(accountResponse.account.firstName).to.exist;
                expect(accountResponse.account.lastName).to.exist;
                expect(accountResponse.account.email).to.exist;
                expect(accountResponse.account.locale).to.exist;
            });
    });
});

describe('Profile Creation Test', () => {
    it('success', async () => {

        await LambdaTester(profile)
            .event({})
            .expectResult((result: ApiResponse) => {
                expect(result.statusCode).to.equal(200);

                let profileResponse: ProfileCreation = JSON.parse(result.body) as ProfileCreation;
                expect(profileResponse.userID).to.exist;
            });
    });
});

describe('Profile Update Test', () => {
    it('success', async () => {

        await LambdaTester(profileUpdate)
            .event({})
            .expectResult((result: ApiResponse) => {
                expect(result.statusCode).to.equal(200);
            });
    });
});

describe('Dependent Creation Test', () => {
    it('success', async () => {

        await LambdaTester(dependent)
            .event({})
            .expectResult((result: ApiResponse) => {
                expect(result.statusCode).to.equal(200);

                let profileResponse: ProfileCreation = JSON.parse(result.body) as ProfileCreation;
                expect(profileResponse.userID).to.exist;
            });
    });
});