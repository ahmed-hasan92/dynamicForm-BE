const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  email: { type: String, trim: true, unique: true, required: true },
  password: { type: String },
  dynamicForm: { type: Schema.Types.ObjectId, ref: 'DynamicForm' },
});

module.exports = model('User', userSchema);
