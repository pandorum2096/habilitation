// Recuperation du code de la rubrique
// pour chargement du vocabulaire du champs Valeur1
function getCodeRubSelected(numLoc)
{
	// on recupere le "name" du select...
	var selectName = "document.principal.RUB_LOC_NUM_"+numLoc;
	var objSelect = eval(selectName);
    
	//...et la valeur de l'option selectionnee cad le code de la rub
	var coderub = "";
    if (objSelect.selectedIndex >= 0)
        coderub = objSelect.options[objSelect.selectedIndex].value;
	    
	return coderub;
}

// Recuperation du code de la rubrique lie
function getCodeRubLieSelected(numLoc)
{
	// on recupere le "name" du select...
	var selectName = "document.principal.RUB_LIE_"+numLoc;
	var objSelect = eval(selectName);
    
	//...et la valeur de l'option selectionnee cad le code de la rub
	var szcoderub = objSelect.options[objSelect.selectedIndex].value;
	
	var tabcoderub = szcoderub.split('#');
	    
	return tabcoderub[1];
}

/**
 * Cette fonction permet de verifier que les locutions du formulaire sont correctement remplies
 * si une locution est renseignee = valeur1 renseignee, toutes les locutions qui la precede doivent
 * aussi etre remplies.
 */
function Verif_form()
{
	with(window.document.principal) 
	{
		iLastLocution = -1;
	
		// on regarde toutes les locutions -- la premiere dont la valeur du champs valeur1 est vide
		// est la derniere de la liste	
	    for (var iCpt=0; iCpt < POS_NUMLOC.value; iCpt++)
	    {
			iNumLoc = iCpt + 1;

			szValeur1 = eval("VAL1_LOC_NUM_" + iCpt).value; 
			szValeur2 = eval("VAL2_LOC_NUM_" + iCpt).value; 
			
			if (szValeur1.length == 0)
			{
			    var cOperateur = eval("OPE_LOC_NUM_" + iCpt);
				// la premiere locution doit etre renseignee
				if (iCpt == 0)
				{
				    if (cOperateur.value != "#" && cOperateur.value != "0")
				    {
					   parent.posMessageBoxWarning(msgValeur1VideLoc + iNumLoc + ".");
					   return false;
					}
				}
			
				// il y a une valeur2 mais pas de valeur1 = erreur	
				if (szValeur2.length > 0)
				{
					parent.posMessageBoxWarning(msgValeur1VideLoc + iNumLoc + ".");
					return false;
				}

                if (cOperateur.value != "#" && cOperateur.value != "0")
				    iLastLocution = iNumLoc;
			}
			// la valeur du champs valeur1 n'est pas vide
			else
			{
				// s'il y a deja une locution vide
				if (iLastLocution > 0)
				{
					parent.posMessageBoxWarning(msgValeur1VideLoc + iLastLocution + ".");
					return false;
				}

				// si operateur a deux valeurs, verification valeur2
				cOperateur = eval("OPE_LOC_NUM_" + iCpt);
				if (cOperateur.value == "/" || cOperateur.value == "@")
				{
					if (szValeur2.length == 0)
					{
						parent.posMessageBoxWarning(msgValeur2VideLoc + iNumLoc + ".");
						return false;
					}
				}

				indexRubrique = eval("RUB_LOC_NUM_" + iCpt).selectedIndex;
				if (indexRubrique == 0)
				{
					parent.posMessageBoxWarning(msgRubriqueVideLoc + iNumLoc + ".");
					return false;
				}
                
                if ((szValeur1.indexOf("#?") == 0 || szValeur2.indexOf("#?") == 0) &&
                    document.principal.URL.value != document.principal.URL_ENREG_QUEST.value ) {
                    parent.posMessageBoxWarning("CST_JS_RECH_ELA_VAR");
					return false;
                }
			}
		} // boucle sur les locutions
	}
	return true;
}

function EnregQuest()
{
	document.principal.URL.value=document.principal.URL_ENREG_QUEST.value;
	
	if(Verif_form())
	document.principal.submit();
}

function TransParEnNbPar(champ,type)
{	
	with(document.principal)
	{
		texte = champ.value;
		nom = champ.name;
		
		if(type == "OUV")
		{
			// si exp commence par ( x fois et fini par (
			exp = /^\(*$/;
		}
		else
		{
			// si exp commence par ) x fois et fini par )
			exp = /^\)*$/;
		}

		if(exp.test(texte) == true)
		{
			iNbPar = texte.length;
			eval("POS_NB_"+nom).value = iNbPar;
		}
		else
		{
			parent.posMessageBoxWarning(document.principal.MESSAGE_SAISIE_PARENTHESE.value);
			eval(nom).focus();
			eval(nom).select();
		}
	}
}

