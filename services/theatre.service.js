import Theatre from "../models/theatre.model.js"
import { STATUS_CODE } from "../utils/constans.js";



/**
 * 
 * @param data -> object containing details of the new Theatre to be created 
 * @returns -> return the new Theatre object created
 */
const createTheatrefn = async (data) => {
  try {
    const response = await Theatre.create(data)
    return response;
  } catch (error) {
    console.log(error.name)
    if(error.name == 'ValidationError'){
      let err = {}
      Object.keys(error.errors).forEach((key) => (
        err[key] = error.errors[key].message
      ))
      throw {err: err, code: STATUS_CODE.UNPROCESSABLE_ENTITY}
    }   
    else {
      throw error;
    }
  }
}


/**
 * 
 * @param id -> id which will be used to indentify the movie to be deleted 
 * @returns -> object containing details of the movie deleted
 */
const deleteTheatrefn = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if(!response){
      throw {
        err: "No record of a theatre found for the given id",
        code: STATUS_CODE.NOT_FOUND
      }
    }

    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
}


/**
 * 
 * @param id -> it is the unique _id based on which we will fetch a theatre.
 */

const getTheatrefn = async (id) => {
  try {
    const response = await Theatre.findById(id);
    if(!response){
      throw {
        err: "No record of a theatre found for the given id",
        code: STATUS_CODE.NOT_FOUND
      }
    }

    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}


const getAllTheatrefn = async (data) => {
  try {
    
    let query = {};
    let pagination = {};
    if(data && data.city){
      query.city = data.city
    }
    if(data && data.pincode){
      query.pincode = data.pincode
    }
    if(data && data.name){
      query.name = data.name
    }
    // Movie and theatre combine
    if(data && data.movieId){
      query.movies = {$all: data.movieId}
    }
    if(data && data.limit){
      pagination.limit = data.limit
    }
    if(data && data.skip){
      // for first page we send skip as 0 
      let perPage = (data.limi) ? data.limit : 3
      pagination.skip = data.skip * perPage;
    }

    // console.log(query);
    const response = await Theatre.find(query, {}, pagination)
    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
}


/**
 * 
 * @param id -> the unique id to identify the theatre to be updated 
 * @param data -> data object to be used to update the theatre
 * @returns -> it returns the new updated theatre object 
 */
const updateTheatrefn = async (id, data) => {
  try{
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true, runValidators: true
    });
    if(!response){
      throw {
        err: "No record of a theatre found for the given id",
        code: STATUS_CODE.NOT_FOUND
      }
    }

    return response
  }catch(error){
    if(error.name == 'ValidationError'){
      let err = {};
      Object.keys(error.errors).forEach(key => (
        err[key] = error.erros[key].message
      ))
      return {
        err: err,
        code: 422
      }
    }
    throw error
  }
}




// MOVIE AND THEATRE COMBINE SERVICE FUNCTION

/**
 * 
 * @param theatreId -> unique id of the theatre for which we want to update movies
 * @param moviesIds -> array of movie ids that are expected to be updated in theatre
 * @param insert -> boolean that tells whether we want insert movies or remove them
 * @returns -> updated theatre object
 */
const updateMoviesInTheatresfn = async (theatreId, moviesIds, insert) => {
  try {
    let theatre;
    if(insert){
      // we need to add movies
      theatre = await Theatre.findByIdAndUpdate(
        {_id: theatreId},
        {$addToSet: { movies: {$each: moviesIds} }},
        {new: true}
      );
    }else{
      // we need to remove movies
      theatre = await Theatre.findByIdAndUpdate(
        {_id: theatreId},
        {$pull: {movies: {$in: moviesIds}}},
        {new: true}
      )
    }
    // const theatre = await Theatre.findById(theatreId)
    return theatre.populate('movies'); 
  } catch (error) {
    if(error.name == "TypeError"){
      return {
        err: "No theatre of id found",
        code: 404
      }
    }
    console.log(error)
    throw error
  }
}


const getMoviesInATheatresfn = async (id) => {
  try {
    const response = await Theatre.findById(id, {name: 1, movies: 1}).populate("movies")
    return response
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const checkMovieInTheatrefn = async (theatreId, movieId) => {
  try {
    const response = await Theatre.findById(theatreId);
    if(!response){
      return {
        err: "No theatre of this id is present.",
        code: 404
      }
    }

    // console.log(response.movies.includes(new mongoose.Types.ObjectId(movieId)))
    // console.log(response.movies.indexOf(movieId) != -1)
    return response.movies.some(id => id.equals(movieId));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export {
  createTheatrefn,
  deleteTheatrefn,
  getTheatrefn,
  getAllTheatrefn,
  updateTheatrefn,
  updateMoviesInTheatresfn,
  getMoviesInATheatresfn,
  checkMovieInTheatrefn
}
