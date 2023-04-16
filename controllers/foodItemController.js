import connectMongo from '../utils/connectMongo';
import FoodItem from '../models/foodItemModel';

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
    //     "unit": "piece"
    //   }
    // Unit can be piece, g, ml
    try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('CREATING DOCUMENT');
    const newFoodItem = await FoodItem.create(req.body);
    console.log('CREATED DOCUMENT');

    res.json({ newFoodItem });
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
let foodItemController = {
    addFoodItem,
    getAllFoodItems,
    getFoodItemByName
}

export default foodItemController;