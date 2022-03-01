const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search bar
    searchField.value = '';
    // load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))

}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    phones.forEach(phone => {
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
    <img src="${details.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h4 class="card-title">Phone Details</h4>
      <p>${details.releaseDate}</p>
      <p>${details.mainFeatures.chipSet}</p>
      <p>${details.mainFeatures.displaySize}</p>
      <p>${details.mainFeatures.memory}</p>
    </div>
    `;
    phoneDetails.appendChild(div);

}

