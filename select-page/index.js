let graphs = ['RPM', 'Distance', 'HeatMap']  ;
let dateCard = document.querySelector('.date-card') ;
let graphsCard = document.querySelector('.graphs') ;
let date = document.querySelector('.date') ;
let checkboxInputs = document.querySelector('.form-check-input') ;
let result = document.querySelector('.result') ;

checkboxInputs.addEventListener('change',el => {
    console.log(el, "ff");
})


  
  function dateChange(el){
    dateCard.innerHTML = `<strong>Date: </strong> ${el.target.value}` ;
    graphsCard.innerHTML = `<strong>Graphs Selected: </strong> ${graphs}`
    result.style.display = 'inline';
  }

  function checkbox(el){
    if(el.target.checked){
      graphs.push(el.target.value)
    }
    else{
      graphs.splice(graphs.indexOf(el.target.value), 1)
    }
    graphsCard.innerHTML = `<strong>Graphs Selected: </strong> ${graphs}` ;
  }

  function goClicked(e){
    e.preventDefault() ;
    window.location.href = `../index.html?graphs=${graphs.join(',')}&date=${date.value}` ;
  }