function afficheIconeSupprimerLocution()
{
    var iLastLocution = 0;
    for (var iNumLoc=1; iNumLoc < document.principal.POS_NUMLOC.value + 1; iNumLoc++)
    {
        var szValeur1 = eval("document.principal.VAL1_LOC_NUM_" + iNumLoc).value; 
        var cOperateur = eval("document.principal.OPE_LOC_NUM_" + iNumLoc);
		if (szValeur1.length == 0 && (cOperateur.value != "#" && cOperateur.value != "0"))
		{
            iLastLocution = iNumLoc;
            break;
		}
    }
    if (iLastLocution != 1)
    {
        document.getElementById("img_suppr_" + (iLastLocution - 1)).style.display = ""; 
    }
}

function supprimerLocution(iNumLoc)
{
	var bParOuv = eval("document.principal.POS_NB_PAR_OUV_" + iNumLoc).value;
	var bParFer = eval("document.principal.POS_NB_PAR_FER_" + iNumLoc).value;	
	var bConfirmSuppression = false;
	
	if (bParOuv >= 1 || bParFer >= 1)
	{
		if(parent.posMessageBoxConfirm(document.principal.MESSAGE_CONFIRM_SUPPRESSION_LOC.value))
			bConfirmSuppression = true;	
	}
	else
		bConfirmSuppression = true;	
	
		
	if (bConfirmSuppression == true)
	{
		var szLastLocRenseignee;
		for(var i=iNumLoc; i<parseInt(document.principal.NB_LOC_AFFICHEES.value) - 1; i++)
		{
            if (eval("document.principal.RUB_LOC_NUM_" + i).value != "")
			{	
				var isuiv = parseInt(i) + 1;	
				if (i!=0)
				{
					eval("document.principal.LIEN_LOC_NUM_" + i).value = eval("document.principal.LIEN_LOC_NUM_" + isuiv).value;
					var szSelectLienLocName = eval("document.principal.LIEN_LOC_NUM_" + i);
					var szSelectLienLocValue = eval("document.principal.LIEN_LOC_NUM_" + isuiv).value;
					for (var j=0; j<szSelectLienLocName.options.length; j++)
					{					
						if (szSelectLienLocName.options[j].value == szSelectLienLocValue)
							szSelectLienLocName.options[j].selected = true;
					}
				}
				else 
					eval("document.principal.LIEN_LOC_NUM_0").value = 1;				
							
				eval("document.principal.POS_NB_PAR_OUV_" + i).value = eval("document.principal.POS_NB_PAR_OUV_" + isuiv).value;
				eval("document.principal.PAR_OUV_" + i).value = eval("document.principal.PAR_OUV_" + isuiv).value;
				
				var szRubLoc = eval("document.principal.RUB_LOC_NUM_" + isuiv).value;
				eval("document.principal.RUB_LOC_NUM_" + i).value = eval("document.principal.RUB_LOC_NUM_" + isuiv).value;
						
				eval("document.principal.VAL1_LOC_NUM_" + i).value = eval("document.principal.VAL1_LOC_NUM_" + isuiv).value;
				
                eval("document.principal.RUB_LIE_" + i).value = eval("document.principal.RUB_LIE_" + isuiv).value;
				var szRubLie = eval("document.principal.RUB_LIE_" + isuiv).value;
                var sCodeRubLiee = "";
				if(szRubLie != "")
				{		
					var tabcoderub = szRubLie.split('#');
					afficheRubLie(i, tabcoderub[1]);		
                    sCodeRubLiee = tabcoderub[1];		
				}					
				else
				{
					document.getElementById("LibRubLie_" + i).style.display = "none";					
					document.getElementById("LibRubTAb_" + i).style.display = "none";
                    document.getElementById("RubLie_" + i).style.display = "none";
				}
				
				var szNameChampLienTypeMultiLocNum = "document.principal.LIEN_TYPE_MULTI_LOC_NUM_" + i;
                eval("document.principal.LIEN_TYPE_MULTI_LOC_NUM_" + i).value = eval("document.principal.LIEN_TYPE_MULTI_LOC_NUM_" + isuiv).value;
				if(szRubLoc != "")
					afficheLienRubMulti(i, (sCodeRubLiee != "") ? true : false);	
				else
				{
					document.getElementById("LienMulti_" +i).style.display = "none";					
					document.getElementById("LibLienMulti_"+i).style.display = "none";
				}		
						
				eval("document.principal.OPE_LOC_NUM_" + i).value = eval("document.principal.OPE_LOC_NUM_" + isuiv).value;
				var szOpeLoc= eval("document.principal.OPE_LOC_NUM_" + isuiv).value;
				if(szOpeLoc != "")
				{
					var objSelectOpe = eval("document.principal.OPE_LOC_NUM_"+i);
                    objSelectOpe.options.length = 0;
                    var code_rub_pour_ope = code_rub;
                    if (sCodeRubLiee != "")
                        code_rub_pour_ope = sCodeRubLiee;
                        
					var listeCodeLibOpe = getObjetOperateur(code_rub_pour_ope, i);
                    for(var k=0;k<listeCodeLibOpe.length;k++)
            	        objSelectOpe.options[k] = new Option(listeCodeLibOpe[k]["libelle"], listeCodeLibOpe[k]["code"]);
            	    objSelectOpe.value = szOpeLoc;
					affiche_valeur2(i, objSelectOpe.value);				
				}	 
					
				eval("document.principal.VAL2_LOC_NUM_" + i).value = eval("document.principal.VAL2_LOC_NUM_" + isuiv).value;
				eval("document.principal.POS_NB_PAR_FER_" + i).value = eval("document.principal.POS_NB_PAR_FER_" + isuiv).value;
				eval("document.principal.PAR_FER_" + i).value = eval("document.principal.PAR_FER_" + isuiv).value;
				document.getElementById("img_suppr_" + i).style.display = ""; 
				szLastLocRenseignee = i;
			}	
		}	
		// suppression du lien sur la derniere locution
		var iIndexLastLoc = szLastLocRenseignee;
		var szLastSelectLienLocName = eval("document.principal.LIEN_LOC_NUM_" + iIndexLastLoc);
        if (iNumLoc != 0)
		  szLastSelectLienLocName.options[0].selected = true;
		// suppression de l'icone pour suppression de locution
		document.getElementById("img_suppr_" + iIndexLastLoc).style.display = "none"; 
			
	}
}

