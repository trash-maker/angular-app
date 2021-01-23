const apiUrl = "real-api-url";

const PROXY_CONFIG = {
  "/api-service": {
    target: `${apiUrl}/api-service/v1`,
    secure: false,
    pathRewrite: {
      "^/api-service": "",
    },
    changeOrigin: true,
    logLevel: "debug",
  },
};

module.exports = PROXY_CONFIG;
