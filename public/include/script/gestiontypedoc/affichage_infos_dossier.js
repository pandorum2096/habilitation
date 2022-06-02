

function afficheDivInfosDossier()
{
    actualiseElmtSelectRubInfosDossier();
    actualiseElmtSelectToutesRub();
    GererControleInfosDossier();
    ouvrirPopUp('infos_dossier');
}

// JavaScript Document
// 	"0" ALPHA,
// 	"1" ENTIER,
// 	"2" DATE,
// 	"3" TABLEAU,
// 	"4" DECIMAL
function actualiseElmtSelectRubInfosDossier()
{
	with(document.principal)
	{
			var tabTypeRubPermis =['0', '1', '2', '4'];
            var bAvecKH = 1;
			creationElmtSelectTypeDoc("id_rub_titre_dossier", POS_RUB_TITRE_DOSSIER.value, "2", tabTypeRubPermis, bAvecKH);
			creationElmtSelectTypeDoc("id_rub_val_selection_fils", POS_RUB_VAL_SELECTION_FILS.value, "2", tabTypeRubPermis, bAvecKH);
			tabTypeRubPermis =['0'];
            bAvecKH = 0;
			creationElmtSelectTypeDoc("id_rub_code_type_pere", POS_RUB_CODE_TYPE_PERE.value, "2", tabTypeRubPermis, bAvecKH);
	}
}
// FONCTIONS DE CONTROLE RESTRICTION D'ACCES popup "infos_dossiers"
function GererControleInfosDossier()
{
	with(document.principal)
	{
		if(POS_CHECK_TYPE_DOSSIER.checked)
		{	
			POS_RUB_TITRE_DOSSIER.disabled = false;
            POS_RUB_TITRE_DOSSIER.className = 'inputChamp';
			POS_CHECK_DOSSIER_REF.disabled = false;
            POS_CHECK_DOSSIER_REF.className = 'inputChamp';
		}
		else
		{
			POS_RUB_TITRE_DOSSIER.disabled = true;
            POS_RUB_TITRE_DOSSIER.className = 'verrouille';
			POS_RUB_TITRE_DOSSIER.options.selectedIndex = 0;
			POS_CHECK_DOSSIER_REF.checked = false;
			POS_CHECK_DOSSIER_REF.disabled = true;
            POS_CHECK_DOSSIER_REF.className = 'verrouille';
		}
        
        if(POS_CHECK_INSERTION_AUTO.checked)
		{	
			POS_RUB_CODE_TYPE_PERE.disabled = false;
            POS_RUB_CODE_TYPE_PERE.className = 'inputChamp';
			POS_RUB_VAL_SELECTION_FILS.disabled = false;
            POS_RUB_VAL_SELECTION_FILS.className = 'inputChamp';
			POS_CHECK_SELECTION_CHAQUE_MOT.disabled = false;
            POS_CHECK_SELECTION_CHAQUE_MOT.className = 'inputChamp';
			POS_RUB_VAL_SELECTION_PERE.disabled = false;
            POS_RUB_VAL_SELECTION_PERE.className = 'inputChamp';
			POS_CHECK_TEST_EXIST_PERE.disabled = false;
            POS_CHECK_TEST_EXIST_PERE.className = 'inputChamp';
			POS_CHECK_MAJ_INSERTION_DOSSIER.disabled = false;
            POS_CHECK_MAJ_INSERTION_DOSSIER.className = 'inputChamp';
		}
		else
		{
			POS_RUB_CODE_TYPE_PERE.disabled = true;
            POS_RUB_CODE_TYPE_PERE.className = 'verrouille';
			POS_RUB_CODE_TYPE_PERE.options.selectedIndex = 0;
			POS_RUB_VAL_SELECTION_FILS.disabled = true;
			POS_RUB_VAL_SELECTION_FILS.options.selectedIndex = 0;
            POS_RUB_VAL_SELECTION_FILS.className = 'verrouille';
            
			POS_CHECK_SELECTION_CHAQUE_MOT.checked = false;
			POS_CHECK_SELECTION_CHAQUE_MOT.disabled = true;
            POS_CHECK_SELECTION_CHAQUE_MOT.className = 'verrouille';
            
			POS_RUB_VAL_SELECTION_PERE.options.selectedIndex = 0;
			POS_RUB_VAL_SELECTION_PERE.disabled = true;
            POS_RUB_VAL_SELECTION_PERE.className = 'verrouille';
            
			POS_CHECK_TEST_EXIST_PERE.checked = false;
			POS_CHECK_TEST_EXIST_PERE.disabled = true;
            POS_CHECK_TEST_EXIST_PERE.className = 'verrouille';
			POS_CHECK_MAJ_INSERTION_DOSSIER.checked = false;
			POS_CHECK_MAJ_INSERTION_DOSSIER.disabled = true;
            POS_CHECK_MAJ_INSERTION_DOSSIER.className = 'verrouille';
		}
	}
}




function AnnuleInfosDossier()
{
    copyInfoDossierFromJSONToForm();
    document.getElementById('infos_dossier').style.display='none';
}

