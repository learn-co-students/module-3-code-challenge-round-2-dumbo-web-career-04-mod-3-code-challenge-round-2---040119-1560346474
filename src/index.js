
beerNamesList = document.querySelector('#list-group')
beerDetailDisplay = document.querySelector('#beer-detail')


fetch('http://localhost:3000/beers')
.then(resp => resp.json())
.then(beers =>
  beers.forEach((beer) => {
    beerNamesList.innerHTML += `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>`
  })
)



beerNamesList.addEventListener("click", event => {
  target = event.target
  targetID = target.dataset.id
  fetch(`http://localhost:3000/beers/${targetID}`)
  .then(resp => resp.json())
  .then(beer =>
    beerDetailDisplay.innerHTML =`
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea id="discription">${beer.description}</textarea>
    <button data-id=${beer.id}  id="edit-beer" class="btn btn-info">
      Save
    </button>`
  )
})

beerDetailDisplay.addEventListener('click', e =>{
  target = event.target
  newDescript = target.parentElement.querySelector('#discription').value
  if (target.className === "btn btn-info"){
  fetch(`http://localhost:3000/beers/${target.dataset.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description: newDescript
    })
  })
}
})
