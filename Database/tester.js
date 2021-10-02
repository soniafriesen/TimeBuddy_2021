const dbRtns = require("./dbroutines");
const processDb = async () => {
  try {
    let db = await dbRtns.getDBInstance();
    console.log(`established connection for ${db.databaseName} on Atlas`);
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(); // we don't need to disconnect, connection pooled
  }
};
processDb();
