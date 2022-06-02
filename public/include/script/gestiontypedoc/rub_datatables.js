// JavaScript Document
// function debug(szMessage)
// {
// 	document.getElementById("infos").value += szMessage;
// }

var Dom = YAHOO.util.Dom;
var Event = YAHOO.util.Event;
var RecordSet = YAHOO.widget.RecordSet;

// rubriques disponibles
var dataTable;
// rubriques du type de document consulté
var dataTable2;
// rubriques du type de document consulté pour association
var dataTable3;
// rubriques du type de document cible pour association
var dataTable4;
// associations effectuées
var dataTable5;

// index de la ligne sélectionné dans le tableau des rubriques
var SelecteRowDatatable;
// index de la ligne sélectionné dans le tableau des rubriques dans le type
var SelecteRowDatatable2;

////////////////////////////////////////////////////////////////////////////////////////////////
//			Affichage et gestion de l'ajout d'une rubrique dans le type de document			  //							
////////////////////////////////////////////////////////////////////////////////////////////////

YAHOO.util.Event.addListener(window, "load", function() {
    
    YAHOO.example.Scrolling = new function() {
    
        // datatable des rubriques disponibles dans l'application
		dataTable = new YAHOO.widget.ScrollingDataTable("table-rubdipos", myColumnDefstmp, 
                        new YAHOO.util.DataSource(myDatatmp), {height: "260px", width:"710px", selectionMode:"single"});  
		
		dataTable.subscribe("rowMouseoverEvent", dataTable.onEventHighlightRow);
  		dataTable.subscribe("rowMouseoutEvent", dataTable.onEventUnhighlightRow);     
		dataTable.subscribe("rowClickEvent", function(ev) {
		    dataTable.onEventSelectRow(ev);
		    var target = ev.target;
		    record = this.getRecord(target);
		    SelecteRowDatatable = this.getTrIndex(record);
		    // szCodeRubCourant : variable globale
			szCodeRubCourant =  record.getData("code_rub");
			szLibelleRubCourant =  record.getData("libelle_rub");
			var tmpType = record.getData("type_rub");
			szTypeRubCourant =  record.getData("type_rub");
			if (record.getData("mono_rub") == "X")
				szMonoRubCourant = 1;
			else 
				szMonoRubCourant = 0;
			if (record.getData("domferme_rub") == "X")
				szDomFermeRubCourant = 1;
			else
				szDomFermeRubCourant = 0;	
		});              
              
// datatable des rubriques du type de document
		dataTable2 = new YAHOO.widget.ScrollingDataTable("table-rubdanstype", myColumnDefstmp2, 
                        new YAHOO.util.DataSource(myDatatmp2),{height: "250px", width:"880px"});
        
        // index de la ligne sélectionné
		
        
        dataTable2.subscribe("rowMouseoverEvent", dataTable2.onEventHighlightRow);
  		dataTable2.subscribe("rowMouseoutEvent", dataTable2.onEventUnhighlightRow);
		dataTable2.subscribe("rowClickEvent", dataTable2.onEventSelectRow);
		dataTable2.subscribe("rowDblclickEvent", function(ev) {
		    dataTable2.onEventSelectRow(ev);
		    var tabSelectedRows = dataTable2.getSelectedRows();
			// on est en sélection simple
			var szSelectedId = tabSelectedRows[0];
            SelecteRowDatatable2 = dataTable2.getTrIndex(szSelectedId); 
			var record = dataTable2.getRecord(SelecteRowDatatable2);
			szCodeRubCourant = record.getData("code_rub");
			szLibelleRubCourant =  record.getData("libelle_rub");			
			szTypeRubCourant =  record.getData("type_rub");
			szMonoRubCourant = 	record.getData("mono_rub");
			szDomFermeRubCourant = record.getData("domferme_rub");
			// Requête Ajax : récupère les attributs de la rubrique déjà dans le type document
			szModeParamRub = "mode_modification_rub";
			RecupTabAssociations();
			AfficheRubInType(szModeParamRub);
			dataTable2.unselectRow(SelecteRowDatatable2);
		    ouvrirPopUp("ajout_rub");   
		});
    };
});

// Gére l'ajout de la rubrique par le bouton
function AjoutRubFn()
{ 
	var j=0;       
	var record2 = dataTable2.getRecord(j);
	var bRubInTypeDoc = false;
    while (record2 != null)
    {
    	if (szCodeRubCourant == record2.getData("code_rub"))
		{					
			bRubInTypeDoc = true;
			break;
		}
		else				
		{	
		 	j++;
			record2 = dataTable2.getRecord(j);
		}	
	}
	if (bRubInTypeDoc == false)
	{   	
		szModeParamRub = "mode_ajout_rub";
		tabAssociationsRubCourant = new Array();
    	AfficheRubInType(szModeParamRub);
    	dataTable.unselectRow(SelecteRowDatatable);
		ouvrirPopUp("ajout_rub");
	}
	else
		alert(document.principal.MESSAGE_CODE_RUB_IDENTIQUE.value);
}

