const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')

const id_cliente = document.querySelector('#id_cliente')
const email = document.querySelector('#email')
const celular = document.querySelector('#celular')
const telefone_fixo = document.querySelector('#telefone_fixo')
const telefone_contato = document.querySelector('#telefone_contato')


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
    id_cliente.value = itens[index].id_cliente;
    celular.value = itens[index].celular;
    email.value = itens[index].email;
    telefone_fixo.value = itens[index].telefone_fixo;
    telefone_contato.value = itens[index].telefone_contato;

    id = itens[index].id
  } else {
    id_cliente.value = ''
    celular.value = ''
    email.value = ''
    telefone_fixo = ''
    telefone_contato = ''
 }
  
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  $.ajax({
    url: 'http://localhost:3000/contato/'+itens[index].id, 
    method: 'DELETE',
    success: function(){
  loadItens()
  }
})
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.id_cliente} </td>
    <td>${item.cep} </td>
    <td>${item.rua} </td>
    <td>${item.bairro} </td>
    <td>${item.numero_endereco} </td>
    <td>${item.celular} </td>
    <td>${item.telefone_fixo} </td>
    <td>${item.telefone_contato}</td> 
    <td>${item.email} </td>

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
  
  if (id_cliente.value == ''||celular.value == ''|| telefone_contato.value == ''|| telefone_fixo.value == ''||email.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    $.ajax({
      url: 'http://localhost:3000/contato/'+id, 
      method: 'PATCH',
      data:  {
      id_cliente: id_cliente.value,
      celular: celular.value,
      telefone_contato: telefone_contato.value,
      telefone_fixo: telefone_fixo.value,
      email: email.value
    }, 
    success: function(){
      modal.classList.remove('active')
      loadItens()
    }
  })
  } else {
    $.post('http://localhost:3000/contato', {
      id_cliente: id_cliente.value,
      celular: celular.value,
      telefone_contato: telefone_contato.value,
      telefone_fixo: telefone_fixo.value,
      email: email.value

    }, function(){
      modal.classList.remove('active')
      loadItens()
    })
  }

  id = undefined
}

function loadItens(){
    $.get('http://localhost:3000/cliente', function(clientes){
    clientes.forEach((item, index) => {
      $('#id_cliente').append($('<option>', {
        value: item.id,
        text: item.nome
        }));
    })
    }); 

  $.get('http://localhost:3000/contato', function(dados){
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

