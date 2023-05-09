import connectMongo from '../utils/connectMongo';
import Storage from '../models/storageModel';
import foodItemController from "./foodItemController";


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

// Add a Storage object to the DB
async function addStorage(storage) {
    try {
    console.log('CREATING DOCUMENT');
    const newStorage = await Storage.create(storage);
    console.log('CREATED DOCUMENT');
    return(newStorage);
    } catch (error) {
    console.log(error);
    }
}

async function addStorageAPIFunc(req, res) {
    try {
    console.log('CREATING DOCUMENT');
    const newStorage = await Storage.create(req.body);
    console.log('CREATED DOCUMENT');

    res.json({ newStorage });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

// Assign a FoodItem to a Storage
async function addFoodItemToStorage(storageName, foodItemName) {
    try {
    Storage.findOne({name: storageName})
    .then((storage) => {
        foodItemController.getFoodItemByName(foodItemName)
        .then((foodItem) => {
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

    return("Operation successful")
    } catch (error) {
    console.log(error);
    }
}

async function addFoodItemToStorageAPIFunc(req, res) {
    try {
    const result = await addFoodItemToStorage(req.body.storage, req.body.foodItem)
    res.json({ result });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

// Fetch all Storage objects
async function getAllStorage() {
    try {
    const storages = await Storage.find({});
    return storages;
    } catch (error) {
    console.log(error);
    }
}

async function getAllStorageAPIFunc(req, res) {
    try {
    const storages = await getAllStorage();
    res.json({ storages });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

// Fetch one Storage object in different ways
async function getStorageByFoodItemId(id) {
    try {
    const storage = await Storage.findOne({foodItemIds: id});
    return storage;
    } catch (error) {
    console.log(error);
    }
}

async function getStorageByName(name) {
    try {
    const storage = await Storage.findOne({name: name});
    return storage;
    } catch (error) {
    console.log(error);
    }
}

async function getStorageByNameAPIFunc(req, res) {
    try {
    const storage = await getStorageByName(req.body.name);
    res.json({ storage });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function getSotrageThatContainsFoodItem(foodItemName) {
    try {
        const foodItem = await foodItemController.getFoodItemByName(fooditemName);
        const storage = await Storage.find({foodItemIds: foodItem._id});
        return storage;
    } catch (error) {
    console.log(error);
    }
}

async function getSotrageThatContainsFoodItemAPIFunc(req, res) {
    try {
        const storage = await getSotrageThatContainsFoodItem(req.body.foodItem)
        res.json({ storage });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

// Fetch all the FoodItems contained in a Storage object in the DB
async function getAllFoodInStorage(storageName) {
    try {
    const storage = await getStorageByName(storageName);
    const foodArray = await foodItemController.getAllFoodItemsFromArray(storage.foodItemIds);
    return(foodArray);
    } catch (error) {
    console.log(error);
    }
}

async function getAllFoodInStorageAPIFunc(req, res) {
    try {
    const foodArray = await getAllFoodInStorage(req.body.name);    
    res.json({ foodArray });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

// Delete a Storage object from DB
async function deleteStorage(name) {
    try {
    const storage = await Storage.deleteOne({name: name});
    return storage
    } catch (error) {
    console.log(error);
    }
}

async function deleteStorageAPIFunc(req, res) {
    try {
    const storage = await deleteStorage(req.body.name);
    res.json({ storage });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

// Update Storage functions
async function removeFoodItemFromStorage(storageName, foodItemID) {
    try {
    const storage = await Storage.updateOne({name: storageName}, {$pullAll: {foodItemIds: [{_id: foodItemID}]}});
    return storage;
    } catch (error) {
    console.log(error);
    }
}

async function updateStorageName(oldName, newName) {
    try {
    const storage = await Storage.updateOne(
        {name: oldName},
        {$set: {name: newName}}
        );
    return storage
    } catch (error) {
    console.log(error);
    }
}

async function updateStorageNameAPIFunc(req, res) {
    try {
    const storage = await updateStorageName(req.body.oldName,req.body.newName);
    res.json({ storage });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}

async function deleteFoodItemFromStorage(storageName, foodItemName) {
    try {
    const foodItem = await foodItemController.getFoodItemByName(foodItemName);
    const storage = await removeFoodItemFromStorage(storageName, foodItem._id)
    return storage;
    } catch (error) {
    console.log(error);
    }
}


async function deleteFoodItemFromStorageAPIFunc(req, res) {
    try {
    const storage = await deleteFoodItemFromStorage(req.body.storage, req.body.foodItem)
    res.json({ storage });
    } catch (error) {
    console.log(error);
    res.json({ error });
    }
}



const storageController = {
    addStorage,
    addStorageAPIFunc,
    addFoodItemToStorage,
    addFoodItemToStorageAPIFunc,
    getAllStorage,
    getAllStorageAPIFunc,
    getStorageByFoodItemId,
    getStorageByName,
    getStorageByNameAPIFunc,
    deleteStorage,
    deleteStorageAPIFunc,
    removeFoodItemFromStorage,
    updateStorageName,
    updateStorageNameAPIFunc,
    getAllFoodInStorage,
    getAllFoodInStorageAPIFunc,
    deleteFoodItemFromStorage,
    deleteFoodItemFromStorageAPIFunc,
    getSotrageThatContainsFoodItem,
    getSotrageThatContainsFoodItemAPIFunc
}

export default storageController;