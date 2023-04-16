import { Schema, model, models } from 'mongoose';

const storageSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
    },
  foodItemIds: [{type: Schema.Types.ObjectID, ref: 'foodItem'}]
});

const Storage = models.storage || model('storage', storageSchema);

export default Storage;