function ValideInfosDossier()
{
	with(document.principal)
	{	
		if (POS_CHECK_INSERTION_AUTO.checked == true
			&& (POS_RUB_CODE_TYPE_PERE.options.selectedIndex == 0 || POS_RUB_VAL_SELECTION_FILS.options.selectedIndex == 0
				|| POS_RUB_VAL_SELECTION_PERE.options.selectedIndex == 0 ))
		{			
			alert(MESSAGE_RUB_INVALIDE_INFOS_DOSSIER.value);
		}		
		else
        {
		    copyInfoDossierFromFormToJSON();
        	document.getElementById('infos_dossier').style.display='none';
        }
	}
}

function copyInfoDossierFromFormToJSON()
{
    var tabInfoDossier = new Object();
    if (document.principal.POS_CHECK_TYPE_DOSSIER.checked)
        tabInfoDossier["POS_CHECK_TYPE_DOSSIER"] = document.principal.POS_CHECK_TYPE_DOSSIER.value;
    
    tabInfoDossier["POS_RUB_TITRE_DOSSIER"] = document.principal.POS_RUB_TITRE_DOSSIER.value;
    if (document.principal.POS_CHECK_DOSSIER_REF.checked)
        tabInfoDossier["POS_CHECK_DOSSIER_REF"] = document.principal.POS_CHECK_DOSSIER_REF.value;

    if (document.principal.POS_CHECK_INSERTION_AUTO.checked)
        tabInfoDossier["POS_CHECK_INSERTION_AUTO"] = document.principal.POS_CHECK_INSERTION_AUTO.value;
    tabInfoDossier["POS_RUB_CODE_TYPE_PERE"] = document.principal.POS_RUB_CODE_TYPE_PERE.value;
    tabInfoDossier["POS_RUB_VAL_SELECTION_FILS"] = document.principal.POS_RUB_VAL_SELECTION_FILS.value;


    if (document.principal.POS_CHECK_SELECTION_CHAQUE_MOT.checked)
        tabInfoDossier["POS_CHECK_SELECTION_CHAQUE_MOT"] = document.principal.POS_CHECK_SELECTION_CHAQUE_MOT.value;
    tabInfoDossier["POS_RUB_VAL_SELECTION_PERE"] = document.principal.POS_RUB_VAL_SELECTION_PERE.value;
    
    if (document.principal.POS_CHECK_TEST_EXIST_PERE.checked)
        tabInfoDossier["POS_CHECK_TEST_EXIST_PERE"] = document.principal.POS_CHECK_TEST_EXIST_PERE.value;

    if (document.principal.POS_CHECK_MAJ_INSERTION_DOSSIER.checked)
        tabInfoDossier["POS_CHECK_MAJ_INSERTION_DOSSIER"] = document.principal.POS_CHECK_MAJ_INSERTION_DOSSIER.value;

    YAHOO.lang.JSON.useNativeStringify = false;
    document.principal.POS_INFOSDOSSIER_JSON_STRING.value = YAHOO.lang.JSON.stringify(tabInfoDossier);
    //alert(document.principal.POS_INFOSDOSSIER_JSON_STRING.value);
}

function copyInfoDossierFromJSONToForm()
{
    var tabInfoDossier = YAHOO.lang.JSON.parse(document.principal.POS_INFOSDOSSIER_JSON_STRING.value);
    document.principal.POS_CHECK_TYPE_DOSSIER.checked = (tabInfoDossier["POS_CHECK_TYPE_DOSSIER"]) ? true : false;
    document.principal.POS_RUB_TITRE_DOSSIER.value = tabInfoDossier["POS_RUB_TITRE_DOSSIER"];
    document.principal.POS_CHECK_DOSSIER_REF.checked = (tabInfoDossier["POS_CHECK_DOSSIER_REF"]) ? true : false;
    document.principal.POS_CHECK_INSERTION_AUTO.checked = (tabInfoDossier["POS_CHECK_INSERTION_AUTO"] ) ? true : false;
    document.principal.POS_RUB_CODE_TYPE_PERE.value = tabInfoDossier["POS_RUB_CODE_TYPE_PERE"];
    document.principal.POS_RUB_VAL_SELECTION_FILS.value = tabInfoDossier["POS_RUB_VAL_SELECTION_FILS"];
    document.principal.POS_CHECK_SELECTION_CHAQUE_MOT.checked = (tabInfoDossier["POS_CHECK_SELECTION_CHAQUE_MOT"]) ? true : false;
    document.principal.POS_RUB_VAL_SELECTION_PERE.value = tabInfoDossier["POS_RUB_VAL_SELECTION_PERE"];
    document.principal.POS_CHECK_TEST_EXIST_PERE.checked = (tabInfoDossier["POS_CHECK_TEST_EXIST_PERE"]) ? true : false;
    document.principal.POS_CHECK_MAJ_INSERTION_DOSSIER.checked = ( tabInfoDossier["POS_CHECK_MAJ_INSERTION_DOSSIER"]) ? true : false;
}