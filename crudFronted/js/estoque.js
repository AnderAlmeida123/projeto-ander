const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const id_produto = document.querySelector('#id_produto')
const quantidade = document.querySelector('#quantidade')
const valor_entrada = document.querySelector('#valor_entrada')
const valor_saida = document.querySelector('#valor_saida')
const id_fornecedor= document.querySelector('#id_fornecedor')

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
    id_produto.value = itens[index].id_produto
    quantidade.value = itens[index].quantidade
    valor_entrada.value = itens[index].valor_entrada
    valor_saida.value = itens[index].valor_saida
    id_fornecedor.value = itens[index].id_fornecedor

    id = itens[index].id
  } else {
    id_produto.value = ''
    quantidade.value = ''
    valor_entrada.value = ''
    valor_saida.value = ''
    id_fornecedor.value = ''
    }
  
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  $.ajax({
    url: 'http://localhost:3000/estoque/'+itens[index].id, 
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
    <td>${item.quantidade} </td>
    <td>${item.valor_entrada} </td>
    <td>${item.valor_saida} </td>
    <td>${item.lucro_previsto} </td>
    <td>${item.nome_fornecedor} </td>

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
  
  if (id_produto.value == '' || quantidade.value == ''|| valor_entrada.value == ''|| valor_saida.value == ''|| id_fornecedor.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    $.ajax({
      url: 'http://localhost:3000/estoque/'+id, 
      method: 'PATCH',
      data:  {
      id_produto: id_produto.value,
      quantidade: quantidade.value, 
      valor_entrada: valor_entrada.value, 
      valor_saida: valor_saida.value, 
      id_fornecedor: id_fornecedor.value,
    }, 
    success: function(){
      modal.classList.remove('active')
      loadItens()
    }
  })
  } else {
    $.post('http://localhost:3000/estoque', {
        id_produto: id_produto.value,
        quantidade: quantidade.value, 
        valor_entrada: valor_entrada.value, 
        valor_saida: valor_saida.value, 
        id_fornecedor: id_fornecedor.value

    }, function(){
      modal.classList.remove('active')
      loadItens()
    })
  }

  id = undefined
}

function loadItens(){
  $.get('http://localhost:3000/produto', function(produtos){
    produtos.forEach((item, index) => {
      $('#id_produto').append($('<option>', {
        value: item.id,
        text: item.nome
        }));
    })
    });  
    $.get('http://localhost:3000/fornecedor', function(fornecedores){
      fornecedores.forEach((item, index) => {
        $('#id_fornecedor').append($('<option>', {
          value: item.id,
          text: item.nome
          }));
      })
      });  

  $.get('http://localhost:3000/estoque', function(dados){
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

