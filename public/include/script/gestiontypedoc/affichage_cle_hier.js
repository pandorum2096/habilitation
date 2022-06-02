// JavaScript Document
///// FONCTIONS DE CONTROLE CLE HIERARCHIQUE pop_up "cle_hier"
	// Gestion des clés hiérarchiques

var iZoneCpt;
var iZoneRupture;

	function creationElmtSelectRubLienZone(szSelectedValue)
	{
					
		var selectionRubLienZone = document.getElementById('select_rub_lien_KH');
		// suppression pour actualisation
		if (selectionRubLienZone.options.length > 0)
	    {
			 for (var i=0; i<selectionRubLienZone.options.length; i++){
	  			selectionRubLienZone.removeChild(selectionRubLienZone.options[i]);
	  			i--;
			 }		 
	    }
	    
	    // ligne vide
	    var element = document.createElement("option");
        element.setAttribute("value","");
        if(szSelectedValue == "")
          	element.setAttribute("selected","selected");
        var text = document.createTextNode("");
        element.appendChild(text);
        selectionRubLienZone.appendChild(element);	
	    
	    // lignes des rubriques monocritère du type de document
		for(var i=0; i<myDatatmp2.length;i++)
		{ 
			if(myDatatmp2[i]['mono_rub'] == 1 && myDatatmp2[i]['type_rub'] != 3)
			{
				element = document.createElement("option");
          		element.setAttribute("value",myDatatmp2[i]["code_rub"]);
          		if(myDatatmp2[i]["code_rub"] == szSelectedValue)
          			element.setAttribute("selected","selected");
          		text = document.createTextNode(myDatatmp2[i]["code_rub"] + " - " + myDatatmp2[i]["libelle_rub"]);
          		element.appendChild(text);
          		selectionRubLienZone.appendChild(element);			
			}
		}
	}
	
	function creationElmtSelectRuptureZone(numZoneCourante, szSelectedValue)
	{
					
		var selectionRuptureZone = document.getElementById('select_rupture_KH');
		// suppression pour actualisation
		if (selectionRuptureZone.options.length > 0)
	    {
			 for (var i=0; i<selectionRuptureZone.options.length; i++){
	  			selectionRuptureZone.removeChild(selectionRuptureZone.options[i]);
	  			i--;
			 }		 
	    }
	    
	    // ligne vide
	    var element = document.createElement("option");
        element.setAttribute("value","");
        if(szSelectedValue == "")
          	element.setAttribute("selected","selected");
        var text = document.createTextNode("");
        element.appendChild(text);
        selectionRuptureZone.appendChild(element);	
	    
	    // lignes des zones 
		for(var i=0; i<myDatatmp6.length-1;i++)
		{ 
			if(myDatatmp6[i]["num_zone_kh"] < numZoneCourante)
			{
				element = document.createElement("option");
	      		element.setAttribute("value", myDatatmp6[i]["num_zone_kh"]);
	      		if(myDatatmp6[i]["num_zone_kh"] == szSelectedValue)
	      			element.setAttribute("selected","selected");
	      		text = document.createTextNode(myDatatmp6[i]["num_zone_kh"] + " - " + myDatatmp6[i]["libelle_zone_kh"]);
	      		element.appendChild(text);
	      		selectionRuptureZone.appendChild(element);
	      	}
	      	else
			  	break;
		}
	}
		
	function AfficheValeurZoneCleHier(mode, index)
	{
		with(document.principal)
		{			
			if(mode == "mode_ajout_zone")
			{
				POS_LIBELLE_ZONE_KH.value = "";
				POS_LONGUEUR_KH.value = 1;
				POS_OBLIGATOIRE_KH.checked = false;
				POS_CHECKED_LIEN_KH.checked = false;
				creationElmtSelectRubLienZone("");
				POS_RUB_LIEN_KH.className = "verrouille";
				POS_RUB_LIEN_KH.disabled= true;	
				POS_DEBUT_LIEN_KH.value = "1";
				POS_DEBUT_LIEN_KH.className = "verrouille";
				POS_DEBUT_LIEN_KH.readOnly = true;
				POS_CHECKED_CPT_KH.checked= false;
				if (iZoneCpt != 0 || index ==  0)
						POS_CHECKED_CPT_KH.disabled= true;	
					else
						POS_CHECKED_CPT_KH.disabled= false;	
				creationElmtSelectRuptureZone(parseInt(index +1), "");
				POS_RUPTURE_KH.className = "verrouille";
				POS_RUPTURE_KH.disabled= true;	
			}
			else
			{									
				POS_LIBELLE_ZONE_KH.value = myDatatmp6[index]["libelle_zone_kh"];
				POS_LONGUEUR_KH.value = myDatatmp6[index]["longueur_kh"];
				POS_LONGUEUR_KH.className = "inputChamp";
				if(myDatatmp6[index]["oblig_kh"] == "X") 
					POS_OBLIGATOIRE_KH.checked = true;
				else
					POS_OBLIGATOIRE_KH.checked = false;
					
				if(myDatatmp6[index]["rub_lien_kh"] != "")
				{
					POS_CHECKED_LIEN_KH.checked= true;
					POS_RUB_LIEN_KH.className = "inputChamp";
					POS_RUB_LIEN_KH.disabled = false;
					creationElmtSelectRubLienZone(myDatatmp6[index]["rub_lien_kh"]);
					POS_DEBUT_LIEN_KH.className = "inputChamp";
					POS_DEBUT_LIEN_KH.readOnly = false;
					POS_DEBUT_LIEN_KH.value = parseInt(myDatatmp6[index]["deb_lien_kh"]);
				}
				else
				{
					POS_CHECKED_LIEN_KH.checked= false;
					POS_RUB_LIEN_KH.className = "verrouille";
					POS_RUB_LIEN_KH.disabled = true;
					creationElmtSelectRubLienZone("");
					POS_DEBUT_LIEN_KH.className = "verrouille";
					POS_DEBUT_LIEN_KH.readOnly = true;
					POS_DEBUT_LIEN_KH.value = "1";
				}
				
				if (iZoneCpt == parseInt(index) + 1)
				{	
					POS_CHECKED_CPT_KH.checked= true;
					POS_CHECKED_CPT_KH.disabled= false;
					POS_RUPTURE_KH.className = "inputChamp";
					POS_RUPTURE_KH.disabled= false;
					creationElmtSelectRuptureZone(parseInt(index +1), iZoneRupture);
				}
				else
				{	
					POS_CHECKED_CPT_KH.checked= false;
					if (iZoneCpt != 0 || index ==  0)
						POS_CHECKED_CPT_KH.disabled= true;	
					else
						POS_CHECKED_CPT_KH.disabled= false;		
					POS_RUPTURE_KH.className = "verrouille";
					POS_RUPTURE_KH.disabled= true;
					creationElmtSelectRuptureZone(parseInt(index +1), "");
				}						
			}
		}		
	}
	
	function GererCheckCleHier(obj)
	{
		if (obj.checked)
		{	
			document.principal.POS_KH_MULTI.disabled = false;
			tabCleHier[0] = 2;
		}
		else
		{
			document.principal.POS_KH_MULTI.disabled = true;
			tabCleHier[0] = 1;
		}
	}
	function verifLibelleZoneCleHier()
	{
		if (document.principal.POS_LIBELLE_ZONE_KH.value == "")
		{	
			alert(document.principal.MESSAGE_VERIF_LIBELLE_ZONE_KH.value);
			return false;	
		}
		else
			return true;			
	}
	
	function verifLongueurZoneCleHier()
	{
		var iMax;
		var iLgZone = parseInt(document.principal.POS_LONGUEUR_KH.value);
		if(document.principal.POS_CHECKED_CPT_KH.checked == true)
			iMax = 10;
		else
			iMax = 102;
		
 		if(iLgZone < 1 || iLgZone > iMax)
		{
			alert(document.principal.MESSAGE_VERIF_LONGUEUR_ZONE_KH.value);
			return false;
		}
		else
			return true;
	}
	
	function GererCheckLienZoneCleHier(obj)
	{
		with(document.principal)
		{
			if (obj.checked)
			{	
				POS_RUB_LIEN_KH.className = "inputChamp";
				POS_RUB_LIEN_KH.disabled= false;
				POS_DEBUT_LIEN_KH.value = "1";
				POS_DEBUT_LIEN_KH.className = "inputChamp";
				POS_DEBUT_LIEN_KH.readOnly = false;		
			}
			else
			{
				POS_RUB_LIEN_KH.className = "verrouille";
				POS_RUB_LIEN_KH.disabled= true;
				POS_RUB_LIEN_KH.options.selectedIndex = 0;
				POS_DEBUT_LIEN_KH.value = "1";
				POS_DEBUT_LIEN_KH.className = "verrouille";
				POS_DEBUT_LIEN_KH.readOnly = true;
			}
		}
	}
	
	function verifDebutLienZoneCleHier()
	{ 
		var iMax = 118;
		var iDebutLien = parseInt(document.principal.POS_DEBUT_LIEN_KH.value);
		if(iDebutLien < 1 || iDebutLien > iMax)
		{	
			alert(document.principal.MESSAGE_VERIF_DEBUT_LIEN_ZONE_KH.value);
			return false;
		}
		else 
			return true;
	}
	
	function verifSelectLienZoneCleHier()
	{	
		with(document.principal)
		{
			if(POS_CHECKED_LIEN_KH.checked == true)
			{
				if(POS_RUB_LIEN_KH.options.selectedIndex == 0)
				{
					alert(MESSAGE_RUB_LIE_VIDE_ZONE_KH.value);
					return false;					
				}
				else
					return true;
			}
			else
				return true;			
		}
	}
	
	function verifSelectCompteurZoneCleHier()
	{	
		with(document.principal)
		{
			if(POS_CHECKED_CPT_KH.checked == true)
			{
				if(POS_RUPTURE_KH.options.selectedIndex == 0)
				{
					alert(MESSAGE_ZONE_RUPTURE_VIDE_ZONE_KH.value);
					return false;					
				}
				else
					return true;
			}
			else
				return true;			
		}
	}
	
	function GererCheckCompteurZoneCleHier(obj)
	{
		with(document.principal)
		{
			if (obj.checked)
			{	
				POS_RUPTURE_KH.className = "inputChamp";
				POS_RUPTURE_KH.disabled= false;	
			}
			else
			{
				POS_RUPTURE_KH.className = "verrouille";
				POS_RUPTURE_KH.disabled= true;
			}
			POS_RUPTURE_KH.options.selectedIndex = 0;
		}	
	}
	
	function afficherPopUpCleHier()
	{		
		with(document.principal)
		{		
			if(POS_KH.checked==true) 
			{
				if(typeof(tabCleHier[0]) == 'undefined')
					RecupCleHier(POS_CODE_TYPEDOC.value);
				if(tabCleHier[1] > 0)
				{	
					myDatatmp6 = new Array();
					iZoneCpt = tabCleHier[2]["wIndZoneCpt"];
					iZoneRupture = tabCleHier[2]["wIndZoneRupture"];
					for (var i=0; i<tabCleHier[1]; i++)
					{ 	
						myDatatmp6[i] = new Object();
						myDatatmp6[i]["num_zone_kh"] = i+1;
						myDatatmp6[i]["libelle_zone_kh"] = tabCleHier[2]["szLibelleZone"][i];
						myDatatmp6[i]["longueur_kh"] = tabCleHier[2]["wLgZone"][i];
						if (tabCleHier[2]["bZoneOblig"][i] == 1)
							myDatatmp6[i]["oblig_kh"] = "X";
						else 
							myDatatmp6[i]["oblig_kh"] = "";
						myDatatmp6[i]["rub_lien_kh"] = tabCleHier[2]["szCodeRubLien"][i];
						myDatatmp6[i]["deb_lien_kh"] = tabCleHier[2]["wPosHier"][i] + 1;
						//myDatatmp6[i]["zone_exclu_kh"] = tabCleHier[2]["wNumZoneComp"][i];
						if (iZoneCpt == i+1)
						{	
							myDatatmp6[i]["compteur_kh"] = "X";
							myDatatmp6[i]["rupture_kh"]	= iZoneRupture;
						}
						else
						{
							myDatatmp6[i]["compteur_kh"] = "";
							myDatatmp6[i]["rupture_kh"]	= "";
						}		
					}
// 					var FinDeListeRow = new Object();
// 					FinDeListeRow["num_zone_kh"] = num_zone_khTmp = document.principal.LIBELLE_FIN_DE_LISTE_ZONE_KH.value;
// 					FinDeListeRow["libelle_zone_kh"] = "";
// 					FinDeListeRow["longueur_kh"] = "";
// 					FinDeListeRow["oblig_kh"] = "";
// 					FinDeListeRow["rub_lien_kh"] = "";
// 					FinDeListeRow["deb_lien_kh"] = "";
// 					//FinDeListeRow]["zone_exclu_kh"] = tabCleHier[2]["wNumZoneComp"][i];
// 					FinDeListeRow["compteur_kh"] = "";
// 					FinDeListeRow["rupture_kh"]	= "";
// 					myDatatmp6.push(FinDeListeRow);
				}
				var FinDeListeRow = new Object();
				FinDeListeRow["num_zone_kh"] = num_zone_khTmp = document.principal.LIBELLE_FIN_DE_LISTE_ZONE_KH.value;
				FinDeListeRow["libelle_zone_kh"] = "";
				FinDeListeRow["longueur_kh"] = "";
				FinDeListeRow["oblig_kh"] = "";
				FinDeListeRow["rub_lien_kh"] = "";
				FinDeListeRow["deb_lien_kh"] = "";
				//FinDeListeRow]["zone_exclu_kh"] = tabCleHier[2]["wNumZoneComp"][i];
				FinDeListeRow["compteur_kh"] = "";
				FinDeListeRow["rupture_kh"]	= "";
				myDatatmp6.push(FinDeListeRow);
				ouvrirPopUp('cle_hier');
			}		
		}	
	}