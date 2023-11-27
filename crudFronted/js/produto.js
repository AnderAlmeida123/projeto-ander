const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const nome = document.querySelector('#nome')
const id_tipo_produto = document.querySelector('#id_tipo_produto')
const id_marca = document.querySelector('#id_marca')

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
    nome.value = itens[index].nome
    id_tipo_produto.value = itens[index].id_tipo_produto
    id_marca.value = itens[index].id_marca

    id = index
  } else {
    nome.value = ''
    id_tipo_produto.value = ''
    id_marca.value = ''

    
  }
  
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  $.ajax({
    url: 'http://localhost:3000/produto/'+itens[index].id, 
    method: 'DELETE',
    success: function(){
  loadItens()
  }
})
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome} </td>
    <td>${item.id_tipo_produto} </td>
    <td>${item.id_marca} </td>

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
  
  if (nome.value == '' || id_tipo_produto.value === '' || id_marca.value === '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    $.ajax({
      url: 'http://localhost:3000/produto/'+id, 
      method: 'PATCH',
      data:  {
      nome: nome.value,
      id_tipo_produto: id_tipo_produto.value, 
      id_marca: id_marca.value,
    }, 
    success: function(){
      modal.classList.remove('active')
      loadItens()
    }
  })
  } else {
    $.post('http://localhost:3000/produto', {
      nome: nome.value,
      id_tipo_produto: id_tipo_produto.value, 
      id_marca: id_marca.value,
    }, function(){
      modal.classList.remove('active')
      loadItens()
    })
  }

  id = undefined
}

function loadItens(){
  $.get('http://localhost:3000/tipo_de_produto', function(typeProdutos){
    typeProdutos.forEach((item, index) => {
      $('#id_tipo_produto').append($('<option>', {
        value: item.id,
        text: item.tipo_produto
        }));
    })
    }); 
    $.get('http://localhost:3000/marca', function(marcas){
      marcas.forEach((item, index) => {
        $('#id_marca').append($('<option>', {
          value: item.id,
          text: item.nome
          }));
      })
      }); 

  $.get('http://localhost:3000/produto', function(dados){
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

