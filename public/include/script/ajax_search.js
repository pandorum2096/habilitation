document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/yui/build/yuiloader/yuiloader-min.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/yui/build/dom/dom-min.js\"></SCRIPT>");

var KEY_DOWN	= 40;
var KEY_UP		= 38;
var KEY_LEFT	= 37;
var KEY_RIGHT	= 39;
var KEY_END		= 35;
var KEY_BEGIN	= 36;
var KEY_BACK_TAB= 8;
var KEY_ALT     = 18;
var KEY_TAB		= 9;
var KEY_SH_TAB  = 16;
var KEY_ENTER	= 13;
var KEY_ESC		= 27;
var KEY_SPACE	= 32;
var KEY_DEL		= 46;
// id de l'input qui a le focus
var curentSearchIdInput = "";

// invalide la touche ENTER pour
// permettre de valider la suggestion au clavier
// et non pas de soumettre la recherche
function autoCompleteKeyDown(evenement)
{
	var touche = window.event ? evenement.keyCode : evenement.which;
	if (touche == 13 && isSearchOpen())
		return false;
	else
	   return true;
}

//Gets the browser specific XmlHttpRequest Object
function getXmlHttpRequestObject() {	
	
	if (window.XMLHttpRequest) {
	
		return new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} 
}

//Our XmlHttpRequest object to get the auto suggestvar 
var searchReq = getXmlHttpRequestObject();
// nombre d'items ("fermer" compris) du bloc de suggestions 
var length_idsuggest;
// les valeurs des id repondant a la suggestion 
//sont de la forme suggestid_"nombre entier"
var suggestidSelected_number;
// suggestion en cours
var valsuggestencours = "";
var idsuggestencours  = null;

var tabListeSeparateur = new Array();
tabListeSeparateur[0] = ",;\n";
tabListeSeparateur[1] = " ,;\n";

var VOCAB_USED = 1;
var VOCAB_LIE = 5;
var VOCAB_SQL = 10;
//Called from keyup on the search textbox.
//Starts the AJAX request.
function searchSuggest(evenement, typedoc, coderub, idinput, idsuggest, typevocab, typeSeparateur, nomfonction) {

	curentSearchIdInput = idinput;
	var touche = window.event ? evenement.keyCode : evenement.which;
	var str = document.getElementById(idinput).value;
	if (new RegExp(".*[" + tabListeSeparateur[typeSeparateur] + "]+$", "g").test(str))
	{
	   return;
    }
	
	if (touche != KEY_DOWN && touche != KEY_UP && touche != KEY_ENTER && touche != KEY_ESC && 
        touche != KEY_TAB  && touche != KEY_ALT) 
    {
        var listeMot = str.split(new RegExp("["+tabListeSeparateur[typeSeparateur]+"]+", "g"));
    	str = listeMot[listeMot.length - 1];
    	str = escape(str);
	
	if (str.length > 2 && (searchReq.readyState == 4 || searchReq.readyState == 0)) {		
	
		//searchReq.open("GET", '../../../../servlet/interface/session/principal/ajax.Vocabulaire?typedoc=' + typedoc + '&coderub=' + coderub + '&recherche=' + str + "&typevocab=" + typevocab+ "&nombre=25", true);
    		searchReq.open("GET", '../../../../interface/session/principal/ajax/vocabulaire.php?typedoc=' + typedoc + '&coderub=' + coderub + '&recherche=' + str + "&typevocab=" + typevocab+ "&nombre=25", true);
    		searchReq.onreadystatechange = function() {handleSearchSuggest(idsuggest, idinput, typevocab, typeSeparateur, nomfonction);}; 
		idsuggestencours  = idsuggest;
		searchReq.send(null);
	}		
}
	else {
		if (touche == KEY_DOWN || touche == KEY_UP) {
			if (suggestidSelected_number != -1) {
				suggestidSelected_name = "suggestid_" + suggestidSelected_number;
				setClassAttributeById(suggestidSelected_name, 'suggest_link');
			}
			if (touche == KEY_DOWN) {	// TOUCHE " FLECHE BAS "
				suggestidSelected_number = parseInt(suggestidSelected_number) + 1;
				if(suggestidSelected_number == 	length_idsuggest) {
					suggestidSelected_number = 0;
				}
				suggestidSelected_name = "suggestid_" + suggestidSelected_number;

			}
			else { // TOUCHE " FLECHE HAUT "
				suggestidSelected_number -= 1;
				if(suggestidSelected_number < 0) {
					suggestidSelected_number = length_idsuggest -1;
				}
				suggestidSelected_name = "suggestid_" + suggestidSelected_number;
			}
			setClassAttributeById(suggestidSelected_name, 'suggest_link_over');
		}
		else if (touche == KEY_ENTER) {	// TOUCHE " ENTRER "
			
			if (isSearchOpen())
			{
				suggestidSelected_name = "suggestid_" + suggestidSelected_number;
				if(suggestidSelected_number != length_idsuggest -1 && suggestidSelected_number != -1) {
					if (suggestidSelected_name != "suggestid_undefined")  // difficile de faire autrement
					   eval(document.getElementById(suggestidSelected_name).getAttribute('onclick'));
				}
				else {
					closeSearch(idsuggest);
			}
    			return false
            }
            else
                return true;
		}	
        else if (touche == KEY_ESC) { // touche "escape"
            closeSearch(idsuggest);
        }
	}		
    return true;	
}


