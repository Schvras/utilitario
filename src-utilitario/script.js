var baseUrlApi = "http://127.0.0.1:8090/preferencia"; // Url base da Api que salva o json


function pagina(paginaHtml){
    $("#secao_conteudo").load(paginaHtml);
}

//lê csv com dados link de acesso
function criarLinkCliente(caminhoCSV,idTabela){

    $.ajax({ url: caminhoCSV, dataType: 'text', }).done(lerArquivo);

    function lerArquivo(data) {

        var linhas = data.split(/\r?\n|\r/);
        for (var linha = 0; linha < linhas.length; linha++) {

            var colunas = linhas[linha].split(',');

            let tr = document.createElement('tr');

            if (linha == 0) {


                for (var coluna = 0; coluna < colunas.length; coluna++) {
                    switch (colunas[coluna].toUpperCase()) {
                        case 'NOME':
                            var colunaNome      = coluna;
                            break;
                        case 'OFICIAL':
                            var colunaOficial   = coluna;
                            break;
                        case 'HML':
                            var colunaHml       = coluna;
                            break;
                        case 'PORTAL':
                            var colunaPortal    = coluna;
                            break;
                        case 'ALTERNATIVO 1':
                            var colunaAlternativo1    = coluna;
                            break;
                        case 'ALTERNATIVO 1 NOME':
                            var colunaAlternativo1Nome    = coluna;
                            break;
                        case 'ALTERNATIVO 2':
                            var colunaAlternativo2    = coluna;
                            break;
                        case 'ALTERNATIVO 2 NOME':
                            var colunaAlternativo2Nome    = coluna;
                            break;
                    }
                }
                colunaNome              == null ? console.log('Coluna "Name" não encontrada no arquivo csv')            : '';
                colunaOficial           == null ? console.log('Coluna "Oficial" não encontrada no arquivo csv')         : '';
                colunaHml               == null ? console.log('Coluna "Hml" não encontrada no arquivo csv')             : '';
                colunaPortal            == null ? console.log('Coluna "Portal" não encontrada no arquivo csv')          : '';
                colunaAlternativo1      == null ? console.log('Coluna "Alternativo 1" não encontrada no arquivo csv')     : '';
                colunaAlternativo1Nome  == null ? console.log('Coluna "Alternativo 1 Nome" não encontrada no arquivo csv'): '';
                colunaAlternativo2      == null ? console.log('Coluna "Alternativo 2" não encontrada no arquivo csv')     : '';
                colunaAlternativo2Nome  == null ? console.log('Coluna "Alternativo 2 Nome" não encontrada no arquivo csv'): '';

            } else if ( colunaNome              != null && 
                        colunaOficial           != null && 
                        colunaHml               != null && 
                        colunaPortal            != null &&
                        colunaAlternativo1      != null &&
                        colunaAlternativo1Nome  != null &&
                        colunaAlternativo2      != null &&
                        colunaAlternativo2Nome  != null &&
                        colunas[colunaNome]     != "") {

                let nome                = document.createElement('td');
                let divlink             = document.createElement('div');
                let link                = document.createElement('td');
                let linkHml             = document.createElement('a');
                let linkPortal          = document.createElement('a');
                let linkAlternativo1    = document.createElement('a');
                let linkAlternativo2    = document.createElement('a');

                nome.append(colunas[colunaNome]);
                nome.dataset.href = colunas[colunaOficial];
                if(colunas[colunaOficial] != ''){
                    nome.addEventListener('click',function (e) {
                        window.open($(this).data('href'));
                        return false;
                    });
                }
                
                if (colunas[colunaHml] != ""){

                    linkHml.innerHTML = "HML";
                    linkHml.setAttribute("class", "btn btn-outline-primary btn-sm");
                    linkHml.setAttribute("target", "_blank");
                    linkHml.setAttribute("type", "button");
                    linkHml.href = colunas[colunaHml];
                    divlink.append(linkHml);
                }
                if (colunas[colunaPortal] != ""){

                    linkPortal.innerHTML = "PORTAL";
                    linkPortal.setAttribute("class", "btn btn-outline-primary btn-sm");
                    linkPortal.setAttribute("target", "_blank");
                    linkPortal.setAttribute("type", "button");
                    linkPortal.href = colunas[colunaPortal];
                    divlink.append(linkPortal);
                }
                if (colunas[colunaAlternativo1] != ""){

                    linkAlternativo1.innerHTML = colunas[colunaAlternativo1Nome] != "" ? colunas[colunaAlternativo1Nome] : 'ALTERNATIVO 1';
                    linkAlternativo1.setAttribute("class", "btn btn-outline-primary btn-sm");
                    linkAlternativo1.setAttribute("target", "_blank");
                    linkAlternativo1.href = colunas[colunaAlternativo1];
                    divlink.append(linkAlternativo1);
                }
                if (colunas[colunaAlternativo2] != ""){

                    linkAlternativo2.innerHTML = colunas[colunaAlternativo2Nome] != "" ? colunas[colunaAlternativo2Nome] : 'ALTERNATIVO 1';
                    linkAlternativo2.setAttribute("class", "btn btn-outline-primary btn-sm");
                    linkAlternativo2.setAttribute("target", "_blank");
                    linkAlternativo2.href = colunas[colunaAlternativo2];
                    divlink.append(linkAlternativo2);
                }

                tr.appendChild(nome);

                divlink.setAttribute('aria-label','Links')
                divlink.setAttribute("class", "btn-group text-nowrap");
                divlink.setAttribute('role','group');
                link.appendChild(divlink);
                link.setAttribute('class','text-end');
                tr.appendChild(link);

                document.querySelector('[id=' + idTabela + '] tbody').appendChild(tr);
            }
        }
    }
}

