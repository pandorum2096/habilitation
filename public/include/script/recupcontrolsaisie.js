if ((parent.dateModifDf && parent.dateModifDf.length > 0) || (parent.parent.dateModifDf && parent.parent.dateModifDf.length > 0))
    document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration_w/domaine_ferme.js?v="+parent.dateModifDf+"\"></SCRIPT>");
/**
 * Verification qu'au moins un bouton radio a ete coche
 */
function updateCtrlValue()
{
	var i = 0;
	remplisComboVocabulaire();
	var tabElementsForm = document.principal.elements;
	for (i=0; i<tabElementsForm.length; i++)
	{
		type = tabElementsForm[i].type;
			
		switch (type)
		{
				// Choix par cochage.
			case "checkbox" :	 

				//Decouper le nom pour avoir le code rubrique (suppression du [] final necessaire sur les checkbox)
				var codeRubrique = tabElementsForm[i].name.substring("POS_VAL_RUB_".length, tabElementsForm[i].name.length - 2);
				//Recuperer la valeur						
				var controlName = "document.principal.POS_VAL_CTRL_"+codeRubrique;

				//Verifier la valeur et si c'est la meme un click sur le radio
				if(eval(controlName) && (eval(controlName).value + ";").indexOf(tabElementsForm[i].value + ";") != -1)
				{
					tabElementsForm[i].click();
				}

			break;
			
			// Choix par cochage.
			case "radio" :	 
			
				//Decouper le nom pour avoir le code rubrique
				tabValeur = tabElementsForm[i].name.split("POS_VAL_RUB_");

				//Recuperer la valeur						
				controlName = "document.principal.POS_VAL_CTRL_"+tabValeur[1];

				//Verifier la valeur et si c'est la meme un click sur le radio
				if(eval(controlName) && tabElementsForm[i].value == eval(controlName).value)
				{
					tabElementsForm[i].click();
				}
			break;
			case "select-one" :
				if(tabElementsForm[i].name != "POS_ACTION_HERMES" && tabElementsForm[i].name.indexOf("POS_VAL_RUB_") >= 0)
				{
					tabValeur = tabElementsForm[i].name.split("POS_VAL_RUB_");

					//Affecter la valeur : POS_VAL_CTRL_NOM.value
					// NB : l'objet input cree dynamiquement n'est pas reconnu par IE comme un element ud formulaire
                    //controlName = "document.principal.POS_VAL_CTRL_"+tabValeur[1];
                    //tabElementsForm[i].value = eval(controlName).value;
                    tabElementsForm[i].value = document.getElementById("POS_VAL_CTRL_" + tabValeur[1]).value;
                    if (tabElementsForm[i].value !== document.getElementById("POS_VAL_CTRL_" + tabValeur[1]).value){
                        tabElementsForm[i].add(new Option(document.getElementById("POS_VAL_CTRL_" + tabValeur[1]).value, document.getElementById("POS_VAL_CTRL_" + tabValeur[1]).value, 1, 1));
                    }
				}
			break;					
				// Pour tous les autres types (submit, hidden, button, ...)                   
				default : break;
		}
	}
}

function remplisComboVocabulaire()
{
    try {
    	var tabRubriqueCombo = LISTE_RUB_COMBO.split(";");
    	for (var i=0; i<tabRubriqueCombo.length-1; i++)
    	{
            if (eval('typeof ' + 'tabRubCombo' + tabRubriqueCombo[i]) != 'undefined') {
                
                var nodeListLh0 = document.querySelectorAll("[data-pos-code-lh='"+tabRubriqueCombo[i]+"'][data-pos-niveau-lh='0']");
                if (nodeListLh0.length != 0) {
                    
                    var node0 = nodeListLh0[0];
                    if (node0 && node0.type == "text") {
                        
                        var tabListeValeur = new Array();
                        var tabListe =  eval("tabRubCombo" + tabRubriqueCombo[i]);
                        for (var code in tabListe) {
                            tabListeValeur[code] = tabListe[code][0];
                        }
                        var codeRub = node0.name.substring("POS_VAL_RUB_".length);
                        var selectDf = creerComboDf(codeRub, node0, tabListeValeur);
                        selectDf.onchange = (function(codeRub) {return function() {updateSelectLHNiv1(codeRub);}})(tabRubriqueCombo[i]);
                        selectDf.setAttribute("data-pos-code-lh", tabRubriqueCombo[i]);
                        selectDf.setAttribute("data-pos-niveau-lh", '0');
                    }
                    
                    var nodeListLh1 = document.querySelectorAll("[data-pos-code-lh='"+tabRubriqueCombo[i]+"'][data-pos-niveau-lh='1']");
                    if (nodeListLh1.length != 0) {
                        
                        var node1 = nodeListLh1[0];
                        if (node1 && node1.type == "text") {
                    
                            var tabListeValeur = new Array();
                            tabListeValeur[""] = ""; 
                            // cas particulier ou la valeur est deja renseignee par une valeur par defaut.
                            if (node0.value.length != 0)            
                                tabListeValeur = eval("tabRubCombo" + tabRubriqueCombo[i] + "[\""+node0.value+"\"][1]");
                            var codeRub = node1.name.substring("POS_VAL_RUB_".length);
                            
                            var selectDf = creerComboDf(codeRub, node1, tabListeValeur);
                            selectDf.setAttribute("data-pos-code-lh", tabRubriqueCombo[i]);
                            selectDf.setAttribute("data-pos-niveau-lh", '1');
                            selectDf.onchange = (function(codeRub) {return function() {emptyRubListeHier(codeRub, 1);}})(tabRubriqueCombo[i]);
                        }
                    }
                }
                else {
            	    // recuperation du champ texte s'il existe
                    var objRubInput = eval("document.principal.POS_VAL_RUB_" + tabRubriqueCombo[i]);
                    if (objRubInput && objRubInput.type == "text") {
                        var tabListeValeur = eval("tabRubCombo" + tabRubriqueCombo[i]);
                        creerComboDf(tabRubriqueCombo[i], objRubInput, tabListeValeur);
                    }
                }
            }
        }
    }
    catch(erreur) {
        // la variable n'est pas definie
    }
}