function affiche_valeur2(numLoc, valeurSelect)
{
    var obj = document.getElementById("RubVal2_"+numLoc);
    var objLib = document.getElementById("LibVal2_"+numLoc);
   	var objCal0 = document.getElementById("Calendrier_"+numLoc+"_0");
   	var objCal1 = document.getElementById("Calendrier_"+numLoc+"_1");
    
	code_rub = getCodeRubSelected(numLoc);
	
	if(valeurSelect == "/" || valeurSelect == "@")
	{
		if (obj.style.display=="none")
		{
			obj.style.display = "";
			objLib.style.display = "";
			if(objCal0.style.display=="")
				objCal1.style.display = "";
		}
	}
	else
	{
		obj.style.display = "none";
		objLib.style.display = "none";
		objCal1.style.display = "none";
		
		objCODE = eval("document.principal.VAL2_LOC_NUM_"+numLoc);
		objCODE.value="";
	}
	
	var objVal1 = document.getElementById("RubVal1_"+numLoc);
	if(valeurSelect == "0" || valeurSelect == "#")
	{
	   objVal1.value = "";
	   objVal1.className="NonModif";
	   objVal1.readOnly = true;
	}
	else
	{
	   objVal1.className="inputChamp";
	   objVal1.readOnly = false;
    }
	
}

function afficheLienRubMulti(numLoc, bRubLie)
{
    obj = document.getElementById("LienMulti_"+numLoc);
    objLib = document.getElementById("LibLienMulti_"+numLoc);
    
    if(bRubLie)
        code_rub = getCodeRubLieSelected(numLoc);
    else
	   code_rub = getCodeRubSelected(numLoc);
	bRubMulti = isInIndexedArray(tab_rub_multi, code_rub);
	if(bRubMulti)
	{
		if (obj.style.display =="none")
		{
			obj.style.display = "";
			objLib.style.display = "";
		}
	}
	else
	{
		obj.style.display = "none";
		objLib.style.display = "none";
		
		objCODE = eval("document.principal.LIEN_TYPE_MULTI_LOC_NUM_"+numLoc);
		objCODE.options[0].selected=true;
	}
}

