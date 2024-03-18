# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# yummy

[//]: # (import screenshot from './public/screenshot.png')

Yummynow is a web application that allows users to search for recipes and like them.
The user can search for recipes by the random button on the random page or by the find recipes
button below the questions on the questions page after making a selection other then random.
The user can also see the recipes he has liked on the liked page.

![questionspage](./public/screenshot.png)

In the image above you see the question page where the user can make a selection of the
recipes he wants to see.

Installation instructions for the project.

# Yummy Now

First we put 'npm install' in the terminal to install all the dependencies.
Then we put 'npm run dev' to start the project using Vite + React.

The application key acts as a unique identifier for the application when
interacting with the Edamam API , and is used to authenticate the application
when making requests to the API. The application key is given in the request like this
together with the application id:

[//]: # ( https://api.edamam.com/api/recipes/v2?type=public&app_id=236b3497&app_key=117ade035cd558821cf71f334a2e0af9&random=true&#41;)

so the application key is: 117ade035cd558821cf71f334a2e0af9
and the application id is: 236b3497

We use the Edamam (https://edamam.com), API to get the recipes. All request types are described in the
above link.


For Login and registration we use the Novi backend.
From there we also get the jwt token.

The jwt token is being decoded in the code and used to authenticate the user when making requests to
the API.
It is stored in the local storage of the browser and in the project under local storage.
Under the name 'jwt' and 'token'.

For the project to work, the user must have a jwt token and an application key.
The jwt token is being used to authenticate the user when making requests to the API.

We use the novi backend to save the user's data like user name, email and password and the user's
liked recipes.

Your X-Api-Key: yummynow:xL5T8mawKxLSD7GWHLTF

Add the following to the header of your POST USER request:

Headers: {
'Content-Type': 'application/json',
'X-Api-Key':yummynow:xL5T8mawKxLSD7GWHLTF
}
[//]: # (https://novi.datavortex.nl/)

All the request types are described in the above link.


you can make a new username and password or use the following:
username: elinevdw
password: wachtwoord

You can like recipes when logged in and see them on the liked page.
If it is not being added you should clear the array by clicking the 'empty favorites' button.
Enjoy! :)
# yummy