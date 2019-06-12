const beerURL = 'http://localhost:3000/beers'

// --- helper method to list each beer title from API ---
function addBeerToList(beer) {
let beerTopList = document.getElementById('list-group')
beerTopList.innerHTML += ` <li class="list-group-item" data-id="${beer.id}">${beer.name}</li> `
}


// ---helper method to show beer info ---
function rollThatBeautifulBeerFootage(beer) {
let beerShowArea = document.getElementById('beer-detail')
beerShowArea.innerHTML = `
<h1> --- === ${beer.name} === --- </h1>
<img src="${beer.image_url}">
<h3>${beer.tagline}</h3>
<textarea id="beer-description">${beer.description}</textarea>
<button id="edit-beer" data-id="${beer.id}" class="btn btn-info">
  Save
</button>
`
// --- adds event listener and does the patch ---
document.getElementById('edit-beer').addEventListener('click', function(e) {
	fetch(`http://localhost:3000/beers/${e.target.dataset.id}`, {
  headers: { "Content-Type": "application/json; charset=utf-8" },
  method: 'PATCH',
  body: JSON.stringify({
    description: e.target.previousElementSibling.value,
  })
})
     })
	.then(response => response.json())
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
	console.log(beerData)
	rollThatBeautifulBeerFootage(beerData)
	})
    console.log(e.target.dataset.id) })
})