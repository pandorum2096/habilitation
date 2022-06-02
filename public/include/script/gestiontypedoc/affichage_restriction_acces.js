// JavaScript Document

function afficheDivRestrictionAcces()
{
    actualiseElmtSelectRubRestAcces();
    GererControleRestAcces();
    ouvrirPopUp('rest_acces');
}


function actualiseElmtSelectRubRestAcces()
{
	with(document.principal)
	{
		var tabTypeRubPermis =['0'];
        var bAvecKH = 0;
		creationElmtSelectTypeDoc("id_rub_consult_index", POS_RUB_CONSULT_INDEX.value, "2", tabTypeRubPermis, bAvecKH);
		creationElmtSelectTypeDoc("id_rub_modif_index", POS_RUB_MODIF_INDEX.value, "2", tabTypeRubPermis, bAvecKH);
		creationElmtSelectTypeDoc("id_rub_modif_fichier", POS_RUB_MODIF_FICHIER.value, "2", tabTypeRubPermis, bAvecKH);
		creationElmtSelectTypeDoc("id_rub_supp_index",	POS_RUB_SUPP_INDEX.value, "2", tabTypeRubPermis, bAvecKH);
		creationElmtSelectTypeDoc("id_rub_supp_fichier", POS_RUB_SUPP_FICHIER.value, "2", tabTypeRubPermis, bAvecKH);			
		creationElmtSelectTypeDoc("id_rub_ajout_fils",	POS_RUB_AJOUT_FILS.value, "2", tabTypeRubPermis, bAvecKH);
		creationElmtSelectTypeDoc("id_rub_supp_fils", POS_RUB_SUPP_FILS.value, "2", tabTypeRubPermis, bAvecKH);
	}
}
// FONCTIONS DE CONTROLE RESTRICTION D'ACCES popup "rest_acces"

function GererControleRestAcces()
{
	with(document.principal)
	{ 
        var listeObjResctriction = ["POS_CTRL_CONSULT_INDEX", "POS_CTRL_MODIF_INDEX", "POS_CTRL_SUPP_INDEX", "POS_CTRL_MODIF_FICHIER", "POS_CTRL_SUPP_FICHIER", "POS_CTRL_AJOUT_FILS", "POS_CTRL_SUPP_FILS"]
		for (var cpt in  listeObjResctriction)
        {
            var szNomChamp = listeObjResctriction[cpt];
    		var ObjControl = eval(szNomChamp);
        	for(var i=0; i < ObjControl.length; i++)
    		{	
    			if (ObjControl[i].checked)
    			{ 
    				//POS_CTRL_MODIF_INDEX
    				var szValue=ObjControl[i].value;					
    				var szNomChampControlRub="POS_RUB_" + szNomChamp.substring(9);
    				if(szValue == 2)
    				{ 
    					eval(szNomChampControlRub).readOnly=false;
    					eval(szNomChampControlRub).disabled=false;
    					eval(szNomChampControlRub).className='inputChamp';										
    				}
    				else
    				{
    					eval(szNomChampControlRub).readOnly=true;
    					eval(szNomChampControlRub).disabled=true;
    					eval(szNomChampControlRub).className='verrouille';
                        eval(szNomChampControlRub).options.selectedIndex=0;
    				}	
    			}
    		}
        }
	}
}
	
function AnnuleRestrictionAcces()
{
    copyRestrictionAccesFromJSONToForm();
    document.getElementById('rest_acces').style.display='none';
}

