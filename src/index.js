const beerList = document.querySelector('.list-group-item')
const beerDetail = document.querySelector('#beer-detail')

fetch('http://localhost:3000/beers')
  .then(response => response.json())
  .then(beers => {
    beers.forEach((beer) => {
      `<li class="list-group-item beer" data-id='${beer.id}'>${beer.name}</li>`

      beerList.innerHTML += `<li class="list-group-item beer" data-id='${beer.id}'>${beer.name}</li>`
    })
  })

beerList.addEventListener('click', event => {
  event.preventDefault()

  const beerId = event.target.dataset.id

  beerDetail.innerHTML = ""
  if (event.target.classList.contains("beer")) {
    fetch(`http://localhost:3000/beers/${beerId}`)
      .then(response => response.json())
      .then(beer => {
        beerDetail.innerHTML += `
      <h1>${beer.name}</h1>
      <img src="${beer.image_url}">
      <h3>${beer.tagline}</h3>
      <textarea>${beer.description}</textarea>
      <button id="edit-beer" class="btn btn-info">
      Save
      </button>
    `
      })
  }

// so close :(((( !!!

  // beerDetail.addEventListener('click', event => {
  //   const saveBtn = document.querySelector('#edit-beer')
  //   const beerDesc = document.querySelector('textarea').value
  //
  //   if (event.target === saveBtn) {
  //     fetch(`http://localhost:3000/beers/${event.target.dataset.id}`, {
  //         method: 'PATCH',
  //         headers: 'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         body: JSON.stringify({
  //           'description': beerDesc
  //         })
  //       })
  //       .then(response => response.json())
  //       .then(response => { beerDesc.innerText = response.description)
  //       })
  //   }
  // })

})
