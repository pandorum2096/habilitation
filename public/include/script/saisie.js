/*
 * Modifications :
 *  
 *
 */  
// on donne le focus a cette page.
window.focus();

/*
 * Ensembles de fonctions Javascript permettant
 * une verification de la validite des rubriques
 * sur le client
 *
 * Attention : Initialisation du vocabulaire dans la methode appel_desactivation
 * appele dans le onLoad qui est prioritaire sur le window.onload fait avant dans vocabulaire.js
 */
var tagname = "POS_VAL_RUB_";
var TAG_NAME_TAB = "NB_ELTS_TAB_";

// Declaration du separateur.
var SEPARATEUR="###";
		
function isElementTableau(tableau, elt)
{
	for (var i=0; i<tableau.length; i++)
	{
		if (tableau[i] == elt)
			return true;
	}
	return false;
}

function desactive_saisie_rubriques()
{
	//var tpsDebutFonction = new Date().getTime();
	if (arguments[0] != 'AUCUNE')
	{
		if (arguments[0] == 'TOUTES')
		{
			updateReadOnly(true);		
		}
		else
		{
            var iCptTableau = 0;
		    var tabRubTableau = new Array();
           
			// IMPORTANT : copie du tableau des elements
			var tabElementsForm = document.principal.elements;
			for (var i=0; i<tabElementsForm.length; i++)
		    {
		    	var nomElementEnCours = tabElementsForm[i].name;
		    	if (nomElementEnCours && nomElementEnCours.indexOf(TAG_NAME_TAB, 0) != -1)
		            tabRubTableau[iCptTableau++] = nomElementEnCours.substring(TAG_NAME_TAB.length, nomElementEnCours.length);
                    
		    	if(nomElementEnCours && nomElementEnCours.indexOf(tagname, 0) != -1 && nomElementEnCours.substring(nomElementEnCours.length-3,nomElementEnCours.length) != "K H")
        		{
        			var codeRubrique = nomElementEnCours.substring(tagname.length, nomElementEnCours.length);
        			if (isElementTableau(arguments, codeRubrique))
					{	
						changeEtatElement(tabElementsForm[i], true);
							
							if( indexOldAction != null)
							tabElementsForm[i].value = eval("document.principal.POS_OLD_VAL_RUB_"+codeRubrique).value;
				}
					else
						changeEtatElement(tabElementsForm[i], false);
				}
            }
		
			for (var i=0; i<tabRubTableau.length; i++)
		    {
		        if(isElementTableau(arguments, tabRubTableau[i]))
		              setReadOnlyTableau(tabRubTableau[i], true);
			    	else
                    setReadOnlyTableau(tabRubTableau[i], false);
			}
		}
	}
	else
	{
		updateReadOnly(false);
	}
	//var tpsEcoule = new Date().getTime()- tpsDebutFonction;
}
	
/**
 * Cette fonction permet de mettre a jour la valeur read only de chaque
 * input et textarea avec la valeur de bool
 */
function updateReadOnly(bool)
{
	//var tpsDebutFonction = new Date().getTime();
	var reg = new RegExp(tagname);
	var regTab = new RegExp(TAG_NAME_TAB);
	var tabElementsForm = document.principal.elements;
	var tabRubTableau = new Array();
	var iCptTableau = 0;
	for (var i=0; i<tabElementsForm.length; i++)
	{
    	if(reg.test(tabElementsForm[i].name))
			changeEtatElement(tabElementsForm[i], bool);
		
		if(tabElementsForm[i].name && tabElementsForm[i].name.indexOf(TAG_NAME_TAB, 0) != -1)
		{
		  var codeRubTableau = tabElementsForm[i].name.substring(TAG_NAME_TAB.length, tabElementsForm[i].name.length);
		  tabRubTableau[iCptTableau++] = codeRubTableau;
        }
	}

    // la frame des fichiers
	for(var i=0; i<frames.length; i++)
    {
        try {
			if (frames[i].document && frames[i].document.body) {
	        	if(bool)
			    	frames[i].document.body.className="NonModif";
		    	else
		        	frames[i].document.body.className="";
			}
        }
        catch (err){};  
    }
    
	for (var i=0; i<tabRubTableau.length; i++)
    {
        setReadOnlyTableau(tabRubTableau[i], bool);
    }
}

