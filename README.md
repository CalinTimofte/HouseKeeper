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
			<td>{"name": "eggs","expirationDate": "2024-04-20","quantity": 6,"unit": "piece"}</td>
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
			<td>{"storage": "fridge","foodItem": "milk"}</td>
		</tr>
		<tr>
			<td>foodItemController.getAllFoodItem</td>
			<td>/api/getAllFoodItem</td>
			<td>GET</td>
			<td>-</td>
		</tr>
		<tr>
			<td>storageCOntroller.getAllStorage</td>
			<td>/api/getAllStorage</td>
			<td>GET</td>
			<td>-</td>
		</tr>
	</tbody>
</table>
