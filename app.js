
document.getElementById("cp").addEventListener('input', function() {
    if(this.value.length == 5) {
        let urlCP = `https://geo.api.gouv.fr/communes?codePostal=${this.value}&fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=json&geometry=centre`;

        fetch(urlCP)
            .then((response) =>
                response.json().then((data) => {
                    let affichage = '<ul>'
                    for(let ville of data) {
                        affichage += `<li><strong>${ville.nom}</strong> - ${ville.population} habitants</li>`
                    }
                    affichage += '</ul>'
                    document.getElementById('villes').innerHTML = affichage;
                })
            )
            .catch((err) => {
                console.log('Erreur : ' + err);
            });
    }
});



let pageRickMorty = 1;

getRickMortyCharacters(pageRickMorty);

function getRickMortyCharacters(page) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then((response) =>
            response.json().then((data) => {

                if (data.info.next == null) document.getElementById('next').style.display = "none";
                else document.getElementById('next').style.display = "block";

                if (data.info.prev == null) document.getElementById('prev').style.display = "none";
                else document.getElementById('prev').style.display = "block";
                

                var col = [];
                for (var i = 0; i < data.results.length; i++) {
                    for (var key in data.results[i]) {
                        if (col.indexOf(key) === -1 && (key === 'name' || key === 'image' || key == 'species' || key == 'status' || key == 'episode')) {
                            col.push(key);
                        }
                    }
                }
                
                // CREATE DYNAMIC TABLE.
                /*var table = document.createElement("table");*/

                // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

                /*var tr = table.insertRow(-1); // TABLE ROW.

                for (var i = 0; i < col.length; i++) {
                    var th = document.createElement("th"); // TABLE HEADER.
                    th.innerHTML = col[i];
                    tr.appendChild(th);
                }*/

                // ADD JSON DATA TO THE TABLE AS ROWS.
                /*for (var i = 0; i < data.results.length; i++) {

                    tr = table.insertRow(-1);

                    for (var j = 0; j < col.length; j++) {
                        var tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = data.results[i][col[j]];
                    }
                }*/

                // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
                /*var divContainer = document.getElementById("rickmorty");
                divContainer.innerHTML = "";
                divContainer.appendChild(table);*/

                let affichage2 = '<table class="table table-striped table-dark">'
                affichage2 += '<thead>';
                affichage2 += '<tr>';

                for (var i = 0; i < col.length; i++) {
                    affichage2 += `<th scope="col">${col[i]}</th>`;
                }
                affichage2 += '</tr>';
                affichage2 += '</thead>';
                affichage2 += '<tbody>';

                for (var i = 0; i < data.results.length; i++) {
                    affichage2 += '<tr>';

                    for (var j = 0; j < col.length; j++) {
                        console.log(data.results[i][col[j]]);
                        if (data.results[i][col[j]].slice(-5) == ".jpeg") affichage2 += `<td><img src=${data.results[i][col[j]]} height="100px" width="100px"></td>`;
                        else if (data.results[i][col[j]].toString().startsWith("https://rickandmortyapi.com/api/episode/")) affichage2 += `<td>${data.results[i][col[j]].toString().replace(/https:\/\/rickandmortyapi.com\/api\/episode\//gi, "")}</td>`;
                        else affichage2 += `<td>${data.results[i][col[j]]}</td>`;
                    }
                    
                    affichage2 += '</tr>';
                }

                
                affichage2 += '</tbody>';
                affichage2 += '</table>';


                document.getElementById('rickmorty').innerHTML = affichage2;
            })
        )
        .catch((err) => {
            console.log('Erreur : ' + err);
        });
}



document.getElementById('next').addEventListener('click', function(){
    pageRickMorty += 1;
    getRickMortyCharacters(pageRickMorty);
})

document.getElementById('prev').addEventListener('click', function(){
    pageRickMorty -= 1;
    getRickMortyCharacters(pageRickMorty);
})