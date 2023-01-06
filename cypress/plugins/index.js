// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)


const dbFuncs = require("../../models/dbFuncs")

module.exports = (on) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    resetUsers(test_file) {
      console.log("Resetting the users table via a task set in " + test_file);
      dbFuncs.dropUsers();
      return null;
    },
    seedUsers(test_file) {
      console.log("seeding the users table via a task set in " + test_file);
      dbFuncs.seedUsers();
      return null;
    },
    seedPosts(test_file) {
      console.log("seeding the posts table via a task set in " + test_file);
      dbFuncs.seedPosts();
      return null;
    }
  });
};
