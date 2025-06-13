## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses



#  Product API - Express.js

This is a simple RESTful API built with Express.js that allows users to manage a list of products with authentication and error handling.

---

## 🚀 Instructions to Run the Server

1. **Clone the repository:**

   git clone https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-Winnchester-25.git

   cd express-app
   ```

2. **Install dependencies:**

   
   npm install
   

3. **Start the server:**

   - For development (auto-restarts on file change):

     npm run dev
     

4. **Access the server:**

   The API will be available at:

   ```
   http://localhost:3000
   ```

---

## API Documentation

Base URL: `http://localhost:3000/api/products`

###  Authentication

All endpoints (except `GET`) require an API key in the header:

```
x-api-key: your-secret-api-key
```

---

### 📖 Endpoints

#### ✅ GET `/api/products`

**Description:** Returns a list of all products.

**Response:**

```json
[
  {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
]
```

---

#### ✅ GET `/api/products/:id`

**Description:** Returns a single product by ID.

**Response:**

```json
{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```

---

#### ✅ POST `/api/products`

**Description:** Adds a new product.

**Headers:**

```
x-api-key: your-secret-api-key
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Headphones",
  "description": "Noise-cancelling headphones",
  "price": 150,
  "category": "electronics",
  "inStock": true
}
```

**Response:**

```json
{
  "id": "generated-id",
  "name": "Headphones",
  "description": "Noise-cancelling headphones",
  "price": 150,
  "category": "electronics",
  "inStock": true
}
```

---

#### ✅ PUT `/api/products/:id`

**Description:** Updates an existing product.

**Request Body:** *(same format as POST)*

**Response:**

```json
{
  
  "name": "Updated Laptop",
  "description": "Updated description",
  "price": 1300,
  "category": "electronics",
  "inStock": false
}
```

---

#### ✅ DELETE `/api/products/:id`

**Description:** Deletes a product by ID.

**Response:**

```json
{
  "message": "Product deleted",
  "product": {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
}
```

---

##  Error Handling

The API uses custom error classes for structured error messages:

- `ValidationError` – for bad input
- `NotFoundError` – when a product is not found
- Authentication failure returns a 401 Unauthorized error

---

##  Project Structure

```
project-folder/
├── middleware/
│   ├── auth.js
│   ├── logger.js
│   └── validateProduct.js
├── errors/
│   ├── ValidationError.js
│   └── NotFoundError.js
├── server.js
└── README.md
```

---