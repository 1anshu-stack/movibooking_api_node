import Theatre from "../models/theatre.mode.js"



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
      return {err: err, code: 422}
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
      return {
        err: "No record of a theatre found for the given id",
        code: 404
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
      return {
        err: "No record of a theatre found for the given id",
        code: 404
      }
    }

    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}


const getAllTheatrefn = async (data) => {
/**
 * 
 * @param data -> data to be used to filter out theatres based on city / pincode
 * @returns -> return an object with the filtered content of theatres
 */
const getAllTheatrefn = async () => {
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
    if(data && data.limit){
      pagination.limit = data.limit
    }
    if(data && data.skip){
      // for first page we send skip as 0 
      let perPage = (data.limi) ? data.limit : 3
      pagination.skip = data.skip * perPage;
    }

    console.log(query);
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

export {
  createTheatrefn,
  deleteTheatrefn,
  getTheatrefn,
  getAllTheatrefn
}
