# Asset Management

This software system is developed utilizing Node.js, MongoDB, Express.js, and Angular framework integrated with Material UI components.

To run this application on your system, follow the below steps:
- Clone the repository into your system
- Ensure NodeJs, Angular-cli, and MongoDB are installed
- In 'client/src/environments/environment.ts', add AWS configuration:

```sh
config: {
    AWS_BUCKET: "XXXXX",
    AWS_ACCESS_KEY: "XXXXX",
    AWS_SECRET_KEY: "XXXXXX",
    AWS_REGION: "XXXXXX",
  },
```
- Run this command in your terminal:
```sh
npm run dev-build
```
- After the build is complete, run this command:
```sh
npm run dev
```

- The application will run on localhost:4200 for the front-end and localhost:5000 for the back-end.

```sh
Frond-end port http://localhost:4200
Backend port http://localhost:5000
```

## Features

- Signup and login through email and password
- CRUD operations for Asset Management
- Implementation of all required validations
- Image uploading into AWS s3 bucket.


Visit this link to view all functionality for this application

https://www.awesomescreenshot.com/video/16127269?key=11e6484b906329112b87bd2d50c33f40