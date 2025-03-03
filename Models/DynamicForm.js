const { model, Schema } = require('mongoose');

const dynamicFormSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  fields: [
    {
      fieldName: { type: String, required: true }, // Example: email
      fieldType: {
        type: String,
        enum: [
          'text',
          'number',
          'email',
          'checkbox',
          'radio',
          'dropdown',
          'date',
          'time',
        ],
        required: true,
      },
      label: { type: String, required: true }, // Example your email
      placeholder: { type: String, required: false }, // Example: Enter your email
      required: { type: Boolean, default: false }, // To determine the optional fields
      options: { type: [String] }, // options for dropdown or check box
    },
  ],
});

module.exports = model('DynamicForm', dynamicFormSchema);
