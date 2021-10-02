const { port, graphql } = require("./database/config");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const { resolvers } = require("./database/resolvers.js");
const { schema } = require("./database/schema");
const cors = require("cors");

app.use(cors());
app.use(
  graphql,
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(port);
console.log(`Server ready on locahost:${port}${graphql}`);
