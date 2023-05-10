function editorOnlyModifyComment(req, res, next) {
    if (req.user.roleCode >= 300) {
      next();
    } else {
      res.send("No tenes los permiso para modificar")
    }
  }
  module.exports = editorOnlyModifyComment;
  