function changeEtatElement(objet, bReadOnly)
{	
	if (typeof objet[0] == 'object' && objet[0].type == "radio")
	{
		for(var i=0;i<objet.length;i++)
		{
			if(bReadOnly) {
				objet[i].className="NonModif";
				objet[i].disabled = true;
			}
			else {
				objet[i].className="inputChampType";
				objet[i].disabled = false;
			}
		}
	}
	
    switch (objet.type)
	{
        // Donnees textes.
        case "text" : 
        case "textarea" :
        	if (objet.readOnly != bReadOnly)
        	{
				if(!objet.classList.contains("verrouille") )
	    		{
					objet.readOnly = bReadOnly;
					if(bReadOnly)
					    objet.classList.add("NonModif");
		    		else
				        objet.classList.remove("NonModif");
				}
				else
					objet.readOnly = true;
			}
		break;

		case "select-one" :
			if(bReadOnly) {
				objet.classList.add("NonModif");
				objet.disabled = true;
			}
			else {
				objet.classList.remove("NonModif");
				objet.disabled = false;
			}
		break;
	
		case "radio" :
			if(bReadOnly) {
				objet.classList.add("NonModif");
				objet.disabled = true;
			}
			else {
				objet.classList.remove("NonModif");
				objet.disabled = false;
			}
		break;
		
		case "hidden" :
		break;
	
		// Pour tous les autres types (submit, hidden, button, ...)	                     
        default :
		break;	
    }
}

/**
 *  A continuer : interdire la saisie autre que les chiffres
 */
function validateNonNumber (evt)
{
	var keyCode = evt.which ? evt.which : evt.keyCode;
  	return keyCode < '0'.charCodeAt() || keyCode > '9'.charCodeAt();
}

function validateIsNumber (evt)
{
	var keyCode = evt.which ? evt.which : evt.keyCode;
  	return (keyCode <= 46 || (keyCode >= '0'.charCodeAt() && keyCode <= '9'.charCodeAt()));
}

function setReadOnlyTableau(codeRubriqueTableau, bReadOnly)
{
    var objNbElt = eval("document.principal.NB_ELTS_TAB_" + codeRubriqueTableau);
    if (objNbElt)
    {
        if (bReadOnly){
            document.getElementById("table_tableau_" + codeRubriqueTableau).className = "NonModif";
            eval("document.principal.HERM_DROITS_" + codeRubriqueTableau).value = "0";
        }
		else {
            document.getElementById("table_tableau_" + codeRubriqueTableau).className = "rubriquetableau";
            eval("document.principal.HERM_DROITS_" + codeRubriqueTableau).value = "1";
        }
        
        var szDroitModSupCre = eval("document.principal.DROITS_MOD_SUP_CRE_" + codeRubriqueTableau).value;
        var display = "";
        if (objNbElt.value == "0")
        {
            display = (bReadOnly || (szDroitModSupCre.charAt(2) == '0')) ? "none" : "";
            document.getElementById("creer_" + codeRubriqueTableau + "_0").style.display = display;
        }
        
        for(var i=0;i<objNbElt.value;i++) {
            display = (bReadOnly || (szDroitModSupCre.charAt(0) == '0')) ? "none" : "";
            document.getElementById("modifier_" + codeRubriqueTableau + "_" + i).style.display = display;

            display = (bReadOnly || (szDroitModSupCre.charAt(2) == '0')) ? "none" : "";
            document.getElementById("creer_" + codeRubriqueTableau + "_" + i).style.display = display;
            
            display = (bReadOnly || (szDroitModSupCre.charAt(1) == '0')) ? "none" : "";
            document.getElementById("supprimer_" + codeRubriqueTableau + "_" + i).style.display = display;
        }
    }
}

