function onlyAdminCanDelete(req, res, next) {
    if (req.user.roleCode >= 400) {
      next();
    } else {
      console.log("No tenes los permisos");
      res.send("Permission denied")  
    }
  }
  module.exports = onlyAdminCanDelete;