# Nomad-Ventures

A full stack web application for travelers who want to blog about their adventures.

---

## Purpose of this Project

As an avid traveler and someone who loves a good adventure I have always wished that there was a better way to share my traveling stories with the world. I love being able to learn about other people's adventures to give me inspiration on where I want to travel to in the future. I created this website to be a unique experience of being able to share life stories from places all over the world.

### 🔗 Live Deployment

Try the application out here: https://nomad-ventures.silvatim.com/

---

## 💻 Technologies Used

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

### APIs

- Unsplash API: https://unsplash.com/documentation

---

## 📝 Features

- User can sign up for an account
- User can log in to their account
- User can create a blog post
- User can edit a blog post
- User can delete a blog post
- User can see all their previous blog posts (profile page)
- User can see other people's blog posts
- User can use the Unsplash API to add a photo to their blog posts

---

## 👀 Preview

#### Home Page

![](md.assets/client-home-page.png)

#### Walkthrough Various Features

![](md.assets/client-features.gif)

---

## 🔮 Future Features

- User can like blog posts
- User can save blog posts

---

## 👨‍💻 Development

1. Clone the repository.

   ```shell
   git clone https://github.com/silva-tim/nomad-ventures.git
   ```

1. Install all dependencies with NPM.

   ```shell
   npm install
   ```

1. Start PostgreSQL

   ```sh
   sudo service postgresql start
   ```

1. Create database (replace `name-of-database` with a name of your choosing)

   ```sh
   createdb name-of-database
   ```

1. In the `server/.env` file, in the `DATABASE_URL` value, replace `changeMe` with the name of your database, from the last step

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

   ```shell
   npm run dev
   ```
