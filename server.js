var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
 
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName
    this.age = age
  }

  fullName() {
    return this.firstName + ' ' + this.lastName
  }
}

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Person {
    fullName: String!
    firstName: String!
    lastName: String!
    age: Int!
  }

  type Query {
    quoteOfTheDay: String
    random: Float!
    rollDice(numDice: Int!, numSides: Int): [Int]
    person(firstName: String!, lastName: String!, age: Int!): Person
  }
`);
 
// The root provides a resolver function for each API endpoint
var root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollDice: ({numDice, numSides}) => {
    const output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output
  },
  person: ({firstName, lastName, age}) => {
    return new Person(firstName, lastName, age)
  }
};
 
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
