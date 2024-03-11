# API Documentation

This document provides an overview and usage instructions for the APIs available in this project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)


## Prerequisites

Before using the APIs, ensure that you have the following prerequisites installed:

- Node.js and npm (or yarn)
- MongoDB (or another database supported by the project)
- Postman (optional, for testing the APIs)




## Installation 
```bash
git clone https://github.com/krishnamahto021/socialApi
cd socialapi
npm install 
npm run dev
```
    
## API Endpoints

#### Sign up the user

```http
  POST /api/v1/user/sign-up
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |
| `profilePicture` | `string` | **Optional** |
| `bio` | `string` | **Optional** |


#### Sign In user

```http
  POST /api/v1/user/sign-in
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |


#### Get user profile

```http
  GET /api/v1/user/view-profile/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwt token` | `string` | **Required** |

#### Update the user

```http
  POST /api/v1/user/update-profile
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwt token` | `string` | **Required** |
| `username` | `string` | **Optional** |
| `profilePicture` | `string` | **Optional** |
| `bio` | `string` | **Optional** |

#### Delete the user

```http
  DELETE /api/v1/user/delete-profile
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwt token` | `string` | **Required** |


#### Follow request

```http
  POST /api/v1/user/follow/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwt token` | `string` | **Required** |

#### Get followers and following list

```http
  GET /api/v1/user/follow
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwt token` | `string` | **Required** |

#### Get user post based on the following list and latest post first

```http
  GET /api/v1/user/feed-post
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwt token` | `string` | **Required** |

#### Create a post

```http
  POST /api/v1/post/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwt token` | `string` | **Required** |
| `text` | `string` | **Required** |

#### Read the post created by user himself

```http
  GET /api/v1/post/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwt token` | `string` | **Required** |


#### Update post 

```http
  POST /api/v1/post/update-post/:postId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwt token` | `string` | **Required** |
| `textContent` | `string` | **Required** |

#### Delete the post

```http
  DELETE /api/v1/post/delete-post/:postId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwt token` | `string` | **Required** |



