rpmElement = document.querySelector('#RPM') ;
tester = document.querySelector('#tester') ;

let divs = [rpmElement, tester]

Plotly.d3.csv('./data/data_example.csv', (err, rows) => {
    setY = Yparameter => {
        return {
            name: Yparameter,
            x: rows.map(r => r.TimeStamp),
            y: rows.map(r => r[Yparameter])
        }
    }
    let data = [ setY('MovementFast'), setY('ObjectDistance')];
    Plotly.plot(tester, data) ;
    tester.on('plotly_relayout',(eventdata) => {  
        relayout(eventdata, divs)
})
})


Plotly.d3.csv('./data/data_example.csv', (err, rows) => {
    RPMdata = 
        {
            name: "RPM",
            x: rows.map(r => r.TimeStamp),
            y: rows.map(r => r['RPM'])
        } ;
        Plotly.d3.csv('./data/treatment-example.csv', (err, rows) => {
            cartidge = {
                name: "cartridge",
                x: rows.map(r => r.Time),
                y: rows.map(r => r['cartridge number']),
                mode: 'markers',
            }
            
            Plotly.plot(rpmElement, [RPMdata, cartidge]) ;
            rpmElement.on('plotly_relayout',(eventdata) => {  
                relayout(eventdata, divs)
        })
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

Plotly.d3.csv('./data/phase-example.csv', (err, rows) => {
    if(err) console.log("ERROR ==> ", err)
    let keys = Object.keys(rows[0]) ;
    zIndex  = [];
    keys.forEach(key => { zIndex.push(rows.map(r => r[key]))}) // push every column as array 
    zIndex.splice(0,2) ;
    console.log(zIndex);
    keys.splice(0,2) ;
    let times = rows.map(r => new Date(r.Time * 1000).toLocaleString()) 
    // let uniq = [...new Set(times)];
    // console.log(keys);
    hetmapdata = [{
        z: zIndex,
        // x: times,
        // z:[[1,2,3],[4,4,5],[3,3,4]],
        x: times,
        y: keys,
        type: 'heatmap' ,
        hoverongaps: false

    }] ;
    layout = {
        title: "HeatMap",
        yaxis: {title: "Distance"}
    }
    Plotly.plot('heatMap', hetmapdata, layout)
})