//lista de ramais
function lerRamais(caminhoCSV,idUl){
    $.ajax({ url: caminhoCSV, dataType: 'text', }).done(sucesso);

    function sucesso(data) {
        var linhas = data.split(/\r?\n|\r/);
        for (let linha = 0; linha < linhas.length; linha++) {

            var celulas = linhas[linha].split(',');

            if (linha == 0) {

                for (var celula = 0; celula < celulas.length; celula++) {
                    switch (celulas[celula].toUpperCase()) {
                        case 'NAME':
                            var colunaNome = celula;
                            break;
                        case 'NUMBER':
                            var colunaRamal = celula;
                            break;
                    }
                }
                colunaNome == null ? console.log('Coluna "Name" não encontrada no arquivo ramais.csv') : '';
                colunaRamal == null ? console.log('Coluna "Number" não encontrada no arquivo ramais.csv') : '';

            } else if (colunaNome != null && colunaRamal != null) {

                let li = document.createElement('li');
                li.classList.add('list-group-item');

                var conteudo = celulas[colunaRamal] + ' - ' + celulas[colunaNome];

                li.append(conteudo);
                document.getElementById(idUl).appendChild(li);
            } else {

                let li = document.createElement('li');
                li.classList.add('list-group-item');

                var conteudo = 'Arquivo de ramais está fora do layout.';

                li.append(conteudo);
                document.getElementById(idUl).appendChild(li);

                break;
            }
        }
    }
}


function apaga_cookies(){
    var data = new Date(2010,01,01);
    data = data.toGMTString();
    let coockie = decodeURIComponent(document.cookie);
    let listaCookie = coockie.split(';');
    for (let att of listaCookie) {
        let c = att.split('=');
        document.cookie = c[0].trim() + '=; expires=' + data + ';';
    }
}

function obterCookie(nome){

    let nomeChave = nome + "=";
    let cookie = decodeURIComponent(document.cookie);
    let listaCookie = cookie.split(';');
    for (let att of listaCookie){
        if(att.includes(nomeChave)){

            return att.substring(nomeChave.length,att.length );
        }
    }
    return "";
}

function objetoJson(){
    
    try {
        const atributos = JSON.parse(obterCookie("preferencia"));
        return atributos;

    } catch (error) {
        console.log(error);
        console.log(obterCookie("preferencia"));
        return null;
    }
}

function salvarPreferencia(){
    var url = baseUrlApi + "/gravarJson";

    let id          = document.getElementById('id_preferencia_modal').value;
    let corFundo    = document.getElementById('corFundo').value;
    let linkFundo   = document.getElementById('linkFundo').value;
    let divSpotify  = document.getElementById('divSpotify').checked;
    let uriSpotify  = document.getElementById('uriSpotify').value;

    if(id != ''){
        $.ajax({
            method: "POST",
            url: url,
            data: {id: id,corFundo: corFundo,linkFundo:linkFundo,divSpotify:divSpotify,uriSpotify:uriSpotify},
    
            success: function( data ){
                document.cookie = 'preferencia= '+ data + ";";
                location.reload();
                return data;
            },
            error: function(){
                var json = '{"uriSpotify":"'+uriSpotify+'","corFundo":"'+corFundo+'","id":"'+id+'","divSpotify":"'+divSpotify+'","linkFundo":"'+linkFundo+'"}';
                document.cookie = 'preferencia= '+ json.toString() + ";";
                location.reload();
                return '';
            }
        });
    } 
}

function obterPreferencia(id){
    var url = baseUrlApi + "/obterJson";
    
    $.ajax({
        method: "GET",
        url: url,
        data: {id: id,corFundo: "#301A51"},

        success: function( data ){
            document.cookie = 'preferencia= '+ data + ";";
            location.reload();
            return data;
        },
        error: function(){
            var json = '{"uriSpotify":"","corFundo":"#301A51","id":"'+id+'","divSpotify":"false","linkFundo":""}';
            document.cookie = 'preferencia= '+ json.toString() + ";";
            location.reload();
            return '';
        }
    });
}

function testeRequisicao(metodo,url,data,headers){
    $.ajax({
        method: metodo,
        url: url,
        data: data,
        headers:headers,

        success: function( data ){
            return data;
        },
        error: function(){
            return '';
        }
    });
}