//Called from keyup on the search textbox.
//Starts the AJAX request.
function searchSuggestMin(evenement, objInput, typevocab, typeSeparateur, nomfonction) {

    if (!document.getElementById('search_suggest_global'))
    {
        divGlo = document.createElement("div");
        divGlo.id = 'search_suggest_global';
        divGlo.style.position = 'absolute';
        divGlo.className = 'divcompletion';
        document.body.appendChild(divGlo);
    }
    else
    {
        divGlo = document.getElementById('search_suggest_global');
    }
    
    if (objInput.id == 'undefined' || objInput.id.length == 0)
    {
        objInput.id = objInput.name;
    }
    
    //objInput.setAttribute('autocomplete', 'off');
    var xy = YAHOO.util.Dom.getXY(objInput.id);
    divGlo.style.display = "";
    xy[1] += objInput.offsetHeight;
    YAHOO.util.Dom.setXY('search_suggest_global', xy);
    // POS_VAL_RUB_
    var codeRubrique = objInput.name.substring(12);
    return searchSuggest(evenement, document.principal.POS_TYPEDOC.value, codeRubrique, objInput.id, 'search_suggest_global', typevocab, typeSeparateur, nomfonction);
}

function searchSuggestTypeRubMin(evenement, objInput, typevocab, typeSeparateur, typedoc, codeRubrique, nomfonction) {

    if (!document.getElementById('search_suggest_global'))
    {
        divGlo = document.createElement("div");
        divGlo.id = 'search_suggest_global';
        divGlo.style.position = 'absolute';
        divGlo.className = 'divcompletion';
        document.body.appendChild(divGlo);
    }
    else
    {
        divGlo = document.getElementById('search_suggest_global');
    }
    
    if (objInput.id == 'undefined' || objInput.id.length == 0)
    {
        objInput.id = objInput.name;
    }
    
    //objInput.setAttribute('autocomplete', 'off');
    var xy = YAHOO.util.Dom.getXY(objInput.id);
    divGlo.style.display = "";
    xy[1] += objInput.offsetHeight;
    YAHOO.util.Dom.setXY('search_suggest_global', xy);
    return searchSuggest(evenement, typedoc, codeRubrique, objInput.id, 'search_suggest_global', typevocab, typeSeparateur, nomfonction);
}

function replaceAll(str, search, repl) { 
  while (str.indexOf(search) != -1) 
	 str = str.replace(search, repl); 
	return str; 
}

