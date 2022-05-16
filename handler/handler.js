const userService = require('../service/service.js');

const wow = async (req, res, next) =>{
    res.send("wow");
}


const postUser = async (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const user = req.body;
  try {
    const newUser = await userService.createUser(user);
    console.log('handler');
    res.status(201).json({ success: true, message: 'success', data: newUser });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const postAttempt = async (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const attempt = req.body;
  try {
    const newAttempt = await userService.createAttempt(attempt);
    res.status(201).json({ success: true, message: 'success', data: newAttempt });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, message: 'success', data: users });
    console.log('users gotten');
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const getById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUserById(userId);

    res.status(200).json({ success: true, message: 'success', data: user });
    console.log('user gotten');
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = req.body;
  try {
    const updatedUser = await userService.updateUser(userId, user);

    res.status(200).json({ success: true, message: 'success', data: updatedUser });
    console.log('user updated');
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.deleteUser(userId);

    res.status(200).json({ success: true, message: 'success', data: user });
    console.log('user deleted');
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const loginUser = async (req, res, next) => {
  const userCreds = req.body;
  try{
    const verify = await userService.loginUser(userCreds);
    console.log(verify);
    res.status(200).json({ success: true, message: 'success', data: verify});
    console.log('user logged in');
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const updateMoney = async (req, res, next) => {
  const userMoney = req.body;
  try{
    const money = await userService.updateMoney(userMoney);
    res.status(200).json({ success: true, message: 'success', data: money});
    console.log('user logged in');
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
}

const getByUname = async (req, res, next) => {
  const { username } = req.params;
  try{
    const data = await userService.getUserByUname(username);
    res.status(200).json({ success: true, message: 'success', data: data});
  } catch (err){
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
}

const signIn = async (req, res, next) => {
  const { username } = req.params;
  try{
    const data = await userService.signInUser(username);
    res.status(200).json({ success: true, message: 'success', data: data});
  } catch (err){
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
}

const getAttempt = async (req, res, next) => {
  const { username } = req.params;
  try{
    const data = await userService.getAttempt(username);
    res.status(200).json({ success: true, message: 'success', data: data});
  } catch (err){
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
}

const getAllAttempt = async (req, res, next) => {
  try{
    const data = await userService.getAllAttempts();
    res.status(200).json({ success: true, message: 'success', data: data});
  } catch (err){
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
}


// eslint-disable-next-line object-curly-newline
module.exports = {
  wow,
  postUser,
  postAttempt,
  getUsers,
  getById,
  updateUser,
  deleteUser,
  loginUser,
  updateMoney,
  getByUname,
  signIn,
  getAttempt,
  getAllAttempt,
};