


document.addEventListener("DOMContentLoaded", function(evenet){

	const beerURL = `http://localhost:3000/beers`

	const listGroup = document.querySelector(".list-group")
	const beerDetail = document.querySelector("#beer-detail")
	const button = document.querySelector("button")
	const editField = document.querySelector("#edit-field")
	
	


	fetch(beerURL)
	.then((response) => {
		return response.json()
	}).then((beers) => {
		beers.forEach((beer) => {
			listGroup.innerHTML += `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>` 
		})
	})

	listGroup.addEventListener("click", function(event){
		let beerId = event.target.dataset.id
		console.log(beerId)

		fetch(beerURL)
		.then((response) => {
			return response.json()
		}).then((beers) => {
			beers.forEach((beer) => {
				if (beerId == beer.id){
					beerDetail.innerHTML = ""
					beerDetail.innerHTML += `<h1 data-id=${beer.id}>${beer.name}</h1>
					<img src="${beer.image_url}">
					<h3>${beer.tagline}</h3>
					<textarea id="edit-field" data-id=${beer.id}>${beer.description}</textarea>
					<button id="edit-beer" class="btn btn-info" data-id=${beer.id}>
					  Save
					</button>`
				} 
			})
		})

	})
	
	// beerDetail.addEventListener("submit", function(event){
	// 	const updateBeer = (id, description) => {
	// 		return fetch(`beerURL/${id}`, {
	// 			method: 'PATCH',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				'Accept': 'application/json'
	// 			},
	// 			body: JSON.stringify({
	// 				description: newDescription
	// 			}).then ((response) => {
	// 				return response.json()
	// 			})
	// 		})
	// 	}

	// 	event.preventDefault()
	// 	debugger
	// 	let newDescription = editField.value

	// 	updateBeer(editField.dataset.id, newDescription).then((dec) => {
	// 		editField.innerHTML = newDescription

	// 	})
	// })



	// beerDetail.addEventListener("click", function(event){

	// 	if (event.target.tagName === "BUTTON"){
	// 		console.log("success")


	// 		updateBeer(editField.dataset.id, newDescription).then((dec) => {
	// 			debugger
	// 			const editField = document.querySelector("#edit-field")
	// 			let newDescription = dec.description
	// 			editField.innerHTML = newDescription

	// 		})
	// 	}
	// })

	// const updateBeer = (id, description) => {
	// 	return fetch(`beerURL/${id}`, {
	// 		method: 'PATCH',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Accept': 'application/json'
	// 		},
	// 		body: JSON.stringify({
	// 			description: newDescription
	// 		}).then ((response) => {
	// 			return response.json()
	// 		})
	// 	})
	// }

	beerDetail.addEventListener("click", function(event){
		if (event.target.tagName === "BUTTON"){
			const editField = document.querySelector("#edit-field")
			let newDescription = editField.value

			editField.innerHTML += newDescription

			return fetch(`beerURL/event.target.dataset.id`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					description: newDescription
				}).then ((response) => {
					return response.json()
				}).then((beer) => {
					editField.innerHTML = beer.description
				})
			})

		}

	})



})

