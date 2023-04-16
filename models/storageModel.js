import { Schema, model, models } from 'mongoose';

// {
//   "name": "fridge"
// }

const storageSchema = new Schema({
  name: {
    type: String,
    required: true,
    },
  foodItemIds: [{type: Schema.Types.ObjectID, ref: 'foodItem'}]
});

const Storage = models.storage || model('storage', storageSchema);

export default Storage;
