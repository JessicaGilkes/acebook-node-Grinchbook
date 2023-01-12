const { ObjectID } = require("mongodb");

const kirkIDString = "63b810bd87affe92a654e712";
const spockIDString = "63b810bd87affe92a654e713";
const picardIDString = "63b810bd87affe92a654e804";
const siskoIDString = "63b810bd87affe92a654e999";
const rikerIDString = "63b810bd87affe92a654e805";
const troyIDString = "63b810bd87affe92a654e806";
const worfIDString = "63b810bd87affe92a654e807";

const kirkID = ObjectID(kirkIDString);
const spockID = ObjectID(spockIDString);
const picardID = ObjectID(picardIDString);
const siskoID = ObjectID(siskoIDString);
const rikerID = ObjectID(rikerIDString);
const troyID = ObjectID(troyIDString);
const worfID = ObjectID(worfIDString);

module.exports = {
  kirkID,
  picardID,
  siskoID,
  rikerID,
  troyID,
  worfID,
  spockID,
  kirkIDString,
  picardIDString,
  siskoIDString,
  rikerIDString,
  troyIDString,
  worfIDString,
  spockIDString,
};
