# URL Shortner
Designing URL Shorterned service that take in valid URL and returns a shortened URL, redirecting the user to the previous URL.

Also, keep track of total visits/clicks on URL.

**Routes:**
- POST /URL : Generates a new short URL and returns the shortened URL in the format example.com/random-id.
- GET /:id : Redirects the user to the original URL.
- GET /URL/analytics/:id : Returns the clicks for the provided short id.