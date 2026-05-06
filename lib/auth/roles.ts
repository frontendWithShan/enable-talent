export const ADMIN_ROLES = [
  "super_admin",
  "editor",
  "guest_writer",
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export type AdminViewer = {
  email: string;
  fullName: string;
  id: string;
  isActive: boolean;
  role: AdminRole;
};

export type AdminNavItem = {
  allowedRoles: readonly AdminRole[];
  href: string;
  label: string;
};

const ADMIN_PUBLIC_PATHS = [
  "/admin/login",
  "/admin/forbidden",
  "/admin/forgot-password",
  "/admin/reset-password",
] as const;

const ADMIN_ROUTE_ACCESS = [
  {
    allowedRoles: ["super_admin", "editor", "guest_writer"] as const,
    prefix: "/admin/blogs",
  },
  {
    allowedRoles: ["super_admin", "editor"] as const,
    prefix: "/admin/careers",
  },
  {
    allowedRoles: ["super_admin"] as const,
    prefix: "/admin/inquiries",
  },
  {
    allowedRoles: ["super_admin"] as const,
    prefix: "/admin/consultation-requests",
  },
  {
    allowedRoles: ["super_admin"] as const,
    prefix: "/admin/contact",
  },
  {
    allowedRoles: ["super_admin"] as const,
    prefix: "/admin/demo-requests",
  },
  {
    allowedRoles: ["super_admin"] as const,
    prefix: "/admin/job-applications",
  },
  {
    allowedRoles: ["super_admin"] as const,
    prefix: "/admin/newsletter",
  },
  {
    allowedRoles: ["super_admin"] as const,
    prefix: "/admin/volunteer-applications",
  },
  {
    allowedRoles: ["super_admin"] as const,
    prefix: "/admin/team",
  },
  {
    allowedRoles: ["super_admin", "editor", "guest_writer"] as const,
    prefix: "/admin/account",
  },
  {
    allowedRoles: ["super_admin"] as const,
    prefix: "/admin",
  },
] as const;

export const ADMIN_NAV_ITEMS: readonly AdminNavItem[] = [
  {
    allowedRoles: ["super_admin"],
    href: "/admin",
    label: "Dashboard",
  },
  {
    allowedRoles: ["super_admin", "editor", "guest_writer"],
    href: "/admin/blogs",
    label: "Blogs",
  },
  {
    allowedRoles: ["super_admin", "editor"],
    href: "/admin/careers",
    label: "Careers",
  },
  {
    allowedRoles: ["super_admin"],
    href: "/admin/inquiries",
    label: "Inquiries",
  },
  {
    allowedRoles: ["super_admin"],
    href: "/admin/job-applications",
    label: "Applications",
  },
  {
    allowedRoles: ["super_admin"],
    href: "/admin/newsletter",
    label: "Newsletter",
  },
  {
    allowedRoles: ["super_admin"],
    href: "/admin/volunteer-applications",
    label: "Volunteers",
  },
  {
    allowedRoles: ["super_admin"],
    href: "/admin/team",
    label: "Team",
  },
  {
    allowedRoles: ["super_admin", "editor", "guest_writer"],
    href: "/admin/account",
    label: "Account",
  },
] as const;

function normalizeAdminPath(pathname: string) {
  if (!pathname) {
    return "/admin";
  }

  const normalizedPath = pathname.split("?")[0]?.split("#")[0] ?? pathname;

  if (normalizedPath.length > 1 && normalizedPath.endsWith("/")) {
    return normalizedPath.slice(0, -1);
  }

  return normalizedPath;
}

function matchesAdminPath(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function canAccessAdminPath(role: AdminRole, pathname: string) {
  const normalizedPath = normalizeAdminPath(pathname);

  if (isAdminPublicPath(normalizedPath)) {
    return true;
  }

  const matchingRule = ADMIN_ROUTE_ACCESS.find((rule) =>
    matchesAdminPath(normalizedPath, rule.prefix),
  );

  if (!matchingRule) {
    return false;
  }

  return (matchingRule.allowedRoles as readonly AdminRole[]).includes(role);
}

export function formatAdminRoleLabel(role: AdminRole) {
  switch (role) {
    case "super_admin":
      return "Super Admin";
    case "editor":
      return "Editor";
    case "guest_writer":
      return "Guest Writer";
    default:
      return role;
  }
}

export function getAdminHomePath(role: AdminRole) {
  return role === "super_admin" ? "/admin" : "/admin/blogs";
}

export function getAllowedAdminNavItems(role: AdminRole) {
  return ADMIN_NAV_ITEMS.filter((item) =>
    (item.allowedRoles as readonly AdminRole[]).includes(role),
  );
}

export function isAdminPublicPath(pathname: string) {
  const normalizedPath = normalizeAdminPath(pathname);
  return ADMIN_PUBLIC_PATHS.some((path) => matchesAdminPath(normalizedPath, path));
}

export function isAdminRole(value: unknown): value is AdminRole {
  return typeof value === "string" && ADMIN_ROLES.includes(value as AdminRole);
}
