const routes = require("next-routes")();

routes
  .add("/", "/index")
  .add("/devices", "/devices/index")
  .add("/devices/new", "/devices/new")
  .add("/devices/:address", "/devices/show")
  .add("/devices/:address/edit", "/devices/edit")
  .add("/register", "/auth/register")
  .add("/firmwares", "/firmwares/index")
  .add("/firmwares/:address/sync", "/firmwares/sync");

module.exports = routes;
