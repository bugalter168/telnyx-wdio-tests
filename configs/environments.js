const environments = {
  dev: {
    baseUrl: 'dev.telnyx.com',
    apiUrl: 'https://api.telnyx.com',
    env: 'dev',
  },
  staging: {
    baseUrl: 'staging.telnyx.com',
    apiUrl: 'https://api.telnyx.com',
    env: 'staging',
  },
  prod: {
    baseUrl: 'https://telnyx.com',
    apiUrl: 'https://api.telnyx.com',
    env: 'prod',
  },
};

function getEnvironmentConfig(env = 'prod') {
  const config = environments[env];
  if (!config) {
    throw new Error(
      `Unknown environment: "${env}". Available: ${Object.keys(environments).join(', ')}`
    );
  }
  return config;
}

export { getEnvironmentConfig, environments };
