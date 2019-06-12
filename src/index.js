const beerUrl = "http://localhost:3000/beers"
const ulTag = document.querySelector('ul')
const ulTagBeersList = document.querySelector('ul.list-group')
const detailDivTag = document.querySelector('div#beer-detail')
const saveButton = document.querySelector('button')


const createBeerListHTML = (beer) => {
  return(`
  <li data-id = "${beer.id}" class="list-group-item">${beer.name}</li>
    `
)}

const createBeerDetailHTML = (beer) => {
  return(`
    <h1 data-id =${beer.id} data-name =${beer.name}>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea data-id = "${beer.id}" name="description">${beer.description}</textarea>
    <button data-id = "${beer.id}" data-description = ${beer.description} id="edit-beer" class="btn btn-info">
    Save
    </button>
    `
  )
}

//fetch all beers
fetch("http://localhost:3000/beers")
.then(res => res.json())
.then(data => {
  data.forEach( beer => {
     ulTag.innerHTML = ulTag.innerHTML + createBeerListHTML(beer)
  })
})

//fetch one beer and desplay details for that beer
ulTag.addEventListener('click', (e) => {
  e.preventDefault()
  let beer = e.target
  const beerId = beer.dataset.id

  fetch(`http://localhost:3000/beers/${beerId}`)
  .then(res => res.json())
  .then(beer => {
    detailDivTag.innerHTML = createBeerDetailHTML(beer)
  })
})

//Update beer details with save button

detailDivTag.addEventListener('click', (e) => {

  e.preventDefault()
  let beer = e.target
  const beerId = beer.dataset.id
  const textareaTag = beer.parentElement.querySelector('textarea')
  let beerDescription = beer.parentElement.querySelector('textarea').value

  fetch(`http://localhost:3000/beers/${beerId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ description: beerDescription})
  })
    .then(res => res.json())
    .then(beer => {
      textareaTag.innerHTML = beer.description
    })

})

// console.log(e.currentTarget)
// console.log(textareaTag)
// console.log(beerDescription)
// console.log(beerId);
