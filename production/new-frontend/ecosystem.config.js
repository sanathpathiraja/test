module.exports = {
  apps: [
    {
      name: "escaperoots-web",
      cwd: "/var/www/escaperoots/production/new-frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4350",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};

