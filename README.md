# TechList Cloud Functions

We publish various events from within our [GraphQL API](https://github.com/codexstanford/techlist-graphql-service) layer. Much of this repository concerns responding to those events.

## How We Handle New Users

Apart from recording the user's data in our database, when a new user signs up for an account, we publish a `newuser` event to Google PubSub from within our [GraphQL API](https://github.com/codexstanford/techlist-graphql-service) as a side effect. This allows us to further respond to and or monitor the registration in whichever way we see fit without having to bog down our GraphQL API layer with responsibilities that are outside its scope. Right now we're just sending a welcome email, but, as should become apparent below, we could do pretty much anything and for however long. Our GraphQL API simply doesn't care what happens after it publishes an event. Thus, it just carries on unblocked, keeping our server response times nice and speedy.

### handleNewUserRegistration

Our Google Cloud Function, `handleNewUserRegistration`, listens for `newuser` events. As of now, it is the only listener for `newuser` events. When an event occurs, the function is executed and given a list of tasks. The tasks represent the various jobs we would like to perform immediately following user-registration. The primary purpose of this function is to generate and schedule jobs according to the requirements of each task that it is given. To accomplish this, the function iterates over the list of tasks and re/publishes events that trigger appropriate downstream handlers for each task. Because most of the jobs we anticipate running run independent of one another, this approach allows us to take further advantage of doing multiple things asynchronously.

### userWelcomeEmail

At present, we have only one task scheduled: `userWelcomeEmail`. This is the `business-logic` function and it is responsible for generating the appropriate welcome email based upon supplied parameters, etc. However, the function is not responsible for actually sending the email. Once the email has been generated, the function publishes a `sendemail` event and finishes its execution.

### sendEmail

Because we anticipate that we will send various emails in various situations, we created a `sendEmail` function listens for `sendemail` events. It's only responsibility is to proxy events between our upstream functions and (currently) the Sendgrid API. The function will respond to any `sendemail` event, regardless of origin. Thus, when we implement additional functionality going forward, we will not have to duplicate this code each time. Should we ever decide to swap out Sendgrid for a different email provider, doing should be trivial.
