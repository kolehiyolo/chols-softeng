@workspace Yo. I need to add authentication to my project. Help. I'm familiar with Passport.js so let's do that. I need these
1. User can sign up with their details (first name, last name, main role, username, email, password)
2. This registration has confirm password verification, and it also checks if username or email is already taken, and prevents registration if so
3. If successful, they are then added to the DB in the users collection
3. User can log in using username and password registered
4. Once logged in, redirect them to /projects