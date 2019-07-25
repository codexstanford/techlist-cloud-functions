# Techlist Cloud Functions

We publish various events from within our [GraphQL API](https://github.com/codexstanford/techlist-graphql-service) layer. Much of this repository concerns responding to those events.

## New User

When a new user signs up for an account, we publish a `newuser` event to Google PubSub from our [GraphQL API](https://github.com/codexstanford/techlist-graphql-service).

Our `handleUserRegistration` cloud function listens for these events. When one occurs, the function is executed, iterating over an array of tasks, which represent the various jobs we would like to perform (generally asynchronously) immediately after a user registers, scheduling the jobs by routing the event according to each tasks requirements.

Currently, the only job we have scheduled is `userWelcomeEmail`, which leverages `sendrgi
