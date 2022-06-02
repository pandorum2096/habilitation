// JavaScript Document
// FONCTIONS DE CONTROLE PARAMETRAGE RUBRIQUE  pop_up "ajout_rub"
	// gestion de la coche "Type cible"
	function GererCheckTypeCible()
	{
		with (document.principal)
		{
			if (POS_CHECK_TYPE_CIBLE_RUB_AJOUT.checked == false)
			{
				POS_TYPE_TYPE_CIBLE_RUB_AJOUT.readOnly=true;
				POS_TYPE_TYPE_CIBLE_RUB_AJOUT.disabled=true;
				POS_TYPE_TYPE_CIBLE_RUB_AJOUT.className='verrouille';
				POS_RUB_TYPE_CIBLE_RUB_AJOUT.readOnly=true;
				POS_RUB_TYPE_CIBLE_RUB_AJOUT.disabled=true;
				POS_RUB_TYPE_CIBLE_RUB_AJOUT.className='verrouille';
				POS_BUTTON_ASSOCIATIONS.disabled = true;				
			}
			else
			{
				POS_TYPE_TYPE_CIBLE_RUB_AJOUT.readOnly=false;
				POS_TYPE_TYPE_CIBLE_RUB_AJOUT.disabled=false;
				POS_TYPE_TYPE_CIBLE_RUB_AJOUT.className='inputChamp';
				POS_RUB_TYPE_CIBLE_RUB_AJOUT.readOnly=false;
				POS_RUB_TYPE_CIBLE_RUB_AJOUT.disabled=false;
				POS_RUB_TYPE_CIBLE_RUB_AJOUT.className='inputChamp';
				//POS_BUTTON_ASSOCIATIONS.disabled = false;
			}				
		}
	}
	function GereBoutonAssociations()
	{
		if (document.principal.POS_BUTTON_ASSOCIATIONS.disabled !=false)
		{
			document.principal.POS_BUTTON_ASSOCIATIONS.disabled = false;
		}
	}
	// récupération des rubriques du type de document lié
	function AfficheRubCible()
	{	
		// Affichage des Rubriques Cibles
		var selectElmt = document.getElementById("select_type_cible");
		var szTypeDocCible = selectElmt.options[selectElmt.selectedIndex].value;
		// option vide du select
		if(szTypeDocCible.length == 0)
		{
			var selectElmtRubCible = document.getElementById("select_rub_cible");
			for (var i=0; i<selectElmtRubCible.options.length; i++)
			{
	    		selectElmtRubCible.removeChild(selectElmtRubCible.options[i]);
	    		i--;
			}
			var element = document.createElement("option");
          	element.setAttribute('value',"");
          	var text = document.createTextNode("");
          	element.appendChild(text);
          	selectElmtRubCible.appendChild(element);
		}
		else
		{
			// requête Ajax
            var bAvecCleHier = 1;
			RecupRubTypedoc(szTypeDocCible, szTypeRubCourant, bAvecCleHier);
		}
	}	
	
	function ModifTypeCible()
	{ 	
		tabAssociationsRubCourant = new Array();
	}
	
	function RecupTabAssociations()
	{ 
		tabAssociationsRubCourant = new Array(); 
		if (typeof(tabRubriquesModifiees[szCodeRubCourant]) != 'undefined')	
			tabAssociationsRubCourant = tabRubriquesModifiees[szCodeRubCourant]["objAsso"];			
		else
		// requête Ajax
 			RecupListValAssociation(document.principal.POS_CODE_TYPEDOC.value, szCodeRubCourant);			  			
	}
	
	function AfficherBlocAssociations()
	{
		if (document.principal.POS_TYPE_TYPE_CIBLE_RUB_AJOUT.options.selectedIndex == "")
		{
			alert(document.principal.MESSAGE_TYPE_LIE_VIDE.value);
		}
		else
		{	
			// affichages de la listes des rubriques du document 
			// disponibles pour l'association
			for(var i=0; i<2;i++)
			{
				myColumnDefstmp3[i] = new Object();
				myColumnDefstmp3[i].label = myColumnDefstmp2[i].label;
				myColumnDefstmp3[i].key = myColumnDefstmp2[i].key;
				myColumnDefstmp3[i].formatter = "YAHOO.widget.DataTable.formatText";
				if(i==0)
					myColumnDefstmp3[i].width = 50;
				else 
					myColumnDefstmp3[i].width = 200;
				myColumnDefstmp3[i].sortable = false;
				myColumnDefstmp3[i].resizeable = true;
				myColumnDefstmp3[i].hidden = false;
			}
			// ajout de la colonne type_rub pour restreindre au type les rubriques associables
			myColumnDefstmp3[i] = new Object();
			myColumnDefstmp3[i].label = "type_rub";
			myColumnDefstmp3[i].key = "type";
			myColumnDefstmp3[i].formatter = "YAHOO.widget.DataTable.formatText";
			myColumnDefstmp3[i].width = 50;
			myColumnDefstmp3[i].sortable = false;
			myColumnDefstmp3[i].resizeable = false;
			myColumnDefstmp3[i].hidden = true;
			j=0;		
			for(i=0; i<myDatatmp2.length;i++)
			{
				// les rubriques de type tableau ne participent pas à des associations
				if(myDatatmp2[i]["type_rub"] != "3")
				{	
					myDatatmp3[j] = new Object();
					myDatatmp3[j]["code_rub"] = myDatatmp2[i]["code_rub"];
					myDatatmp3[j]["libelle_rub"] = myDatatmp2[i]["libelle_rub"];
					myDatatmp3[j]["type_rub"] = myDatatmp2[i]["type_rub"];
					j++;
				}
			}

			myDatatmp4 = new Array();
			myDatatmp5 = new Array();
			
			// on utilise tabAssociationsRubCourant pour  remplir la datatable des associations 			
			for(i=0; i<tabAssociationsRubCourant.length;i++)
			{
				for(var key in tabAssociationsRubCourant[i])
				myDatatmp5[i] = new Object();
				myDatatmp5[i]["code_rub"] = key;
				myDatatmp5[i]["code_rub_cible"] = tabAssociationsRubCourant[i][key];
			}
			
			// protection des champs controlant l'association
			with (document.principal)
			{	
				POS_CHECK_TYPE_CIBLE_RUB_AJOUT.className='verrouille';
				POS_CHECK_TYPE_CIBLE_RUB_AJOUT.readOnly=true;
				POS_CHECK_TYPE_CIBLE_RUB_AJOUT.disabled=true;
				
				POS_TYPE_TYPE_CIBLE_RUB_AJOUT.className='verrouille';
				POS_TYPE_TYPE_CIBLE_RUB_AJOUT.readOnly=true;
				POS_TYPE_TYPE_CIBLE_RUB_AJOUT.disabled=true;
				
				POS_RUB_TYPE_CIBLE_RUB_AJOUT.className='verrouille';
				POS_RUB_TYPE_CIBLE_RUB_AJOUT.readOnly=true;
				POS_RUB_TYPE_CIBLE_RUB_AJOUT.disabled=true;
				
				POS_CHECK_RECUP_FICHIER_ASSOCIATIONS.disabled = true;
				POS_BUTTON_ASSOCIATIONS.disabled = true;
			}
			document.getElementById("bloc_association").style.display="";
		}
	}
	
	function GererCheckCompteur()
	{
		with (document.principal)
		{
			if (POS_CHECK_COMPTEUR.checked == false)
			{ 
				POS_VAL_ACT_COMPTEUR.readOnly=true;
				POS_VAL_ACT_COMPTEUR.disabled=true;
				POS_VAL_ACT_COMPTEUR.className='verrouille';
				POS_VAL_ACT_COMPTEUR.value="";
				POS_CHECK_INI_COMPTEUR.checked=false;
				POS_CHECK_INI_COMPTEUR.disabled=true;
				POS_VAL_INI_COMPTEUR.readOnly=true;
				POS_VAL_INI_COMPTEUR.disabled=true;
				POS_VAL_INI_COMPTEUR.className='verrouille';
				POS_CODE_LISTHIER.disabled = false;
				POS_CODE_LISTHIER.options.selectedIndex = 0;
				POS_CODE_RUB_MERE.disabled = false;
				POS_CODE_RUB_MERE.options.selectedIndex = 0;
				POS_CONTROLE_LISTHIER.checked = false;
				POS_CONTROLE_LISTHIER.disabled = false;
				document.getElementById("saisie_val_def").className="inputChamp";
				document.getElementById("saisie_val_def").readOnly=false;
				document.getElementById("saisie_val_def").value="";				
			}
			else
			{ 
				POS_VAL_ACT_COMPTEUR.readOnly=false;
				POS_VAL_ACT_COMPTEUR.disabled=false;
				POS_VAL_ACT_COMPTEUR.className='inputChamp';
				POS_CHECK_INI_COMPTEUR.checked=false;
				POS_CHECK_INI_COMPTEUR.disabled=false;
				POS_VAL_INI_COMPTEUR.readOnly=true;
				POS_VAL_INI_COMPTEUR.disabled=true;
				POS_VAL_INI_COMPTEUR.className='verrouille';	
				POS_CODE_LISTHIER.disabled = true;
				POS_CODE_LISTHIER.options.selectedIndex = 0;
				POS_CODE_RUB_MERE.disabled = true;
				POS_CODE_RUB_MERE.options.selectedIndex = 0;
				POS_CONTROLE_LISTHIER.checked = false;
				POS_CONTROLE_LISTHIER.disabled = true;
				document.getElementById("saisie_val_def").className="verrouille";
				document.getElementById("saisie_val_def").readOnly=true;
				document.getElementById("saisie_val_def").value="AUTO";	
			}
		}
	}
	
	function GererCheckIniCompteur()
	{
		with (document.principal)
		{
			if (POS_CHECK_INI_COMPTEUR.checked == false)
			{				
				POS_VAL_INI_COMPTEUR.readOnly=true;
				POS_VAL_INI_COMPTEUR.disabled=true;
				POS_VAL_INI_COMPTEUR.className='verrouille';
				POS_VAL_INI_COMPTEUR.value="";
				document.getElementById("saisie_val_def").value="AUTO";					
			}
			else
			{
				POS_VAL_INI_COMPTEUR.readOnly=false;
				POS_VAL_INI_COMPTEUR.disabled=false;
				POS_VAL_INI_COMPTEUR.className='inputChamp';
				document.getElementById("saisie_val_def").value="AUTO_RAZ_ANNEE";
			}
		}
	}
	
	function GererCptValReinit(obj)
	{
		var szValReinit = obj.value;
		if (isANumber(obj))
			document.getElementById("saisie_val_def").value="AUTO_RAZ_ANNEE("+ szValReinit +")";
	}
	
	// liste hièrarchique
	function AfficheCodeRubMere()
	{ 
		var selectElmt = document.getElementById("select_code_listhier");
		var szCodeListHier = selectElmt.options[selectElmt.selectedIndex].value;
		
		if(typeof(tabRubListeHier[szCodeListHier]) == 'undefined')
			RecupCodeRubMere(document.principal.POS_CODE_TYPEDOC.value, szCodeListHier);
		
		var selection = document.getElementById('select_code_rubmere');
        selection.options.length = 0;
		for(var i=0; i<tabRubListeHier[szCodeListHier].length; i++)
      	{
            if (szCodeRubCourant != tabRubListeHier[szCodeListHier][i])
                selection.options[selection.options.length] = new Option(tabRubListeHier[szCodeListHier][i],
                            tabRubListeHier[szCodeListHier][i], false, false);
		}
	}
	function AutoriseCheckControlListHier()
	{
		var selectElmt = document.getElementById("select_code_listhier");
		if (selectElmt.options[selectElmt.selectedIndex].value != "")
			document.principal.POS_CONTROLE_LISTHIER.disabled=false;			
	}	
	
	function removeOption(value, selectID)
	{
		var options = document.getElementById(selectID).options;
		var i = 0;
		var l = options.length;
		while (i < l && options[i].value != value)
			i++;
		if (i < l)
			options[i].parentNode.removeChild(options[i]);
	}
	
	// affichage du div "ajout_rub" selon la modification/ajout
	// de la rubrique sélectionnée
	
	function ajoutTmpRubInType()
	{			
		with (document.principal)
		{		
			// suppression dans le tableau des rubriques à supprimer
			for(var i=0; i<tabRubriquesSupprimees.length;i++)
			{
				if(szCodeRubCourant == tabRubriquesSupprimees[i])
					tabRubriquesSupprimees.splice(i,1);	
			}			
			
			tabRubriquesModifiees[szCodeRubCourant] = new Object();
			tabRubriquesModifiees[szCodeRubCourant]["szRubrique"] = szCodeRubCourant;
			tabRubriquesModifiees[szCodeRubCourant]["szNomRub"] = szLibelleRubCourant;
            tabRubriquesModifiees[szCodeRubCourant]["wOblig"] = getValueRadio(POS_CHOIX_RUB_OBLIG);
			tabRubriquesModifiees[szCodeRubCourant]["bIndexee"] = (POS_INDEX_RUB_AJOUT.checked) ? 1 : 0;
			tabRubriquesModifiees[szCodeRubCourant]["bReport"] = (POS_REPORT_VAL_RUB_AJOUT.checked) ? 1 : 0;
			
			tabRubriquesModifiees[szCodeRubCourant]["szDefaut"] = document.getElementById('saisie_val_def').value;
			tabRubriquesModifiees[szCodeRubCourant]["bDefaut"] = (document.getElementById('saisie_val_def').value.length != 0) ? 1 : 0;
		
			tabRubriquesModifiees[szCodeRubCourant]["szMinimum"] = POS_VAL_MIN.value;
			tabRubriquesModifiees[szCodeRubCourant]["szMaximum"] = POS_VAL_MAX.value;
			
			tabRubriquesModifiees[szCodeRubCourant]["bMonoValeur"] = (POS_VAL_UNIQUE_RUB_AJOUT.checked) ? 1 : 0;
			tabRubriquesModifiees[szCodeRubCourant]["bModifiable"] = (POS_MODIFIABLE_RUB_AJOUT.checked) ? 1 : 0;
			
	 		if(POS_VER_CREAT_RUB_AJOUT.checked)
                tabRubriquesModifiees[szCodeRubCourant]["wReservee"] = (POS_VER_MODIF_RUB_AJOUT.checked) ? 1 : 2; 
			else
			    tabRubriquesModifiees[szCodeRubCourant]["wReservee"] = (POS_VER_MODIF_RUB_AJOUT.checked) ? 3 : 0;	
			
			// tableau des associations
			tabRubriquesModifiees[szCodeRubCourant]["objAsso"] = new Object();
			tabRubriquesModifiees[szCodeRubCourant]["objAsso"] = tabAssociationsRubCourant;
			
			tabAssociationsRubCourant = new Array();			
			if(POS_CHECK_TYPE_CIBLE_RUB_AJOUT.checked)
			{	
				tabRubriquesModifiees[szCodeRubCourant]["bLierDep"] = 1;
				var szTypeCible = POS_TYPE_TYPE_CIBLE_RUB_AJOUT.options[POS_TYPE_TYPE_CIBLE_RUB_AJOUT.selectedIndex].value;			
				tabRubriquesModifiees[szCodeRubCourant]["szTypeLie"] = szTypeCible;			
				
				var szRubCible = POS_RUB_TYPE_CIBLE_RUB_AJOUT.options[POS_RUB_TYPE_CIBLE_RUB_AJOUT.selectedIndex].value;
				tabRubriquesModifiees[szCodeRubCourant]["szRubLie"] = szRubCible;
				
				if (POS_CHECK_RECUP_FICHIER_ASSOCIATIONS.checked)
					tabRubriquesModifiees[szCodeRubCourant]["bRecupPageAsso"] = 1;	
			}
			else
			{	
				tabRubriquesModifiees[szCodeRubCourant]["bLierDep"] = 0;
				tabRubriquesModifiees[szCodeRubCourant]["szTypeLie"] = "";
				tabRubriquesModifiees[szCodeRubCourant]["szRubLie"] = "";
				tabRubriquesModifiees[szCodeRubCourant]["bRecupPageAsso"] = "";
			}

            tabRubriquesModifiees[szCodeRubCourant]["bMajuscule"] = (POS_MAJUSCULE_RUB_AJOUT.checked) ? 1 : 0;
			tabRubriquesModifiees[szCodeRubCourant]["bFullTexte"] = (POS_FULLTEXT_RUB_AJOUT.checked) ? 1 : 0;
					
			var	szCodeListeHier = POS_CODE_LISTHIER.options[POS_CODE_LISTHIER.selectedIndex].value;			
			tabRubriquesModifiees[szCodeRubCourant]["szCodeListeHier"] = szCodeListeHier;			
			var szCodePereHier = "";
			if(POS_CODE_RUB_MERE.options.length > 0)	
				szCodePereHier = POS_CODE_RUB_MERE.options[POS_CODE_RUB_MERE.selectedIndex].value;			
			tabRubriquesModifiees[szCodeRubCourant]["szCodePereHier"] = szCodePereHier;	
	
	        tabRubriquesModifiees[szCodeRubCourant]["bNoControleListeHier"] = (POS_CONTROLE_LISTHIER.checked) ? 1 : 0;
			
			// Actualisation du tableau tabRubListeHier.			
			var bFoundInTabRubListehier = false;
			var szCodeListeHierFound;
			var iIndexRubInListeHierFound;			
			for(var szKeyListeHier in tabRubListeHier)
			{
				for(var i=0; i<tabRubListeHier[szKeyListeHier].length; i++)
				{
					if(szCodeRubCourant == tabRubListeHier[szKeyListeHier][i])
					{
						bFoundInTabRubListehier = true;						
						szCodeListeHierFound = szKeyListeHier;
						iIndexRubInListeHierFound = i;
						break;
					}
				}
			}
			if (bFoundInTabRubListehier)
			{	
				if (szCodeListeHier	!= szCodeListeHierFound)
					tabRubListeHier[szCodeListeHierFound].splice(iIndexRubInListeHierFound,1);
			}
			if (szCodeListeHier != "")
			{
				if (typeof(tabRubListeHier[szCodeListeHier]) == 'undefined')
					tabRubListeHier[szCodeListeHier] = new Array();
				
				tabRubListeHier[szCodeListeHier].push(szCodeRubCourant);				
			}
			
			tabRubriquesModifiees[szCodeRubCourant]["Compteur"] = POS_VAL_ACT_COMPTEUR.value;				
		}
	}
	
