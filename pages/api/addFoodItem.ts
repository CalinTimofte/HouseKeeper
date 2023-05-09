// Request format: 
    //
    // {
    //     "name": "eggs",
    //     "expirationDate": "2024-04-20",
    //     "quantity": 6,
    //     "unit": "piece"
    //   }
    // Unit can be piece, g, ml

import foodItemController from "../../controllers/foodItemController";
export default foodItemController.addFoodItemAPIFunc;