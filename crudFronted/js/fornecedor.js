const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const nome = document.querySelector('#nome')

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

    id = itens[index].id
  } else {
    nome.value = ''
    }
  
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  $.ajax({
    url: 'http://localhost:3000/fornecedor/'+itens[index].id, 
    method: 'DELETE',
    success: function(){
  loadItens()
  }
})
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome_produto} </td>

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
  
  if (nome.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    $.ajax({
      url: 'http://localhost:3000/fornecedor/'+id, 
      method: 'PATCH',
      data:  {
      nome: nome.value,
    }, 
    success: function(){
      modal.classList.remove('active')
      loadItens()
    }
  })
  } else {
    $.post('http://localhost:3000/fornecedor', {
        nome: nome.value,
    }, function(){
      modal.classList.remove('active')
      loadItens()
    })
  }

  id = undefined
}

function loadItens(){
    $.get('http://localhost:3000/fornecedor', function(dados){
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

