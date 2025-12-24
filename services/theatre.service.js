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
  console.log("service:",id)
  const response = await Theatre.findByIdAndDelete(id);
  return response;
}

export {
  createTheatrefn,
  deleteTheatrefn
}