function SupprimeRubFn() 
{   
	var tabSelectedRows = dataTable2.getSelectedRows();
	// on est en sélection simple
	var szSelectedId = tabSelectedRows[0];
    var iPosition = dataTable2.getTrIndex(szSelectedId); 
	var record = dataTable2.getRecord(iPosition);
	var szCodeRubRowSupprim = record.getData("code_rub");
	dataTable2.deleteRow(iPosition);
	// suppression dans l'objet des rubriques à modifiées
	for(var szKeyRub in tabRubriquesModifiees)
	{
		if(szCodeRubRowSupprim == szKeyRub)				
		{	delete tabRubriquesModifiees[szKeyRub];
			break;
		}
	}									
	// ajout dans le tableau des rubriques à supprimer
	tabRubriquesSupprimees.push(szCodeRubRowSupprim);
	
	// suppression dans le tableau  des listes hiérarchiques
	for(var szKeyListeHier in tabRubListeHier)
	{
		for(var i=0; i<tabRubListeHier[szKeyListeHier].length; i++)
		{
			if(szCodeRubRowSupprim == tabRubListeHier[szKeyListeHier][i])
			{
				tabRubListeHier[szKeyListeHier].splice(i,1);
				break;
			}
		}
	}
	for(var i=0; i<myDatatmp2.length; i++)
	{	
		if(szCodeRubRowSupprim == myDatatmp2[i]["code_rub"])				
		{
			var iIndexSupprime = i;
			break;
		}
	}
	myDatatmp2.splice(iIndexSupprime,1);
	document.getElementById('nb_rubindoc').innerHTML = parseInt(document.getElementById('nb_rubindoc').innerHTML) - 1;	
}

