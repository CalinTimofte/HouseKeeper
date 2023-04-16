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
    const test = await FoodItem.create(req.body);
    console.log('CREATED DOCUMENT');

    res.json({ test });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

let foodItemController = {
    addFoodItem
}

export default foodItemController;