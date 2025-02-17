module.exports = [
  {
    context: '/auth',
    target: 'https://identity.stg.sdbxaz.azure.backbaseservices.com/',
    secure: false,
    changeOrigin: true,
    headers: {
      "X-SDBXAZ-API-KEY":"academy-83265CED-62D0-4383-AD32-2EEE4A7C73AD"
    }
  },
  {
    context: '/api',
    target: 'https://retail.stg.sdbxaz.azure.backbaseservices.com/ ',
    
    secure: false,
    changeOrigin: true,
    headers: {
      "X-SDBXAZ-API-KEY":"academy-83265CED-62D0-4383-AD32-2EEE4A7C73AD"
    }
  },
];