/**
 * Separation des valeurs du select et lancement de la fonction desactive_saisie_rubriques()
 * ex : AC_SUPPBUDGETTD###HIS devient HIS et lancement de desactive_saisie_rubriques(HIS).
 */
var indexOldAction = null;
function appel_desactivation()
{
	var tpsDebutFonction = new Date().getTime();

	if (document.principal.POS_ACTION_HERMES)
	{
		valeur = document.principal.POS_ACTION_HERMES.options[document.principal.POS_ACTION_HERMES.selectedIndex].value;
		// Separation du CODE_ACTION.SEPARATEUR des CODE_RUB_NON_MODIF
		valeur=valeur.split(SEPARATEUR);

		var bModifChamp = eval("getIfRubriqueModifiee" + valeur[1].substring(valeur[1].indexOf('('), valeur[1].length));
		if(indexOldAction != null && bModifChamp)
		{
    		if(parent.posMessageBoxConfirm("CST_JS_CONFIRM_CHGT_ACTION"))
    		{
				eval(valeur[1]);	
    		    indexOldAction=document.principal.POS_ACTION_HERMES.selectedIndex;
    	    }
    	    else
    	        document.principal.POS_ACTION_HERMES.options[indexOldAction].selected=true;
        }
        else
        {
			eval(valeur[1]);	
    		indexOldAction=document.principal.POS_ACTION_HERMES.selectedIndex;
        }
	}	
	else
	{
	    /*
    	var tabRubTableau = new Array();
    	var iCptTableau = 0;
    	var tabElementsForm = document.principal.elements;
    	for (var i=0; i<tabElementsForm.length; i++)
    	{
        	if(tabElementsForm[i].name && tabElementsForm[i].name.indexOf(TAG_NAME_TAB, 0) != -1)
    		{
    		  var codeRubTableau = tabElementsForm[i].name.substring(TAG_NAME_TAB.length, tabElementsForm[i].name.length);
    		  tabRubTableau[iCptTableau++] = codeRubTableau;
            }
    	}
    	
    	for (var i=0; i<tabRubTableau.length; i++)
        {
            setReadOnlyTableau(tabRubTableau[i], false);
        }
        */
    }
}

function getIfRubriqueModifiee()
{
	for (var i = 0 ; i < arguments.length ; i++)
	{	
		var rubriqueEnCours = eval("document.principal.POS_VAL_RUB_"+arguments[i]);
		if( rubriqueEnCours != null && (rubriqueEnCours.type == "text" || rubriqueEnCours.type == "textarea"))
		{
        	if(rubriqueEnCours.value.trim() != eval("document.principal.POS_OLD_VAL_RUB_"+arguments[i]).value.trim())
            {
			     return true;
			}
        }	
	}
    return false;
}

function getIfChampModif(szNomForm)
{
	if (document.principal.MODE == null || document.principal.MODE.value == "MODIFICATION")
    {   
    	var code = "POS_VAL_RUB";
        var reg = new RegExp(code);
		var tabElementsForm = document.principal.elements;
		for (var i=0; i<tabElementsForm.length; i++)
        {
            var a = tabElementsForm[i].name;
            if (tabElementsForm[i].type != "radio" && tabElementsForm[i].type != "checkbox")
            {
	            if( reg.test(a) && a.substring(a.length-3,a.length) != "K H")
	            {
	            	// GG : en commentaires car a priori  le POS_OLD_VAL_RUB existe
					//if (eval("document.principal.POS_OLD_VAL_RUB_"+a.substring(code.length + 1,a.length)) != null) 
					{
	               		if(tabElementsForm[i].value != eval("document.principal.POS_OLD_VAL_RUB_"+a.substring(code.length + 1,a.length)).value)
	               		{
            			     var szNewVal = tabElementsForm[i].value;
            			     var szOldVal = eval("document.principal.POS_OLD_VAL_RUB_"+a.substring(code.length + 1,a.length)).value;
            			     var szNewValRet = szNewVal.replace(/\r\n/g,'\n');
            			     var szOldValRet = szOldVal.replace(/\r\n/g,'\n');
            			     if (szNewValRet != szOldValRet)
            			     {
            			        return true;
        			         }
						}
					}
		    	}
	    	}
        }
	}
	return false;
}