function ValideRestrictionAcces()
{
	with(document.principal)
	{	
		if (POS_CTRL_CONSULT_INDEX[0].checked == true && POS_RUB_CONSULT_INDEX.options.selectedIndex == 0)
		{
			alert(MESSAGE_CONSULTATION_INDEX_RUB_VIDE.value);
		}
		else if (POS_CTRL_MODIF_INDEX[0].checked == true && POS_RUB_MODIF_INDEX.options.selectedIndex == 0)
		{
			alert(MESSAGE_MODIFICATION_INDEX_RUB_VIDE.value);
		}
		else if (POS_CTRL_MODIF_FICHIER[0].checked == true && POS_RUB_MODIF_FICHIER.options.selectedIndex == 0)
		{
			alert(MESSAGE_MODIFICATION_FICHIER_RUB_VIDE.value);
		}
		else if (POS_CTRL_SUPP_INDEX[0].checked == true && POS_RUB_SUPP_INDEX.options.selectedIndex == 0)
		{
			alert(MESSAGE_SUPPRESSION_INDEX_RUB_VIDE.value);
		}
		else if (POS_CTRL_SUPP_FICHIER[0].checked == true && POS_RUB_SUPP_FICHIER.options.selectedIndex == 0)
		{
			alert(MESSAGE_SUPPRESSION_FICHIER_RUB_VIDE.value);
		}
		else if (POS_CTRL_AJOUT_FILS[0].checked == true && POS_RUB_AJOUT_FILS.options.selectedIndex == 0)
		{
			alert(MESSAGE_AJOUT_FILS_RUB_VIDE.value);
		}
		else if (POS_CTRL_SUPP_FILS[0].checked == true && POS_RUB_SUPP_FILS.options.selectedIndex == 0)
		{
			alert(MESSAGE_SUPPRESSION_FILS_RUB_VIDE.value);
		}
		else if ((POS_CTRL_CONF_TYPE[1].checked == true ||  POS_CTRL_CONF_TYPE[2].checked == true)&& POS_HAB_CONF_TYPE.options.selectedIndex == 0)
		{
			alert(MESSAGE_HABILITATION_VIDE.value);
		}	
		else {
            copyRestrictionAccesFromFormToJSON();
        	document.getElementById('rest_acces').style.display='none';
        }
	}
}

function copyRestrictionAccesFromFormToJSON()
{
    var tabInfoRestrictionAcces = new Object();
    tabInfoRestrictionAcces["POS_CTRL_CONSULT_INDEX"] = getValueRadio(document.principal.POS_CTRL_CONSULT_INDEX);
    tabInfoRestrictionAcces["POS_RUB_CONSULT_INDEX"] = document.principal.POS_RUB_CONSULT_INDEX.value;
    tabInfoRestrictionAcces["POS_CTRL_MODIF_INDEX"] = getValueRadio(document.principal.POS_CTRL_MODIF_INDEX);
    tabInfoRestrictionAcces["POS_RUB_MODIF_INDEX"] = document.principal.POS_RUB_MODIF_INDEX.value;
    
    tabInfoRestrictionAcces["POS_CTRL_SUPP_INDEX"] = getValueRadio(document.principal.POS_CTRL_SUPP_INDEX);
    tabInfoRestrictionAcces["POS_RUB_SUPP_INDEX"] = document.principal.POS_RUB_SUPP_INDEX.value;
    
    tabInfoRestrictionAcces["POS_CTRL_MODIF_FICHIER"] = getValueRadio(document.principal.POS_CTRL_MODIF_FICHIER);
    tabInfoRestrictionAcces["POS_RUB_MODIF_FICHIER"] = document.principal.POS_RUB_MODIF_FICHIER.value;
    
    tabInfoRestrictionAcces["POS_CTRL_SUPP_FICHIER"] = getValueRadio(document.principal.POS_CTRL_SUPP_FICHIER);
    tabInfoRestrictionAcces["POS_RUB_SUPP_FICHIER"] = document.principal.POS_RUB_SUPP_FICHIER.value;
    
    tabInfoRestrictionAcces["POS_CTRL_AJOUT_FILS"] = getValueRadio(document.principal.POS_CTRL_AJOUT_FILS);
    tabInfoRestrictionAcces["POS_RUB_AJOUT_FILS"] = document.principal.POS_RUB_AJOUT_FILS.value;
    
    tabInfoRestrictionAcces["POS_CTRL_SUPP_FILS"] = getValueRadio(document.principal.POS_CTRL_SUPP_FILS);
    tabInfoRestrictionAcces["POS_RUB_SUPP_FILS"] = document.principal.POS_RUB_SUPP_FILS.value;
    
	tabInfoRestrictionAcces["POS_RESTRICTION_QUESTION"] = document.principal.POS_RESTRICTION_QUESTION.value;
    tabInfoRestrictionAcces["POS_CTRL_CONF_TYPE"] = getValueRadio(document.principal.POS_CTRL_CONF_TYPE);
    tabInfoRestrictionAcces["POS_HAB_CONF_TYPE"] = document.principal.POS_HAB_CONF_TYPE.value;
	tabInfoRestrictionAcces["POS_NIV_CONF_TYPE"] = document.principal.POS_NIV_CONF_TYPE.value;
	tabInfoRestrictionAcces["POS_CLOIS_CONF_TYPE"] = document.principal.POS_CLOIS_CONF_TYPE.value;
    YAHOO.lang.JSON.useNativeStringify = false;
    document.principal.POS_RESTACCES_JSON_STRING.value = YAHOO.lang.JSON.stringify(tabInfoRestrictionAcces);
    //alert(document.principal.POS_RESTACCES_JSON_STRING.value);
}