function updateSelectLHNiv1(codeRub){

    var nodeListLh0 = document.querySelectorAll("[data-pos-code-lh='"+codeRub+"'][data-pos-niveau-lh='0']");
    if (nodeListLh0.length != 0) {
        
        var node0 = nodeListLh0[0];
        var nodeListLh1 = document.querySelectorAll("[data-pos-code-lh='"+codeRub+"'][data-pos-niveau-lh='1']");
        if (nodeListLh1.length != 0) {
            
            var node1 = nodeListLh1[0];
            if (node1 && node1.nodeName.toLowerCase() == "select") {
        
                var tabListeValeur = new Array();
                if (node0.value.length != 0)            
                    tabListeValeur = eval("tabRubCombo" + codeRub + "[\""+node0.value+"\"][1]");
                
                // reinitialisation de la liste
                node1.length = 0;
                var nouvel_element = new Option("", "", false, false);
                node1.options[node1.length] = nouvel_element;
                for (var code in tabListeValeur)
                {
                    nouvel_element = new Option(tabListeValeur[code], code, false, false);
                    node1.options[node1.length] = nouvel_element;
                }
            }
        }
        var nodeListLh2 = document.querySelectorAll("[data-pos-code-lh='"+codeRub+"'][data-pos-niveau-lh='2']");
        if (nodeListLh2.length != 0)
            nodeListLh2[0].value = "";
    }
}

function emptyRubListeHier(codeRub, niveauBase){

    var nodeListLh0 = document.querySelectorAll("[data-pos-code-lh='"+codeRub+"']");
    for (var i=0; i<nodeListLh0.length;i++) {
        
        var node = nodeListLh0[i];
        var niveau = parseInt(node.getAttribute("data-pos-niveau-lh"), 10); 
        if (niveau > niveauBase) {
            node.value = "";
        }
    }
}

function creerComboDf(codeRub, objRubInput, tabListeValeur){

    // creation de la liste deroulante
    var selectDf = document.createElement("select");
    selectDf.name = "POS_VAL_RUB_" + codeRub;
    selectDf.id = "POS_VAL_RUB_" + codeRub;
    selectDf.className = objRubInput.className;
	selectDf.required = objRubInput.required;
    
    var nouvel_element = new Option("", "", false, false);
    selectDf.options[selectDf.length] = nouvel_element;
    for (var code in tabListeValeur)
    {
        nouvel_element = new Option(tabListeValeur[code], code, false, false);
        selectDf.options[selectDf.length] = nouvel_element;
    }
    objRubInput.parentNode.insertBefore(selectDf, objRubInput);
    //document.getElementById("POS_VAL_RUB_TYP").type = 'hidden';
    
    var newObject = document.createElement('input');
    newObject.type = "hidden";
    newObject.name = "POS_VAL_CTRL_" + codeRub;
    newObject.id = "POS_VAL_CTRL_" + codeRub;
    newObject.value = objRubInput.value;
    objRubInput.parentNode.replaceChild(newObject, objRubInput);
    if (document.getElementById("img_voc_" + codeRub))
        document.getElementById("img_voc_" + codeRub).style.display = 'none';
    return selectDf;
}


function focus_to_rub_obligatoire(szCodeRub)
{
	//Boolean qui permet d'attribuer le focus quand il n'y a pas d'onglet	
	var focusAttribue = false;
	if (szCodeRub.length != 0)
	{
		rub = eval("document.principal.POS_VAL_RUB_"+szCodeRub);
		if (rub != null)
		{
			ancetre = rub.parentElement;
			while(ancetre != null) 
			{
				if (ancetre.className != "divonglet"){
					ancetre = ancetre.parentElement;
				}
				else
				{
					//urlOnglet = "#" + ancetre.id;
					//location.href = urlOnglet;
					if (ancetre.id != null)
					{	
						// "ONGLET_".length() = 7
						affiche_onglet(ancetre.id.substring(7, ancetre.id.length));
						if (rub.type == "text" || rub.type == "textarea")
						{
							ancetre.focus();
							rub.focus();
						}
						focusAttribue = true;
					}
					break;
				}
			}
			
			if(!focusAttribue) {
				//pas d'onglet, recuperation du focus par la fenetre
				this.focus();
				if (rub.type == "text" || rub.type == "textarea")
					rub.focus();
			}
		}
	}
}