// Gére l'ajout de la rubrique par le bouton
function ValideAjoutRubFn()
{ 
	if(document.principal.POS_CHECK_TYPE_CIBLE_RUB_AJOUT.checked == true
		&& document.principal.POS_TYPE_TYPE_CIBLE_RUB_AJOUT.options.selectedIndex == "")
		alert(document.principal.MESSAGE_TYPE_LIE_VIDE.value);

	else if (document.getElementById("bloc_association").style.display == "") 
		alert(document.principal.MESSAGE_PARAM_ASSO_INCOMPLET.value);	

	else if (document.principal.POS_CHECK_COMPTEUR.checked == true && document.principal.POS_VAL_ACT_COMPTEUR.value == "")
		alert(document.principal.MESSAGE_VAL_COMPTEUR_VIDE.value);

	else if (document.principal.POS_CHECK_INI_COMPTEUR.checked == true && document.principal.POS_VAL_INI_COMPTEUR.value == "")
		alert(document.principal.MESSAGE_VAL_COMPTEUR_INI_VIDE.value);
	else
	{
 		// mise à jour de tabRubriquesModifiees
 		ajoutTmpRubInType();
		
		if(szModeParamRub == "mode_ajout_rub")
		{
			var newRubInTypeDoc	= new Object();
	        newRubInTypeDoc["code_rub"] = szCodeRubCourant;
	        newRubInTypeDoc["libelle_rub"] = szLibelleRubCourant;
	        newRubInTypeDoc["indexee_rub"] = (tabRubriquesModifiees[szCodeRubCourant]["bIndexee"] == 1 )? "X": "";
			newRubInTypeDoc["modifiable_rub"] = (tabRubriquesModifiees[szCodeRubCourant]["bModifiable"] == 1 )? "X": "";
			newRubInTypeDoc["valeur_unique_rub"] = (tabRubriquesModifiees[szCodeRubCourant]["bMonoValeur"] == 1 )? "X": "";
			newRubInTypeDoc["obligatoire_rub"] =  (tabRubriquesModifiees[szCodeRubCourant]["wOblig"] >= 1 )? "X": "";
			newRubInTypeDoc["report_valeur_rub"] = (tabRubriquesModifiees[szCodeRubCourant]["bReport"] == 1 )? "X": "";
			newRubInTypeDoc["majuscule_rub"] = (tabRubriquesModifiees[szCodeRubCourant]["bMajuscule"] == 1 )? "X": "";
            newRubInTypeDoc["verrouillee_creation_rub"] = (tabRubriquesModifiees[szCodeRubCourant]["wReservee"] == 1 || 
                                                            tabRubriquesModifiees[szCodeRubCourant]["wReservee"] == 2) ? "X" : "";
            newRubInTypeDoc["verrouillee_modification_rub"] = (tabRubriquesModifiees[szCodeRubCourant]["wReservee"] == 1 || 
                                                            tabRubriquesModifiees[szCodeRubCourant]["wReservee"] == 3) ? "X" : "";
			newRubInTypeDoc["code_type_lie_rub"] = tabRubriquesModifiees[szCodeRubCourant]["szTypeLie"];
			newRubInTypeDoc["rub_lie_rub"] = 	tabRubriquesModifiees[szCodeRubCourant]["szRubLie"];
			newRubInTypeDoc["valeur_defaut_rub"] = tabRubriquesModifiees[szCodeRubCourant]["szDefaut"];
			newRubInTypeDoc["valeur_min_rub"] = tabRubriquesModifiees[szCodeRubCourant]["szMinimum"];
			newRubInTypeDoc["valeur_max_rub"] = tabRubriquesModifiees[szCodeRubCourant]["szMaximum"];
			newRubInTypeDoc["fulltext_rub"] = (tabRubriquesModifiees[szCodeRubCourant]["bFullTexte"] == 1 )? "X": "";
			newRubInTypeDoc["type_rub"] = szTypeRubCourant;
			newRubInTypeDoc["mono_rub"] = szMonoRubCourant;
			newRubInTypeDoc["domferme_rub"] = szDomFermeRubCourant;
               
			dataTable2.addRow(newRubInTypeDoc);
			myDatatmp2.push(newRubInTypeDoc);
			tabRubriquesAjoutees.push(szCodeRubCourant);
			
			document.getElementById('nb_rubindoc').innerHTML = parseInt(document.getElementById('nb_rubindoc').innerHTML) + 1;					
		}
        else
        {
            var record = dataTable2.getRecord(SelecteRowDatatable2);
            record.setData("indexee_rub", (tabRubriquesModifiees[szCodeRubCourant]["bIndexee"] == 1 )? "X": "");
			record.setData("modifiable_rub", (tabRubriquesModifiees[szCodeRubCourant]["bModifiable"] == 1 )? "X": "");
			record.setData("valeur_unique_rub", (tabRubriquesModifiees[szCodeRubCourant]["bMonoValeur"] == 1 )? "X": "");
			record.setData("obligatoire_rub",  (tabRubriquesModifiees[szCodeRubCourant]["wOblig"] >= 1 )? "X": "");
			record.setData("report_valeur_rub", (tabRubriquesModifiees[szCodeRubCourant]["bReport"] == 1 )? "X": "");
			record.setData("majuscule_rub", (tabRubriquesModifiees[szCodeRubCourant]["bMajuscule"] == 1 )? "X": "");
            record.setData("verrouillee_creation_rub", (tabRubriquesModifiees[szCodeRubCourant]["wReservee"] == 1 || 
                                                            tabRubriquesModifiees[szCodeRubCourant]["wReservee"] == 2) ? "X" : "");
            record.setData("verrouillee_modification_rub", (tabRubriquesModifiees[szCodeRubCourant]["wReservee"] == 1 || 
                                                            tabRubriquesModifiees[szCodeRubCourant]["wReservee"] == 3) ? "X" : "");
			record.setData("code_type_lie_rub", tabRubriquesModifiees[szCodeRubCourant]["szTypeLie"]);
			record.setData("rub_lie_rub", tabRubriquesModifiees[szCodeRubCourant]["szRubLie"]);
			record.setData("valeur_defaut_rub", tabRubriquesModifiees[szCodeRubCourant]["szDefaut"]);
			record.setData("valeur_min_rub", tabRubriquesModifiees[szCodeRubCourant]["szMinimum"]);
			record.setData("valeur_max_rub", tabRubriquesModifiees[szCodeRubCourant]["szMaximum"]);
			record.setData("fulltext_rub", (tabRubriquesModifiees[szCodeRubCourant]["bFullTexte"] == 1 )? "X": "");
            dataTable2.render();
            SelecteRowDatatable2 = -1;
        }
        
		document.getElementById('ajout_rub').style.display='none';
		afficheMasqueBloc('v2');
	}
}

function AnnuleAjoutRubFn()
{ 
	document.getElementById('ajout_rub').style.display='none';
	afficheMasqueBloc('v2');
}

