# **Web Service API For ToDo List App**

Web service API untuk aplikasi To Do List sederhana. Dibuat menggunakan Express.js, digunakan untuk CRUD standar sebuah ToDoList, Database bisa menggunakan MySQL, menggunakan ORM Sequelize. Menerapkan authentication dan authorization menggunakan JsonWebToken.

**Table Of Contents**

- [API Adress](#api-address)
- [Endpoint Route](#endpoint-route)
  - [Register](#register)
  - [Login](#login)
  - [Menambahkan Todo baru](#menambahkan-todo-baru)
  - [Melihat semua todo yang dimiliki user](#melihat-semua-todo-yang-dimiliki-user)
  - [Melihat detail todo yang dimiliki user](#melihat-detail-todo-yang-dimiliki-user)
  - [Mengupdate Todo yang dimiliki user](#mengupdate-todo-yang-dimiliki-user)
  - [Menghapus Todo yang dimiliki user](#menghapus-todo-yang-dimiliki-user)
  - [Menghapus semua Todo yang dimiliki user](#menghapus-semua-todo-yang-dimiliki-user)

# API address

Alamat untuk mengakses API :

      https://noverdan-todolist-api-services.up.railway.app/:endpoint

User untuk melakukan demo API :
|email| password |
|--|--|
| demo@mail.com | demo123 |


# Endpoint Route

Endpoint yang tersedia :

`POST` `/users/register`

`POST` `/users/login`

`POST` `/users/:userId/todos`

`GET` `/users/:userId/todos`

`GET` `/users/:userId/todos/:todoId`

`POST` `/users/:userId/todos/:todoId`

`DELETE` `/users/:userId/todos/:todoId`

`DELETE` `/users/:userId/todos`

## **Register**

**Endpoint :**

`POST` `/users/register`

**Request :**

> **body**

     {
        "nama": "Demo User",
        "email": "demo@mail.com",
        "password": "demo123"
    }

**Respon :**

> \***\*Berhasil login `201`\*\***

    {
        "message": "Berhasil membuat user baru",
        "data": {
            "userId": 12,
            "nama": "Demo User",
            "email": "demo@mail.com"
        }
    }

> \***\*Email sudah digunakan `200`\*\***

    {
        "message": "Email user already exsist"
    }

> \***\*Bad Request `400`\*\***

    {
        "message": "bad request"
    }

> \***\*Error\*\***

    {
        "message": "gagal menambahkan data",
        "error": err.message
    }

## **Login**

**Endpoint :**

`POST` `/users/login`

**Request :**

> **body**

    {
        "email":"demo@mail.com",
        "password":"demo123"
    }

**Respon :**

> **Login berhasil `200`**

    {
        "message": "login-successful",
        "userId": 123,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....."
    }

> **Bad Request `400`**

    {
        "message": "bad request"
    }

> **User/email belum terdaftar `200`**

    {
        "message": "user-not-found"
    }

> **Password Salah `200`**

    {
        "message": "wrong-password"
    }

> **Error**

    {
        "message": "Login Failed",
        "error": err.message
    }

## **Menambahkan Todo baru**

**Endpoint :**

`POST` `/users/:userId/todos`

**Request :**

> **header**

    {
    	"authorization": "Bearer token..."
    }

> **body**

    {
    	"task": "Task to do..."
    }

**Respon :**

> **Berhasil menambahkan task to do `200`**

    {
        "message": "Berhasil menambahkan todo baru"
    }

> **Bad request `400`**

    {
        "message": "Bad Request"
    }

> **User tidak diizinkan `403`**

    {
        "status": "forbidden",
        "message": "unauthorized user for add todo"
    }

> **Id user tidak ditemukan `404`**

    {
        "message": "User 123 does not exist"
    }

> **User tidak ter-autorisasi `403`**

    {
        "message": "unauthorized-user"
    }

> **Token tidak dideefinisikan `200`:**

    {
        "message": "undifined-token"
    }

> **Token invalid `200`:**

    {
        "status": "invalid",
        "message": invalid_message
    }

## **Melihat semua todo yang dimiliki user**

**Endpoint :**

`GET` `/users/:userId/todos`

**Request :**

> **header**

    {
    	"authorization": "Bearer token..."
    }

**Respon :**

> **Berhasil mendapatkan todos `200`**

    {
        "user": "Demo User",
        "todos": [
            {
                "id": 1,
                "task": "Task User Demo 1"
            },
            {
                "id": 2,
                "task": "Task User Demo 2"
            },
            ...
            ...
        ]
    }

> **User tidak diizinkan untuk melihat todos yang bukan miiknya `403`**

    {
        "status": "forbidden",
        "message": "unauthorized user for access these todos"
    }

> **User tidak terdaftar `404`**

    {
        "message": "User {userId} does not exist"
    }

> **User belum ter-autorisasi `403`**

    {
        "message": "unauthorized-user"
    }

> **Token tidak ada `200`**

    {
        "message": "undifined-token"
    }

> **Token invalid `200`**

    {
        "status": "invalid",
        "message": "jwt malformed"
    }


## **Melihat detail todo yang dimiliki user**


**Endpoint :**

`GET` `/users/:userId/todos/:todoId`

**Request :**

> **header**

    {
    	"authorization": "Bearer token..."
    }

**Respon :**

> **Berhasil mendapatkan data todo `200`**

    {
        "user":  "Demo User",
        "todos":  {
        "id":  19,
        "user_id":  12,
        "task":  "Task User Demo 7",
        "createdAt":  "2023-11-15T15:17:08.000Z",
        "updatedAt":  "2023-11-15T15:17:08.000Z"
        }
    }

> **Todo tidak ditemukan `404`**

    {
    	"message":  "Todo {todoId} does not exist in this user"
    }

> **User tidak diizinkan untuk melihat todos yang bukan miiknya `403`**

    {
        "status": "forbidden",
        "message": "unauthorized user for access these todos"
    }

> **User tidak terdaftar `404`**

    {
        "message": "User {userId} does not exist"
    }

> **User belum ter-autorisasi `403`**

    {
        "message": "unauthorized-user"
    }

> **Token tidak ada `200`**

    {
        "message": "undifined-token"
    }

> **Token invalid `200`**

    {
        "status": "invalid",
        "message": "jwt malformed"
    }

## **Mengupdate Todo yang dimiliki user**

**Endpoint :**

`POST` `/users/:userId/todos/:todoId`

**Request :**

> **header**

    {
    	"authorization": "Bearer token..."
    }

> **body**

    {
    	"task": "Updated Task..."
    }

**Respon :**

> **Todo berhasil diupdate `200`**

    {
    	"message":  "todo updated successfully"
    }

> **Todo tidak ditemukan pada user `404`**

    {
        "message":  "Todo {todoId} does not exist in this user"
    }

> **User tidak diizinkan untuk mengupdate todos yang bukan miiknya `403`**

    {
        "status": "forbidden",
        "message": "unauthorized user for update these todos"
    }

> **User tidak terdaftar `404`**

    {
        "message": "User {userId} does not exist"
    }

> **User belum ter-autorisasi `403`**

    {
        "message": "unauthorized-user"
    }

> **Token tidak ada `200`**

    {
        "message": "undifined-token"
    }

> **Token invalid `200`**

    {
        "status": "invalid",
        "message": "jwt malformed"
    }

## **Menghapus Todo yang dimiliki user**

**Endpoint :**

`DELETE` `/users/:userId/todos/:todoId`

**Request :**

> **header**

    {
    	"authorization": "Bearer token..."
    }

**Respon :**

> **Berhasil menghapus todo `204`**

    204 No Content

> **Todo tidak ditemukan pada user `404`**

    {
        "message":  "Todo {todoId} does not exist in this user"
    }

> **User tidak diizinkan untuk menghapus todos yang bukan miiknya `403`**

    {
        "status": "forbidden",
        "message": "unauthorized user for d delete these todos"
    }

> **User tidak terdaftar `404`**

    {
        "message": "User {userId} does not exist"
    }

> **User belum ter-autorisasi `403`**

    {
        "message": "unauthorized-user"
    }

> **Token tidak ada `200`**

    {
        "message": "undifined-token"
    }

> **Token invalid `200`**

    {
        "status": "invalid",
        "message": "jwt malformed"
    }

## **Menghapus semua Todo yang dimiliki user**

**Endpoint :**

`DELETE` `/users/:userId/todos`

**Request :**

> **header**

    {
    	"authorization": "Bearer token..."
    }

**Respon :**

> **Berhasil menghapus semua todos user `204`**

    204 No Content

> **Todo tidak ditemukan pada user `404`**

    {
        "message":  "Todo {todoId} does not exist in this user"
    }

> **User tidak diizinkan untuk menghapus todos yang bukan miiknya `403`**

    {
        "status": "forbidden",
        "message": "unauthorized user for d delete these todos"
    }

> **User tidak terdaftar `404`**

    {
        "message": "User {userId} does not exist"
    }

> **User belum ter-autorisasi `403`**

    {
        "message": "unauthorized-user"
    }

> **Token tidak ada `200`**

    {
        "message": "undifined-token"
    }

> **Token invalid `200`**

    {
        "status": "invalid",
        "message": "jwt malformed"
    }
