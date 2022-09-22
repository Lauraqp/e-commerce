let container=document.getElementsByClassName('container')[0];
let favoritos= JSON.parse(localStorage.getItem("favoritosPage")) || [];//se llama el array de favoritos
console.log(favoritos)

//funcion pintar cards 
const printCards=()=>{
    container.innerHTML='';
    favoritos.forEach((element)=>{
        container.innerHTML +=`
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
          
           <button class="buttonFavorites" name="${element.id}">Delete</button>

        </div>
      </article>
      `;
    })
}

document.addEventListener('DOMContentLoaded',printCards)


document.addEventListener('click',({target})=>{

  if (target.classList.contains("buttonFavorites")) {
    const deleteFavorites=favoritos.find(
      (item)=>item.id==target.getAttribute("name")); //find devuelve objeto y se debe almacenar en constante(espacio de memoria)
   
      // ELIMINAR DE FAVORITOS
    const elementExist=favoritos.some(item=>item.id===deleteFavorites.id)
    console.log(elementExist);
      let indice=favoritos.findIndex((item)=>item.id===target.getAttribute("name")
      );
      favoritos.splice(indice,1)
      //GUARDAR EN LOCAL
      localStorage.setItem('favoritosPage',JSON.stringify(favoritos))//stringify--objeto a texto

    }
    
  }
  
)