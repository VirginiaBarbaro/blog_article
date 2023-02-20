function readerNotAllowed(req, res, next) {
    if (req.user.roleCode >= 200) {
      next();
    } else {
      console.log("No tenes los permisos");
      res.send("Permission denied")  
    }
  }
  module.exports = readerNotAllowed;