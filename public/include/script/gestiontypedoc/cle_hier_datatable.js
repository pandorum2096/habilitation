// JavaScript Document
// function debug(szMessage)
// {
// 	document.getElementById("infos").value += szMessage;
// }

var Dom = YAHOO.util.Dom;
var Event = YAHOO.util.Event;
var RecordSet = YAHOO.widget.RecordSet;

// clés hiérarchiques
var dataTable6;

////////////////////////////////////////////////////////////////////////////////////////////////
//			Affichage clés hiérarchiques		  											  //							
////////////////////////////////////////////////////////////////////////////////////////////////
YAHOO.util.Event.addListener("button_cle_hier", "click", function() {
    
    YAHOO.example.Scrolling = new function() {
     
	 // datatable des rubriques du type courant
    dataTable6 = new YAHOO.widget.ScrollingDataTable("table-typedoc-cle-hier", myColumnDefstmp6, 
                        new YAHOO.util.DataSource(myDatatmp6), {height: "100px", width:"700px", selectionMode:"single"});  
						
	dataTable6.subscribe("rowMouseoverEvent", dataTable6.onEventHighlightRow);
  	dataTable6.subscribe("rowMouseoutEvent", dataTable6.onEventUnhighlightRow);     
	dataTable6.subscribe("rowClickEvent", dataTable6.onEventSelectRow);
		
	var tabSelectedZone;
	var szRecordSelectedZone;
	var iIndexSelectedRowZone;
	var bProtectionBlocCleHier;
	
	var GereProtectionBlocCleHier = function(bprotect)
	{
		if(bprotect == true)
		{
			dataTable6.disable();
			btnInsereZone.set("disabled", true);
			btnModifieZone.set("disabled", true);
			btnSupprimeZone.set("disabled", true);
			btnValideCleHier.set("disabled", true);
			btnAnnuleCleHier.set("disabled", true);
			document.principal.POS_SEPARATEUR_KH.readOnly = true;
			document.principal.POS_SEPARATEUR_KH.className = "verrouille";
			
		}
		else
		{
			dataTable6.undisable();
			btnInsereZone.set("disabled", false);
			btnModifieZone.set("disabled", false);
			btnSupprimeZone.set("disabled", false);
			btnValideCleHier.set("disabled", false);
			btnAnnuleCleHier.set("disabled", false);
			document.principal.POS_SEPARATEUR_KH.readOnly = false;
			document.principal.POS_SEPARATEUR_KH.className = "inputChamp";
		}
	}
	
	var InsereZoneFn = function() 
	{
		tabSelectedZone	= dataTable6.getSelectedRows();
		szRecordSelectedZone = tabSelectedZone[0];
		iIndexSelectedRowZone = dataTable6.getTrIndex(szRecordSelectedZone);
	 	if (iIndexSelectedRowZone == null )
	 		iIndexSelectedRowZone = 0;
		szModeParamZone = "mode_ajout_zone";	
		AfficheValeurZoneCleHier(szModeParamZone, iIndexSelectedRowZone);		
		bProtectionBlocCleHier = true;		
		GereProtectionBlocCleHier(bProtectionBlocCleHier);
		document.getElementById("bloc_zone_cle_hier").style.display="";
	}    	    
	var btnInsereZone = new YAHOO.widget.Button("InsereZoneButton");
	    btnInsereZone.on("click", InsereZoneFn);
	
	var ModifieZoneFn = function() 
	{	
		tabSelectedZone	= dataTable6.getSelectedRows();
		szRecordSelectedZone = tabSelectedZone[0];
		iIndexSelectedRowZone = dataTable6.getTrIndex(szRecordSelectedZone);

	 	if (iIndexSelectedRowZone != null && (parseInt(iIndexSelectedRowZone) + 1) !=  myDatatmp6.length)
		{
			szModeParamZone = "mode_modification_zone";
			AfficheValeurZoneCleHier(szModeParamZone, iIndexSelectedRowZone);			
			bProtectionBlocCleHier = true;
			GereProtectionBlocCleHier(bProtectionBlocCleHier);
			document.getElementById("bloc_zone_cle_hier").style.display="";
		}
		else
		{
			alert(document.principal.MESSAGE_SELECTIONNER_ZONE_KH.value);
		}
	}    	    
	var btnModifieZone = new YAHOO.widget.Button("ModifieZoneButton");
	    btnModifieZone.on("click", ModifieZoneFn);
	
	var SupprimeZoneFn = function() 
	{	//alert("!@! SupprimeZoneFn");
		tabSelectedZone	= dataTable6.getSelectedRows();
		szRecordSelectedZone = tabSelectedZone[0];
		iIndexSelectedRowZone = dataTable6.getTrIndex(szRecordSelectedZone);
	 	if (iIndexSelectedRowZone != null && (parseInt(iIndexSelectedRowZone) + 1) !=  myDatatmp6.length)
		{	szModeParamZone = "mode_suprression_zone";
			for(var i=parseInt(iIndexSelectedRowZone)+1; i<myDatatmp6.length-1;i++)				
			{
				var objZoneModifieeNumZone = new Object();
				var num_zone_khTmp = parseInt(myDatatmp6[i]["num_zone_kh"]) -1;
				objZoneModifieeNumZone = myDatatmp6[i];
				objZoneModifieeNumZone["num_zone_kh"] = num_zone_khTmp;
				dataTable6.updateRow(i, objZoneModifieeNumZone);
				myDatatmp6[i-1] = objZoneModifieeNumZone;			
			}
			//myDatatmp6.pop();
			dataTable6.deleteRow(iIndexSelectedRowZone);			
			myDatatmp6.splice(iIndexSelectedRowZone, 1);
		}
		else
			alert(document.principal.MESSAGE_SELECTIONNER_ZONE_KH.value);
	}    	    
	var btnSupprimeZone = new YAHOO.widget.Button("SupprimeZoneButton");
	    btnSupprimeZone.on("click", SupprimeZoneFn);
	
	
	var ValideZoneFn = function() 
	{	//alert("!@! ValideZoneFn");	
		if (verifLibelleZoneCleHier() == true && verifLongueurZoneCleHier() == true && verifDebutLienZoneCleHier() == true && verifSelectLienZoneCleHier() == true && verifSelectCompteurZoneCleHier()== true ) 
		{		
			var objZoneCourante = new Object();
			objZoneCourante["num_zone_kh"] = parseInt(iIndexSelectedRowZone) + 1;
			objZoneCourante["libelle_zone_kh"] = document.principal.POS_LIBELLE_ZONE_KH.value;
			objZoneCourante["longueur_kh"] = document.principal.POS_LONGUEUR_KH.value;
			if (document.principal.POS_OBLIGATOIRE_KH.checked == true)
				objZoneCourante["oblig_kh"] = "X";
			else 
				objZoneCourante["oblig_kh"] = "";
			if (document.principal.POS_CHECKED_LIEN_KH.checked == true)
			{
				objZoneCourante["rub_lien_kh"] = document.principal.POS_RUB_LIEN_KH.options[document.principal.POS_RUB_LIEN_KH.options.selectedIndex].value;
				objZoneCourante["deb_lien_kh"] = document.principal.POS_DEBUT_LIEN_KH.value;
			}
			else
			{
				objZoneCourante["rub_lien_kh"] = "";
				objZoneCourante["deb_lien_kh"] = "1";
			}
			
			if(document.principal.POS_CHECKED_CPT_KH.checked == true)
			{						
				objZoneCourante["compteur_kh"] = "X";
				objZoneCourante["rupture_kh"]	= document.principal.POS_RUPTURE_KH.options[document.principal.POS_RUPTURE_KH.options.selectedIndex].value;				
				iZoneCpt =  parseInt(iIndexSelectedRowZone) + 1;
				iZoneRupture = objZoneCourante["rupture_kh"];
				
			}
			else
			{
				objZoneCourante["compteur_kh"] = "";
				objZoneCourante["rupture_kh"]	= "";
				iZoneCpt =  0;
				iZoneRupture = 0;
			}
			
			if ( szModeParamZone == "mode_ajout_zone")
			{ //alert("!@! mode_ajout_zone");		
				var num_zone_khTmp;
				for(var i=myDatatmp6.length-1; i>parseInt(iIndexSelectedRowZone)-1;i--)				
				{	
					var objZoneModifieeNumZone = new Object();
					if (i == myDatatmp6.length-1)
						num_zone_khTmp = document.principal.LIBELLE_FIN_DE_LISTE_ZONE_KH.value;
					else
						num_zone_khTmp = parseInt(myDatatmp6[i]["num_zone_kh"]) +1;
					objZoneModifieeNumZone = myDatatmp6[i];
					objZoneModifieeNumZone["num_zone_kh"] = num_zone_khTmp;
					dataTable6.updateRow(i, objZoneModifieeNumZone);
					myDatatmp6[i+1] = objZoneModifieeNumZone;			
				}
				//alert("!@! avant dataTable6.addRow");
				dataTable6.addRow(objZoneCourante, iIndexSelectedRowZone);
				//alert("!@! aprés dataTable6.addRow");
				myDatatmp6[iIndexSelectedRowZone] = objZoneCourante;	
					
			} 
			else if( szModeParamZone == "mode_modification_zone")
			{							
				dataTable6.updateRow(iIndexSelectedRowZone, objZoneCourante);
				myDatatmp6[iIndexSelectedRowZone] = objZoneCourante;	
			}	
			bProtectionBlocCleHier = false;
			GereProtectionBlocCleHier(bProtectionBlocCleHier);
			document.getElementById("bloc_zone_cle_hier").style.display="none";			
		}				
	}    	    
	var btnValideZone = new YAHOO.widget.Button("ValideZoneButton");
	    btnValideZone.on("click", ValideZoneFn);
	
	var AnnuleZoneFn = function() 
	{		
		bProtectionBlocCleHier = false;
		GereProtectionBlocCleHier(bProtectionBlocCleHier);
		document.getElementById("bloc_zone_cle_hier").style.display="none";
	}     	    
	var btnAnnuleZone = new YAHOO.widget.Button("AnnuleZoneButton");
	    btnAnnuleZone.on("click", AnnuleZoneFn);
	

    var ValideCleHierFn = function() 
	{
		if(myDatatmp6.length > 1)
		{ 
			var iZoneCpt = 0;
			var iZoneRupture = 0;
			tabCleHier[2] = new Object();
			tabCleHier[2]["num_zone_kh"] = new Array();
			tabCleHier[2]["szLibelleZone"] = new Array();
			tabCleHier[2]["wLgZone"] = new Array();
			tabCleHier[2]["bZoneOblig"] = new Array();
			tabCleHier[2]["szCodeRubLien"] = new Array();
			tabCleHier[2]["wPosHier"] = new Array();
				// on ne prend pas la dernière ligne "Fin de liste"
			for (var i=0; i<myDatatmp6.length-1; i++)
			{ 	
				tabCleHier[2]["num_zone_kh"][i]= myDatatmp6[i]["num_zone_kh"];
				tabCleHier[2]["szLibelleZone"][i] = myDatatmp6[i]["libelle_zone_kh"];
				tabCleHier[2]["wLgZone"][i] = myDatatmp6[i]["longueur_kh"];
				if (myDatatmp6[i]["oblig_kh"] == "X")
					tabCleHier[2]["bZoneOblig"][i] = 1;
				else 
					tabCleHier[2]["bZoneOblig"][i]= 0;
				tabCleHier[2]["szCodeRubLien"][i] = myDatatmp6[i]["rub_lien_kh"];
				tabCleHier[2]["wPosHier"][i] = myDatatmp6[i]["deb_lien_kh"] - 1;
				// tabCleHier[2]["wNumZoneComp"][i] = myDatatmp6i]["zone_exclu_kh"];
				if (myDatatmp6[i]["compteur_kh"] == "X")
				{
					iZoneCpt = i+1;
					iZoneRupture = myDatatmp6[i]["rupture_kh"];
				}
			}
				
			tabCleHier[2]["wIndZoneCpt"] = iZoneCpt;
			tabCleHier[2]["wIndZoneRupture"] = iZoneRupture;
			// on ne prend pas la dernière ligne "Fin de liste"
			tabCleHier[1] = myDatatmp6.length-1;
		}
		document.getElementById("cle_hier").style.display="none";
	}    	    
	var btnValideCleHier = new YAHOO.widget.Button("ValideCleHierButton");
	    btnValideCleHier.on("click", ValideCleHierFn);


    var AnnuleCleHierFn = function() 
	{	
		if(typeof(tabCleHier[1]) == 'undefined')
			myDatatmp6 = new Array();
		document.getElementById("cle_hier").style.display="none";
	}     	    
	var btnAnnuleCleHier = new YAHOO.widget.Button("AnnuleCleHierButton");
	    btnAnnuleCleHier.on("click", AnnuleCleHierFn);
    };
});