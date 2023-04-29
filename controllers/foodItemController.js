import connectMongo from '../utils/connectMongo';
import FoodItem from '../models/foodItemModel';
import Storage from '../models/storageModel';
import storageController from "./storageController";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

async function addFoodItem(req, res) {
    // Request format: 
    //
    // {
    //     "name": "eggs",
    //     "expirationDate": "2024-04-20",
    //     "quantity": 6,
    //     "unit": "piece",
    //     "price": "3.5",
    //     "from": "Jumbo"
    //   }
    // Unit can be piece, g, ml
    // price can be omitted, it defaults to null
    // from can be omitted, it defaults to Jumbo
    try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('CREATING DOCUMENT');
    const test = await FoodItem.create(req.body);
    console.log('CREATED DOCUMENT');

    res.json({ test });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function getAllFoodItems(req, res) {
    try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    const foodItems = await FoodItem.find({});

    res.json({ foodItems });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function getFoodItemByName(req, res) {
    //Request should look like this:
    // {
    //   "name": "milk"
    // }
    try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    const foodItem = await FoodItem.findOne({name: req.body.name});

    res.json({ foodItem });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function updateFoodItemByName(req, res) {
    //Request should look like this:
    // {
    //  "oldName": "milk",
    //  "updatedItem":
    //  {
    //     "name": "eggs",
    //     "expirationDate": "2024-04-20",
    //     "quantity": 6,
    //     "unit": "piece"
    //   }
    // }
    try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    const foodItem = await FoodItem.findOneAndReplace(
        {name: req.body.oldName},
        req.body.updatedItem
        );

    res.json({ foodItem });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function deleteFoodItem(req, res) {
    //Request should look like this:
    // {
    //  "name": "milk"
    // }
    try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    // First, remove the foodItem ID from the storage where it is contained, 
    // then delete the food item itself
    FoodItem.findOne({name: req.body.name})
    .then((foodItem) => {
        Storage.find({foodItemIds: foodItem._id})
        .then((storage) => {Storage.updateOne({name: storage.name}, {$pullAll: {foodItemIds: [{_id: foodItem._id}]}})})
        .then (()=>{FoodItem.deleteOne({name: foodItem.name})})
    })
    

    res.json({  });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}


let foodItemController = {
    addFoodItem,
    getAllFoodItems,
    getFoodItemByName,
    updateFoodItemByName,
    deleteFoodItem
}

export default foodItemController;