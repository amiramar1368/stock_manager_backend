export default function permission(allowedPermissions) {
  const allowedPermissionSet = new Set(allowedPermissions);
  return async (req, res, next) => {
    const userPermisions = req.user.permissions;
    const hasPermission  = userPermisions.some((permission) => {
      return allowedPermissionSet.has(permission);
    });
    if (hasPermission ) {
      next();
    } else {
      return res.sendFailureResponse( 403, "Access Denied" );
    }
  };
}
