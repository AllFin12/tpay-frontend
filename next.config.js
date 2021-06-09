module.exports = {
  env: {
    APP_NAME: "TPay",
    BASE_URL: "http://localhost:3004/backend4/api/v1",
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/register",
        destination: "/auth/register",
      },
      {
        source: "/pin",
        destination: "/auth/pin",
      },
    ];
  },
};
