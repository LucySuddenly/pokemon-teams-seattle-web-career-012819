const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(response => response.json())
.then(json => {
  addTrainers(json)
})

function addTrainers(info) {
  const main = document.getElementsByTagName('main')[0]
    for (var i = 0; i < info.length; i++) {
      const div = document.createElement("div")
      div.setAttribute("class", "card")
      div.setAttribute("data-id", info[i].id)
      const p = document.createElement("p")
      p.innerText = `${info[i].name}`
      const button = document.createElement("button")
      button.setAttribute("data-trainer-id", info[i].id) 
      button.innerText = "Add Pokemon"
      const ul = document.createElement("ul")
      for (let n = 0; n < info[i].pokemons.length; n++) {
        const li = document.createElement("li")
        li.innerText = `${info[i].pokemons[n].nickname} (${info[i].pokemons[n].species})`
        const releaseButton = document.createElement("button")
        releaseButton.setAttribute('class', 'release')
        releaseButton.setAttribute('data-pokemon-id', `${info[i].pokemons[n].id}`)
        releaseButton.innerText = 'release'
        ul.appendChild(li)
        li.appendChild(releaseButton)
        releaseButton.addEventListener('click', function() {
          releasePokemon(releaseButton)
        })
      }
      main.appendChild(div)
      div.appendChild(p)
      div.appendChild(button)
      div.appendChild(ul)
      button.addEventListener('click', () => {
        addPokemon(ul, div)
      })
    }
}

function addPokemon(ul, div) {
  if (ul.childElementCount < 6) {
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: `{"trainer_id": ${div.getAttribute('data-id')}}`
  })
  .then(response => response.json())
  .then(json => {
    debugger
    const li = document.createElement("li")
    li.innerText = `${json.nickname} (${json.species})`
    const button = document.createElement("button")
    button.innerText = "release"
    button.setAttribute("class", "release")
    button.setAttribute("data-pokemon-id", `${json.id}`)
    li.appendChild(button)
    ul.appendChild(li)
    button.addEventListener("click", function() {
      releasePokemon(button)
    })

    })
  }
}

function releasePokemon(button) {
  fetch(POKEMONS_URL + `/${button.getAttribute('data-pokemon-id')}`, {
    method: "DELETE"
  })
  .then(response => response.json())
  .then(json => {
    button.parentElement.remove()
  })
}
