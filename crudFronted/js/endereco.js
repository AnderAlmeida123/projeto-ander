const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const clienteId = document.querySelector('#clienteId')
const cep = document.querySelector('#cep')
const rua = document.querySelector('#rua')
const bairro = document.querySelector('#bairro')
const cidade = document.querySelector('#cidade')
const estado = document.querySelector('#estado')
const numero = document.querySelector('#numero')
const referencia = document.querySelector('#referencia')

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
    $('#somente-editar').show();
    clienteId.value = itens[index].id_cliente
    cep.value = itens[index].cep
    rua.value = itens[index].rua
    bairro.value = itens[index].bairro
    cidade.value = itens[index].cidade
    estado.value = itens[index].estado
    numero.value = itens[index].numero
    referencia.value = itens[index].referencia
    id = index
  } else {
    $('#somente-editar').hide();
    clienteId.value = ''
    cep.value = ''
    rua.value = ''
    bairro.value = ''
    cidade.value = ''
    estado.value = ''
    numero.value = ''
    referencia.value = ''
    
  }
  
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  $.ajax({
    url: 'http://localhost:3000/endereco/'+itens[index].id, 
    method: 'DELETE',
    success: function(){
  loadItens()
  }
})
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.id_cliente}</td>
    <td>${item.cep}</td>
    <td style="word-wrap: nowrap">${item.rua}</td>
    <td>${item.bairro}</td>
    <td>${item.cidade}</td>
    <td>${item.estado}</td>
    <td>${item.numero}</td>
    <td>${item.referencia}</td>
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
  
  if (clienteId.value === '' || cep.value === '' || numero.value === '' || referencia.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    $.ajax({
      url: 'http://localhost:3000/endereco/'+id, 
      method: 'PATCH',
      data:  {
      id_cliente: clienteId.value,
      cep: cep.value, 
      numero: numero.value, 
      referencia: referencia.value
    }, 
    success: function(){
      modal.classList.remove('active')
      loadItens()
    }
  })
  } else {
    $.post('http://localhost:3000/endereco', {
      id_cliente: clienteId.value,
      cep: cep.value, 
      numero: numero.value, 
      referencia: referencia.value
    }, function(){
      modal.classList.remove('active')
      loadItens()
    })
  }

  id = undefined
}

function loadItens(){
  $.get('http://localhost:3000/endereco', function(dados){
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

