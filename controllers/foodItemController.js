import connectMongo from '../utils/connectMongo';
import FoodItem from '../models/foodItemModel';
import Storage from '../models/storageModel';
import storageController from "./storageController";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

// Functions defined here for foodItems have two versions, one
// just for the DB action, and another one to be used late byy a Next.js API

// Connect to DB

async function connectDB(){
try{
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');
}
catch (error){
    console.log(error)
}
}

// This function should be called every time functionality of the controller is invoked
// Maybe this could be optimized somehow else, TBD
connectDB();

// FoodItem creation
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

// Fetch all foodItems
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

// Fetch a specific foodItem
async function getFoodItemByName(name) {
    try {
    const foodItem = await FoodItem.findOne({name: name});
    return foodItem
    } catch (error) {
    console.log(error);
    }
}

async function getFoodItemByNameAPIFunc(req, res) {
    try {
    const foodItem = await getFoodItemByName(req.body.name);
    res.json({ foodItem });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

// Update one FoodItem
async function updateFoodItemByName(oldName, updatedObj) {
    try {
    const foodItem = await FoodItem.findOneAndReplace(
        {name: oldName},
        updatedObj
        );
    return foodItem;
    } catch (error) {
    console.log(error);
    }
}

async function updateFoodItemByNameAPIFunc(req, res) {
    try {
    const foodItem = await FoodItem.updateFoodItemByName(req.body.oldName, req.body.updatedItem);
    res.json({ foodItem });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

// Delete a foodItem
async function deleteFoodItem(name) {
    try {
    // First, remove the foodItem ID from the storage where it is contained, 
    // then delete the food item itself.
    // To get the handle for the storage that the FoodItem resides in, we first need the FoodItem id
    const foodItem = await getFoodItemByName(name);
    const storage = await Storage.findOne({foodItemIds: foodItem._id});
    await Storage.updateOne({name: storage.name}, {$pullAll: {foodItemIds: [{_id: foodItem._id}]}})
    await FoodItem.deleteOne({name: foodItem.name});
    return ("Deletion successful")
    } catch (error) {
    console.log(error);
    }
}

async function deleteFoodItemAPIFunc(req, res) {
    try {
    const result = await deleteFoodItem({name: foodItem.name});
    res.json({ result });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

// TODO: The exported object could be split into API only funcitons and normal funcitons
let foodItemController = {
    addFoodItem,
    addFoodItemAPIFunc,
    getAllFoodItems,
    getAllFoodItemsAPIFunc,
    getFoodItemByName,
    getFoodItemByNameAPIFunc,
    updateFoodItemByName,
    updateFoodItemByNameAPIFunc,
    deleteFoodItem,
    deleteFoodItemAPIFunc
}

export default foodItemController;