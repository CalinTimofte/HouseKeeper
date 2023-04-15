import { Schema, model, models } from 'mongoose';

const storageSchema = new Schema({
  name: {
    type: String,
    required: true,
    },
  foodItemIds: [{type: Schema.Types.ObjectID, ref: 'foodItem'}]
});

const storage = models.storage || model('storage', storageSchema);

export default storage;
