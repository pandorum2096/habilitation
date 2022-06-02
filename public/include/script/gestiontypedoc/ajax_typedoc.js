//Gets the browser specific XmlHttpRequest Object
function getXmlHttpRequestObject() {	
	
	if (window.XMLHttpRequest) {
	
		return new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} 
}

// Our XmlHttpRequest object
var searchReq = getXmlHttpRequestObject();

//Starts the AJAX request.
function RecupListRubCibleAssociation(typedoccible, typerubsourceassociee) 
{   
	if (searchReq.readyState == 4 || searchReq.readyState == 0)
	{ 
	   	searchReq.open("GET", '../../../../interface/session/principal/ajax/recup_listrubcible_association_typedoc.php?TYPEDOC=' + typedoccible + "&TYPERUB=" + typerubsourceassociee, false);
		
		searchReq.send(null);
		if (searchReq.readyState == 4 || searchReq.readyState == 0)
		{  
 		    var objAction = eval('(' + searchReq.responseText + ')');
			if (objAction.code_retour == 1)
        	{		
				for(var i=0; i<objAction.LstRubCblAsso.length; i++) 
				{
					for(var key in objAction.LstRubCblAsso[i])
					{
						myDatatmp4[i] = new Object();
						myDatatmp4[i]["code_rub"] = key;
						myDatatmp4[i]["libelle_rub"] = objAction.LstRubCblAsso[i][key];
					}	
	 			}
			}
			else 
				alert(objAction.msg_erreur);	
		}
    }
}

function RecupListValAssociation(typedoccible, coderubsource) 
{
	if (searchReq.readyState == 4 || searchReq.readyState == 0)
	{ 
	   	searchReq.open("GET", '../../../../interface/session/principal/ajax/recup_listvaleur_association_typedoc.php?TYPEDOC=' + typedoccible + "&CODERUB=" + coderubsource, false);
	
		searchReq.send(null);
		if (searchReq.readyState == 4 || searchReq.readyState == 0)
		{  
 		    var objAction = eval('(' + searchReq.responseText + ')');
 		    if (objAction.code_retour == 1)
        	{		
				for(var i=0; i<objAction.LstRubValAsso.length; i++) 					
					tabAssociationsRubCourant.push(objAction.LstRubValAsso[i]);
			}
			else
				alert(objAction.msg_erreur);
		}
    }
}

function RecupRubTypedoc(typedoc, typerubsource, bAvecCleHier) 
{   
	if (searchReq.readyState == 4 || searchReq.readyState == 0)
	{
        var sUrlRubInType = '../../../../interface/session/principal/ajax/recup_rub_typedoc.php?TYPEDOC=' + typedoc + "&TYPERUB=" + typerubsource;
        if (bAvecCleHier == 1)
            sUrlRubInType += "&AVECKH=1";
	   	searchReq.open("GET", sUrlRubInType, false);
		searchReq.send(null);
		if (searchReq.readyState == 4 || searchReq.readyState == 0)
		{ 
 		    var objAction = eval('(' + searchReq.responseText + ')');	
 		    if (objAction.code_retour == 1)
        	{	
	 		    var selection = document.getElementById('select_rub_cible');
                selection.options.length = 0;
	 		    // création des valeurs de la liste déroulante spécifique du type de document
	        	for(var i = 0; i<objAction.ListeRub.length; i++)
	        	{							
                    selection.options[selection.options.length] = new Option(objAction.ListeRub[i],
                            objAction.ListeRub[i], false, false);
				}
			}
			else
				alert(objAction.msg_erreur);		
		}
    }
}

