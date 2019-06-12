
document.addEventListener("DOMContentLoaded", () => {
  const beerList = document.getElementById("list-group")
  const beerDetails = document.getElementById("beer-detail")
  // let editForm;
  const url = "http://localhost:3000/beers/"
  let editButton;

  const beerInfo = (beer) => {
    return beerDetails.innerHTML += `
    <h1>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>
    `
  }

  const populateDomWithBeer = (beer) => {
    let li = document.createElement("li")
    li.setAttribute("id", beer.id)
    li.className = "list-group-item"
    li.innerText = beer.name
    beerList.append(li)
  }

  fetch(url)
  .then(resp => resp.json())
  .then(beers => {
    beers.forEach(beer => {
      populateDomWithBeer(beer)
    })
  })

  // beerList.addEventListener("click", (e) => {
  //   if(e.target.tagName = "LI") {
  //     beerDetails.innerHTML = ""
  //     let targetId = e.target.id
  //     fetch(`${url}${targetId}`)
  //     .then(resp => resp.json())
  //     .then(beer => {
  //       beerDetails.innerHTML += `
  //         <h1> ${beer.name} <h1>
//           <img src=${beer.image_url} />
//           <h3> ${beer.tagline} </h3>
//            <form id="edit-form">
//             <input type="text" name="description" value="${beer.description}">
//             <br>
//             <input type="submit" value="Save">
//            </form>
  //        `
  //       editForm = document.getElementById("edit-form")
  //       editForm.addEventListener("submit", (e) => {
  //         e.preventDefault()
  //         let newDes = e.target.description.value
  //         fetch(`${url}${targetId}`, {
  //           method: "PATCH",
  //           headers: {
  //             "Content-Type":"application/json",
  //             "Accept": "application/json"
  //           },
  //           body: JSON.stringify({description: newDes})
  //         })
  //         .then(resp => resp.json())
  //         .then(beer => {
  //           // debugger
  //           beerDetails.innerHTML = ""
  //           beerDetails.innerHTML += `
  //             <h1> ${beer.name} <h1>
  //             <img src=${beer.image_url} />
  //             <h3> ${beer.tagline} </h3>
  //             <form id="edit-form">
  //               <input type="text" name="description" value="${beer.description}">
  //               <br>
  //               <input type="submit" value="Save">
  //             </form>
  //           `
  //
  //         })
  //       })
  //     })
  //
  //   }
  // })
    beerList.addEventListener("click", (e) => {
      if(e.target.tagName = "LI") {
        beerDetails.innerHTML = ""
        let targetId = e.target.id
        fetch(`${url}${targetId}`)
        .then(resp => resp.json())
        .then(beer => {
          beerInfo(beer)

          editButton = document.getElementById("edit-beer")
          editButton.addEventListener("click", (e) => {
            let newDes = e.target.parentElement.querySelector("textarea").value
            fetch(`${url}${targetId}`, {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({description: newDes})
            })
            .then(resp => resp.json())
            .then(beer => {
              beerDetails.innerHTML = ""
              beerInfo(beer)
            })
          })
        })

      }
    })


})
