const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// const dummyTransaction = [
//   {id: 1, text:'flower',amount:-20},
//   {id: 2, text:'Salary',amount:300},
//   {id: 3, text:'Book',amount:-10},
//   {id: 4, text:'Camera',amount:150}
// ]

const localStoragetranscation = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStoragetranscation : [] 

function addTransaction(e){
  e.preventDefault()
  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert('Please add an text and amount')
  }else{
    const transaction = {
      id : generateId(),
      text: text.value,
      amount: Number(amount.value)
    }
    transactions.push(transaction)
    addTransactionDOM(transaction)
    updateValue();
    updateLocaleStorage()
    text.value =''
    amount.value = ''
  }

}

// genearte random id

function generateId(){
  return Math.floor(Math.random()*1000000000)
}


function addTransactionDOM(transaction){
  const sign = transaction.amount < 0 ? '-' : '+'
  const item = document.createElement('li')
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
  item.innerHTML = `${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span><button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>`
  list.appendChild(item)
}

//updates the income, expense amd balanc
function updateValue(){
  const amount =  transactions.map(transaction=> transaction.amount)
  const total = amount.reduce((acc,cur)=> acc+cur,0).toFixed(2)
  const income =amount.filter(transaction => transaction>0).reduce((acc,cur)=> acc+cur,0).toFixed(2)
  const expense =amount.filter(transaction => transaction<0).reduce((acc,cur)=> acc+cur,0).toFixed(2)
  balance.innerText = `$${total}`
  money_plus.innerText = `$${income}`
  money_minus.innerText = `$${Math.abs(expense)}`
}

// remove transaction by id

function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id)
  updateLocaleStorage()
  init()
}

// update Local storage
function updateLocaleStorage(){
  localStorage.setItem('transactions',JSON.stringify(transactions))
}

function init(){
  list.innerHTML = '';
  transactions.forEach(transaction=>{addTransactionDOM(transaction)})
  updateValue()
}

init()

form.addEventListener('submit', addTransaction)