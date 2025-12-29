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

second api: /mba/api/v1/auth/login
