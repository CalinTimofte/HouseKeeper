import connectMongo from '../utils/connectMongo';
import Storage from '../models/storageModel';
import FoodItem from '../models/foodItemModel';
import foodItemController from "./foodItemController";


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
    const newStorage = await Storage.create(req.body);
    console.log('CREATED DOCUMENT');

    res.json({ newStorage });
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
            // addToSet is a mongoose thingy that ensures no duplicates in an array
            Storage.updateOne({name: storage.name}, {$addToSet: {foodItemIds: foodItem._id}})
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

async function getAllStorage(req, res) {
    try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    const storages = await Storage.find({});

    res.json({ storages });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function getStorageByName(req, res) {
    //Request should look like this:
    // {
    //   "name": "fridge"
    // }
    try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    const storage = await Storage.findOne({name: req.body.name});

    res.json({ storage });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function getSotrageThatContainsFoodItem(req, res) {
    //Request should look like this:
    // {
    //   "foodItem": "milk"
    // }
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');    
        
        const foodItem = await FoodItem.findOne({name: req.body.foodItem});
        const storage = await Storage.find({foodItemIds: foodItem._id});

    res.json({ storage });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function getAllFoodInStorageByName(req, res) {
    //Request should look like this:
    // {
    //   "name": "fridge"
    // }
    try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');
    const storage = await Storage.findOne({name: req.body.name});
    const foodArray = await FoodItem.find({_id: {$in: storage.foodItemIds}});

    res.json({ foodArray });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function deleteStorageByName(req, res) {
    //Request should look like this:
    // {
    //   "name": "fridge"
    // }
    try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    const storage = await Storage.deleteOne({name: req.body.name});

    res.json({ storage });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function updateStorageNameByName(req, res) {
    //Request should look like this:
    // {
    //  "oldName": "fridge",
    //  "newName": "fridgeroni"
    // }
    try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    const storage = await Storage.updateOne(
        {name: req.body.oldName},
        {$set: {name: req.body.newName}}
        );

    res.json({ storage });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function deleteFoodItemFromStorage(req, res) {
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
            Storage.updateOne({name: storage.name}, {$pullAll: {foodItemIds: [{_id: foodItem._id}]}})
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
    addFoodItemToStorage,
    getAllStorage,
    getStorageByName,
    deleteStorageByName,
    updateStorageNameByName,
    getAllFoodInStorageByName,
    deleteFoodItemFromStorage,
    getSotrageThatContainsFoodItem
}

export default storageController;