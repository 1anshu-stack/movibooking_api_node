import Show from "../models/show.model.js"
import { STATUS_CODE } from "../utils/constans.js";
import Theatre from "../models/theatre.model.js";


/**
 * 
 * @param data -> this is the object containing details of the show to be created 
 * @returns object with new show details
 */
const createShowfn = async (data) => {
  try {
    const theatre = await Theatre.findById(data.theatreId)
    if(!theatre){
      throw {
        err: "No theatre found",
        code: STATUS_CODE.NOT_FOUND
      }
    }

    if(!theatre.movies.some(id => id.equals(data.movieId))){
      throw {
        err: 'Movie is currently not available in the request',
        code: STATUS_CODE.NOT_FOUND
      }
    }

    const response = await Show.create(data);
    return response;
  } catch (error) {
    if(error.name == "ValidationError"){
      let err = {};
      Object.key(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      })
      throw {
        err,
        code: STATUS_CODE.UNPROCESSABLE_ENTITY
      }
    }
    console.log(error);
    throw error;
  }
}


export {
  createShowfn
}