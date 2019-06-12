const beerUrl = `http://localhost:3000/beers`;

const createBeerHTML = (beer) => {
  return `<li class="list-group-item beer" data-id=${beer.id}>
  ${beer.name}
  </li>`;
};

const createBeerShowHTML = (beer) => {
  return `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info" data-id=${beer.id}>
      Save
    </button>`;
};

document.addEventListener("DOMContentLoaded", () => {

  const beerListUl = document.querySelector(".list-group");
  const beerDetailDiv = document.querySelector("#beer-detail");
  
  
  fetch(beerUrl)
  .then(resp => resp.json())
  .then(beers => {
    beers.forEach(beer => {
      beerListUl.innerHTML += createBeerHTML(beer);
    });
    
    beerListUl.addEventListener("click", (event) => {
      if (event.target.classList.contains("beer")) {
        fetch(`http://localhost:3000/beers/${event.target.dataset.id}`)
        .then(resp => resp.json())
        .then(beer => {
          beerDetailDiv.innerHTML = createBeerShowHTML(beer);
        });  
      }
      
      beerDetailDiv.addEventListener("click", event => {
        const saveButton = document.querySelector("#edit-beer");
        const beerDescription = document.querySelector("textarea").value;
        const descriptionH3 = event.target.parentElement.querySelector("h3")

        if (event.target === saveButton) {
          fetch(`http://localhost:3000/beers/${event.target.dataset.id}`, {
            'method': 'PATCH',
            'headers': {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            'body': JSON.stringify({
              'tagline': `${beerDescription}`
            })
          })
          .then(resp => resp.json())
          .then(resp => {
            descriptionH3.innerText = resp.description;
          })

        }
      });
    });

    
  });
});