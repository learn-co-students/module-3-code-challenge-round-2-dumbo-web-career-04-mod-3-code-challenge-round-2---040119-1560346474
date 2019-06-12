const beerURL = 'http://localhost:3000/beers'

// --- helper method to list each beer title from API ---
function addBeerToList(beer) {
let beerTopList = document.getElementById('list-group')
beerTopList.innerHTML += ` <li style="font-family:futura;" class="list-group-item" data-id="${beer.id}">${beer.name}</li> `
}


// ---helper method to show beer info ---
function rollThatBeautifulBeerFootage(beer) {
let beerShowArea = document.getElementById('beer-detail')
beerShowArea.innerHTML = `
<h1 style="font-family:futura;text-align:center;">  - = = ${beer.name} = = -  </h1>
<img style="display:block;margin-left:auto;margin-right:auto;width:10%;" src="${beer.image_url}">
<h3 style="text-align:center;"><em>${beer.tagline}</em></h3>
<textarea id="beer-description">${beer.description}</textarea>
<button id="edit-beer" data-id="${beer.id}" class="btn btn-info">
  Save
</button>
`
// --- adds event listener and does the patch ---
document.getElementById('edit-beer').addEventListener('click', function(e) {
	editABeer(e.target)
	})
}

function editABeer(target) {
	fetch(`http://localhost:3000/beers/${target.dataset.id}`, {
  headers: { "Content-Type": "application/json; charset=utf-8" },
  method: 'PATCH',
  body: JSON.stringify({
    description: target.previousElementSibling.value,
  })
})
	.then(response => response.json())
	alert(' 🍺 Beer changes saved! Have a drink to celebrate 🍺 ')
}

// --- fetches beers from API ---
document.addEventListener('DOMContentLoaded', () => {
fetch(beerURL)
.then(resp => resp.json())
.then(beerData => {
	console.log(beerData)
	beerData.forEach(function(beer){
		addBeerToList(beer)
	})
})

// --- gets single beer info on the DOM ---
let beerArea = document.querySelector('.col-md-4')
beerArea.addEventListener('click', function(e) {
fetch(`http://localhost:3000/beers/${e.target.dataset.id}`)
.then(resp => resp.json())
.then(beerData => {
	// console.log(beerData)
	rollThatBeautifulBeerFootage(beerData)
	})
    // console.log(e.target.dataset.id) 
	})
})