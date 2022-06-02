// JavaScript Document
var checkedMajuscule;
var valueRubOblig;
var checkCompteur;
var disabledCompteur;
var classValActCompteur;
var readonlyValActCompteur;
var valueActCompteur;
var checkIniCompteur;
var disabledIniCompteur;
var classIniCompteur;
var readonlyIniCompteur;
var valueIniCompteur;
var disabledCodeListHier;
var valueSelectedCodeListHier;
var valueSelectedRubListHier;
var disabledCtrlListHier;
var checkedCtrlListHier;
var valueMin;
var valueMax;
var classValDefaut;
var readonlyValDefaut;
var valueValDefaut;

// à l'ajout de rubrique
// 	(pour la modification de rubrique, RecupAttributsRubInTypeModification
// 	par requête ajax ajax_recup_rubintype_attributs.js)
function RecupAttributsRubInTypeCreation()
{
// 	"0" ALPHA,
// 	"1" ENTIER,
// 	"2" DATE,
// 	"3" TABLEAU,
// 	"4" DECIMAL
	valueRubOblig= "0";
	checkCompteur = (szTypeRubCourant == "3") ? true : false;
	disabledCompteur = (szTypeRubCourant == "1") ? false : true;
	classValActCompteur = (szTypeRubCourant == "3") ? "inputChamp" : "verrouille";
	readonlyValActCompteur = (szTypeRubCourant == "3") ? false : true;
	valueActCompteur = "";
	checkIniCompteur = false;
	disabledIniCompteur = true;
	classIniCompteur = "verrouille";
	readonlyIniCompteur = true;
	valueIniCompteur = "";
	disabledCodeListHier = (szTypeRubCourant == "3") ? true : false;
    valueSelectedCodeListHier = "";
	valueSelectedRubListHier = "";
	disabledCtrlListHier = true;
	checkedCtrlListHier = false;
	classValDefaut = (szTypeRubCourant == "3") ? "verrouille" : "inputChamp";
	readonlyValDefaut = (szTypeRubCourant == "3") ? true : false;
	valueValDefaut = (szTypeRubCourant == "3") ? "AUTO" : "";
	checkedMajuscule = (szTypeRubCourant == "3" || szDomFermeRubCourant == 0) ? false : true;
	disabledMajuscule = (szTypeRubCourant == "3" || szDomFermeRubCourant == 0) ? false : true;
    
    if (szTypeRubCourant == "0" || szTypeRubCourant == "2")
    {
        valueMin = "0";
		valueMax = "0";
    }
    else if (szTypeRubCourant == "1" || szTypeRubCourant == "3")
    {
        valueMin = "-2147483647";
		valueMax = "2147483647";
    }
    else if (szTypeRubCourant == "4")
    {
        valueMin = "-1.7e308";
		valueMax = "-1.7e308";
    }
	
	// réinitialisation des liste déroulantes des listes hiérarchiques
	var selectionCodeListhier = document.getElementById('select_code_listhier');
	selectionCodeListhier.options.selectedIndex=0;
	var selectionCodeRuMere = document.getElementById('select_code_rubmere');
    // suppression des valeurs de la liste des rubriques mères
	 if (selectionCodeRuMere.options.length > 0)
    {
		 for (var i=0; i<selectionCodeRuMere.options.length; i++){
  			selectionCodeRuMere.removeChild(selectionCodeRuMere.options[i]);
  			i--;
		 }		 
    }
    // réinitialisation des liste déroulantes pour les types  cibles
    var selectionTypeCible = document.getElementById('select_type_cible');
    selectionTypeCible.options.selectedIndex=0;
    var selectionRubCible = document.getElementById('select_rub_cible');
    // suppression des valeurs de la liste déroulante des rubriques cibles
	 if (selectionRubCible.options.length > 0)
    {
		 for (var i=0; i<selectionRubCible.options.length; i++){
  			selectionRubCible.removeChild(selectionRubCible.options[i]);
  			i--;
		 }		 
    }
//     // création de l'élément de saisie de la valeur par défaut
    var selectionTdValDef = document.getElementById('td_val_def');
    var szAlphaMulti = false;
    var szTagNameValDefaut;
    var elementSupp;
    var elementAjout;
    for(var i=0;i<selectionTdValDef.childNodes.length;i++)
    {
    	// FireFox inclut les blancs et saut de ligne dans le DOM
		//if(selectionTdValDef.childNodes[i].nodeType !=3 && selectionTdValDef.childNodes[i].nodeType !=4)
		if(selectionTdValDef.childNodes[i].nodeType == 1)
		{	
			elementSupp = selectionTdValDef.childNodes[i];
			szTagNameValDefaut = selectionTdValDef.childNodes[i].tagName;
			break;
		}
	}
	
	if (szTypeRubCourant == 0 && szMonoRubCourant == 0)
		szAlphaMulti = true;
	
	if(szAlphaMulti && szTagNameValDefaut == "INPUT")
	{
		elementAjout = document.createElement("textarea");
		elementAjout.name="POS_VAL_DEF";
		elementAjout.cols="30";
		elementAjout.rows="3";;
		elementAjout.onchange= function(){javascript:this.value=this.value.toUpperCase();};
		elementAjout.style.textTransform ="uppercase";
		elementAjout.id="saisie_val_def";
		selectionTdValDef.replaceChild(elementAjout, elementSupp);
	}
	else if (szAlphaMulti==false && szTagNameValDefaut == "TEXTAREA")
	{		
		elementAjout = document.createElement("input");
		elementAjout.name="POS_VAL_DEF";
		elementAjout.size="15";
		elementAjout.maxlength="11";
		elementAjout.onchange= function(){javascript:this.value=this.value.toUpperCase();};
		elementAjout.style.textTransform="uppercase";
		elementAjout.id="saisie_val_def";
		selectionTdValDef.replaceChild(elementAjout, elementSupp);
	}	
}

