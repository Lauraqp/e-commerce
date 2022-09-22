let dataFiltered = [];
let dataPro = [];




const getData = async () => {     
    const URL_API = "http://localhost:3000/products";
    const response = await fetch(URL_API);
    dataPro = await response.json();
    dataFiltered = dataPro;
    renderData();
    console.log(dataPro);
  
};
getData();
const handleSearch = () => {
    let query = inputSearch.value;
   filterArray(query);
   renderData();
}
btnSearch.addEventListener('click', handleSearch);

const filterArray = (text) => {
    dataFiltered = dataPro.filter(element => element.tittle.toLowerCase().includes(text.toLowerCase()));
    console.log(dataFiltered);
};



//PINTAR CARDS
const renderData=()=>{
    containerCards.innerHTML='';
    dataFiltered.forEach((element)=>{
        containerCards.innerHTML +=`
        <article class="Cards">
        <figure>
          <img src="${element.image}" alt="">
        </figure>
        <div class="infoCards">
         <ul>
          <li>${element.tittle}</li>
          <li>${element.category}</li>
          <li>${element.description}</li>
          <li>${element.price}</li>
         </ul>
         <div class="actions">
         <button class="btn btn--edit"${element.id}>Editar</button>
         <button class="btn btn--delete"${element.id}>Eliminar</button>
     </div>
        </div>
      </article>
      `;
    })
}

const btnNew = document.getElementById('btnNew');
const containerForm = document.getElementById('containerForm');
const form = document.getElementById('form');

//get elements form
const idInput = document.getElementsByName('id')[0];
const tittleInput = document.getElementsByName('tittle')[0];
const categoryInput = document.getElementsByName('category')[0];
const descrptionInput = document.getElementsByName('description')[0];
const priceInput = document.getElementsByName('price')[0];
const quantityInput = document.getElementsByName('quantity')[0];
const imageInput = document.getElementsByName('image')[0];

// General
let ProDucts = [];

//Function events
const showForm = () => {  
containerForm.classList.remove('hidden');  
}

const handleSave = (e) => {
    e.preventDefault();
   let newProduct = {
        id: idInput.value,
        tittle: tittleInput.value,
        category: categoryInput.value,
        description: descrptionInput.value,
        price: priceInput.value,
        quantity: quantityInput.value,
        image: imageInput.value, 
    };
    ProDucts.push(newProduct);
    localStorage.setItem('ProDucts', JSON.stringify(ProDucts))
}

//listen events
btnNew.addEventListener('click', showForm);

form.addEventListener('submit', (e) => {
    handleSave(e)
})