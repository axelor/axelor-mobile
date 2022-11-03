export function userHaveAccessToConfig({config, user}) {
  const {authorizedRoles} = config;
  const {roles} = user;

  if (
    authorizedRoles == null ||
    authorizedRoles.length === 0 ||
    roles == null ||
    roles.length === 0
  ) {
    return false;
  }

  const authorizedRoleIds = authorizedRoles.map(_role => _role.id);
  if (roles.some(_role => authorizedRoleIds.includes(_role.id))) {
    return true;
  }

  return false;
}