function RecupAttributsRubInTypeModification(typedoccible, coderubsource) 
{
    var tabInfoRubInType;
	if (searchReq.readyState == 4 || searchReq.readyState == 0)
	{ 
	   	searchReq.open("GET", '../../../../interface/session/principal/ajax/recup_rubintype_attributs_typedoc.php?TYPEDOC=' + typedoccible + "&CODERUB=" + coderubsource,false);
		searchReq.send(null);
		if (searchReq.readyState == 4 || searchReq.readyState == 0)
		{  
 		    var objAction = eval('(' + searchReq.responseText + ')');
            // ATTENTION : MAJ variables globales 
			if (objAction.code_retour == 1)
        	{	
                tabInfoRubInType = objAction["ListeRubInTypeAttributs"];	
				
				//case à cocher type cible
				if(objAction["ListeRubInTypeAttributs"]["bLierDep"] == 1)	
				{
                    document.getElementById('select_type_cible').value = objAction["ListeRubInTypeAttributs"]["szTypeLie"];							
					
                    // création des valeurs de la liste déroulante spécifique du type de document
                    if (objAction["ListeRubInTypeAttributs"]["szTypeLie"].length != 0)
                    {
                        var bAvecCleHier = 1;
                        RecupRubTypedoc( objAction["ListeRubInTypeAttributs"]["szTypeLie"], szTypeRubCourant, bAvecCleHier);
                        document.getElementById('select_rub_cible').value = objAction["ListeRubInTypeAttributs"]["szRubLie"];
					    }
                    }                   
		 		    
				if (objAction["ListeRubInTypeAttributs"]["bMajuscule"] == 1)
					checkedMajuscule = true;
				else 
					checkedMajuscule = false;
			
				// obligatoire
				valueRubOblig = objAction["ListeRubInTypeAttributs"]["wOblig"];
				
				// Liste hiérarchique
				valueSelectedCodeListHier = objAction["ListeRubInTypeAttributs"]["szCodeListeHier"];
				var selectionListHier = document.getElementById('select_code_listhier');							
				for (var i=0; i<selectionListHier.options.length; i++){
					if (selectionListHier.options[i].value == valueSelectedCodeListHier)
						selectionListHier.options[i].selected = true;
				}				
				valueSelectedRubListHier = objAction["ListeRubInTypeAttributs"]["szCodePereHier"];
				if(typeof(tabRubListeHier[valueSelectedCodeListHier]) == 'undefined')
                    RecupCodeRubMere(document.principal.POS_CODE_TYPEDOC.value, valueSelectedCodeListHier);		
                
                // création des valeurs de rubrique de la liste  déroulante spécifique de la liste hiérarchique
				var selectionRubMere = document.getElementById('select_code_rubmere');
				selectionRubMere.options.length = 0;
	        	for(var i = 0; i<tabRubListeHier[valueSelectedCodeListHier].length; i++)
	        	{
                    if (szCodeRubCourant != tabRubListeHier[valueSelectedCodeListHier][i])	        					
                        selectionRubMere.options[selectionRubMere.options.length] = new Option(tabRubListeHier[valueSelectedCodeListHier][i],
                            tabRubListeHier[valueSelectedCodeListHier][i], false, 
                            (tabRubListeHier[valueSelectedCodeListHier][i] == valueSelectedRubListHier) ? true : false);
				}
				// contrôle liste hiérarchique
				if(valueSelectedCodeListHier !="")
				{		
					disabledCtrlListHier = false;
					if(objAction["ListeRubInTypeAttributs"]["bNoControleListeHier"] == 1)
						checkedCtrlListHier = true;
				}
				
				// valeur Min Max			
				valueMin = objAction["ListeRubInTypeAttributs"]["szMinimum"];
				valueMax = objAction["ListeRubInTypeAttributs"]["szMaximum"];
				
				if (objAction["ListeRubInTypeAttributs"]["bDefaut"] == 1)			
					valueValDefaut = objAction["ListeRubInTypeAttributs"]["szDefaut"];
	
				// compteur
			 	valueActCompteur = objAction.Compteur;		 	
                tabInfoRubInType["Compteur"] = objAction.Compteur;
				if (valueActCompteur != "")
				{ 
					checkCompteur = true;
					classValActCompteur = "inputChamp";
					readonlyValActCompteur = false;
					disabledIniCompteur = false;
					
					classValDefaut = "verrouille";
					readonlyValDefaut = true;
					
					var exp = new RegExp("^AUTO_RAZ_ANNEE\\([0-9]+\\)$","g");
					if (exp.test(valueValDefaut))
					{	
						var lgValueValDefaut = valueValDefaut.length;
						checkIniCompteur = true;
						classIniCompteur = "inputChamp";
						readonlyIniCompteur = false;
						valueIniCompteur = valueValDefaut.substring(15,lgValueValDefaut -1);
					}
					
					disabledCodeListHier = true;
					disabledCtrlListHier = true;
					checkedCtrlListHier = false;				
				}	
			}
			else
				alert(objAction.msg_erreur);		
		}
    }
    return tabInfoRubInType;
}

function RecupCodeRubMere(typedoc, listhier) 
{
	if (searchReq.readyState == 4 || searchReq.readyState == 0)
	{ 
	   	searchReq.open("GET", '../../../../interface/session/principal/ajax/recup_rubmere_listhier_typedoc.php?TYPEDOC=' + typedoc + "&LISTHIER=" + listhier, false);
		searchReq.send(null);
		if (searchReq.readyState == 4 || searchReq.readyState == 0)
		{ 
			//alert(searchReq.responseText);
 		    var objAction = eval('(' + searchReq.responseText + ')');	
 		    if (objAction.code_retour == 1)
        	{
	 		    tabRubListeHier[listhier] = new Array();
	 		    // création des valeurs de la liste déroulante spécifique du type de document
	        	for(var i = 0; i<objAction.ListeRub.length; i++)	
					tabRubListeHier[listhier][i] = 	objAction.ListeRub[i];
			}
			else
				alert(objAction.msg_erreur);								 	
		}
    }
}

function RecupCleHier(typedoc) 
{
	if (searchReq.readyState == 4 || searchReq.readyState == 0)
	{ 
	   	searchReq.open("GET", '../../../../interface/session/principal/ajax/recup_typedoc_cle_hier.php?TYPEDOC=' + typedoc,false);
	
		searchReq.send(null);
		if (searchReq.readyState == 4 || searchReq.readyState == 0)
		{  
 		    var objAction = eval('(' + searchReq.responseText + ')');
 		    if (objAction.code_retour == 1)
        	{
				tabCleHier = objAction["CleHier"];
			}
			else
				alert(objAction.msg_erreur);	
		}
    }
}

