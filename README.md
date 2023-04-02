# The Aura 2023 Repo

This is the source code of KLS GIT's fest AURA23 website.

<p align="center"> 
 <img src="https://raw.githubusercontent.com/KishorBalgi/aura-git/main/src/Assets/logo.png" alt="LOGO" border="0" width=200 height=100/>&nbsp;</a></p>

# Tech Stack

<p align="center">
</p>

<p align="center">
<a href="https://react.dev/"><img src="" border="0" alt="React" title="React"/></a>  
<a href="https://tailwindcss.com/"><img src="" border="0" alt="Tailwind" title="Tailwind"/></a>  
<a href="https://nodejs.org/"><img src="" border="0" alt="NodeJS" title="NodeJS"/></a>  
<a href="https://expressjs.com/"><img src="" border="0" alt="ExpressJS" title="ExpressJS"/></a>  
<a href="https://www.mongodb.com/"><img src="" border="0" alt="MongoDB" title="MongoDB"/></a>  
</p>
  
<p align="center">
<a href="https://github.com/pi22by7/aura-git/stargazers"><img alt="GitHub stars" src="https://github.com/pi22by7/aura-git"></a>
<a href="https://github.com/pi22by7/aura-git"><img alt="GitHub stars" src="https://img.shields.io/github/last-commit/pi22by7/aura-git"></a>
<a href="https://github.com/pi22by7/aura-git/blob/main/LICENSE.md"><img alt="GitHub License" src="https://img.shields.io/github/license/pi22by7/aura-git?label=license"></a>
</p>

## [AURA23 Website](https://aura-git.vercel.app)

1. Frontend: **React Tailwind**
2. Backend: **NodeJS ExpressJS**
3. Database: **MongoDB**

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#features">Features</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#pages">Pages</a></li>
    <li><a href="#project-maintainers">Project Maintainers</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

### Features

- Register For events.
- Automated Email verification through email.
- Password rest through email verification.
- Create and edit team
- View participations and status
- Record Payments

### Installation

1. - Fork the [repo](https://github.com/pi22by7/aura-git)
   - Clone the repo to your local system

   ```git
   git clone https://github.com/pi22by7/aura-git
   cd aura-git
   ```

2. - Front End:
     Install all the dependencies

   ```bash
   npm install # This will install all the required dependencies for the front-end
   ```

   - Front End Enivronment Configurations:
     create a .env file in the root directory and add the following env variables

   ```text
    REACT_APP_BACKEND_HOST="url_where_your_server_is_listening"
   ```

   - Run Front End:

   ```bash
   npm start
   ```

3. - Back End:
     Install all the dependencies

   ```bash
   cd backend/
   npm install # This will install all the required dependencies for the back-end
   ```

   - Backend End Enivronment Configurations:
     create a .env file in the backend directory and add the following env variables

   ```text
    PORT=port_number_where_u_want_to_run_your_server_to_listen
    DB=mongodb_db_access_url_with_username_and_password
    NODEMAILER_EMAIL=email_address_which_u_want_to_use_to_send_emails
    NODEMAILER_PASS=app_password_for_the_email
    JWT_SECRET=random_string_atleast_16_characters_long
   ```

   - Run Back End:

   ```bash
   npm run dev # For Development with nodemon
   npm start # Without nodemon
   ```

4. - Populate Database with events:
   ```bash
    cd backend/
    node data/populate.js
   ```
   This will populate your database with all the events present in data/events.js

### Pages

- Home Page
  <img src="" alt="Home Page">

- Registration
  <img src="" alt="Signup Form">
  <img src="" alt="Login Form">

- Competitions
  <img src="" alt="Competitions Page">

- Competition Details page
  <img src="" alt="Competition Details page">

- Contact Us Page
  <img src="" alt="Schedule Page">

- Rulebook Page
  <img src="" alt="Schedule Page">

- Schedule Page
  <img src="" alt="Schedule Page">

### Project Maintainers

| <img src = "https://avatars.githubusercontent.com/u/70760826?v=4" width="50px"> | <img src = "https://avatars.githubusercontent.com/u/75678927?v=4" width="50px"> | <img src = "https://avatars.githubusercontent.com/u/79470399?v=4" width="50px"> | <img src = "https://avatars.githubusercontent.com/u/25717503?v=4" width="50px"> |
| :-----------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| :-----------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
|                   [Piyush Airani](https://github.com/pi22by7)                   |                 [Kishor Balgi](https://github.com/KishorBalgi/)                 | [Saumitra Topinkatti](https://github.com/SBTopZZZ-LG)                           | [parishkar singh](https://github.com/parishkar-9790)                            |

### License

[GNU Affero General Public License v3.0](https://github.com/pi22by7/aura-git/blob/main/LICENSE.md)
