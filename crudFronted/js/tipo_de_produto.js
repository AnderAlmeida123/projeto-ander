const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const tipo_produto = document.querySelector('#tipo_produto')

const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    tipo_produto.value = itens[index].tipo_produto

    id = index
  } else {
    tipo_produto.value = ''
    }
  
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  $.ajax({
    url: 'http://localhost:3000/tipo_de_produto/'+itens[index].id, 
    method: 'DELETE',
    success: function(){
  loadItens()
  }
})
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.tipo_produto} </td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (tipo_produto.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    $.ajax({
      url: 'http://localhost:3000/tipo_de_produto/'+id, 
      method: 'PATCH',
      data:  {
      tipo_produto: tipo_produto.value,
        }, 
    success: function(){
      modal.classList.remove('active')
      loadItens()
    }
  })
  } else {
    $.post('http://localhost:3000/tipo_de_produto', {
      tipo_produto: tipo_produto.value,
    }, function(){
      modal.classList.remove('active')
      loadItens()
    })
  }

  id = undefined
}

function loadItens(){
  $.get('http://localhost:3000/tipo_de_produto', function(dados){
    itens = dados;
    tbody.innerHTML = ''
    dados.forEach((item, index) => {
      insertItem(item, index)
    })
    });
}
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))
console.log(loadItens)
loadItens()

