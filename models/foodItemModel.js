import { Schema, model, models } from 'mongoose';

// {
//   "name": "cheese",
//   "expirationDate": "2024-04-20",
//   "quantity": 2
// }

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
});

const FoodItem = models.foodItem || model('foodItem', foodItemSchema);

export default FoodItem;
