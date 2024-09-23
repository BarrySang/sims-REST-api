# School Information Management System

## Table of Contents
- [School Information Management System](#school-information-management-system)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Further Database Actions](#further-database-actions)
  - [License](#license)

## Introduction
This is a server built using the Express javascript framework that exposes endpoints that can be used to modify a database containing a school payment system's data.

## Features
The server provides CRUD functionality for tables students, staff, accounts and deposits.

## Prerequisites
The following are required to run this server locally:
- Node.js v20.12.0
- NPM version 10.5.0
- MySQL Database
- XAMPP
- Bcrypt
- Body-parser
- dotenv
- express
- mysql

## Installation
To set up the project locally, follow the following steps.
```bash
# clone the repository
git clone https://github.com/yourusername/yourproject.git

# navigate to the project directory
cd /yourprojectfolder
```

create a .env file in the root of the folder with the data:
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=
```

- Start XAMPP, and turn on MySQL and Apache.
- Proceed with the following in your terminal window:

```bash
# install dependencies
npm install

# set up tables
npm run create-tables

# seed tables
npm run seed

# run dev server
npm run server
```

## Further Database Actions
```bash
# drop tables
npm run drop-tables
```

## License
MIT