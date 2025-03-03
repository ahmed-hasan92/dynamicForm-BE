const DynamicForm = require('../../Models/DynamicForm');
const User = require('../../Models/User');

exports.createForm = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'This user does not exist' });
    }
    const isUserHasForm = await DynamicForm.findOne({ user: userId });
    if (isUserHasForm) {
      return res
        .status(403)
        .json({ message: 'You can only have one dynamic form' });
    }

    const { fields } = req.body;

    if (!fields || !Array.isArray(fields) || fields.length === 0) {
      return res
        .status(400)
        .json({ message: 'At least one field is required' });
    }

    const newForm = new DynamicForm({
      user: userId,
      fields,
    });

    await newForm.save();

    existingUser.dynamicForm = newForm._id;
    await existingUser.save();

    return res
      .status(201)
      .json({ message: 'Your dynamic form has been created' });
  } catch (error) {
    next(error);
  }
};
