document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");

function construitUrl(_date, _tabDate) {
	if(!(_tabDate[_date])) {
		//szUrl = "http://www.laltruiste.com/document.php?page=1&rep=10"
	}
	else {
		var tabNumDoc = _tabDate[_date];

		szUrl= URL_SITE + "/interface/session/principal/resultat/rechercher_db.php?TYPE_RECHERCHE=RECHERCHE_TAB_NUM_DOC&TAB_NUM_DOC="+tabNumDoc;
	}
	return szUrl;
}

function setCouleurRenderer(numclass) {

szRenderer = " var class"+numclass+ " = function(workingDate, cell) { YAHOO.util.Dom.addClass(cell, 'class"+numclass+"');}";
return szRenderer;

}
function getStyleClass (className) {
	var re = new RegExp("\\." + className + "$", "gi");
	// IE
	if (document.all) {
		for (var s = 0; s < document.styleSheets.length; s++)
  			for (var r = 0; r < document.styleSheets[s].rules.length; r++)
    			if (document.styleSheets[s].rules[r].selectorText.search(re) != -1) {
     			 return document.styleSheets[s].rules[r].style;
    			}
	}
	// Naviagateur supportant DHTML officiel
	else if (document.getElementById) {
		for (var s = 0; s < document.styleSheets.length; s++)
  			for (var r = 0; r < document.styleSheets[s].cssRules.length; r++)
    			if (document.styleSheets[s].cssRules[r].selectorText.search(re) != -1) {
      				document.styleSheets[s].cssRules[r].sheetIndex = s;
      				document.styleSheets[s].cssRules[r].ruleIndex = s;
      				return document.styleSheets[s].cssRules[r].style;
    			}
	}
	// Netscape 4.X
	else if (document.layers)
		return document.classes[className].all;
	return null;
}
function getStyleClassProperty (className, propertyName) {
	var styleClass = getStyleClass(className);
	if (styleClass)
		return styleClass[propertyName];
	else 
		return null;
}

function toRGBHex(szRGBColor)
{
	var decToHex="";
	var arr = new Array();
	var reg= new RegExp("[^0-9]+([0-9]{1,3})[^0-9]+([0-9]{1,3})[^0-9]+([0-9]{1,3})[^0-9]+", "g");
	arr = reg.exec(szRGBColor);
	 
	
	 //arr[0] : chaine capturée
	for(var i=1;i<arr.length;i++) {
    	var hexArray = new Array( "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" );
		
    	var code1 = Math.floor(arr[i] / 16);
    	var code2 = arr[i] - code1 * 16;

    	decToHex += hexArray[code1];
    	decToHex += hexArray[code2];
	}
	return (decToHex);
}