function afficheRubLie(numLoc, rubLieSelect)
{
    obj = document.getElementById("RubLie_"+numLoc);
    objLibRubLie = document.getElementById("LibRubLie_"+numLoc);
    objLibRubTab = document.getElementById("LibRubTAb_"+numLoc);
    objRubLie = eval("document.principal.RUB_LIE_"+numLoc);
    
	code_rub = getCodeRubSelected(numLoc);
	// Recherche si rub tableau.
	bRubTab = isInIndexedArray(tab_rub_tab, code_rub);
	
	if(tab_code_val_rub_lie.containsKey(code_rub))
	{
	    objHT = tabRubLieeParRubrique[code_rub];
	    tabColonne = objHT.keys();
	    
	    // on vide le select
	    for(i=objRubLie.options.length-1;i>=0;i--)
	        objRubLie.options[i] = null;
	    
	    if(!bRubTab)
	    {
	        objRubLie.options[0] = new Option("","");
	        j=1;
	    }
	    else
	        j=0;
	        
	    for(i=0;i<tabColonne.length;i++)
	    {
	        objRubLie.options[(i+j)] = new Option(objHT.get(tabColonne[i]),tab_code_val_rub_lie.get(code_rub)+"#"+tabColonne[i]);
	        if(rubLieSelect == tabColonne[i])
	            objRubLie.options[(i+j)].selected=true;
	    }

		obj.style.display = "";
		if(bRubTab)
		{
			objLibRubLie.style.display = "none";
			objLibRubTab.style.display = "";
		}
		else
		{
			objLibRubLie.style.display = "";
			objLibRubTab.style.display = "none";
		}
	}
	else
	{
		obj.style.display = "none";
		objLibRubLie.style.display = "none";
		objLibRubTab.style.display = "none"
		
        // on met le select des rub liees a vide pour ne pas conserver de mauvaise donnees.
		objRubLie.options[0] = new Option("","");
		
		objCODE = eval("document.principal.RUB_LIE_"+numLoc);
		objCODE.options[0].selected=true;
	}

	// si on est sur une rub tableau
	if(objRubLie.options[objRubLie.selectedIndex].value != "")
	    afficheOperateur(numLoc,eval("operateurSelected_"+numLoc),'TRUE');
	    
	// on vide la variable qui nous a servi pour placer l'operateur selected au chargement
	eval("operateurSelected_"+numLoc+"=''");
}

function affiche_thesaurus(numLoc)
{
	var obj = document.getElementById("thes_" + numLoc);
	var objOpe = eval("document.principal.OPE_LOC_NUM_"+numLoc);
	code_rub = getCodeRubSelected(numLoc);
	
	var bRubThes = isInIndexedArray(tab_rub_thes, code_rub);
	if(bRubThes && objOpe.value=="=")
	{
		if (obj.style.display=="none")
			obj.style.display = "";

		objType = eval("document.principal.TYPE_THE_"+numLoc);
		objType.value = tab_lien_rub_type_thes[code_rub];
	}
	else
	{
		obj.style.display = "none";
		
		objCODE = eval("document.principal.CODE_THES_LOC_NUM_"+numLoc);
		objCODE.options[0].selected=true;
		
		objPFD = eval("document.principal.PFD_THES_LOC_NUM_"+numLoc);
		objPFD.value = 0;
		
		objSYN = eval("document.principal.SYN_THES_LOC_NUM_"+numLoc);
		if(objSYN.checked == true)
			objSYN.click();
	}
}

// Initialisation de la valeur du champ profondeur
// selon l'option de recherche thesaurus choisie
function init_profondeur(numLoc)
{
    // on recupere le "name" du select...
    selectName = "document.principal.CODE_THES_LOC_NUM_"+numLoc;
    profName = "document.principal.PFD_THES_LOC_NUM_"+numLoc;
    objSelect = eval(selectName);
    objProf = eval(profName);
    
    //...et la valeur de l'option selectionnee
    valOpt = objSelect.options[objSelect.selectedIndex].value;
    
    // cas d'une recherche avec synonyme
    if(valOpt > 9)
        valOpt = valOpt-10;
    
    // si l'option de recherche est "Pere" ou "Fils" et que la profondeur est nulle
    if(objProf.value == "0"
        && (valOpt == "1" || valOpt == "2"))
        objProf.value = "1";

    // si l'option de recherche est "Aucun" ou "TA" et que la profondeur vaut 1
    if(objProf.value == "1"
        && (valOpt == "0" || valOpt == "4"))
        objProf.value = "0";    	    
}

function isInIndexedArray(tableau, valeur)
{
	var i;
	for(i=0;i<tableau.length;i++)
	{
		if(valeur == tableau[i])
			return true;
	}
	return false;
}