////////////////////////////////////////////////////////////////////////////////////////////////
//			Affichage et gestion des associations de la gestion des rubriques				  //							
//////////////////////////////////////////////////////////////////////////////////////////////// 
YAHOO.util.Event.addListener("button_associations", "click", function() {
    
    YAHOO.example.Scrolling = new function() {
     
	 // datatable des rubriques du type courant
    dataTable3 = new YAHOO.widget.ScrollingDataTable("table-rub-source-assocations", myColumnDefstmp3, 
                        new YAHOO.util.DataSource(myDatatmp3), {height: "80px", width:"250px", selectionMode:"single"});  
						
	dataTable3.subscribe("rowMouseoverEvent", dataTable3.onEventHighlightRow);
  	dataTable3.subscribe("rowMouseoutEvent", dataTable3.onEventUnhighlightRow);     
	dataTable3.subscribe("rowClickEvent", function(ev) {
				dataTable3.onEventSelectRow(ev);
		
		var tabSelectedRows = dataTable3.getSelectedRows();
		// on est en sélection simple
		var szSelectedId = tabSelectedRows[0];
        var iPosition = dataTable3.getTrIndex(szSelectedId); 
		var record = dataTable3.getRecord(iPosition);
		var szCodeRubSource = record.getData("code_rub");
		// type de doc cible
		var selectElmt = document.getElementById("select_type_cible");
		var szTypeDocCible = selectElmt.options[selectElmt.selectedIndex].value;
		myDatatmp4.length = 0;
		// requête Ajax pour aller chercher les rubriques du type de document cible
		// en accord avec le type de la rubrique sélectionnée
		var szCodeRubSourceAssociee = record.getData("code_rub");
		var szTypeRubSourceAssociee = record.getData("type_rub");
		RecupListRubCibleAssociation(szTypeDocCible, szTypeRubSourceAssociee);
        
	// l'affectation de la datasource ne se fait avec la méthode suivante 
		//dataTable4.load(myDatatmp4);
	// 	donc on passe par la addRow mais à chaque requête il faut vider le tableau d'objet
 		dataTable4.initializeTable();
 		dataTable4.render(); 
		for(var i=0; i<myDatatmp4.length;i++)   
				dataTable4.addRow(myDatatmp4[i]);
	});
	
	 // datatable des rubriques du type cible
    dataTable4 = new YAHOO.widget.ScrollingDataTable("table-rub-cible-associations", myColumnDefstmp3, 
                    	new YAHOO.util.DataSource(myDatatmp4), {height: "80px", width:"250px", selectionMode:"single"});  
						
	dataTable4.subscribe("rowMouseoverEvent", dataTable4.onEventHighlightRow);
  	dataTable4.subscribe("rowMouseoutEvent", dataTable4.onEventUnhighlightRow);     
	dataTable4.subscribe("rowClickEvent", function(ev) {
				dataTable4.onEventSelectRow(ev);
	});
	
	// datatable des associations
	dataTable5 = new YAHOO.widget.ScrollingDataTable("table-associations", myColumnDefstmp5, 
                        new YAHOO.util.DataSource(myDatatmp5), {height: "80px", width:"500px", selectionMode:"single"});  
						
	dataTable5.subscribe("rowMouseoverEvent", dataTable5.onEventHighlightRow);
  	dataTable5.subscribe("rowMouseoutEvent", dataTable5.onEventUnhighlightRow);     
	dataTable5.subscribe("rowClickEvent", function(ev) {
				dataTable5.onEventSelectRow(ev);
	}); 
	
	// Gére la création d'une association
    var AjoutAssociationFn = function()
	{ 
	    var tabSelectedRowsCourant = dataTable3.getSelectedRows();
	    var tabSelectedRowsCible = dataTable4.getSelectedRows();
	  
	    if ( tabSelectedRowsCourant.length > 0 && tabSelectedRowsCible.length > 0)
	    {	
			var szSelectedIdCourant = tabSelectedRowsCourant[0];
	        var iPositionCourant = dataTable3.getTrIndex(szSelectedIdCourant); 
			var recordCourant = dataTable3.getRecord(iPositionCourant);
			var szCodeRubCourant = recordCourant.getData("code_rub");
			var j=0;
			var record = dataTable5.getRecord(j);
			var bRubInAssociation = false;
	        while (record != null)
	        {	
				if (szCodeRubCourant == record.getData("code_rub"))
				{
					bRubInAssociation = true;
					break;
				}
				else
				{
					j++;
					record = dataTable5.getRecord(j);
				}					
			}
			if (bRubInAssociation == false)
			{
				var szLibelleRubCourant = recordCourant.getData("libelle_rub");
							
				var szSelectedIdCible = tabSelectedRowsCible[0];
		        var iPositionCible = dataTable4.getTrIndex(szSelectedIdCible); 
				var recordCible = dataTable4.getRecord(iPositionCible);
				var szCodeRubCible = recordCible.getData("code_rub");
				var szLibelleRubCible = recordCible.getData("libelle_rub");
				
				
				var newAssociation= new Object();
		        newAssociation["code_rub"] = szCodeRubCourant;
		        newAssociation["libelle_rub"] = szLibelleRubCourant;
		        newAssociation["code_rub_cible"] = szCodeRubCible;
				newAssociation["libelle_rub_cible"] = szLibelleRubCible;
				   	            
				dataTable5.addRow(newAssociation);
			}
			else
				alert(document.principal.MESSAGE_CODE_RUB_ASSOCIEE.value);
			// sinon au réaffichage du bloc et association, ajoute plusieurs fois la même association
			dataTable3.unselectRow(iPositionCourant);
			dataTable4.unselectRow(iPositionCible);
		}
	}
        
	var btnAjoutAssociation = new YAHOO.widget.Button("AjoutAssociationButton");
    btnAjoutAssociation.on("click", AjoutAssociationFn);
    
    var SupprimeAssociationFn = function() 
	{
	 	var tabSelectedAssociation = dataTable5.getSelectedRows();
	    var szSelectedAssociation = tabSelectedAssociation[0];	
		var iPosition = dataTable5.getTrIndex(szSelectedAssociation); 		
		dataTable5.deleteRow(iPosition);	 
	}  	   
	var btnSupprimeAssociation = new YAHOO.widget.Button("SupprimeAssociationButton");
	    btnSupprimeAssociation.on("click", SupprimeAssociationFn);


    var ValideAssociationFn = function() 
	{
		var recordAssociation = dataTable5.getRecord(0);
	 	if (recordAssociation != null)
		{	
			document.principal.POS_CHECK_RECUP_FICHIER_ASSOCIATIONS.disabled=false;
		
			var objAsso;
			tabAssociationsRubCourant = new Array();
			var j=0; 
			var szCodeRubInit;
			var szCodeRubCible;
			var record = dataTable5.getRecord(j);
			while (record != null)
	        {	 	
	        	szCodeRubInit = record.getData("code_rub");
	        	szCodeRubCible = record.getData("code_rub_cible");
	        	objAsso  = new Object();
	        	objAsso[szCodeRubInit] = szCodeRubCible;
	        	tabAssociationsRubCourant.push(objAsso);
	        	j++;
	        	record = dataTable5.getRecord(j);
			}			
		}
		else
			document.principal.POS_CHECK_RECUP_FICHIER_ASSOCIATIONS.checked=false;
		
		SuppProtectionBlocAssociation();
		
	}    	    
	var btnValideAssociation = new YAHOO.widget.Button("ValideAssociationButton");
	    btnValideAssociation.on("click", ValideAssociationFn);


    var AnnuleAssociationFn = function() 
	{	
		var recordAssociation = dataTable5.getRecord(0);
	 	if (recordAssociation != null)	
			document.principal.POS_CHECK_RECUP_FICHIER_ASSOCIATIONS.disabled=false;
		else
			document.principal.POS_CHECK_RECUP_FICHIER_ASSOCIATIONS.checked=false;
		
		SuppProtectionBlocAssociation();		
	}     	    
	var btnAnnuleAssociation = new YAHOO.widget.Button("AnnuleAssociationButton");
	    btnAnnuleAssociation.on("click", AnnuleAssociationFn);
	    
	var SuppProtectionBlocAssociation = function()
	{
		// suppression de la protection des champs controlant l'association
		with (document.principal)
		{	
			POS_CHECK_TYPE_CIBLE_RUB_AJOUT.className='inputChamp';
			POS_CHECK_TYPE_CIBLE_RUB_AJOUT.readOnly=false;
			POS_CHECK_TYPE_CIBLE_RUB_AJOUT.disabled=false;
			
			POS_TYPE_TYPE_CIBLE_RUB_AJOUT.className='inputChamp';
			POS_TYPE_TYPE_CIBLE_RUB_AJOUT.readOnly=false;
			POS_TYPE_TYPE_CIBLE_RUB_AJOUT.disabled=false;
			
			POS_RUB_TYPE_CIBLE_RUB_AJOUT.className='inputChamp';
			POS_RUB_TYPE_CIBLE_RUB_AJOUT.readOnly=false;
			POS_RUB_TYPE_CIBLE_RUB_AJOUT.disabled=false;
			
			POS_BUTTON_ASSOCIATIONS.disabled = false;
			
			document.getElementById("bloc_association").style.display="none";
		}		
	}
    };
});
