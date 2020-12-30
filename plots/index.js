rpmElement = document.querySelector('#rpm') ;
distance = document.querySelector('#distance') ;
heatmap = document.querySelector('#heatmap') ;
date = document.querySelector('#date') ;
name = document.querySelector('#name') ;
let divs = [rpmElement, distance, heatmap]

// get queries from URL
const urlParams = new URLSearchParams(window.location.search);
const currentDate = urlParams.get('date');
const currentName = urlParams.get('name') ;
const graphsQ = urlParams.get('graphs').toLowerCase().split(','); // array of plots to present 
graphsQ.forEach(g => document.querySelector(`#${g}`).style.display = 'block') ; // display the only graphs that send in url
date.innerHTML = `<strong>Date: </strong>${currentDate}` ;
name.innerHTML = `ddddd` ;

// rpm/cartidge  plots
Plotly.d3.csv('../data/data_example.csv', (err, rows) => {
    RPMdata = 
        {
            name: "RPM",
            x: rows.map(r => r.TimeStamp),
            y: rows.map(r => r['RPM']),
        } ;
        Plotly.d3.csv('../data/treatment-example.csv', (err, rows) => {
            cartidge = {
                name: "cartridge",
                x: rows.map(r => r.Time),
                y: rows.map(r => 20),
                mode: 'markers',
                type: 'map',
                hoverongaps: false,
                z: rows.map(r => r['cartridge number'])
            }
            let layout = {title: 'RPM/Cartridge'}
            Plotly.plot(rpmElement, [RPMdata, cartidge], layout) ;
            rpmElement.on('plotly_relayout',(eventdata) => {  
                relayout(eventdata, divs)
        })
})
})

// Movement Fast/Object Distance plots
Plotly.d3.csv('../data/data_example.csv', (err, rows) => {
    setY = Yparameter => {
        return {
            name: Yparameter,
            x: rows.map(r => r.TimeStamp),
            y: rows.map(r => r[Yparameter])
        }
    }
    let layout = {title: 'Movement Fast/Object Distance'}
    let data = [ setY('MovementFast'), setY('ObjectDistance')];
    Plotly.plot(distance, data, layout) ;
    distance.on('plotly_relayout',(eventdata) => {  
        relayout(eventdata, divs)
})
})


function relayout(ed, divs) {
    divs.forEach((div, i) => {
      let x = div.layout.xaxis;
      if (ed["xaxis.autorange"] && x.autorange) return;
      if (
        x.range[0] != ed["xaxis.range[0]"] ||
        x.range[1] != ed["xaxis.range[1]"]
      )
        Plotly.relayout(div, ed);
    });
  }




// heatMap 

Plotly.d3.csv('../data/phase-example.csv', (err, rows) => {
    if(err) console.log("ERROR ==> ", err)
    let keys = Object.keys(rows[0]) ;
    zIndex  = [];
    keys.forEach(key => { zIndex.push(rows.map(r => r[key]))}) // push every column as array 
    zIndex.splice(0,2) ;
    keys.splice(0,2) ;
    let times = rows.map(r => new Date(r.Time * 1000).toLocaleString()) 
    hetmapdata = [{
        z: zIndex,
        x: times,
        y: keys,
        type: 'heatmap' ,
        hoverongaps: false

    }] ;
    layout = {
        title: "HeatMap",
        yaxis: {title: "Distance"}
    }
    Plotly.plot(heatmap, hetmapdata, layout) ;
    heatmap.on('plotly_relayout',(eventdata) => {  
        relayout(eventdata, divs)
})
})