function getObjetOperateur(code_rub, numLoc)
{
    var bRubDate = isInIndexedArray(tab_rub_date, code_rub);	
	var objCal0 = document.getElementById("Calendrier_"+numLoc+"_0");
	var bRubNum = false;
	var bRubMulti = false;
    var bRubMono = false;
	var bRubFtx = false;
    var typeRub = "";
    
    var objHT = new Array();
	if(bRubDate)
	{
		objCal0.style.display = "";
	    objHT = tabOpeRubDate;
        typeRub = "date";
	}
	else
	{
		objCal0.style.display = "none";
		bRubNum = isInIndexedArray(tab_rub_num, code_rub);		
		if(bRubNum)
		{
		    objHT = tabOpeRubNum;
            typeRub = "num";
		}
		else
		{
    		bRubMulti = isInIndexedArray(tab_rub_multi, code_rub);
    		if(bRubMulti)
    		{
    		    objHT = tabOpeRubMuli;
                typeRub = "multi";
    		}
    		else
    		{
    		    bRubFtx = isInIndexedArray(tab_rub_ftx, code_rub); 
                if (bRubFtx)
        		  objHT = tabOpeRubFtx;       		
        		else
                {
                    bRubMono = true;
                    objHT = tabOpeRubAlphaMono;
                }
    	    }
        }
	}
    if((document.principal.TYPE_BDD.value == "2" || document.principal.TYPE_BDD.value == "3") && !bRubFtx)
	{
        if (bRubMulti)
            objHT = objHT.concat(tabOpeRubMultiBddSqlOnly);
        else
        {
            if (bRubMono)
                objHT = objHT.concat(tabOpeRubMonoBddSqlOnly); 
        }
        objHT = objHT.concat(tabOpeRubBddSqlOnly);
    }
    
    var bRubTypeFtx = isInIndexedArray(tab_rub_type_ftx, code_rub);
    if (bRubTypeFtx)
        objHT = objHT.concat(tabOpeRubFtx);

    var objCodeLibelle = new Array();
    for(var i=0;i<objHT.length;i++)
    {
        objCodeLibelle[i] = {};
        objCodeLibelle[i]["code"] = objHT[i];
        objCodeLibelle[i]["libelle"] = getLibelleOperateur(objHT[i], typeRub);
    }
	
	return objCodeLibelle;
}   

function afficheOperateur(numLoc, opeSelected, bRubLie)
{
    var code_rub = "";
    if(bRubLie)
        code_rub = getCodeRubLieSelected(numLoc);
    else
        code_rub = getCodeRubSelected(numLoc);
    var objSelectOpe = eval("document.principal.OPE_LOC_NUM_"+numLoc);

    if(code_rub != "")
    {
        // on vide le select
	    for(var i=objSelectOpe.options.length-1;i>=0;i--)
	        objSelectOpe.options[i] = null;
		        
        // on construit le select des operateurs
	    // en fonction du type de la rub.
	    var listeCodeLibOpe = getObjetOperateur(code_rub, numLoc);
	    for(var i=0;i<listeCodeLibOpe.length;i++)
	    {
	        objSelectOpe.options[i] = new Option(listeCodeLibOpe[i]["libelle"], listeCodeLibOpe[i]["code"]);
	        if(opeSelected == listeCodeLibOpe[i]["code"])
	            objSelectOpe.options[i].selected = true;
	    }
    }

    // affichage du champ valeur 2 si besoin
    if(objSelectOpe.value != "")
        affiche_valeur2(numLoc, objSelectOpe.value);
}

var tabOpeRubDate = new Array(")", ">", "(", "<", "/", "!", "=");
var tabOpeRubNum = new Array("/", "!", "=", ">", ")", "<", "(");
var tabOpeRubMuli = new Array("=", ":", "/", "<", ">", "*");
var tabOpeRubAlphaMono  = new Array(":", "/", "!", "=", "(", "<", ")", ">", "*");
var tabOpeRubFtx  = new Array("X");
var tabOpeRubBddSqlOnly  = new Array("0", "#");
var tabOpeRubMultiBddSqlOnly  = new Array("%", "~");
var tabOpeRubMonoBddSqlOnly  = new Array("~");

function getLibelleOperateur(sCodeOperateur, type)
{
    var sLibelle = "--";
    if (inAssocArray(sCodeOperateur, tabLibelleOperateur[type]))
        sLibelle = tabLibelleOperateur[type][sCodeOperateur];
    else
        sLibelle = tabLibelleOperateur["base"][sCodeOperateur];
    return sLibelle;
}


function inAssocArray(elem, array)
{
    for(var i in array)
    {
        if(i == elem){return true;}
    }
    return false;
} 