/**************************************************
 Validation du nombre de caractere de la valeur de
 l'objet INPUT
**************************************************/

function maximum(obj,nbMax)
{
	if(obj.value.length > 0 && obj.value.length > nbMax ) {
        
        // avoid chrome >= 52 bug 
        // https://groups.google.com/a/chromium.org/forum/#!topic/chromium-discuss/2LqXp2DMIIs
        var eventOnBlur = obj.onblur; 
        obj.onblur = null; 
        if (parent.posMessageBoxWarning)
            parent.posMessageBoxWarning(new Array("CST_JS_MAX_CHAR_P1", nbMax, "CST_JS_MAX_CHAR_P2"));
        else
            parent.parent.posMessageBoxWarning(new Array("CST_JS_MAX_CHAR_P1", nbMax, "CST_JS_MAX_CHAR_P2"));
        setTimeout(function () {         
            obj.focus();
            obj.select(); 
            obj.onblur = eventOnBlur; 
        }, 10); 
		return false;
	}
	else
		return true;

}

function isANumber(obj) { 

	if(eval(obj).value.length == 0)
		return true;
	
	if ((eval(obj).value.charAt(i) != "0") && !parseFloat(eval(obj).value)) 
	{ 	
        if (parent.posMessageBoxWarning)
            parent.posMessageBoxWarning("CST_JS_FORMAT_ENTIER");
        else
            parent.parent.posMessageBoxWarning("CST_JS_FORMAT_ENTIER");

		eval(obj).focus();
        eval(obj).select();
		return false;
	}
	else 
	{ 
		for (var i=0; i<eval(obj).value.length; i++) 
		{ 
			if(i == 0 && eval(obj).value.charAt(i) == "-")
				continue;
			else			
			if ((eval(obj).value.charAt(i) != "0") && (!parseFloat(eval(obj).value.charAt(i)))) 
			{ 
                if (parent.posMessageBoxWarning)
                    parent.posMessageBoxWarning("CST_JS_FORMAT_ENTIER");
                else
                    parent.parent.posMessageBoxWarning("CST_JS_FORMAT_ENTIER");
				eval(obj).focus();
                eval(obj).select();
				return false;
			} 
		} 
	} 
	return true;
} 

/**************************************************
 Validation du format d'un nombre decimal a partir
 d'une regle de message.
**************************************************/
var rePrice = /^[+-]?\d+(\.\d+)?(e[-+]?\d+)?$/i

function validateDecimal(obj){

	if(eval(obj).value.length == 0)
		return true;

	dNum=parseFloat(eval(obj).value);
	
    if(dNum != eval(obj).value || !rePrice.test(dNum)){
        if (parent.posMessageBoxWarning)
            parent.posMessageBoxWarning("CST_JS_FORMAT_DECIMAL");
        else
            parent.parent.posMessageBoxWarning("CST_JS_FORMAT_DECIMAL");
          
        eval(obj).focus();
        eval(obj).select();
        return false;
    }
    else
     	return true;
}

/**************************************************
 Fonctions de validation du format d'une date et de
 la validite de celle-ci
**************************************************/

// Declaring valid date character, minimum year and maximum year
var dtCh= "/";
var minYear=0;
var maxYear=9999;

function isInteger(s){
	var i;
    for (i = 0; i < s.length; i++){   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag){
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++){   
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary (year){
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
	for (var i = 1; i <= n; i++) {
		this[i] = 31
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
   } 
   return this
}

function isDate(dtStr){
    
    var isDate = true;
	var daysInMonth = DaysArray(12)
	var pos1=dtStr.indexOf(dtCh)
	var pos2=dtStr.indexOf(dtCh,pos1+1)
	var strDay=dtStr.substring(0,pos1)
	var strMonth=dtStr.substring(pos1+1,pos2)
	var strYear=dtStr.substring(pos2+1)
	strYr=strYear
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	}
	month=parseInt(strMonth)
	day=parseInt(strDay)
	year=parseInt(strYr)
	if (pos1==-1 || pos2==-1){
        isDate = false;
	}
	if (strMonth.length<1 || month<1 || month>12){
		isDate = false;
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		isDate = false;
	}
	if (strYear.length != 4 /*|| year==0 || year<minYear || year>maxYear*/){
		isDate = false;
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
        isDate = false;
	}
    return isDate;
}

function ValidateForm(dt){

	if(dt.value.length == 0)
		return true;
    if (!isDate(dt.value)){
   
       dt.classList.add('erreurChamp');
       dt.title = parent.CST_JS_POS_FORMAT_DATE ? parent.CST_JS_POS_FORMAT_DATE : parent.parent.CST_JS_POS_FORMAT_DATE;
       return false;
	}
    else {
        dt.classList.remove('erreurChamp');
    }
    return true
}
 
