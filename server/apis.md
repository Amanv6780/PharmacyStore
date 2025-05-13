## Following are all API's and what they do 


**Base URL**
http://localhost:5000/


**User API's**

### Both routes return a JWT which has user schema (after parsing json)
- POST  /api/v1/auth/register   - sign up a user (look for expected schema in Usermodel.js)
- POST /api/v1/auth/signin     - sign in a user (same schema as above)



### Will search the db for products || Will create or update products 
**Product API's**
- GET /api/v1/products/getall/   // not added yet:num
- GET /api/v1/products/getbystore
- POST /api/v1/products/add
- PUT /api/v1/products/updateproduct/:id 
- DELETE /api/v1/products/deleteproduct/:id 



### Will search the db for products || Will create or update products 
**order API's**
- POST /api/v1/orders/createorder
- GET /api/v1/orders/getorderbystore
- PUT /api/v1/orders/updatestatus/:id



### update user
-PUT /api/v1/updateuser/updateinfo
-PUT /api/v1/updateuser/forgotpassword




