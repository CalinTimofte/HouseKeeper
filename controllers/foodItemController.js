import connectMongo from '../utils/connectMongo';
import FoodItem from '../models/foodItemModel';
import Storage from '../models/storageModel';
import storageController from "./storageController";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

async function connectDB(){
//Connect to DB
try{
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');
}
catch (error){
    console.log(error)
}
}
connectDB();

async function addFoodItem(foodItem) {
    try {
    console.log('CREATING DOCUMENT');
    const newFoodItem = await FoodItem.create(foodItem);
    console.log('CREATED DOCUMENT');
    return newFoodItem
    } catch (error) {
    console.log(error);
    }
}

async function addFoodItemAPIFunc(req, res) {
    try {
    console.log('CREATING DOCUMENT');
    const newFoodItem = await addFoodItem(req.body);
    console.log('CREATED DOCUMENT');
    res.json({ newFoodItem });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function getAllFoodItems() {
    try {
    const foodItems = await FoodItem.find({});
    return foodItems
    } catch (error) {
    console.log(error);
    }
}

async function getAllFoodItemsAPIFunc(req, res) {
    try {
    const foodItems = await getAllFoodItems();
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
    const foodItem = await FoodItem.findOne({name: req.body.name});
    const storage = await Storage.findOne({foodItemIds: foodItem._id});
    await Storage.updateOne({name: storage.name}, {$pullAll: {foodItemIds: [{_id: foodItem._id}]}})
    await FoodItem.deleteOne({name: foodItem.name});
    res.json({  });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}


let foodItemController = {
    addFoodItem,
    addFoodItemAPIFunc,
    getAllFoodItems,
    getAllFoodItemsAPIFunc,
    getFoodItemByName,
    updateFoodItemByName,
    deleteFoodItem
}

export default foodItemController;