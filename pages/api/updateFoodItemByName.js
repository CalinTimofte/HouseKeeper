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

import foodItemController from "../../controllers/foodItemController";
export default foodItemController.updateFoodItemByNameAPIFunc;