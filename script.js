 
    let amount = document.getElementById("amount"); //user amount

    const balance = document.getElementById(
        "balance"  //current balance
      );
      const money_plus = document.getElementById(
        "money-plus"
      );
      const money_minus = document.getElementById(
        "money-minus"
      );

      const productTitle = document.getElementById("product-title");
  
      const productTitleError = document.getElementById("product-title-error");

      const list = document.getElementById("list");
      let tempAmount = 0;


      //Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
      element.disabled = bool;
    });
  };



 const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
  
  let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


  function addTransaction(e){
        e.preventDefault();
        if(text.value.trim() === '' || amount.value.trim() === ''){
          alert('please add text and amount')
        }else{
          const transaction = {
            id:generateID(),
            text:text.value,
            amount:+amount.value
          }
      
          transactions.push(transaction);
      
          addTransactionDOM(transaction);
          updateValues();
          updateLocalStorage();
          text.value='';
          amount.value='';
        }
      }

      function generateID(){
            return Math.floor(Math.random()*1000000000);
          }
      

          function addTransactionDOM(transaction) {
                //GET sign
                const sign = transaction.amount < 0 ? "-" : "+";
                const item = document.createElement("li");
              
                //Add Class Based on Value
                item.classList.add(
                  transaction.amount < 0 ? "minus" : "plus"
                );
              
                item.innerHTML = `
                  ${transaction.text} <span>${sign}${Math.abs(
                  transaction.amount
                )}</span>
            
                    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
            
                  `;
                list.appendChild(item);
              }
            
    //Update the balance income and expense

  function updateValues() {
    const amounts = transactions.map(
      (transaction) => transaction.amount
    );
    const total = amounts
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const expense =
      (amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) *
      -1).toFixed(2);
  
      balance.innerText=` ₹ ${total}`;
      money_plus.innerText = ` ₹ ${income}`;
      money_minus.innerText = ` ₹ ${expense}`;
  }

  function removeTransaction(id){
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateLocalStorage();
        Init();
      }
      //last
      //update Local Storage Transaction
      function updateLocalStorage(){
        localStorage.setItem('transactions',JSON.stringify(transactions));
      }

  function Init() {
        list.innerHTML = "";
        transactions.forEach(addTransactionDOM);
        updateValues();
      }

      Init();
  
     form.addEventListener('submit',addTransaction);