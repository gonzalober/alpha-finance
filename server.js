import Express from "express";
import { graphqlHTTP } from "express-graphql";
import Schema from "./schema.js";
const app = Express();
const port = 3000;

app.use(
  "/graphql",
  graphqlHTTP({ schema: Schema, pretty: true, graphiql: true })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
export default app;
