# Programming for Kids

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to Programming for Kids! This project aims to provide a fun and interactive platform for kids to learn programming concepts and develop their coding skills. Whether your child is a beginner or already has some coding experience, this application offers a range of courses, learning materials, exams, and engaging projects suitable for various age groups.

## Features

- **Course Catalog:** Browse and choose from a wide range of programming courses tailored for kids of different skill levels.
- **Interactive Learning Materials:** Access engaging learning materials, including interactive tutorials, videos, and exercises.
- **Challenge with Exams:** Test your knowledge with interactive programming exams and get immediate feedback on your progress.
- **Discussion Forum:** Engage with other learners in a safe and monitored discussion forum to share ideas and ask questions.
- **Course Recommendation:** Receive personalized course recommendations based on your interests and progress.
- **Large Language Model for Hints:** Get helpful hints and error recovery suggestions from our AI-powered language model during exams.
- **Capstone Project:** Complete a creative and fun capstone project to showcase your programming skills.
- **Teacher and Admin Features:** Teachers can create courses and manage discussions, while admins can approve courses and teachers.


## Technologies Used

- Django: Backend framework for building the web application.
- Flask: Backend framework for building the web application.
- React: Frontend library for creating interactive user interfaces.
- Docker: Containerization to manage application deployment.
- PostgreSQL: Database for storing user information and course data.
- AI Language Model: AI-powered language model for providing hints during exams.
- Other libraries and tools as required.

## Installation


This repo has been updated to work with `Python v3.8` and up.

1. Install `virtualenv`:
```
$ pip install virtualenv
```

2. Open a terminal in the project root directory and run:
```
$ virtualenv env
```

3. Then run the command:
```
$ .\env\Scripts\activate
```

4. Then install the dependencies:
```
$ (env) pip install -r requirements.txt
```

5. Finally start the web server:
```
$ (env) python app.py
```

This server will start on port 5000 by default. You can change this in `app.py` by changing the following line to this:

```python
if __name__ == "__main__":
    app.run(debug=True, port=<desired port>)
```

## Contributing

Any pull requests that don't address security flaws or fixes for language updates will be automatically closed. Style changes, adding libraries, etc are not valid changes for submitting a pull request.