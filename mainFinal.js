

//LLAMAR A LAS VARIABLES
const URL_API='http://localhost:3000';
const URLCARRITO='http://localhost:3000/carrito';
const containerPrincipal=document.getElementById('containerPrincipal')
const inputSearch=document.getElementById('inputSearch')
const buttonSearch=document.getElementById('buttonSearch')

let listProducts=[];//lugar variable(let)
let quantityProducts=1; //variable para sumar y restar producto de span
let favoritos= JSON.parse(localStorage.getItem("favoritos")) || [];//array que nos arroje .find



//OBTENER DATOS, CONSUMIR API
const getData=async()=>{
    try{
    const response=await fetch(`${URL_API}/products`);//pedir información e ingresa en formato JSON
    let data=await response.json();//cambiar json a formato digerible por js
    listProducts=data;
    console.log(listProducts)
    printCards();
    
    }catch(error){
        console.log(error);
        console.log('error')

    }
}

//OBTENER LA DATA 
const getDatos = async (url) => {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

getData();

//PINTAR CARDS
const printCards=()=>{
    containerPrincipal.innerHTML='';
    listProducts.forEach((element)=>{
        containerPrincipal.innerHTML +=`
        <article class="Cards">
        <figure>
          <img src="${element.image}" alt="">
        </figure>
        <div class="infoCards">
         <ul>

          <li id="category">${element.category}</li>
          <li >${element.description}</li>
          <li id="price">${element.price}</li>
         </ul>
           <button class="buttonPlus" name="${element.id}">+</button>
           <span id="${element.id}">${element.quantity}</span>
           <button class="buttonMinus" name="${element.id}">-</button>
           <button class="buttonFavorites" name="${element.id}">Favorites</button>
           <button class="buttonAddCart" name="${element.id}">Add to cart</button>

        </div>
      </article>
      `;
    })
}

//FILTRAR
const filterArray = (word) => {
  listProducts = listProducts.filter((object) =>
      object.category.toLowerCase().includes(word.toLowerCase())
    );
    console.log(listProducts);
  };

//INFORMACION PARA EL BOTÓN (BUSCAR)
const handle=()=>{
    let infoInput=inputSearch.value;
    console.log(infoInput);
    filterArray(infoInput);
    printCards();
}
buttonSearch.addEventListener('click',handle)

//ESCUCHAR EVENTOS CLICK DEL DOCUMENTO
document.addEventListener('click',({target})=>{

  if (target.classList.contains("buttonFavorites")) {
    const saveFavorites=listProducts.find(
      (item)=>item.id==target.getAttribute("name")); //find devuelve objeto y se debe almacenar en constante(espacio de memoria)
   
    //GUARDAR EN LOCAL
    const elementExist=favoritos.some(item=>item.id===saveFavorites.id)
    console.log(elementExist);
    if (elementExist==false){
      favoritos.push(saveFavorites)
      localStorage.setItem('favoritosPage',JSON.stringify(favoritos))//stringify--objeto a texto

    }
    
  }
  
})

/*MOSTRAR CONTENIDO DEL CARRITO*/
const contenidoCarrito=document.querySelector('.contenidoCarrito')
console.log(contenidoCarrito);
console.log(favoritos)
/*OBTENER LA DATA DE CARRITO*/

const printCardsCart=()=>{
  contenidoCarrito.innerHTML='';
  listProducts.forEach((element)=>{
      contenidoCarrito.innerHTML +=`
      <article class="Cards">
      <figure>
        <img src="${element.image}" alt="">
      </figure>
      <div class="infoCards">
       <ul>

        <li id="category">${element.category}</li>
        <li >${element.description}</li>
        <li id="price">${element.price}</li>
       </ul>
         <button class="buttonPlus" name="${element.id}">+</button>
         <span id="${element.id}">${element.quantity}</span>
         <button class="buttonMinus" name="${element.id}">-</button>
         <button class="buttonFavorites" name="${element.id}">Favorites</button>
         <button class="buttonAddCart" name="${element.id}">Add to cart</button>

      </div>
    </article>
    `;
  })
}

if (favoritos.length > 0) {
  printCardsCart();

}





// FUNCION AÑADIR CANTIDAD DE PRODUCTO (BOTON PLUS)
document.addEventListener("click",async ({target}) =>{ //ESCUCHAR TODOS LOS EVENTOS
  if(target.classList.contains("buttonPlus")){
    const idButtonPlus=target.getAttribute("name")//capturar atributo name
    const spanQuantity=document.getElementById(idButtonPlus) //capturar boton plus
    spanQuantity.innerHTML= parseInt(spanQuantity.innerHTML)+1//parsear para que devuelva número
    quantityProducts=spanQuantity.innerHTML;
    
}})
// BOTON RESTAR

document.addEventListener("click",async ({target}) =>{ //ESCUCHAR TODOS LOS EVENTOS
  if(target.classList.contains("buttonMinus")){
    const idButtonPlus=target.getAttribute("name")//capturar atributo name
    const spanQuantity=document.getElementById(idButtonPlus) //capturar boton minus
    if(quantityProducts>=1){
    spanQuantity.innerHTML= parseInt(spanQuantity.innerHTML)-1//parsear para que devuelva número
    quantityProducts=spanQuantity.innerHTML;
    }
    
}
})

//AÑADIR PRODUCTOS A CARRITO
document.addEventListener("click",async ({target}) =>{ //ESCUCHAR TODOS LOS EVENTOS
  if(target.classList.contains("buttonAddCart")){
    const marketList=listProducts.find(
      (item)=>item.id == target.getAttribute("name")
    );
    const carrito= await getDatos(URLCARRITO);
    console.log(carrito);
    const elementoExist= carrito.some ((item)=> item.id === marketList.id)//verificar si en esta base (carrito) hay algun item (id) sea igual al mercado que se ingresará
    if(elementoExist){
      alert("El producto ya existe en el carrito");
    }else{
      //capturar el price definido en el valor del objeto en el json * cantidad boton plus y se asigna en total a valor a pagar por cada producto
      const totalProducts=quantityProducts*marketList.price //total de cantidad por producto
      const cartProducts={
        ...marketList,   //spread operator(expandir elementos: transformar un array en elementos unicos, llama las propiedades y añade las siguientes)
        cantidad:quantityProducts,
        valorTotal:totalProducts
      }
      console.log(cartProducts)

      await fetch(URLCARRITO,{ //añadir elemento al json 
        method: 'POST',
        body: JSON.stringify(cartProducts),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
    }

  }

})









/*FUNCION MENU HAMBURGUESA*/
const iconoMenu=document.querySelector('#icono-menu'),
menu=document.querySelector('#menu');

iconoMenu.addEventListener('click',(e)=>{
    /*alternar estilos para menu y body*/
    menu.classList.toggle('active');
    document.body.classList.toggle('opacity');
    /*alternar atributo src para icono del menu*/
    const rutaActual= e.target.getAttribute('src');
    if(rutaActual=='./material page/hamburger-menu-icon-png-white-10.jpg'){
        e.target.setAttribute('src','./material page/hamburger-menu-icon-png-white-10.jpg');
    }else{
        e.target.setAttribute('src','./material page/hamburger-menu-icon-png-white-1.jpg')
    }
});