//
function AffecteAttributsRubInType(tabInfoRubInType)
{
	// affichage du code de la rubrique
	var szCodeRub =	szCodeRubCourant;
	var iLongueur;
	if  (document.getElementById("rub_courante").firstChild != null)
	{
		iLongueur = document.getElementById("rub_courante").firstChild.length;
		document.getElementById("rub_courante").firstChild.replaceData(0, iLongueur, szCodeRub);
	}
	else
	{		
		var text = document.createTextNode(szCodeRub);          			
		document.getElementById("rub_courante").appendChild(text);
	} 
	
	with(document.principal)
	{
		POS_INDEX_RUB_AJOUT.checked = (!tabInfoRubInType || tabInfoRubInType["bIndexee"] == 1) ? true : false;
		POS_INDEX_RUB_AJOUT.disabled = (szTypeRubCourant == "3") ? true : false;
		POS_MAJUSCULE_RUB_AJOUT.checked = checkedMajuscule;
		POS_MAJUSCULE_RUB_AJOUT.disabled = (szTypeRubCourant == "3" || szDomFermeRubCourant == 0) ? false : true;
		POS_MODIFIABLE_RUB_AJOUT.checked = (!tabInfoRubInType || tabInfoRubInType["bModifiable"] == 1) ? true : false;
		
		POS_VAL_UNIQUE_RUB_AJOUT.checked = (tabInfoRubInType && tabInfoRubInType["bMonoValeur"] == 1) ? true : false;
		POS_VAL_UNIQUE_RUB_AJOUT.disabled = ((szTypeRubCourant == "0" && szMonoRubCourant == 0) || szTypeRubCourant == "3") ? true : false;
		POS_VER_CREAT_RUB_AJOUT.checked = (tabInfoRubInType && (tabInfoRubInType["wReservee"] == 1 || tabInfoRubInType["wReservee"] == 2)) ? true : false;
		POS_VER_MODIF_RUB_AJOUT.checked = (tabInfoRubInType && (tabInfoRubInType["wReservee"] == 1 || tabInfoRubInType["wReservee"] == 3)) ? true : false;
		POS_REPORT_VAL_RUB_AJOUT.checked =  (tabInfoRubInType && tabInfoRubInType["bReport"] == 1) ? true : false;
		POS_REPORT_VAL_RUB_AJOUT.disabled = (szTypeRubCourant == "3") ? true : false;
		POS_FULLTEXT_RUB_AJOUT.checked = (tabInfoRubInType && tabInfoRubInType["bFullTexte"] == 1) ? true : false;     
		POS_FULLTEXT_RUB_AJOUT.disabled = false;
        // en création : rubrique tableau
		POS_CHECK_TYPE_CIBLE_RUB_AJOUT.checked = ((!tabInfoRubInType && szTypeRubCourant == "3") || (tabInfoRubInType && tabInfoRubInType["bLierDep"] == 1)) ? true : false;
		POS_CHECK_TYPE_CIBLE_RUB_AJOUT.disabled = (szTypeRubCourant == "3") ? true : false;
		POS_TYPE_TYPE_CIBLE_RUB_AJOUT.readOnly = ((!tabInfoRubInType && szTypeRubCourant == "3") || (tabInfoRubInType && tabInfoRubInType["bLierDep"] == 1)) ? false : true;
		POS_TYPE_TYPE_CIBLE_RUB_AJOUT.disabled = ((!tabInfoRubInType && szTypeRubCourant == "3") || (tabInfoRubInType && tabInfoRubInType["bLierDep"] == 1)) ? false : true;
        POS_TYPE_TYPE_CIBLE_RUB_AJOUT.className = POS_TYPE_TYPE_CIBLE_RUB_AJOUT.disabled ? "verrouille" : "inputChamp";
		POS_RUB_TYPE_CIBLE_RUB_AJOUT.disabled = POS_TYPE_TYPE_CIBLE_RUB_AJOUT.disabled;
		
		POS_BUTTON_ASSOCIATIONS.disabled = (szTypeRubCourant != "3" && tabInfoRubInType && tabInfoRubInType["bLierDep"] == 1) ? false : true;
		POS_CHECK_RECUP_FICHIER_ASSOCIATIONS.checked = (tabInfoRubInType && tabInfoRubInType["bRecupPageAsso"] == 1) ? true : false;
		POS_CHECK_RECUP_FICHIER_ASSOCIATIONS.disabled = (tabAssociationsRubCourant.length == 0) ? true : false;
		
		var ObjChoixRubOblig = document.principal.POS_CHOIX_RUB_OBLIG;
		for(var i=0; i < ObjChoixRubOblig.length; i++)
		{
			if (ObjChoixRubOblig[i].value == valueRubOblig)
				ObjChoixRubOblig[i].checked = true;
			else
				ObjChoixRubOblig[i].checked = false;
		}
				
		POS_CHECK_COMPTEUR.checked = checkCompteur;
		POS_CHECK_COMPTEUR.disabled = disabledCompteur;
		POS_VAL_ACT_COMPTEUR.className=classValActCompteur;
		POS_VAL_ACT_COMPTEUR.readOnly = readonlyValActCompteur;
		POS_VAL_ACT_COMPTEUR.value = (!tabInfoRubInType) ? "" : tabInfoRubInType["Compteur"];
		POS_CHECK_INI_COMPTEUR.checked = checkIniCompteur;
		POS_CHECK_INI_COMPTEUR.disabled = disabledIniCompteur;
		POS_VAL_INI_COMPTEUR.className=classIniCompteur;
		POS_VAL_INI_COMPTEUR.readOnly = readonlyIniCompteur;
		POS_VAL_INI_COMPTEUR.value = valueIniCompteur;
		POS_CODE_LISTHIER.disabled = disabledCodeListHier;
		POS_CODE_RUB_MERE.disabled = disabledCodeListHier;
		POS_CONTROLE_LISTHIER.checked= checkedCtrlListHier;
		POS_CONTROLE_LISTHIER.disabled= disabledCtrlListHier;
		POS_VAL_MIN.className= (szTypeRubCourant == "0" || szTypeRubCourant == "2") ? "verrouille" : "inputChamp";
		POS_VAL_MIN.readOnly = (szTypeRubCourant == "0" || szTypeRubCourant == "2") ? true : false;
		POS_VAL_MIN.value = valueMin;
		POS_VAL_MAX.className = (szTypeRubCourant == "0" || szTypeRubCourant == "2") ? "verrouille" : "inputChamp";;
		POS_VAL_MAX.readOnly = (szTypeRubCourant == "0" || szTypeRubCourant == "2") ? true : false;
		POS_VAL_MAX.value= valueMax;
		// Ne fonctionne pas sous IE
		// (élément créé dynamiquement)
// 		POS_VAL_DEF.value = valueValDefaut;	
// 		POS_VAL_DEF.className = classValDefaut;
// 		POS_VAL_DEF.readOnly = readonlyValDefaut;		
		var selectionSaisieValDef = document.getElementById('saisie_val_def');
  		selectionSaisieValDef.value= valueValDefaut;
 		selectionSaisieValDef.className = classValDefaut;
 		selectionSaisieValDef.readOnly = readonlyValDefaut;
	}
}
