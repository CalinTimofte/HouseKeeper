import { Schema, model, models } from 'mongoose';

const foodItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    },
  expirationDate:{
    type: Date,
    required: true,
  },
  quantity:{
    type: Number,
    required: true
  },
  storageId: {type: Schema.Types.ObjectID, ref: 'Storage'}
});

const foodItem = models.foodItem || model('foodItem', foodItemSchema);

export default foodItem;
