export default [
  {
    name: "Manage Tenants",
    command() {
      document.location.href = "admin/manageTenants.html";
    },
    section: "Command"
  },
  {
    name: "Home",
    command() {
      document.location.href = "admin/manageTenants.html";
    },
    section: "Command"
  },
  {
    name: "Dashboard",
    command() {
      document.location.href = "admin/manageTenants.html";
    },
    section: "Command"
  },
  {
    name: "Monitor System",
    command() {
      document.location.href = "adminapp/monitorSystem.html";
    },
    section: "Command"
  },
  {
    name: "Manage Users",
    command() {
      document.location.href = "adminapp/manageAppUsers.html";
    },
    section: "Command"
  },
  {
    name: "Monitor Import Jobs",
    command() {
      document.location.href = "admin/monitorImports.html";
    },
    section: "Command"
  },
  {
    name: "Block Import Jobs",
    command() {
      document.location.href = "admin/blockScheduleImports.html";
    },
    section: "Command"
  },
  {
    name: "Integration Stats",
    command() {
      document.location.href =
        "admin/selectDataSource.html?inquiryType=integrationStats";
    },
    section: "Command"
  },
  {
    name: "Integration Health Check",
    command() {
      document.location.href =
        "admin/selectDataSource.html?inquiryType=integrationHealthCheck";
    },
    section: "Command"
  },
  {
    name: "Reports",
    command() {
      document.location.href = "report/list.html";
    },
    section: "Command"
  },
  {
    name: "Services",
    command() {
      document.location.href =
        "admin/selectDataSource.html?inquiryType=services";
    },
    section: "Command"
  },
  {
    name: "Tools",
    command() {
      document.location.href = "tools/index.html";
    },
    section: "Command"
  },
  {
    name: "Tenant Errors",
    command() {
      document.location.href =
        "admin/selectDataSource.html?inquiryType=viewRemoteExceptionSummary";
    },
    section: "Command"
  },
  {
    name: "Queued Tenant Jobs",
    command() {
      document.location.href =
        "admin/selectDataSource.html?inquiryType=viewQueuedTenantJobs";
    },
    section: "Command"
  },
  {
    name: "Tenant Locks",
    command() {
      document.location.href =
        "admin/selectDataSource.html?inquiryType=viewTenantLocks";
    },
    section: "Command"
  },
  {
    name: "Email",
    command() {
      document.location.href = "admin/selectDataSource.html?inquiryType=email";
    },
    section: "Command"
  },
  {
    name: "Logs",
    command() {
      document.location.href = "log/list.html";
    },
    section: "Command"
  },
  {
    name: "Error Codes",
    command() {
      document.location.href = "admin/viewErrorCodes.html";
    },
    section: "Command"
  }
];
