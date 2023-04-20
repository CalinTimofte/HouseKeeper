# HouseKeeper
An app to help you with household administrative tasks

# API documentation:

<table>
	<thead>
		<tr>
			<th>Function name</th>
			<th>Endpoint name</th>
			<th>Method</th>
			<th>Request example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>foodItemController.addFoodItem</td>
			<td>/api/addFoodItem</td>
			<td>POST</td>
			<td>{"name": "eggs",</br>"expirationDate": "2024-04-20",</br>"quantity": 6,</br>"unit": "piece"}</td>
		</tr>
		<tr>
			<td>foodItemController.getAllFoodItem</td>
			<td>/api/getAllFoodItem</td>
			<td>GET</td>
			<td>-</td>
		</tr>
		<tr>
			<td>foodItemController.getFoodItemByName</td>
			<td>/api/getFoodItemByName</td>
			<td>POST</td>
			<td>{"name": "milk"}</td>
		</tr>
		<tr>
			<td>foodItemController.updateFoodItemByName</td>
			<td>/api/updateFoodItemByName</td>
			<td>POST</td>
			<td>{"oldName": "milk",<br/>"updatedItem":<br/>{"name": "eggs",<br/>"expirationDate": "2024-04-20",<br/>"quantity": 6,<br/>"unit": "piece"}<br/>}</td>
		</tr>
		<tr>
			<td>storageController.addStorage</td>
			<td>/api/addStorage</td>
			<td>POST</td>
			<td>{"name": "fridge" }</td>
		</tr>
		<tr>
			<td>storageController.addFoodItemToStorage</td>
			<td>/api/addFoodItemToStorage</td>
			<td>POST</td>
			<td>{"storage": "fridge",</br>"foodItem": "milk"}</td>
		</tr>
		<tr>
			<td>storageController.getAllStorage</td>
			<td>/api/getAllStorage</td>
			<td>GET</td>
			<td>-</td>
		</tr>
		<tr>
			<td>storageController.getStorageByName</td>
			<td>/api/getStorageByName</td>
			<td>POST</td>
			<td>{"name":"fridge"}</td>
		</tr>
		<tr>
			<td>storageController.getAllFoodInStorageByName</td>
			<td>/api/getAllFoodInStorageByName</td>
			<td>POST</td>
			<td>{"name":"fridge"}</td>
		</tr>
		<tr>
			<td>storageController.deleteStorageByName</td>
			<td>/api/deleteStorageByName</td>
			<td>POST</td>
			<td>{"name":"fridge"}</td>
		</tr>
		<tr>
			<td>storageController.updateStorageNameByName</td>
			<td>/api/updateStorageNameByName</td>
			<td>POST</td>
			<td>{"oldName": "fridge",</br>"newName": "fridgeroni"}</td>
		</tr>
	</tbody>
</table>
