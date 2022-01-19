//variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //Cuando agregas un curso preisonando "agregar al carrito"
  listaCursos.addEventListener('click', agregarCurso);
  //Eliminar cursos del carrito
  carrito.addEventListener('click', eliminarCurso);
  //vaciar carrito
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}
//funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}
//Eliminar un cruso del carrito
function eliminarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains('borrar-curso')) {
    const idCurso = e.target.getAttribute('data-id');
    //Eliminar del arreglo
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== idCurso);
    carritoHTML();
  }
}
//Vaciar carrito
function vaciarCarrito(e) {
  e.preventDefault();
  articulosCarrito = [];
  limpiarHTML();
}
//Lee los datos del curso leyendo el HTML
function leerDatosCurso(curso) {
  //crear un objeto con el contenido de curso actual
  const inforCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  };
  //revisar si articulo ya existe en carrito
  const existe = articulosCarrito.some(curso => curso.id === inforCurso.id);
  if (existe) {
    //actualizamos cantidad
    const cursos = articulosCarrito.map(curso => {
      if (curso.id === inforCurso.id) {
        curso.cantidad++;
        return curso; //Retorna el objeto actualizado
      } else {
        return curso; //Retorna los objetos que no son los duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //Agregar elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, inforCurso];
  }
  carritoHTML(articulosCarrito);
}
//Muestra el carrito en l HTML
function carritoHTML() {
  //limpiar HTML
  limpiarHTML();
  articulosCarrito.forEach(carrito => {
    const {imagen, titulo, precio, cantidad, id} = carrito;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${imagen}" />
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
      `;
    contenedorCarrito.appendChild(row);
  });
}
function limpiarHTML() {
  //forma lenta
  //contenedorCarrito.innerHTML = '';
  //forma rapida
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
