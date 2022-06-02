// JavaScript Document
// FONCTIONS DE CREATION DES LISTES DE RUBRIQUES DU TYPEDOC DES SELECT
// à partir de 
// 	- soit toutes les rubriques de l'application (objet myDatatmp)
//	- soit les rubriques du document courant (objet myDatatmp2)
// types de rubriques :
// 	"0" ALPHA,
// 	"1" ENTIER,
// 	"2" DATE,
// 	"3" TABLEAU,
// 	"4" DECIMAL

function creationElmtSelectTypeDoc(id, szSelectedValue, iTypeActutRub, tabTypeRubPermis, bAvecKH)
{	
	var tabRub;		
	if(iTypeActutRub == "1")
		tabRub = myDatatmp;
	else if (iTypeActutRub == "2")
		tabRub = myDatatmp2;
		
	var selectionListe = document.getElementById(id);
	// suppression pour actualisation
	selectionListe.options.length = 0;
    
    var element = new Option("","", false, (szSelectedValue == "") ? true :false);
    selectionListe.options[selectionListe.options.length] = element;
	for(var i=0; i<tabRub.length;i++)
	{ 			
		for (var j=0; j<tabTypeRubPermis.length;j++)
		{
			if (tabRub[i]["type_rub"] == tabTypeRubPermis[j])
			{
				element = new Option(tabRub[i]["code_rub"] + " - " + tabRub[i]["libelle_rub"],
                            tabRub[i]["code_rub"], false, (szSelectedValue == tabRub[i]["code_rub"]) ? true : false);
                selectionListe.options[selectionListe.options.length] = element;			
			    break;
			}			
		}
	}
    if (bAvecKH)
    {
        var elementKh = new Option(document.principal.CODE_RUB_CLEHIER.value  + " - " + document.principal.LIBELLE_RUB_CLEHIER.value, 
                        document.principal.CODE_RUB_CLEHIER.value, false, 
                        (szSelectedValue == document.principal.CODE_RUB_CLEHIER.value) ? true :false);
        selectionListe.options[selectionListe.options.length] = elementKh;
    }
}

function actualiseElmtSelectToutesRub()
{
	with(document.principal)
	{
		var tabTypeRubPermis =['0', '1', '2', '4'];
        var bAvecKH = 1;
		creationElmtSelectTypeDoc("id_rub_val_selection_pere", POS_RUB_VAL_SELECTION_PERE.value, "1", tabTypeRubPermis, bAvecKH);
	}
}