function copyRestrictionAccesFromJSONToForm()
{
    var tabInfoRestrictionAcces = YAHOO.lang.JSON.parse(document.principal.POS_RESTACCES_JSON_STRING.value);
    setValueRadio(document.principal.POS_CTRL_CONSULT_INDEX, tabInfoRestrictionAcces["POS_CTRL_CONSULT_INDEX"]);
    document.principal.POS_RUB_CONSULT_INDEX.value = tabInfoRestrictionAcces["POS_RUB_CONSULT_INDEX"];
    
    setValueRadio(document.principal.POS_CTRL_MODIF_INDEX, tabInfoRestrictionAcces["POS_CTRL_MODIF_INDEX"]);
    document.principal.POS_RUB_MODIF_INDEX.value = tabInfoRestrictionAcces["POS_RUB_MODIF_INDEX"];
    
    setValueRadio(document.principal.POS_CTRL_SUPP_INDEX, tabInfoRestrictionAcces["POS_CTRL_SUPP_INDEX"]);
    document.principal.POS_RUB_SUPP_INDEX.value = tabInfoRestrictionAcces["POS_RUB_SUPP_INDEX"];
    
    setValueRadio(document.principal.POS_CTRL_MODIF_FICHIER, tabInfoRestrictionAcces["POS_CTRL_MODIF_FICHIER"]);
    document.principal.POS_RUB_MODIF_FICHIER.value = tabInfoRestrictionAcces["POS_RUB_MODIF_FICHIER"];
    
    setValueRadio(document.principal.POS_CTRL_SUPP_FICHIER, tabInfoRestrictionAcces["POS_CTRL_SUPP_FICHIER"]);
    document.principal.POS_RUB_SUPP_FICHIER.value = tabInfoRestrictionAcces["POS_RUB_SUPP_FICHIER"];
    
    setValueRadio(document.principal.POS_CTRL_AJOUT_FILS, tabInfoRestrictionAcces["POS_CTRL_AJOUT_FILS"]);
    document.principal.POS_RUB_AJOUT_FILS.value = tabInfoRestrictionAcces["POS_RUB_AJOUT_FILS"];
    
    setValueRadio(document.principal.POS_CTRL_SUPP_FILS, tabInfoRestrictionAcces["POS_CTRL_SUPP_FILS"]);
    document.principal.POS_RUB_SUPP_FILS.value = tabInfoRestrictionAcces["POS_RUB_SUPP_FILS"];
    
	document.principal.POS_RESTRICTION_QUESTION.value = tabInfoRestrictionAcces["POS_RESTRICTION_QUESTION"];
    setValueRadio(document.principal.POS_CTRL_CONF_TYPE, tabInfoRestrictionAcces["POS_CTRL_CONF_TYPE"]);
    document.principal.POS_HAB_CONF_TYPE.value= tabInfoRestrictionAcces["POS_HAB_CONF_TYPE"];
	document.principal.POS_NIV_CONF_TYPE.value = tabInfoRestrictionAcces["POS_NIV_CONF_TYPE"];
	document.principal.POS_CLOIS_CONF_TYPE.value = tabInfoRestrictionAcces["POS_CLOIS_CONF_TYPE"];
}
		
function GererConfType(iValue)
{
	with(document.principal)
	{	
		if(iValue != 0)
		{
			POS_NIV_CONF_TYPE.className='inputChamp';
			POS_CLOIS_CONF_TYPE.className='inputChamp';
			POS_HAB_CONF_TYPE.className='inputChamp';
			POS_NIV_CONF_TYPE.readOnly=false;
			POS_CLOIS_CONF_TYPE.readOnly=false;
			POS_HAB_CONF_TYPE.disabled=false;
		}
		else
		{
			POS_NIV_CONF_TYPE.className='verrouille';
			POS_CLOIS_CONF_TYPE.className='verrouille';
			POS_HAB_CONF_TYPE.className='verrouille';
			POS_NIV_CONF_TYPE.readOnly=true;
			POS_CLOIS_CONF_TYPE.readOnly=true;
			POS_HAB_CONF_TYPE.disabled=true;
			POS_HAB_CONF_TYPE.options.selectedIndex=0;
		}	
							
	}
}
