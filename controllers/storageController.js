import connectMongo from '../utils/connectMongo';
import Storage from '../models/storageModel';
import FoodItem from '../models/foodItemModel';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
async function addStorage(req, res) {
    //Request should look like this:
    // {
    //   "name": "fridge"
    // }
    try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('CREATING DOCUMENT');
    const test = await Storage.create(req.body);
    console.log('CREATED DOCUMENT');

    res.json({ test });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function addFoodItemToStorage(req, res) {
    //Request should look like this:
    // {
    //  "storage": "fridge",
    //  "foodItem": "milk"
    // }
    try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    Storage.findOne({name: req.body.storage})
    .then((storage) => {
        console.log(storage)
        FoodItem.findOne({name: req.body.foodItem})
        .then((foodItem) => {
            console.log(foodItem);
            let newFoodItemIds = storage.foodItemIds;
            newFoodItemIds.push(foodItem._id);
            console.log(newFoodItemIds);
            Storage.updateOne({name: storage.name}, {foodItemIds: newFoodItemIds})
            .catch(function (err) {
                console.log(err);
              });
        })
        .catch(function (err) {
            console.log(err);
          });
    })
    .catch(function (err) {
        console.log(err);
      });

    res.json({  });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

const storageController = {
    addStorage,
    addFoodItemToStorage
}

export default storageController;