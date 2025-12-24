import Theatre from "../models/theatre.mode.js"

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


const getAllTheatrefn = async () => {
  try {
    const response = await Theatre.find({})
    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
}


export {
  createTheatrefn,
  deleteTheatrefn,
  getTheatrefn,
  getAllTheatrefn
}
