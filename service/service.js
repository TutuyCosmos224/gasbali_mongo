const utils = require('../utils/utils.js');
const UserRepository = require('../repository/userRepository.js');
const userModel = require('../models/userModel.js');
const attemptModel = require('../models/attemptModel.js');
const AttemptRepository = require('../repository/attemptRepository.js');
const userRepo = new UserRepository(userModel.userSchema);
const attemptRepo = new AttemptRepository(attemptModel.attemptSchema);

/**
 *
 * @param {Object} user
 * @returns {Object} new user
 */
 const createUser = async (user) => {
    try {
      console.log("masuk service");
      const { error } = utils.validateUser(user);
      console.log("validate");
      if (error) {
        console.log(error);
        throw new Error(error.details.map((err) => err.message));
      }
  
      const hashedPassword = await utils.hashPassword(user.password);
      console.log("hash");
      const newUser = {
		    name : user.name,
		    username : user.username,
		    password : hashedPassword,
		    gender : user.gender,
		    age : user.age,
	}
      console.log(newUser);
      return await userRepo.create(newUser);
    } catch (err) {
      throw new Error(err.message);
    }
  };

/**
 *
 * @param {Object} attempt
 * @returns {Object} new attempt
 */
  const createAttempt = async (attempt) => {
    try{
      const newAttempt = {
        name: attempt.name,
        username: attempt.username,
        game: attempt.game,
        time: attempt.time,
      }
      return await attemptRepo.create(newAttempt);
    } catch(err){
      throw new Error(err.message);
    }
  }
  
  /**
   *
   * @returns all users data
   */
  const getAllUsers = () => {
    try {
      return userRepo.getAll();
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  /**
   *
   * @param {String} id user id
   * @returns {Object} user data
   */
  const getUserById = async (id) => {
    try {
      return await userRepo.getById(id);
    } catch (err) {
      throw new Error(err.message);
    }
  };
 /**
   *
   * @param {String} uName username
   * @returns {Object} user data
   */
  const getAttempt = async (uName) =>{
    try{
      return await attemptRepo.getByUname(uName);
    } catch (err){
      throw new Error (err.message);
    }
  }
  
  const getAllAttempts = async() => {
    try {
      return attemptRepo.getAll();
    } catch (err){
      throw new Error (err.message);
    }
  }
  /**
   *
   * @param {String} id user id
   * @param {Object} user
   * @returns {Object} updated user data
   */
  const updateUser = async (id, user) => {
    const { error } = utils.validateUser(user);
    if (error) {
      throw new Error(error.details.map((err) => err.message));
    }
    try {
      const hashedPassword = await utils.hashPassword(user.password);

      const userUpdate = {
	    	name : user.name,
		    username : user.username,
		    password : hashedPassword,
		    gender : user.gender,
		    age : user.age,
	}

      const updatedUser = await userRepo.updateUser(id, userUpdate);
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  /**
   *
   * @param {String} id user id
   * @returns {Object} user data
   */
  const deleteUser = async (id) => {
    try {
      return await userRepo.deleteById(id);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  /**
   * 
   * @param {Object} creds user login attempt
   * @returns {Boolean}  verify
   */
  const loginUser = async (creds) =>{
    const user = await userRepo.getByUname(creds.username);
    return utils.verifyPassword(creds.password, user.password);
  }
  
  /**
   * 
   * @param {String} uName username
   * @returns {Object}  
   */
  const signInUser = async (uName) => {
    try{
      return await userRepo.signIn(uName);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * 
   * @param {Object} userMoney username
   * @returns {Number} money change to
   */
  const updateMoney = async (userMoney) =>{
    const user = await userRepo.getByUname(userMoney.username);
    const money_status = user.money;
    const new_money = userMoney.money + money_status;
    return await userRepo.updateMoney(userMoney.username, new_money);
  }
  
  /**
   * 
   * @param {String} uName username
   * @returns {Number} money change to
   */
  const getUserByUname = async (uName) =>{
    try{
      console.log(uName);
      return userRepo.getByUname(uName);
    } catch (err){
      throw new Error (err.message);
    }
  }
  
  // eslint-disable-next-line object-curly-newline
  module.exports = {
    createUser,
    createAttempt,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    updateMoney,
    getUserByUname,
    signInUser,
    getAttempt,
    getAllAttempts,
  };