// affectation des valeurs  de la rubrique à partir du tableau tabRubriquesModifiees
// car précedemment modifiée	
	function RechargeAttributsRubInTypeModification()
	{
        var tabRubInType = tabRubriquesModifiees[szCodeRubCourant];
		
		if(tabRubriquesModifiees[szCodeRubCourant]["bLierDep"] == 1)	
		{
			document.getElementById('select_type_cible').value = tabRubriquesModifiees[szCodeRubCourant]["szTypeLie"];	
	 		    // requêre Ajax
                var bAvecCleHier = 1;                
			RecupRubTypedoc(tabRubriquesModifiees[szCodeRubCourant]["szTypeLie"], szTypeRubCourant, bAvecCleHier);
            document.getElementById('select_rub_cible').value = tabRubriquesModifiees[szCodeRubCourant]["szRubLie"];
		}
		
		if (tabRubriquesModifiees[szCodeRubCourant]["bMajuscule"] == 1)
			checkedMajuscule = true;
		else 
			checkedMajuscule = false;
	
		// obligatoire
		valueRubOblig = tabRubriquesModifiees[szCodeRubCourant]["wOblig"];
		
		// Liste hiérarchique
		valueSelectedCodeListHier = tabRubriquesModifiees[szCodeRubCourant]["szCodeListeHier"];
		
		if(valueSelectedCodeListHier != "")
		{
			var selectionListHier = document.getElementById('select_code_listhier');							
			for (var i=0; i<selectionListHier.options.length; i++){
				if (selectionListHier.options[i].value == valueSelectedCodeListHier)
					selectionListHier.options[i].selected = true;
			}				
			valueSelectedRubListHier = tabRubriquesModifiees[szCodeRubCourant]["szCodePereHier"];
			
		// création des valeurs de rubrique de la liste  déroulante spécifique de la liste hiérarchique
			var selectionRubMere = document.getElementById('select_code_rubmere');
			if(typeof(tabRubListeHier[valueSelectedCodeListHier]) == 'undefined')
				// requête Ajax
				RecupCodeRubMere(document.principal.POS_CODE_TYPEDOC.value, valueSelectedCodeListHier);		
			selectionRubMere.options.length = 0;
			
			for(var i=0; i<tabRubListeHier[valueSelectedCodeListHier].length; i++)
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
				if(tabRubriquesModifiees[szCodeRubCourant]["bNoControleListeHier"] == 1)
					checkedCtrlListHier = true;
			}
		}
		// valeur Min Max			
		valueMin = tabRubriquesModifiees[szCodeRubCourant]["szMinimum"];
		valueMax = tabRubriquesModifiees[szCodeRubCourant]["szMaximum"];
		
		if (tabRubriquesModifiees[szCodeRubCourant]["bDefaut"] == 1)
			valueValDefaut = tabRubriquesModifiees[szCodeRubCourant]["szDefaut"];
		
		// compteur
	 	valueActCompteur = tabRubriquesModifiees[szCodeRubCourant]["Compteur"];
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
	   return tabRubInType;
	}
	
