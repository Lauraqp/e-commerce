let contenidoCarrito=document.getElementsByClassName('contenidoCarrito')[0];
let favoritos= JSON.parse(localStorage.getItem("favoritosPage")) || [];//se llama el array de favoritos
console.log(favoritos)

const printCards=()=>{
    contenidoCarrito.innerHTML='';
    favoritos.forEach((element)=>{
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
           <button class="buttonAddCart" name="${element.id}">Add to cart</button>

        </div>
      </article>
      `;
    })
}

printCards();

