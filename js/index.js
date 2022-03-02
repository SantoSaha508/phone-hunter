const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const serText = searchField.value;
    // convert to lower case
    const searchText = serText.toLowerCase();
    // clear search bar
    searchField.value = '';
    // show error massage
    if(searchText == 'oppo' || searchText == 'samsung' || searchText == 'iphone' ||searchText == 'huawei'){
        const phoneDetails = document.getElementById('phone-details');
        phoneDetails.textContent = ''; 
        const error = document.getElementById('warning')
        error.style.display = "none";
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))

    }
    else{
        const error = document.getElementById('warning')
        error.style.display = "block";

        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';

        const phoneDetails = document.getElementById('phone-details');
        phoneDetails.textContent = ''; 
    }
   
}

const displaySearchResult = phones => {
    const phonesSlice = phones.slice(0, 20);
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
              <button onclick = "phoneDetails('${phone.slug}')" class= "btn bg-dark text-white fs-5">Details</button>
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
    div.classList.add('d-md-flex', 'justify-content-center');
    div.innerHTML = `
    <div class="w-50">
        <img class= "w-100" src="${details.image}" class="card-img-top img-thumbnail" alt="...">
    </div>
    <div class="card-body overflow-auto w-50">
      <h4 class="card-title">Phone Details</h4>
      <p>${details.releaseDate}</p>
      <h4>More Details:</h4>
      <ul>
        <li>Chipset: ${details.mainFeatures.chipSet}
        </li>
        <li>Display: ${details.mainFeatures.displaySize}
        </li>
        <li>Memory: ${details.mainFeatures.memory}
        </li>
        <li>Bluetooth: ${details.others.Bluetooth}</li>
        <li>GPS: ${details.others.GPS}</li>
        <li>Sensors: ${details.mainFeatures.sensors}</li>
      </ul>
    </div>
    `;
    phoneDetails.appendChild(div);
    window.scrollTo(0,0);
    
}




