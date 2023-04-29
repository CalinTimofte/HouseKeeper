import { Schema, model, models } from 'mongoose';

const foodItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
    },
  expirationDate:{
    type: Date,
    required: true,
  },
  quantity:{
    type: Number,
    required: true
  },
  unit:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    default: null,
  },
  from:{
    type: String,
    default: "Jumbo",
  }
});

const FoodItem = models.foodItem || model('foodItem', foodItemSchema);

export default FoodItem;
