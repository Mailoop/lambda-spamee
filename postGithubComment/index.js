const { Octokit } = require("@octokit/rest");
const { createAppAuth } = require("@octokit/auth-app");
const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuid} = require('uuid');


const owner = "Mailoop"
const repo = "app"

const asyncForEach = async (array, callback) =>  {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = async function (context, req) {
    const { body: { email: { attachments, subject } } } = req
    const regex = new RegExp(/.*github.*#(\d*)/,"i")
    const issueNumber = subject.match(regex)[1]
    console.log(issueNumber)


    const octokit = new Octokit({
        authStrategy: createAppAuth,
            auth: {
            appId: 69508,
            privateKey: process.env.GITHUB_APP_PRIVATE_KEY.replace(/\\r\\n/g, '\r\n'),
            clientId: "Iv1.6337a70d7cb48b2d",
            clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
            installationId: 9889932,
        },
    });

    const { status, data } = await octokit.issues.createComment({
        owner,
        repo,
        issue_number: issueNumber,
        body: commentBody,
    })

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data ,
        status
    };

}