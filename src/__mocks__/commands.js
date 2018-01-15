export default [
  {
    name: "Manage Tenants",
    command() {
      console.log(this, "admin/manageTenants.html");
    },
    section: "Command"
  },
  {
    id: 2,
    name: "Home",
    command() {
      console.log(this, "admin/manageTenants.html");
    },
    section: "Command"
  },
  {
    id: 3,
    name: "Dashboard",
    command() {
      console.log(this, "admin/manageTenants.html");
    },
    section: "Command"
  },
  {
    id: 4,
    name: "Monitor System",
    command() {
      console.log(this, "adminapp/monitorSystem.html");
    },
    section: "Command"
  },
  {
    id: 5,
    name: "Manage Users",
    command() {
      console.log(this, "adminapp/manageAppUsers.html");
    },
    section: "Command"
  },
  {
    id: 6,
    name: "Monitor Import Jobs",
    command() {
      console.log(this, "admin/monitorImports.html");
    },
    section: "Command"
  },
  {
    id: 7,
    name: "Block Import Jobs",
    command() {
      console.log(this, "admin/blockScheduleImports.html");
    },
    section: "Command"
  },
  {
    id: 8,
    name: "Integration Stats",
    command() {
      console.log(this, "admin/selectDataSource.html?inquiryType=integrationStats");
    },
    section: "Command"
  },
  {
    id: 9,
    name: "Integration Health Check",
    command() {
      console.log(this, "admin/selectDataSource.html?inquiryType=integrationHealthCheck");
    },
    section: "Command"
  },
  {
    id: 10,
    name: "Reports",
    command() {
      console.log(this, "report/list.html");
    },
    section: "Command"
  },
  {
    id: 11,
    name: "Services",
    command() {
      console.log(this, "admin/selectDataSource.html?inquiryType=services");
    },
    section: "Command"
  },
  {
    id: 12,
    name: "Tools",
    command() {
      console.log(this, "tools/index.html");
    },
    section: "Command"
  },
  {
    id: 13,
    name: "Tenant Errors",
    command() {
      console.log(this, "admin/selectDataSource.html?inquiryType=viewRemoteExceptionSummary");
    },
    section: "Command"
  },
  {
    id: 14,
    name: "Queued Tenant Jobs",
    command() {
      console.log(this, "admin/selectDataSource.html?inquiryType=viewQueuedTenantJobs");
    },
    section: "Command"
  },
  {
    id: 15,
    name: "Tenant Locks",
    command() {
      console.log(this, "admin/selectDataSource.html?inquiryType=viewTenantLocks");
    },
    section: "Command"
  },
  {
    id: 16,
    name: "Email",
    command() {
      console.log(this, "admin/selectDataSource.html?inquiryType=email");
    },
    section: "Command"
  },
  {
    id: 17,
    name: "Logs",
    command() {
      console.log(this, "log/list.html");
    },
    section: "Command"
  },
  {
    id: 18,
    name: "Error Codes",
    command() {
      console.log(this, "admin/viewErrorCodes.html");
    },
    section: "Command"
  }
];
