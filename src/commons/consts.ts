let BASE_URL: string;

switch (process.env.NODE_ENV) {
  case 'development':
    BASE_URL = 'https://test-api-chpp.log56.com';
    break;
  case 'production':
    BASE_URL = 'https://test-api-chpp.log56.com';
    break;
  default:
    BASE_URL = '';
    break;
}

export {
  BASE_URL,
};