// Affichage de la rubrique 
 	
	function AfficheRubInType(mode)
	{	
		var bFoundRubModifiee = 0;
        var tabInfoRubInType;
		// positionnement par défaut (~création) des attributs des éléments en fonction du type de la rubrique 
		RecupAttributsRubInTypeCreation();		
		if (mode == "mode_modification_rub")
		{	
			// soit la rubrique a été precedemment modifiée
			for(var szKeyRub in tabRubriquesModifiees)
			{
				if(szCodeRubCourant == szKeyRub)
				{
					tabInfoRubInType = RechargeAttributsRubInTypeModification(szCodeRubCourant);					
					bFoundRubModifiee = 1;
					break;	
				}	
			}
			// soit requête Ajax pour récupérer son paramétrage
			if(bFoundRubModifiee == 0)														
				tabInfoRubInType = RecupAttributsRubInTypeModification(document.principal.POS_CODE_TYPEDOC.value,szCodeRubCourant);
					
		}
	// Actualisation des rubriques mères des listes hièrarchiques
		// on supprime du SELECT les rubriques supprimées		
		for (var i=0; i<tabRubriquesSupprimees.length; i++)
		{
			removeOption(tabRubriquesSupprimees[i],'select_code_rubmere');
		}		
		// on ajoute au SELECT les rubriques modifiées de même liste hiérarchique
// 		var selectionRubMere = document.getElementById('select_code_rubmere');		
// 		for (var szKeyRub in tabRubriquesModifiees)
// 		{
// 			if(tabRubriquesModifiees[szKeyRub]["szCodeListeHier"] == valueSelectedCodeListHier
// 				&& tabRubriquesModifiees[szKeyRub]["szCodePereHier"] != szCodeRubCourant)
// 			{			
// 				var element = document.createElement("option");
//           		element.setAttribute('value',szKeyRub);
//           		var text = document.createTextNode(szKeyRub);
//           		element.appendChild(text);
//           		selectionRubMere.appendChild(element);
// 			}			
// 		}
						
		AffecteAttributsRubInType(tabInfoRubInType);					
	}

	
