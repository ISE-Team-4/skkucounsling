# SKKU Counseling System

## Introduction
The SKKU Counseling System is a web-based application designed to facilitate the counseling process at Sungkyunkwan University. It aims to streamline the scheduling, management, and documentation of counseling sessions for both students and counselors.

## Features
- **User Authentication:** Secure login and registration system for students, counselors, and administrators.
- **Counseling Session Management:** Students can apply for counseling sessions, while counselors can manage these requests.
- **Calendar Integration:** A calendar view for tracking and scheduling counseling appointments.
- **Document Management:** Support for uploading and downloading necessary counseling documents.
- **Data Import Tools:** Scripts for importing user and counseling data into the system.

## Technical Overview
- **Frontend:** Developed using React, providing a responsive and user-friendly interface.
- **Backend:** Django-based backend for handling data processing and business logic.
- **Database Integration:** Utilizes Django models for database management, ensuring data integrity and efficiency.

## Installation and Setup
Detailed instructions on setting up the project environment, including required dependencies and steps to get the server running.

1. install backend requirement
```
pip install -r src/djangoapp/djangoapp/requirements.txt
```

2. install frontend requirement
```
cd src/reactapp
npm install
```

3. run backend
```
python src/djangoapp/manage.py runserver
```
you need to implement setting.py from other data source.

4. run frontend
```
cd src/reactapp
npm run start
```

or

```
cd src/reactapp
npm build
cp -r www/ ../djangoapp/index
```

## Usage
Step-by-step guide on how to use the application, including screenshots and user flow.

## Contributing
Guidelines for contributing to the project, including coding standards, pull request process, and issue reporting.

## License
Information about the project's license.

## Contact
Contact information for the development team or project maintainers.

*This README provides a basic structure and can be expanded with more specific details about each section, such as installation commands, usage examples, and contribution guidelines. The repository already contains a README.md file, which can be updated with this content or used as a reference for further details.*



# [WorkSpace Documentation](https://axiomatic-train-212.notion.site/c2712e48d27342cda69484fbad13ca11?pvs=4)
