import User from "../models/user.model.js";


const createUserfn = async (data) => {
  try {
    const response = await User.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export {
  createUserfn 
}