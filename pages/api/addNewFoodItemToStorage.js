//Request should look like this:
    // {
    //  "storage": "fridge",
    //  "foodItem": {
    //     "name": "eggs",
    //     "expirationDate": "2024-04-20",
    //     "quantity": 6,
    //     "unit": "piece"
    //   } 
    // }

    import {APIstorageController} from "../../controllers/storageController";
    export default APIstorageController.addNewFoodItemToStorageAPIFunc;