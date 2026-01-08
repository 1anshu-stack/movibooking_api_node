Branch: Feature 3 Associate Movie Theatre

List of api's:

First api:
→ Update theatre model, with list of movies
→ Add movies in a theatre
→ Remove movies from a theatre
→ Get the list of theatres in which a movie is running
→ Search for a movie in a particular theatre
→ List all movies from a theatre

Second api: /mba/api/v1/theatre?movieId=<> why theatre bcz we want to filter out the theatre on the basis of movies.
→ We want to get the list of all theatres in which a movie is running.
→ We will write a new API to get the list of all theatres in which a given movie is running.
→ As a response, we want to return the list of theatres which are running the movie.

Third api: /mba/api/v1/theatres/:id/movies
→ This api will try to fetch all the movies running in the theatre with the given id.

Forth api: /mba/api/v1/theatres/:theatreId/movies/:movieId
→ A particular movie is present in a particular theatre or not.



Branch: Feature 4 Auth

First api: /mba/api/v1/auth/signup
→ We need to create an api to register a new user on our project.
→ We can setup a hook/trigger on userSchema such that before the save any user document a hook should execure just before the save.

second api: /mba/api/v1/auth/signin
→ using the email, we will fetch the user object.
→ then we will compare password
→ and if passwords are same then we return a token.

JWT:
→ We use ValidationMiddleware to validate the client site error.
→ In case of JWT tokens, we can send the token in the request header. Whenever we are trying to access an API which is protected by an authentication layer, we can send this JWT token which we received during sign in in the request headers.
→ On recovery of this request, we can verify the token. If the token is verified we grant the access otherwise we don’t.
→ header {
    “x-access-token”: <token>
}


Logout:
→ If we have implemented authentication using JWT, then there can be 2 ways to log out the user.
→ Either the token expires
→ Because JWT is a stateless mechanism, so it can be done on the frontend by deleting the saved token.


Third api: /mba/api/v1/auth/reset
Resetpassword:
→ We need to build an API to allow users to reset the password. For resetting the password, they need to provide the previous password & the new password. If the previous password gets a match, then we allow the user to reset; otherwise not.


Forth api: /mba/api/v1/auth/user/:id
To update: userRole and userStatus


Branch: Feature 6 integrate auth to apis

We need to add authentication and authorization for the theatre resource.
→ Add authentication in the theatre API
→ Add authorization in the theatre API
→ Admins or clients can create / delete / update any theatre.


Bookings and transactions

→ Setup model schema for booking and transaction.
→ Authenticated APIs for allowing only authenticated customers to perform booking.
→ Ability to cancel the booking.
→ Ability to make payment.


Branch: Feature_7_Bookings

createBooking api: /mba/api/v1/booking

updateBooking api: /mba/api/v1/booking/:id
If it’s a normal user, they can only cancel the booking and nothing else. validation middleware

getAllBooking api: /mba/api/v1/booking
Logedin user show booking respect to that not all user booking.

getAllTheBookingOfAParticularBookingId: /mba/api/v1/booking/:id



In Theatre model we are just having list of movies which are running in a theatre. We don't have the details about the shows that what are the different show timings available for a movie and what are the seats available for that particular show. What's the hall number.
We are going to perpare show model.

createShow api: /mba/api/v1/booking
with theatreid, movieid, noOfSeats, price, timing

newAPI to get all the show of a movie running in a theatre
api: /mba/api/show?theatreId=<>&movieId=<>