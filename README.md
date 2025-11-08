# 🛒 CartFusion – Online Shopping Platform

CartFusion is a modern, full-featured e-commerce web platform designed to provide a seamless online shopping experience. It enables users to browse products, add items to their cart, manage orders, submit reviews, and complete secure checkout. The platform includes a full admin control panel for managing products, users, and reviews. Built with cutting-edge web technologies, CartFusion is fast, scalable, and optimized for modern online retail needs.

---

## 🚀 Features

### 👤 User Features
- Browse products by category
- View detailed product pages
- Add products to cart
- Update cart quantity / remove items
- Submit product reviews & ratings
- Login / Register
- Place orders using Cash on Delivery (COD)
- View order history
- Role-based UI visibility

---

### 🔐 Admin Features
- Admin Dashboard
- Create, update, delete products
- Manage users
- View and delete reviews
- Manage orders
- Role-based access protection

---

## 🎯 Project Goals
- Build a full eCommerce workflow
- Implement authentication + authorization
- Simple UI for customers
- Secure tools for administrators
- Scalable architecture

---

## 🏗️ Tech Stack

| Layer     | Technologies |
|----------|--------------|
| Frontend | Next.js (App Router), React, Tailwind CSS |
| Backend  | Next.js API Routes |
| Database | Prisma ORM + MySQL |
| Auth     | NextAuth.js (Credentials) |
| State    | Zustand |
| Payment  | Cash on Delivery (COD) |

---

## 📁 Folder Structure

```text
cartfusion/
│
├── prisma/                     # Prisma schema + migrations
│   └── schema.prisma
|   └── schema.prisma
│
├── public/                     # Static assets
│   └── uploads/
│
├── src/
│   ├── app/                    # Next.js (App Router)
│   │   ├── (auth)/             # Auth routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   │   └── profile/
│   │   │
│   │   ├── admin/              # Admin panel
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── reviews/
│   │   │   ├── users/
│   │   │   └── page.tsx/
│   │   │
│   │   ├── api/                # API Routes
│   │   │   ├── products/
│   │   │   ├── reviews/
│   │   │   ├── orders/
│   │   │   ├── auth/
│   │   │   ├── checkout/
│   │   │   ├── upload/
│   │   │   └── users/
│   │   │
│   │   ├── cart/               # Cart page
│   │   ├── about/              # About page
│   │   ├── checkout/           # Checkout page
│   │   ├── product/            # Product detail + review
│   │   ├── products/           # Product detail
│   │   ├── success/            # Order success page
│   │   ├── layout.tsx          # Global layout wrapper
│   │   └── page.tsx            # Home page
│   │   └── globals.css
│   │
│   ├── components/             # Reusable UI components
│   │   ├── AddReviewButton.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── CartItem.tsx
│   │   ├── CartItems.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductForm.tsx
│   │   ├── ProductList.tsx
│   │   ├── ProductReview.tsx
│   │   ├── Navbar.tsx
│   │   ├── OrderItem.tsx
│   │   ├── ProductReviews.tsx
│   │   └── ThemeProvider.tsx
│   │
│   ├── hooks/                  # Custom hooks
│   │   ├── useCart.ts
│   │   └── useProduct.ts
│   │
│   ├── lib/                    # Server utilities
│   │   ├── authOptions.ts
│   │   ├── prisma.ts
│   │   └── cartStore.ts
│   │
│   └── stores/                  # TypeScript interfaces
│       └── cartStore.ts
│   └── types/                  # TypeScript interfaces
│       └── next-auth.d.ts
│
├── .env
├── .gitignore
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
├── tsconfig.json
├── eslint.config.mjs
└── README.md
```

---



---

## ⚙️ Installation & Setup

### ✅ 1. Clone repository
```bash
git clone https://github.com/pinkfloyed/CartFusion-Online-Shopping-Platform.git
cd CartFusion-Online-Shopping-Platform
```

### ✅ 2. Install dependencies
```bash
npm install
```
### ✅ 3. Configure environment variables
- Create .env file:
```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```
### ✅ 4. Setup Prisma
```bash
npx prisma generate
npx prisma db seed
```
### ✅ 5. Run development server
```bash
npm run dev
```
- App URL → http://localhost:3000
---

## 🔌 API Endpoints

### 🔹 Auth
| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login         |

### 🔹 Products
| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| GET    | `/api/products`       | Get all products         |
| GET    | `/api/products/:slug` | Get product              |
| POST   | `/api/products`       | Create product *(admin)* |
| PUT    | `/api/products/:id`   | Update product *(admin)* |
| DELETE | `/api/products/:id`   | Delete product *(admin)* |

