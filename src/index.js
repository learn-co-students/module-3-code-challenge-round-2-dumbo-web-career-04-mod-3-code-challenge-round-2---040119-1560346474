function singleBeerDom(event){
  console.log(event); //
  const divDeets = document.querySelector('.col-md-8')
  const beerDeets = document.querySelector('#beer-detail')
        beerDeets.innerHTML =
        `<h1>${event.name}</h1>
        <img src="${event.image_url}">
        <h3>Beer Tagline</h3>
        <textarea id="texto">${event.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
          Save
        </button>`
        divDeets.replaceChild(beerDeets, beerDeets)

        let newDescription = document.querySelector('#texto').value

        const submitBtn = document.querySelector('#edit-beer')

submitBtn.addEventListener('click', () => {
          console.log("click"); //

const newdata = {
  description: "ihateyou",
}


fetch(`http://localhost:3000/beers/${event.id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
    body: JSON.stringify({
      description: newDescription
    })
})
  .then(res => res.json())
  .then(res => console.log(res));
        })


}


function domBeer(event) {

const groupUL = document.querySelector('.list-group')
const groupLi = document.createElement('li')
groupLi.className = "list-group-item"
groupLi.innerHTML = event.name
groupLi.id = event.id
  groupUL.append(groupLi)

  // document.querySelector("#id-checkbox").addEventListener("click", function(event) {
  //          document.getElementById("output-box").innerHTML += "Sorry! <code>preventDefault()</code> won't let you check this!<br>";
  //          event.preventDefault();
  // }, false);
singleLi = document.getElementById(`'${groupLi.id}'`)


groupLi.addEventListener('click', (e) => {
console.log("clcik LI"); //
    // const beerId = document.getElementById('id')



  fetch(`http://localhost:3000/beers/${groupLi.id}`)
  .then(res => res.json())
  // .then(beers => beers.map(beer => beer.name))
  // .then(beerNames => console.log(beerNames));
  .then(data => singleBeerDom(data))
  })



}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM IS LOADED"); //

beerURL = "http://localhost:3000/beers"

fetch(beerURL)
.then(res => res.json())
// .then(beers => beers.map(beer => beer.name))
// .then(beerNames => console.log(beerNames));
.then(data => data.forEach(domBeer))


})

function domToy(toy) {
  const div = document.createElement("div")
    div.className = "card"
    div.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p><span id="toy-${toy.id}-likes">${toy.likes}</span> Likes
    `
    // Create & Append Button for each Card
    const button = document.createElement("button")
    button.innerText = "Like ❤️"
    button.dataset.toyId = toy.id
    button.dataset.likes = toy.likes
    button.addEventListener("click", increaseLikes )
    div.appendChild(button)
    toyCollection.appendChild(div)
console.log("domToy's Loaded"); //
}
