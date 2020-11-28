const { Octokit } = require("@octokit/rest");
const { createAppAuth } = require("@octokit/auth-app");


const privateKey = "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAwdyoHqECjWCYKFZDGA+1ZrPpjO+8618pQHgqbCY38O6SlBbR\ncXwayaYqXROmHJEO0trkApX8trd+wZGLAB5OcS53FJt2RfC2c2rvuavsSKM9UbPA\nuYf3+lPbfI1tCGtBPlF/dO8TEv4wd/ubZhXVXHUwEQyOV03D0BxuY1FFeq9GDhVt\nWYP6PuiAGkf+bKIJh2Eh37EO00swmK6MaJWnx45qisnrqOnvouMg/eCjLyopsqjm\n2XJBfiSMuoL5CHxh3/XT++MnOE/RmstZYrkU0+tQ88pcgBhEjeUI+iJ0vVprz3kp\nHvxzxaWKs1zOirbL8yXm+WxzcQFNX1AUaPj81QIDAQABAoIBAQCaHVT5pH5m7heI\nWatVAYfwca6FgEDrzOb6fY0cFPX7721PlSRD16lkDVk4TVqM8zSZo7IH7DzO9Okr\n8QxTt8Qcbhf0pfJMf6RL9QNG08ovpLYmsYPQ+qrEss2WIsg/HSTs6dUtnLHJM5JM\nkBVl/o1zxyXDJ/wwo327gB6xjfZyJGjMhkTnP+8aEWeL5yb36asVqck1zTz2rP4E\nMKZhPSS/6ROspCUkVgP6SuUTxnm5TQ+LSI0YeJD4hZ8K0tbQsjJw8SeITbOZ9yZc\nmuGgfUokK7Cp0lzsd+RCrnSCUMO4HVASC6Tq8fivH5gZZVxiULky3bM4ifp0jRGn\nCmtQGnyBAoGBAPZD6DbAWYIiI8Qfxj/mDf1DM+g4fZYLcTRCZ0QgBK617d4QMxFC\n+Hwn8Y8Gl5U+uEZs+/rFkkFUetgEfy0OzLsbZkopwhqGMnL/jsCUeB+RS7RSErwi\nvFupFSXWNQACi6xiRm2hzuK21uIxWps0awaLN/+0vwZy/GXlY+PJgcV9AoGBAMmG\nc6Xk8xdDx7vGi/NSgqiaAO3yK8X24AkvbZONC4JPpdZ9Q18kdV7hfJv6BQDPpcB7\nZAqYl//DqbVCVrsTIj3RJD33hovDiOXUpDRaxOfPNATaJnHZI52auIqr7jZmpFUZ\nS2Jc2g5yv8ORNsmJ2CVhhwB0UGfoskQMaEbmE1Q5AoGBAOxXX5SsJTru6MRgejL4\n5pQY2sgS7vQBJzOwRsrqr5O8pfxoL5pxW2hMLVfGS9O/zbpI/cs9sY9hNEP8jNEB\nUxp+wTyLtu0dvW0ANlA8LMye9Lipy7Ei5QJS0yjs2xCXYNSfvFea4qJSNwf9tace\nN1igY63UGUBnOjPQYn1J9nFBAoGAEHdu/bAueMkuCdbYWqJ0UKh8yPSPxRY+CiIY\n9wSAWz5804Dav2xwNreAAhK00/MjnQ24B/GeAeUP+eKYyaJvmtN6/aE7GjJ4/iaY\n4DpGepaArqDQoV7XvSoGSDZyOXm7lcSCV2A05RdVOfqkmmUsBynn6Q6X/1WRM2Q8\nJQbpr2kCgYBCNLlWilSVzXquWpifP5dDfwZd5rWt2iEE6EE/q4mlvp/q/tzi87zt\nzxZPcgVV5KfLseBS4Du/pfQN5oWM5X+cf5UkzKgDDI1homaPqdMFX6b/L0P84ilk\ntOZgxmpU1rF6qYt66YZj69zLBuicOh2/z0OdzEncWsYkJUtUqJakoA==\n-----END RSA PRIVATE KEY-----\n"

const owner = "Mailoop"
const repo = "app"

module.exports = async function (context, req) {
    console.log(req.headers.authorization)
    console.log(`${process.env.PRIVATE_KEY}`)
    console.log(privateKey)
    const { body: {issue_number, body}} = req
    const octokit = new Octokit({
        authStrategy: createAppAuth,
            auth: {
            appId: 69508,
            privateKey: privateKey,
            clientId: "Iv1.6337a70d7cb48b2d",
            clientSecret: process.env.CLIENT_SECRET,
            installationId: 9889932,
        },
    });

    const { status, data } = await octokit.issues.createComment({
        owner,
        repo,
        issue_number,
        body,
    })

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data ,
        status
    };

}