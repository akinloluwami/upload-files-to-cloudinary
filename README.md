### Auth

- Login
  /admin/login (email and password)

- Signup
  /admin/signup (email, password, name, confirm password)

### Post

- Create a post
  /post/create (title,
  description,
  image,
  socialLinks,
  links,
  tokenContract,
  tags,
  linkToTokenomics)

* Get all posts
  /post/all 

* Delete a post
  /post/delete/:id (Bearer token header)

### Review

- Create a review
  /review/create ( name,
  comment,
  rating,
  postId)

  - Get all reviews under a post
    /review/all/:postId
