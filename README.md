# routes

"users": [https://beta-water-my-plants.herokuapp.com/api/users/,
https://beta-water-my-plants.herokuapp.com/api/plants/,https://beta-water-my-plants.herokuapp.com/api/auth/register/,
https://beta-water-my-plants.herokuapp.com/api/auth/login]

# stretch

use redoc to make documentation (or swagger???)

Emergency Backend (beta) for Water my Plants<br/>
Base URL = https://beta-water-my-plants.herokuapp.com <br/>

### Register Schema

(/api/auth/register)<br/>

```
https://beta-water-my-plants.herokuapp.com/api/auth/register/
```

Send a .post() to the endpoint with the following information.<br/>
Make sure you are sending data to the database as structure below:

```js
{
"username": "admin",
"password": "password",
"phone_number": "123-456-7890"
}
```

### Login Schema

(/api/auth/login)<br/>

```
https://beta-water-my-plants.herokuapp.com/api/auth/login/
```

Send a .post() to the endpoint with the following information:<br/>
Make sure you are sending data to the database as structure below:

```js
{
"username": "admin",
"password": "password"
}
```

You will receive a `token` AND A `USER ID` AS `user_id` back for authentication<br/>

### USERS

|  CRUD  | METHOD | ROUTE                    | SEND TO DB                                                   |
| :----: | :----: | ------------------------ | ------------------------------------------------------------ |
| Create |  POST  | /api/auth/login          | {username(string) , password(string)                         |
| Create |  POST  | /api/auth/register       | {username(string) , password(string), phone_number(string) } |
| Update |  PUT   | /api/auth/users/:user_id | {password(string), phone_number(string) }                    |
|  Read  |  GET   | /api/auth/users/:user_id | {nothing}                                                    |
|  Read  |  GET   | /api/auth/users/         | {nothing}                                                    |

(/api/users/:user_id)<br/>

```
https://beta-water-my-plants.herokuapp.com/api/users/:user_id
```

Send a .put() to the endpoint with the following information:<br/>
Make sure you are sending data to the database as structure below:

```js
{
"phone_number": "new-phone-number",
"password": "newPassword"
}
```

You will receive the `user object` back if successful.<br/>

### Plant Schema

When you send .post or .put to create or edit a recipe, please make sure you are sending data to the database as structure below:
(/api/plants/)<br/>

```js
{
"user_id": 1, //ONLY IF EDITING, IF POSTING, NO ID NECESSARY
"nickname": "Super Plant", // mandatory
"species": "Cool Plant", // mandatory
"h2oFrequency": "2 times a day"
"image": "cloudinary url" //for stretch only

}
```

(/api/plants/:plant_id)<br/>

```
https://beta-water-my-plants.herokuapp.com/api/plants/:plant_id
```

Send a .put() to the endpoint with the following information:<br/>
Make sure you are sending data to the database as structure below:

```js
{
"nickname": "NEW Super Plant", // mandatory
"species": "COOLER Cool Plant", // mandatory
"h2oFrequency": "1000 times a day"
"image": "cloudinary url" //for stretch only
}
```

You will receive the `plant object` back if successful.<br/>

| Properties   | Schema       |
| ------------ | ------------ |
| nickname     | Required     |
| species      | Required,    |
| h2oFrequency | Not Required |
| image        | Not Required |

### Recipes

|  CRUD  | METHOD | ROUTE                 | Description             |
| :----: | :----: | --------------------- | ----------------------- |
|  Read  |  GET   | /api/plants           | get all plants          |
|  Read  |  GET   | /api/plants/:plant_id | get one plant by its id |
| Create |  POST  | /api/plants           | create new plant        |
| Update |  PUT   | /api/plants/:plant_id | edit plant information  |

#### in progress:

| Delete | DELETE| /api/plants/:plant_id | delete plant |
