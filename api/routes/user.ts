import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import auth from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const user = User({
      email: req.body.email,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();
    return res.send({ message: 'registered!', user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }

    return next(error);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(422).send({ error: 'User not found!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'password is wrong!' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Email and password are correct!', user });
  } catch (error) {
    return next(error);
  }
});

userRouter.get('/search', async (req, res, next) => {
  try {
    const result = await User.find({ displayName: req.body.displayName });
    return res.send({ result });
  } catch (error) {
    next(error);
  }
});

userRouter.patch('/update/:id', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { displayName } = req.body;
    if (user) {
      const updated = await User.findOneAndUpdate(
        { _id: user._id },
        { displayName },
        { new: true },
      );
      return res.send({ message: 'updated', updated });
    } else {
      return res.status(404).send({ message: 'user no exist' });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }
    return next(error);
  }
});

userRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    const successMessage = { message: 'Success!' };

    if (!headerValue) {
      return res.send({ ...successMessage, stage: 'No header' });
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.send({ ...successMessage, stage: 'No token' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send({ ...successMessage, stage: 'No user' });
    }

    user.generateToken();
    await user.save();

    return res.send({ ...successMessage, stage: 'Success' });
  } catch (e) {
    return next(e);
  }
});

export default userRouter;
