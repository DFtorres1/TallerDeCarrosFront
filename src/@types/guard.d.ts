type RoutesType = {
  id: string;
  path?: string;
  guard?: React.FC;
  component?: any;
  routes?: RoutesType[];
};

type Role = "ADMIN" | "BOSS" | "MECH";

type GuardRoleProps = (
  roles?: Role[]
) => React.FC<React.PropsWithChildren<unknown>>;

type UserRole = {
  userRoleId?: number;
  roleName: string;
  roleDescription: string;
};
