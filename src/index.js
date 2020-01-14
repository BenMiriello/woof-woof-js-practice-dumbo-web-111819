URL_PREFIX = `http://localhost:3000/pups`

const dogContainer = document.querySelector("#dog-bar")
const dogInfoDiv = document.querySelector("#dog-info")
const goodDogOnOff = document.querySelector("#good-dog-filter")
let good = true
let allDogs = []
let allGoodDogs = allDogs

function putDogInTop(dog){
   let newDogSpan = document.createElement("span")
   newDogSpan.addEventListener("click", () => {
      fillSummaryDiv(dog)
   })
   newDogSpan.innerText = dog.name
   dogContainer.append(newDogSpan)
}

dogContainer.innerHTML = ""
fetch(URL_PREFIX)
.then(r => r.json())
.then(dogs => {
   dogs.forEach(dog => {
      allDogs.push(dog)
      putDogInTop(dog)
   })
})

function putAllDogsInTop(dogs){
   dogContainer.innerHTML = ""
   dogs.forEach(dog => {
      putDogInTop(dog)
   })
}

function fillSummaryDiv(dog) {
   dogInfoDiv.innerHTML = ""
   const summaryImage = document.createElement("img")
      summaryImage.src = dog.image
   const summaryName = document.createElement("h2")
      summaryName.innerText = dog.name
   const summaryButton = document.createElement("button")
      if (dog.isGoodDog) {
         summaryButton.innerText = "Good Dog"
      } else if (!dog.isGoodDog) {
         summaryButton.innerText = "Bad Dog"}
   dogInfoDiv.append(summaryImage, summaryName, summaryButton)

      dog.isGoodDog = !dog.isGoodDog
      summaryButton.addEventListener("click", () => {
         fetch(`${URL_PREFIX}/${dog.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({isGoodDog: dog.isGoodDog})
         })
         .then(r => r.json())
         .then(fillSummaryDiv)
      })
}

goodDogOnOff.addEventListener("click", () => {
   if (good){
      goodDogOnOff.innerText = "Filter good dogs: ON";
      good = false
      allGoodDogs = allDogs.filter(function(dog){
         return dog.isGoodDog === true
      })
      putAllDogsInTop(allGoodDogs)
   } else if (!good) {
      goodDogOnOff.innerText = "Filter good dogs: OFF";
      good = true
      allGoodDogs = allDogs
      putAllDogsInTop(allGoodDogs)
   }
})

