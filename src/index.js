const beerListUL= document.querySelector('#list-group')
const beerDetailsDiv = document.querySelector('#beer-detail')


fetch('http://localhost:3000/beers')
  .then(response => response.json())
  .then(beers => {
    beers.forEach(beer => {
      beerListUL.innerHTML += `
      <li data-id=${beer.id}>${beer.name}</li>
      `
    })
  })


beerListUL.addEventListener('click', event => {
  const clickedBeerID = event.target.dataset.id
  if (event.target.tagName === 'LI') {
      fetch(`http://localhost:3000/beers/${clickedBeerID}`)
      .then(response => response.json())
      .then(beer => {
          beerDetailsDiv.innerHTML = `
          <h1>${beer.name}</h1>
          <img src="${beer.image_url}">
          <h3>${beer.tagline}</h3>
          <textarea>${beer.description}</textarea>
          <button data-id=${beer.id} id="edit-beer" class="btn btn-info">
            Save
          </button>
          `
        })
      }
    })


beerDetailsDiv.addEventListener('click', event => {
  const userDescription = event.target.parentElement.querySelector('textarea')
  const beerToEditID = event.target.dataset.id
  if (event.target.classList.contains("btn")) {
    // console.log(event.target.parentElement.querySelector('textarea'))
      fetch(`http://localhost:3000/beers/${beerToEditID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
           description: userDescription.value
      }) })
      .then(response => response.json())
      .then(responseJson => console.log(responseJson))
    }
})











// end
