let graphs = ['RPM', 'Distance', 'HeatMap']  ;
let dateCard = document.querySelector('.date-card') ;
let graphsCard = document.querySelector('.graphs') ;
let date = document.querySelector('.date') ;
let checkboxInputs = document.querySelector('.form-check-input') ;

checkboxInputs.addEventListener('change',el => {
    console.log(el, "ff");
})


  
  function dateChange(el){
    dateCard.innerHTML = `<strong>Date: </strong> ${el.target.value}` ;
  }

  function checkbox(el){
    if(el.checked){
      graphs.push(el.value)
    }
    else{
      graphs.splice(this.graphs.indexOf(el.target.value), 1)
    }
    graphsCard.innerHTML = `<strong>Graphs Selected: </strong> ${el.target.value}` ;
  }