### 🔹 Reviews
| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/reviews`       | Add review              |
| GET    | `/api/reviews/admin` | Admin reviews           |
| DELETE | `/api/reviews/:id`   | Delete review *(admin)* |

### 🔹 Orders
| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| POST   | `/api/orders`       | Create order       |
| GET    | `/api/orders`       | User order history |
| GET    | `/api/orders/admin` | Admin orders list  |

---

## 📸 Screenshots

**Figure 1 : Home Page Displays hero section** 

<img width="858" height="609" alt="home1" src="https://github.com/user-attachments/assets/09759284-5dc9-4d21-911c-2d28aa874bcb" />


**Figure 2 : Home Page Displays product highlights**
<img width="400" height="606" alt="home3" src="https://github.com/user-attachments/assets/d7a1bb99-6965-4758-bec7-14b7a4ee38ba" />


**Figure 3 : About Page**  

<img width="603" height="608" alt="about" src="https://github.com/user-attachments/assets/28f86307-879e-4b59-b27a-0bd98d43a278" />


**Figure 4 : Contact Page**

<img width="1034" height="579" alt="contact" src="https://github.com/user-attachments/assets/6eb1cdf3-39d2-4839-af74-0ce30afc8925" />


**Figure 5 : User Registarion Page**

<img width="1365" height="584" alt="register" src="https://github.com/user-attachments/assets/e6248118-0ffd-4f56-9177-e0ceb659e549" />


**Figure 6 : User Login Page**

<img width="1365" height="607" alt="login" src="https://github.com/user-attachments/assets/afbb9a08-1057-474a-8353-fff84aa60fe8" />


**Figure 7 : Admin DashBoard**

<img width="1363" height="610" alt="admindashboard" src="https://github.com/user-attachments/assets/32e09759-2fdd-44b8-bc48-9b323b6e31a5" />


**Figure 8 : Admin Dashboard products management**

<img width="1365" height="605" alt="adminproductlist" src="https://github.com/user-attachments/assets/8389b35d-3a68-4643-9537-5d2eead5eb02" />


**Figure 9 : Admin can Add product to Product List**

<img width="1365" height="607" alt="addproduct" src="https://github.com/user-attachments/assets/32fe4056-7d23-478b-86e0-6688813f62d7" />


**Figure 10 : Admin can edit product** 

<img width="1365" height="609" alt="editproduct" src="https://github.com/user-attachments/assets/c0cb61d9-d2c1-42ba-beda-8d99f3e1a89a" />


**Figure 11 : Admin can delete product** 

<img width="1364" height="570" alt="deleteproduct" src="https://github.com/user-attachments/assets/014bec55-6758-4001-8c90-620ca9c7ee36" />


**Figure 12 : Manage Customer Reviews** 

<img width="1365" height="384" alt="adminmanagereviews" src="https://github.com/user-attachments/assets/71fd69c9-fdf9-4568-8cf3-4b51e8e490b0" />


**Figure 13 : Admin Manage Orders** 

<img width="1365" height="610" alt="adminorders" src="https://github.com/user-attachments/assets/2ad18f5d-9d13-4ccc-9256-261cfa5523d1" />


**Figure 14 : Admin Update order status**

<img width="1365" height="650" alt="changeorderstatus" src="https://github.com/user-attachments/assets/8cc3d4fe-b241-46c8-954c-f2243614d3dd" />


**Figure 15 : Admin Profile Page**

<img width="1082" height="431" alt="adminprofile" src="https://github.com/user-attachments/assets/80241ae4-1a4b-44e4-9856-dfbf2f8d570b" />


**Figure 16 : Edit Profile Page**

<img width="1365" height="610" alt="editprofile" src="https://github.com/user-attachments/assets/04a96971-99d2-4338-b1f6-259cd098cdbf" />


**Figure 17 : Customer Profile Page**

<img width="1365" height="602" alt="customerprofile" src="https://github.com/user-attachments/assets/e511d351-997f-44ee-987e-4303ef017cff" />


**Figure 18 : Customer can view all products and Add To Cart**

<img width="388" height="493" alt="allproductspage" src="https://github.com/user-attachments/assets/8bd554c8-6bba-434c-b5c1-bc30fe40dd96" />


**Figure 19 : Customer can Add items to shopping cart**

<img width="1365" height="646" alt="addtocart" src="https://github.com/user-attachments/assets/8244e1e2-6e88-49db-9aa1-50540dc65a69" />


**Figure 20 : Products can be sorted in ascending/descending order and Pagination browsing**

<img width="805" height="604" alt="asc" src="https://github.com/user-attachments/assets/db4677f2-57fc-4ddf-bdc7-6c226388bb3f" />


**Figure 21 : Products filter by category**

<img width="796" height="607" alt="searchbycategory" src="https://github.com/user-attachments/assets/2fb5e392-e6a9-456d-be0e-3ecf1f1e4ca5" />


**Figure 22 : Product details View Page**

<img width="1365" height="603" alt="addcartview" src="https://github.com/user-attachments/assets/2cef58ff-9574-406c-8475-efedc56c6d34" />

**Figure 23 : Customer Cart Page & Edit cart items**


<img width="536" height="479" alt="customercart" src="https://github.com/user-attachments/assets/fe90f12f-56ab-4c8c-98ab-dd40eb116ee3" />

**Figure 24 : Place Order Page**


<img width="1365" height="601" alt="paceorder" src="https://github.com/user-attachments/assets/2e059af3-6d3d-49e5-81b4-471f8d8bc6d9" />

**Figure 25 : Add Review Page**

<img width="1365" height="611" alt="addreview" src="https://github.com/user-attachments/assets/1b7ab7f9-a063-4135-97a5-aeb57eb4980b" />


----

## 💳 Payment Method

### ✅ Cash on Delivery (COD)

CartFusion currently supports **Cash on Delivery** as the primary payment method:

✔ No online payment required  
✔ Users confirm order at checkout  
✔ Payment collected upon delivery  

---

## 🔮 Future Enhancements

- ✅ Online payment (Stripe / SSLCOMMERZ / bKash / Nagad)
- ✅ Inventory management
- ✅ Email notifications
- ✅ Customer address book
- ✅ PWA support

---

## 📜 License

- This project is licensed under the  Apache-2.0 license.
---

## 👩‍💻 Author
### Pinki Akter
- GitHub: https://github.com/pinkfloyed
---
