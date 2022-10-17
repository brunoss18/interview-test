const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sCliente = document.querySelector('#m-Cliente')
const sNome = document.querySelector('#m-Nome')
const sEmail = document.querySelector('#m-Email')
const sItens = document.querySelector('#m-Itens')
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
    sCliente.value = itens[index].cliente
    sNome.value = itens[index].nome
    sEmail.value = itens[index].email
    sItens.value = itens[index].itens
    id = index
  } else {
    sCliente.value = ''
    sNome.value = ''
    sEmail.value = ''
    sItens.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.cliente}</td>
    <td>${item.nome}</td>
    <td> ${item.email}</td>
    <td>${item.itens}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
    <td class="acao">
      <button onclick="EnviarItem(${index})"><i class='bx bx-send'></i></button>
   </td> 
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sCliente.value == '' || sNome.value == '' || sEmail.value == ''|| sItens.value == '') {
    return
  }

  e.preventDefault();
 
  if (id !== undefined) {
    itens[id].cliente =  sCliente.value 
    itens[id].nome =  sNome.value
    itens[id].email = sEmail.value
    itens[id].itens = sItens.value
  } else {
    itens.push({'cliente': sCliente.value, 'nome': sNome.value, 'email': sEmail.value, 'itens': sItens.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
