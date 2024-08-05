# Issue Tracker

## Description

Issue Tracker is a web application designed to help teams manage and track issues/bugs for various projects. It provides an intuitive interface for creating, viewing, and filtering issues, making project management more efficient.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)

## Features

- Create and manage projects
- Create, view, and filter issues within projects
- Search functionality for issues
- Filter issues by author and labels
- Responsive design for various screen sizes

## Folder Structure

```
issue-tracker/
├── src/
│ ├── config/
│ │ └── database.js
│ ├── controllers/
│ │ ├── projectController.js
│ │ ├── issueController.js
│ │ └── labelController.js
│ ├── models/
│ │ ├── Project.js
│ │ ├── Issue.js
│ │ └── Label.js
│ ├── routes/
│ │ ├── projectRoutes.js
│ │ ├── issueRoutes.js
│ │ └── labelRoutes.js
│ ├── middleware/
│ │ └── errorHandler.js
│ └── app.js
├── views/
│ ├── layouts/
│ │ └── main.ejs
│ ├── partials/
│ │ ├── header.ejs
│ │ └── footer.ejs
│ ├── projects/
│ │ ├── index.ejs
│ │ ├── create.ejs
│ │ └── detail.ejs
│ ├── issues/
│ │ ├── create.ejs
│ │ └── list.ejs
│ └── error.ejs
├── public/
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── main.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Installation

1. Clone the repository:

```bash
https://github.com/harijoshi12/cn_issue_tracker.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

```bash
PORT=5001
MONGODB_URI=your_mongodb_connection_string
```

4. Start the server:

```bash
npm run dev
```

## Usage

1. Start the server
2. Open your browser and navigate to `http://localhost:5001`
3. Create a new project and start adding issues!

## API Documentation

Our API endpoints include:

- `GET /api/projects`: Retrieve all projects
- `POST /api/projects`: Create a new project
- `GET /api/projects/:id`: Retrieve a specific project
- `GET /api/issues`: Retrieve all issues
- `POST /api/issues`: Create a new issue
- `GET /api/labels/suggest`: Get label suggestions
