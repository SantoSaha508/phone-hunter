const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search bar
    searchField.value = '';
    if(searchText == ''){
        const error = document.getElementById('warning')
        error.style.display = "block";
    }
    else{
        const error = document.getElementById('warning')
        error.style.display = "none";
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
        }
}

const displaySearchResult = phones => {
    const phonesSlice = phones.slice(0, 20);
    console.log(phonesSlice.length);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    phonesSlice.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.brand}</h5>
              <h6 class="card-title">${phone.phone_name}</h6>
              <button onclick = "phoneDetails('${phone.slug}')" class= "btn bg-warning">Details</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })

}

const phoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data));
}

const displayDetails = (details) => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';

    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${details.image}" class="card-img-top img-thumbnail" alt="...">
    <div class="card-body overflow-auto">
      <h4 class="card-title">Phone Details</h4>
      <p>${details.releaseDate}</p>

      <h6>Chipset: ${details.mainFeatures.chipSet}</h6>
      <p>Display: ${details.mainFeatures.displaySize}</p>
      <h6>Memory: ${details.mainFeatures.memory}</h6>
      <p>Bluetooth: ${details.others.Bluetooth}</p>
      <h6>GPS: ${details.others.GPS}</h6>
      <p></p>
      <h6></h6>
      <p>Sensors: ${details.mainFeatures.sensors}</p>
    </div>
    `;
    phoneDetails.appendChild(div);
    window.scrollTo(0,0);
    
}