//Called when the AJAX response is returned.
function handleSearchSuggest(idsuggest, idinput, typevocab, typeSeparateur, nomfonction) {	

	if (searchReq.readyState == 4) {

		var ss = document.getElementById(idsuggest);
		ss.innerHTML = '';
		var str = searchReq.responseText.split("\n");
		length_idsuggest = str.length;
		var suggestidSelected_name = "";
		for(var i=0; i < length_idsuggest - 1; i++) {			
		
			//Build our element string.  This is cleaner using the DOM, but			
			//IE doesn't support dynamically added attributes.			
			//var suggest = '<div onmouseover="javascript:suggestOver(this);" ';			
			var suggest = '<div id="suggestid_' + i + '" onmouseover="javascript:suggestOver(this);" ';
			suggest += 'onmouseout="javascript:suggestOut(this);" ';			
            
            var valeurACopier = str[i];
            var valeurAAfficher = str[i];
            if (typevocab == VOCAB_SQL)
            {
                var pos = str[i].indexOf("|");
                if (pos != -1)
                {
                    valeurACopier = str[i].substr(0, pos);
                    valeurAAfficher = str[i].substr(pos + 1);
                }
            }
            suggest += 'onclick="javascript:setSearch(\'' + idsuggest + '\',\'' + idinput + '\', \''+replaceAll(valeurACopier, "'", "@@@")+'\', \''+ typeSeparateur + '\',\'' + nomfonction+'\');" ';
            suggest += 'class="suggest_link">' + valeurAAfficher + '</div>';
			ss.innerHTML += suggest;		
		}	
		
        if (length_idsuggest - 1 > 0)
        {
			var suggest = '<div id="suggestid_' + parseInt(length_idsuggest - 1) + '"onmouseover="javascript:suggestOver(this);" ';			
		suggest += 'onmouseout="javascript:suggestOut(this);" ';			
		suggest += 'onclick="javascript:closeSearch(\'' + idsuggest + '\');" ';			
		suggest += 'class="suggest_link">' + '<u>FERMER</u>' + '</div>';
		ss.innerHTML += suggest;	
		if (ss.innerHTML.length > 0)
			ss.style.borderWidth = '1px';
			
			// premiere suggestion ou changement de suggestion
			if(valsuggestencours == "" || document.getElementById(idinput).value != valsuggestencours)
			{
				valsuggestencours = document.getElementById(idinput).value;
	 			suggestidSelected_number = -1;
			}
    		
    		if (length_idsuggest - 1 == 1) {
                suggestidSelected_number = 0;
                suggestidSelected_name = "suggestid_" + suggestidSelected_number;
                setClassAttributeById(suggestidSelected_name, 'suggest_link_over');
            }
        }
        else
        {
            closeSearch(idsuggest);
        }
	}
}

function setClassAttributeById(szId, szClassName) 
{
	// syntaxe IE
	document.getElementById(szId).setAttribute("className",szClassName);
	// syntaxe firefox
	document.getElementById(szId).setAttribute("class", szClassName);
}

//Mouse over function
function suggestOver(div_value) 
{
 	if (suggestidSelected_number != -1	) {
		suggestidSelected_name = "suggestid_" + suggestidSelected_number;
 		setClassAttributeById(suggestidSelected_name, 'suggest_link');
 	}

	suggestidSelected_number = div_value.id.substring(10,div_value.id.length);	
	div_value.className = 'suggest_link_over';
	
}

//Mouse out function
function suggestOut(div_value) {	
	div_value.className = 'suggest_link';
	suggestidSelected_number = -1;
}

//Click function
function setSearch(idsuggest, idinput, value, typeSeparateur, nomfonction) 
{
	document.getElementById(idsuggest).innerHTML = '';
	document.getElementById(idsuggest).style.borderWidth = '0px';
	value = replaceAll(value, "@@@", "'");
	// gestion de la saisie de plusieurs mots
    // recherche le debut de mot qui a servi a la completion et 
    // le remplace par la valeur selectionnee par l'utilisateur
	var valeurChamp = document.getElementById(idinput).value;
    var listeMot = valeurChamp.split(new RegExp("["+tabListeSeparateur[typeSeparateur]+"]+", "g"));
    var sCommence = listeMot[listeMot.length - 1];
    var pos = valeurChamp.lastIndexOf(sCommence);
	document.getElementById(idinput).value = document.getElementById(idinput).value.substring(0, pos) + value;
		
		if (nomfonction && nomfonction != 'undefined' && nomfonction.length > 0)
		{
	    	var valueEscape = value.split("'").join("\\'");
        	eval(nomfonction + '(\''+ valueEscape + '\',\''+ idinput +'\')');
        }
	suggestidSelected_number = -1;
}

function closeSearch(idsuggest) {
    if (arguments.length == 0)
        idsuggest = 'search_suggest_global';
    if (document.getElementById(idsuggest))
    {
		document.getElementById(idsuggest).innerHTML = '';
		document.getElementById(idsuggest).style.borderWidth = '0px';
	}
	return true;
}

function isSearchOpen(idsuggest) {
    if (arguments.length == 0)
        idsuggest = 'search_suggest_global';
    if (document.getElementById(idsuggest))
    {
        if (document.getElementById(idsuggest).innerHTML.length > 0)
        {
            return true;
        }
    }
    return false;
}

function lancerAssociationApresSaisie(valeur, idInput)
{
    var sCodeRubrique = idInput.substring("id_rub_".length);
    lancer_association_prive_avec_valeur(sCodeRubrique, 1, valeur);
}