YAHOO.namespace("recherche.calendar");

 YAHOO.recherche.calendar.init = function() {
 
 	// tableau associatif cle : date - value : liste numinfo
	// pour crééer  l'url lors de la séléction d'une date
	var tabDate = new Array();
	// tableau associatif cle : class - value : libelle
 	var tabClassCouleur = new Array();
 	
	var navConfig = {
        strings : {
            month: "Choisisser un mois",
            year: "Entrer une année",
            submit: "Valider",
            cancel: "Annuler",
            invalidYear: "Veuillez entrer une année valide"
        },
        //monthFormat: YAHOO.widget.Calendar.SHORT,
        monthFormat: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        initialFocus: "year"
    };
				
	function mySelectHandler(type,args,obj) {
	
		var selectedDate = args[0];
		var jour = selectedDate[0][2];
		var mois = selectedDate[0][1];
		var annee = selectedDate[0][0];
		if (parseInt(jour) < 10) 
			jour = "0"+ jour;
		if (parseInt(mois) < 10) 
			mois = "0"+ mois;	
			
		var formatedDate = jour+"/"+mois+"/"+annee;
		location.href=construitUrl(formatedDate, tabDate);
	};
	var MoisAnneeDebut = MoisAnneeDebutTmp;
	var nbMois = nbMoisTmp;
	YAHOO.recherche.calendar.cal = new YAHOO.widget.CalendarGroup("calendarContainer", {pagedate:MoisAnneeDebut,navigator:navConfig, pages:nbMois});
		
	YAHOO.recherche.calendar.cal.cfg.setProperty("DATE_FIELD_DELIMITER", "/");
	YAHOO.recherche.calendar.cal.cfg.setProperty("MDY_DAY_POSITION", 1); 
	YAHOO.recherche.calendar.cal.cfg.setProperty("MDY_MONTH_POSITION", 2); 
	YAHOO.recherche.calendar.cal.cfg.setProperty("MDY_YEAR_POSITION", 3);
	YAHOO.recherche.calendar.cal.cfg.setProperty("MONTHS_LONG",["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]);
	//YAHOO.recherche.calendar.cal.cfg.setProperty("WEEKDAYS_1CHAR",["D", "L", "M", "M", "J", "V", "S"]);
	YAHOO.recherche.calendar.cal.cfg.setProperty("WEEKDAYS_SHORT",["D", "L", "M", "M", "J", "V", "S"]);
	YAHOO.recherche.calendar.cal.cfg.setProperty("START_WEEKDAY","1");
	
	YAHOO.recherche.calendar.cal.selectEvent.subscribe(mySelectHandler, YAHOO.recherche.calendar.cal, true);

	
	objSeances = objSeances.replace(/\\"/g,'\'');	
	var obj = YAHOO.lang.JSON.parse(objSeances);
		
	var tabColorRenderer = new Array();
	var bReponseCommune;


	// key est une classe de couleur class1, class2 .....
	// une couleur/locution
	for( var key in obj) {
	 	
		for(var i=0;i<obj[key].length; i++) {
			
			var date = obj[key][i].date;
			var numdoc = obj[key][i].numdoc;
			var libelle = obj[key][i].libelle;
			if (i==0)
				tabClassCouleur[key]=libelle;
		// document commun à plusieurs locutions 
  			if(tabDate[date]) {
  					numCouleur = "99";
  					classNameCouleur = "class99";
  					if (!bReponseCommune)
						bReponseCommune = true;
						
					tabDate[date]+= ","+numdoc;
  			}
			else{
				var numCouleur =  key.substring(5);
				var classNameCouleur = key;	
				
				tabDate[date]=numdoc;
			}
			
			// création du renderer
			eval(setCouleurRenderer(numCouleur));
			//association du renderer à la cellule correspondante	
			YAHOO.recherche.calendar.cal.addRenderer(date, eval(classNameCouleur));			
			
		}
	}
	// Affichage de la légende
	var tbodyLegende = document.getElementById("legende");
	tbodyLegende.style.display="block";
	if(bReponseCommune) {
		tabClassCouleur["class99"] = "Plusieurs documents";	
	}
	else
		YAHOO.util.Dom.setStyle("class99","display", "none");
	for(var key in tabClassCouleur){
		var szHexCodeCouleur;	
		var codeCouleur = getStyleClassProperty(key,"backgroundColor");
		var reg1=new RegExp("#[0-9ABCDEFabcdef]{3}$");
		var reg2=new RegExp("#[0-9ABCDEFabcdef]{6}$");
		// Firefox renvoit le code couleur au format rgb
		if (!codeCouleur.match(reg1) && !codeCouleur.match(reg2)) {
			szHexCodeCouleur = toRGBHex(codeCouleur);
		}
		else {
			szHexCodeCouleur =  codeCouleur;
		}	

		var idRadio=key+"-RADIO";
		var idLibelle=key+"-LIBELLE";
		var tdStyle = "background-color:"+	szHexCodeCouleur + ";";
		var tdRadioEl = document.getElementById(idRadio);
		var tdLibelleEl = document.getElementById(idLibelle);
		tdLibelleEl.innerHTML=tabClassCouleur[key];
// 		if (document.all) {
// 			tdRadioEl.style.setAttribute('cssText', tdStyle);
// 			tdLibelleEl.style.setAttribute('cssText', tdStyle);
// 		}
// 		else if(document.getElementById) {
// 			tdRadioEl.setAttribute("style", tdStyle);
// 			tdLibelleEl.setAttribute("style", tdStyle);
// 		}
		YAHOO.util.Dom.setStyle(tdRadioEl,"background-color", szHexCodeCouleur);
		//YAHOO.util.Dom.setStyle(tdLibelleEl,"background-color", szHexCodeCouleur);
	}
		
	
	YAHOO.recherche.calendar.cal.render(); 
}

	YAHOO.util.Event.onDOMReady(YAHOO.recherche.calendar.init);
