const mongoose = require('mongoose');
const models = require ('../models/attemptModel')

const utils = require('../utils/utils.js');

module.exports = class AttemptRepository {
  constructor(model) {
    const user_model = mongoose.model('attemptModel', model);
    this.model = user_model;
  }

  /**
   *
   * @param {Object} object user data
   * @returns {Object} new user data
   */
  async create(object) {
    return this.model.create(object);
  }

  /**
   *
   * @returns {Array} users data
   */
  async getAll() {
    const attempt = await this.model.find();
    console.log(attempt);
    return attempt;
  }

  /**
   *
   * @param {String} id user id
   * @returns {Object} user data
   */
  async getById(id) {
    const attemptId = utils.toObjectId(id);
    const isExist = await this.model.exists({ _id: attemptId });
    if (!isExist) throw new Error('Attempt Not Found!');
    const user = await this.model.findById(attemptId);
    return user;
  }

  /**
   *
   * @param {String} id user id
   * @returns {Object} user data
   */
  async deleteById(id) {
    const attemptId = utils.toObjectId(id);
    const isExist = await this.model.exists({ _id: attemptId });
    if (!isExist) throw new Error('Attempt Not Found!');
    return this.model.findByIdAndDelete(attemptId);
  }
} ;