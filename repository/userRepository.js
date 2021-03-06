const mongoose = require('mongoose');
const models = require ('../models/userModel')

const utils = require('../utils/utils.js');

module.exports = class UserRepository {
  constructor(model) {
    const user_model = mongoose.model('userModel', model);
    this.model = user_model;
  }

  /**
   *
   * @param {Object} object user data
   * @returns {Object} new user data
   */
  async create(object) {
    const isExist = await this.model.exists({ username: object.username });
    if (isExist) {
      throw new Error('Username already exist');
    }
    return this.model.create(object);
  }

  /**
   *
   * @returns {Array} users data
   */
  async getAll() {
    const users = await this.model.find();
    console.log(users);
    return users;
  }

  /**
   *
   * @param {String} id user id
   * @returns {Object} user data
   */
  async getById(id) {
    const userId = utils.toObjectId(id);
    const isExist = await this.model.exists({ _id: userId });
    if (!isExist) throw new Error('User Not Found!');
    const user = await this.model.findById(userId);
    return user;
  }

  /**
   * 
   * @param {String} uName username
   * @returns {Object} user data
   */
  async getByUname(uName){
    const isExist = await this.model.exists({ username: uName });
    if (!isExist) throw new Error ('User Not Found!');
    const user = await this.model.findOne({ username:uName });
    return user;
  }

  /**
   *
   * @param {String} id user id
   * @param {Object} object user object data
   * @returns {Object} updated user data
   */
  async updateUser(id, object) {
    const userId = utils.toObjectId(id);
    const isExist = await this.model.exists({ _id: userId });
    if (!isExist) throw new Error('User Not Found!');
    const user = await this.model.findByIdAndUpdate(userId, object, {
      new: true,
    });
    return user;
  }

  /**
   *
   * @param {String} id user id
   * @returns {Object} user data
   */
  async deleteById(id) {
    const userId = utils.toObjectId(id);
    const isExist = await this.model.exists({ _id: userId });
    if (!isExist) throw new Error('User Not Found!');
    return this.model.findByIdAndDelete(userId);
  }

  /**
   * 
   * @param {String} uName username
   * @param {Number} cur_money money
   * @returns {Object} userdata
   */
  async updateMoney(uName, cur_money){
    const query = { username: uName };
    return this.model.findOneAndUpdate(query, { money:cur_money });
  }

  /**
   * 
   * @param {String} uName username
   * @return {Object} userdata
   */
  async signIn (uName){
    const isExist = await this.model.exists({ username: uName });
    if (!isExist) {
      const object = {
        name : uName,
		    username : uName,
		    // password : hashedPassword,
      }
      return await this.model.create(object);
    } else {
      const user = await this.model.findOne({ username:uName });
      return user;
    }
  }
} ;