function validerCreation() 
{
    var tabElementObligatoire = document.querySelectorAll("input[required], textarea[required]");
    var bCreactionOk = true;
    // attention aux btn radio et select
    for (var i=(tabElementObligatoire.length-1);i>=0;i--) {
    	
        if (tabElementObligatoire[i].value.length == 0) {
            
            bCreactionOk = false;
            tabElementObligatoire[i].classList.add('erreurChampObligatoire');
            //if (tabElementObligatoire[i].placeholder)
            //tabElementObligatoire[i].placeholder = 'Ce champ est obligatoire';
            var ancetre = tabElementObligatoire[i].parentElement;
			while(ancetre != null) 
			{
				if (!ancetre.classList.contains("tab-pane"))
					ancetre = ancetre.parentElement;
				else {
                    if (ancetre.id != null)
					{	
						// "ONGLET_".length() = 7
						var numOnglet = ancetre.id.substring(7, ancetre.id.length);
						affiche_onglet(numOnglet);
                        document.getElementById('label_onglet_' + numOnglet).classList.add('erreurChampObligatoire');
					}
                    break;
                }
                    	
			}
        }
        else
            tabElementObligatoire[i].classList.remove('erreurChampObligatoire');
    }
    return bCreactionOk;
}
function onCreerInsererDossier() {

    if(parent.document.principal.POS_NUM_DOSSIER_POUR_AJOUT.value != "") {
        document.principal.NUM_PERE_INSERT_DOS.value = parent.document.principal.POS_NUM_DOSSIER_POUR_AJOUT.value;
        document.principal.submit();
    }   
    else
        alert("Aucun dossier sélectionné pour insertion");
}

function signalerModifTableau(szCodeRub)
{
	if (document.principal.RUB_TABLEAU_MODIFIE.value.indexOf(szCodeRub + ",") == -1)
    {
       document.principal.RUB_TABLEAU_MODIFIE.value += szCodeRub + ",";
    }
}

function griseChamps()
{
	if(document.principal.LISTE_RUB_VERROUILLEES.value != "")
	{
		tabChamp=document.principal.LISTE_RUB_VERROUILLEES.value.split(";");

		for (var i=0; i<tabChamp.length-1; i++)
        {
        	if(eval("document.principal.POS_VAL_RUB_"+ tabChamp[i]))
        		changeEtatElement(eval("document.principal.POS_VAL_RUB_"+ tabChamp[i]), true);
        }            
   }
}

function verifierRubriquesPseudoObligatoires() 
{
	var bRetour = true;
	var bTestPseudo = true;

	// meme sans mettre de message, on verifie le replissage des rub obligatoires en premier
	// pour ne pas afficher l'alerte pseudo à chaque rubrique obligatoire non renseignes
	for(i=0;i<listeCodeRubObligatoire.length;i++)
	{
		rubrique = eval("document.principal.POS_VAL_RUB_" + listeCodeRubObligatoire[i]);
		if (rubrique && rubrique.value != null && rubrique.value.length == 0)
		{
			bTestPseudo = false;
			break;
		}
	}

	if (bTestPseudo)
	{
		for(i=0;i<listeCodeRubPseudoObligatoire.length;i++)
		{
			rubrique = eval("document.principal.POS_VAL_RUB_" + listeCodeRubPseudoObligatoire[i]);
			if (rubrique && rubrique.value != null && rubrique.value.length == 0)
			{
				msg = document.principal.MSG_RUB_PSEUDO_OBLIGATOIRE.value;
				msg = msg.replace("%s", listeLibelleRubPseudoObligatoire[i]);
				if (!confirm(msg))
				{
					bRetour = false;
					break;
				}
			}
		}
	}

	return bRetour;
}