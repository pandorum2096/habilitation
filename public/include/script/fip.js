YAHOO.namespace("sesin.fip");
var tabView = null;
var logger = null;
var CptOnglet = 0;

function initEcranFip()
{
	parent.setTitle();
}

function init() {

    logger = new YAHOO.widget.LogReader("logger", {draggable:true, newestOnTop: false});   
    tabView = new YAHOO.widget.TabView('demo');
    logger.setTitle("Logger");
    YAHOO.log("message", "info", null);
    // créer les onglets
    for(var cpt=0; cpt<tabInitialOnglet.length;cpt++)
	{	
		var content = '<div id="fiche-parametree-' + cpt +'" class="fiche-parametree"></div>';
    	var href = "#tab" + CptOnglet;
		tabView.addTab( new YAHOO.widget.Tab({
		    label: tabInitialOnglet[cpt].libelle,
		    content: content,
 		    href : href,
		    active: false
     	}
		));
    	CptOnglet++;
	}
	// efface le premier onglet nécessaire à l'affichage initial
	tabView.removeTab(tabView.get('activeTab'));	
	tabView.set('activeIndex',0, true);
	
	AfficheRubriquesDansFiche();
    AfficheListeRubrique();
    AfficheListeObjetsDansFiche("regroupement", tabCompletRegroupement);
    AfficheListeObjetsDansFiche("libelle", tabInitialLibelle);
    AfficheListeObjetsDansFiche("listefichiers", tabInitialListeFichiers);
    AfficheListeObjetsDansFiche("clehier", tabCleHier);
    AfficheListeChampsSpeciaux();
    
}
//YAHOO.util.Event.onDOMReady(init);
YAHOO.util.Event.addListener(window, 'load', init);

function getObjFromEvent(evt)
{
    var obj;
    if (evt.srcElement)
        obj = evt.srcElement;
    else
    {
        var node = evt.target;
        while(node.nodeType != node.ELEMENT_NODE)
        	node = node.parentNode;
        obj = node;
    }
    
    return obj;
}

YAHOO.sesin.fip.DDRubrique = function(id, config) {
    YAHOO.sesin.fip.DDRubrique.superclass.constructor.apply(this, arguments);
    this.type = "rubrique";
};

YAHOO.sesin.fip.DDLibelle = function(id, config) {
    YAHOO.sesin.fip.DDLibelle.superclass.constructor.apply(this, arguments);
    this.type = "libelle";
};
 
YAHOO.sesin.fip.DDListeFichiers = function(id, config) {
    YAHOO.sesin.fip.DDListeFichiers.superclass.constructor.apply(this, arguments);
    this.type = "listefichiers";
};
 
YAHOO.sesin.fip.DDRegroupement = function(id, config) {
    YAHOO.sesin.fip.DDRegroupement.superclass.constructor.apply(this, arguments);
    this.type = "regroupement";
};

YAHOO.sesin.fip.DDCleHier = function(id, config) {
    YAHOO.sesin.fip.DDCleHier.superclass.constructor.apply(this, arguments);
    this.type = "clehier";
};

YAHOO.sesin.fip.DDObjetFip = function(id, config) {
    //this.type = "";
    this.container = config.container;
    var xyPositionInitiale;
    YAHOO.sesin.fip.DDObjetFip.superclass.constructor.apply(this, arguments);
};

YAHOO.extend(YAHOO.sesin.fip.DDObjetFip, YAHOO.util.DD, {

    container: null,
    init: function() {
        var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event;
        //Call the parent's init method
        YAHOO.sesin.fip.DDObjetFip.superclass.init.apply(this, arguments);
        
        //Get the element we are working on
        var el = this.getEl();
        //Get the xy position of it   
        this.xyPositionInitiale = Dom.getXY(el);
        
        //var obj = new YAHOO.util.Resize(this.id);
        var resize = new YAHOO.util.Resize(this.id);
        resize.on('endResize', function() {
            this.initConstraints();
        }, this, true);    
		resize.on('resize', function() {
			// en cours : restriction du resize aux dimmensions de la fiche paramétrée 	
 	        var Dom = YAHOO.util.Dom;
	        // position de la region containeur
	        var region = Dom.getRegion(this.container);
	        var el = this.getEl();  
	        var left = this.xyPositionInitiale[0] - region.left;
	        var top = this.xyPositionInitiale[1] - region.top;
        	var leftObj = parseInt(Dom.getX(el), 10);   
        	var topObj = parseInt(Dom.getY(el), 10); 
	 	    resize.set("maxWidth", widthFIP_PHP - leftObj + region.left);
	 	    resize.set("maxHeight", heightFIP_PHP - topObj + region.top);
				        
        }, this, true); 
		   
        this.initConstraints();
    },
    
    startDrag: function(x, y) {
         this.initConstraints();
    },
    
    // sélection d'un objet
    onMouseDown : function(ev) {
    	var regSelect = new RegExp("objet-dd-select");
		if(!regSelect.test(document.getElementById(this.id).className))
		{
		  if (this.type == "rubrique")
		      document.getElementById(this.id).className = "objet-dd objet-dd-rubrique objet-dd-select yui-resize";
		  else if (this.type == "regroupement")
		      document.getElementById(this.id).className = "objet-dd objet-dd-groupe objet-dd-select yui-resize";
		  else if (this.type == "libelle")
		      document.getElementById(this.id).className = "objet-dd objet-dd-libelle objet-dd-select yui-resize";
		  else if (this.type == "listefichiers")
		      document.getElementById(this.id).className = "objet-dd objet-dd-listefichiers objet-dd-select yui-resize";
            else if (this.type == "clehier")
		      document.getElementById(this.id).className = "objet-dd objet-dd-clehier objet-dd-select yui-resize";
            

        }
		else
		{
		    if (this.type == "rubrique")
                document.getElementById(this.id).className = "objet-dd objet-dd-rubrique objet-dd-non-select yui-resize";
            else if (this.type == "regroupement")
                document.getElementById(this.id).className = "objet-dd objet-dd-groupe objet-dd-non-select yui-resize";
            else if (this.type == "libelle")
                document.getElementById(this.id).className = "objet-dd objet-dd-libelle objet-dd-non-select yui-resize";
            else if (this.type == "listefichiers")
                document.getElementById(this.id).className = "objet-dd objet-dd-listefichiers objet-dd-non-select yui-resize";
            else if (this.type == "clehier")
                document.getElementById(this.id).className = "objet-dd objet-dd-clehier objet-dd-non-select yui-resize";
        }
    }, 
    
    // suppression du menu contextuel car anomalie
    // apres suppression d'une zone, les champs deplaces ne peuvent pas être repositionnés correctement
    // zone bloqué sur la gauche
    /*
    onAvailable : function(ev) {
    	// menu contextuel
        function onRubContextMenuClick(p_sType, p_aArgs) {
            //The second item in the arguments array (p_aArgs) passed back to the "click" event handler is the 
            // MenuItem instance that was the target of the "click" event.
            var oItem = p_aArgs[1], // The MenuItem that was clicked
            	oTarget = this.contextEventTarget;
            if (oItem) {
                switch (oItem.index) {
                    case 0:     // Supprimer
                        if (this.type == "rubrique")
                            SupprimerRubrique('selected');
                        else if (this.type == "listefichiers")
                            SupprimerListeFichiers('selected');
                        oRubContextMenu.destroy();
                    break;                                    
                }
            }
        }
        
        // Array of text labels for the MenuItem instances to be added to the ContextMenu instanc.
        var aMenuItemsRub = [document.principal.LIBELLE_MENU_CONTEXT_SUPP.value]; 
        // Instantiate a ContextMenu:  The first argument passed to the constructor is the id for the Menu element to be created, the second is an 
		//object literal of configuration properties.
        var oRubContextMenu = new YAHOO.widget.ContextMenu(
                                    "rubcontextmenu" + this.id,
                                    {
										trigger: this.id,
                                        itemdata: aMenuItemsRub,
										lazyload: true                                 
                                    } 
                                );
       
		    // "render" event handler for the context menu
	        function onContextMenuRender(p_sType, p_aArgs) {
	            //  Add a "click" event handler to the context menu
	            this.subscribe("click", onRubContextMenuClick);
	        }
	        // Add a "render" event handler to the context menu
	        oRubContextMenu.subscribe("render", onContextMenuRender);  
    },
    */
    
    endDrag: function(x, y) {
        if (this.type == "rubrique")
            document.getElementById(this.id).className = "objet-dd objet-dd-rubrique objet-dd-non-select yui-resize";
        else if (this.type == "regroupement")
            document.getElementById(this.id).className = "objet-dd objet-dd-groupe objet-dd-non-select yui-resize";
        else if (this.type == "libelle") 
            document.getElementById(this.id).className = "objet-dd objet-dd-libelle objet-dd-non-select yui-resize";
        else if (this.type == "listefichiers")
            document.getElementById(this.id).className = "objet-dd objet-dd-listefichiers objet-dd-non-select yui-resize";
        else if (this.type == "clehier")
            document.getElementById(this.id).className = "objet-dd objet-dd-clehier objet-dd-non-select yui-resize";
    },
    
    initConstraints: function() {
      
        var Dom = YAHOO.util.Dom;
        // position de la region containeur
        var region = Dom.getRegion(this.container);
        var el = this.getEl();
        var width = parseInt(Dom.getStyle(el, 'width'), 10);   
        var height = parseInt(Dom.getStyle(el, 'height'), 10);
        
        // calcul le déplacement possible à gauche à partir de la position initiale   
        var left = this.xyPositionInitiale[0] - region.left;
        var right = region.right - this.xyPositionInitiale[0] - width;
//         YAHOO.log("region.left:" + region.left + ",region.right:" + region.right + ", posX:" + this.xyPositionInitiale[0] + ",posY:" + this.xyPositionInitiale[1] + ",left:" + left + ",right:" + right, "info", null);            
//         YAHOO.log("width:" + width + ",height:" + height, "info", null);
        
        var top = this.xyPositionInitiale[1] - region.top;   
        var bottom = region.bottom - this.xyPositionInitiale[1] - height;   
        
        //Set the constraints based on the above calculations
        this.setXConstraint(left, right, 10);
        this.setYConstraint(top, bottom, 10);		
        YAHOO.log("Constraint left:" + left + ",right:" + right);
		YAHOO.log("Constraint top:" + top + ",bottom:" + bottom);  
    }
});

YAHOO.extend(YAHOO.sesin.fip.DDRubrique, YAHOO.sesin.fip.DDObjetFip, {   
});    
   
YAHOO.extend(YAHOO.sesin.fip.DDRegroupement, YAHOO.sesin.fip.DDObjetFip, {
});

YAHOO.extend(YAHOO.sesin.fip.DDLibelle, YAHOO.sesin.fip.DDObjetFip, {
});

YAHOO.extend(YAHOO.sesin.fip.DDCleHier, YAHOO.sesin.fip.DDObjetFip, {
});

YAHOO.extend(YAHOO.sesin.fip.DDListeFichiers, YAHOO.sesin.fip.DDObjetFip, {
});


YAHOO.sesin.fip.ObjetOnglet = function(libelle, dwCouleurFond) {
    this.libelle = libelle;
    this.dwCouleurFond = dwCouleurFond;
};
 
YAHOO.sesin.fip.ObjetFip = function(code, libelle, numOnglet, wX, wY, wDX, wDY, dwCouleurFond, dwCouleurTexte) {
    // type à initialiser en focntion de l'objet
    this.type = 0;
    this.code = code;
    this.libelle = libelle;
    // !! numOnglet est la partie numérique du href ("#tab0") de l'onglet !!
    // cette valeur correspond à l'ordre séquentiel de création
    this.numOnglet = numOnglet;
    if (numOnglet == -1)
        this.isAffiche = false;
    else
        this.isAffiche = true;
       
    // Normalisation par rapport à la taille du container
     this.wX = wX*(widthFIP_PHP)/parseInt(widthFIP_WIN);
	 this.wY = wY*(heightFIP_PHP)/parseInt(heightFIP_WIN);
     this.wDX = wDX*(widthFIP_PHP)/parseInt(widthFIP_WIN);
     // par défaut les libellès issus de ConfApps ont une taille de 13
     if (wDY < 20)
     {	wDY = 20;
     }
     this.wDY = wDY*(heightFIP_PHP)/parseInt(heightFIP_WIN);
     
     this.dwCouleurFond = dwCouleurFond;
     this.dwCouleurTexte = dwCouleurTexte;
     
     YAHOO.log("this.wX:" + this.wX + ",wX:" + wX + ",this.wY:" + this.wY + ",wY:" + wY, "info", null);
};

YAHOO.sesin.fip.Rubrique = function (code, libelle, numOnglet, wX, wY, wDX, wDY, dwCouleurFond, dwCouleurTexte) {
    YAHOO.sesin.fip.Rubrique.superclass.constructor.apply(this, arguments);
    this.type = "rubrique";
    this.isTableau = false;
}

YAHOO.sesin.fip.Regroupement = function (code, libelle, numOnglet, wX, wY, wDX, wDY, dwCouleurFond, dwCouleurTexte) {
    YAHOO.sesin.fip.Regroupement.superclass.constructor.apply(this, arguments);
    this.type = "regroupement";
}

YAHOO.sesin.fip.Libelle = function (code, libelle, numOnglet, wX, wY, wDX, wDY, dwCouleurFond, dwCouleurTexte) {
    YAHOO.sesin.fip.Libelle.superclass.constructor.apply(this, arguments);
    this.type = "libelle";
}

YAHOO.sesin.fip.ListeFichiers = function (code, libelle, numOnglet, wX, wY, wDX, wDY, dwCouleurFond, dwCouleurTexte) {
    YAHOO.sesin.fip.ListeFichiers.superclass.constructor.apply(this, arguments);
    this.type = "listefichiers";
}

YAHOO.sesin.fip.CleHier = function (code, libelle, numOnglet, wX, wY, wDX, wDY, dwCouleurFond, dwCouleurTexte) {
    YAHOO.sesin.fip.CleHier.superclass.constructor.apply(this, arguments);
    this.type = "clehier";
}

YAHOO.sesin.fip.ObjetFip.prototype.getInfo = function() {
    return this.code + ' ' + this.libelle;
};

YAHOO.sesin.fip.ObjetFip.prototype.setAffiche = function(isAffiche) {
    this.isAffiche = isAffiche;
};

// GG : ne fonctionne pas
YAHOO.sesin.fip.ObjetFip.prototype.getAffiche = function() {
    return this.isAffiche;
};

YAHOO.extend(YAHOO.sesin.fip.Rubrique, YAHOO.sesin.fip.ObjetFip, {
});

YAHOO.extend(YAHOO.sesin.fip.Regroupement, YAHOO.sesin.fip.ObjetFip, {
});

YAHOO.extend(YAHOO.sesin.fip.Libelle, YAHOO.sesin.fip.ObjetFip, {
});

YAHOO.extend(YAHOO.sesin.fip.ListeFichiers, YAHOO.sesin.fip.ObjetFip, {
});

YAHOO.extend(YAHOO.sesin.fip.CleHier, YAHOO.sesin.fip.ObjetFip, {
});

/**
 * Affiche la liste des rubriques dans la liste déroulante à partir du tableau contenant
 * l'ensemble des rubriques
 * Les rubriques déjà affichées dans un onglet ne sont pas proposées dans la liste  
 */ 
function AfficheRubriquesDansFiche()
{
    // le premier onglet existe toujours : on utilise celui-ci pour obtenir les coordonnées
    //var objContainer = document.getElementById("fiche-parametree-" + tabView.get('activeIndex'));
    var objContainer = document.getElementById("fiche-parametree-" + "0");
    for(var a in tabCompletRubrique)
    {
        if (tabCompletRubrique[a].isAffiche)
        {	
            var objDiv = AfficheRubriqueDansOnglet(tabCompletRubrique[a]);
        }
    }
}


function CreerObjetDansOnglet(objFip)
{
    var newDiv = document.createElement("div");
	newDiv.id = objFip.code;
    var type = objFip.type;
	if (type == "rubrique")
        newDiv.className = "objet-dd objet-dd-rubrique";
    else if (type == "libelle")
        newDiv.className = "objet-dd objet-dd-libelle";
    else if (type == "listefichiers")
        newDiv.className = "objet-dd objet-dd-listefichiers";
    else if (type == "regroupement")
        newDiv.className = "objet-dd objet-dd-groupe";
    else if (type == "clehier")
        newDiv.className = "objet-dd objet-dd-clehier";
   
   //newDiv.innerHTML = libelleDivRubrique;
    newDiv.style.left = objFip.wX + "px";
    newDiv.style.top = objFip.wY + "px";
    newDiv.style.width = objFip.wDX + "px";
    newDiv.style.height = objFip.wDY + "px";
    
    var newParagraphe = document.createElement("p");
    if (type == "rubrique")
        newParagraphe.className = "objet-dd-rubrique";
    else if (type == "libelle")
        newParagraphe.className = "objet-dd-libelle";
    else if (type == "listefichiers")
        newParagraphe.className = "objet-dd-listefichiers";
    else if (type == "regroupement")
        newParagraphe.className = "objet-dd-groupe";
    else if (type == "clehier")
        newParagraphe.className = "objet-dd-clehier";
    
    var libelle = document.createTextNode(objFip.libelle);
    newParagraphe.appendChild(libelle);
    newDiv.appendChild(newParagraphe);
	
    var idObjContainer = "fiche-parametree-" + objFip.numOnglet;
    document.getElementById(idObjContainer).appendChild(newDiv);
    return newDiv;
    
}

function AfficheRubriqueDansOnglet(objRubrique)
{
    if (!objRubrique.isAffiche)
        objRubrique.numOnglet = recupPosOnglet();	
    
    var newDiv = CreerObjetDansOnglet(objRubrique);
    var idObjContainer = "fiche-parametree-" + objRubrique.numOnglet;
	var dd4 = new YAHOO.sesin.fip.DDRubrique(newDiv.id, {container: idObjContainer});
	// l'objet existe déjà dans le tableau, changement d'état
    tabCompletRubrique[newDiv.id].isAffiche = true;
    tabCompletRubrique[newDiv.id].numOnglet = objRubrique.numOnglet;
	return newDiv;
}

function AfficheListeObjetsDansFiche(type, tableauObj)
{
    var objContainer = document.getElementById("fiche-parametree-" + "0");
	for(var a in tableauObj)
    {		
		var region = YAHOO.util.Dom.getRegion(objContainer);	
        if (tableauObj[a].isAffiche)
        {
            var region = YAHOO.util.Dom.getRegion(objContainer);
            var objDiv = AfficheObjetDansOnglet(tableauObj[a]);
        }
    }
}


function onClicAjouterRegroupement()
{
	var titre = prompt("Saisissez le titre du regroupement :", "Titre")
    if (titre && titre.length > 0) {
    	var idDivRegroupement = "groupe_" + iNbObj;
	    iNbObj++;
	    var posOnglet = recupPosOnglet();
        var objGroupe = new YAHOO.sesin.fip.Regroupement(idDivRegroupement, titre, posOnglet, 20, 40, 200, 30, 16777216, 0);
	    var newDiv = AfficheObjetDansOnglet(objGroupe);
        tabCompletRegroupement[idDivRegroupement] = objGroupe;
	}
}

function CreerObjetFip(type, idDiv, idObjContainer)
{
    if (type== "regroupement")
        var dd = new YAHOO.sesin.fip.DDRegroupement(idDiv, {container: idObjContainer}); 
    else if (type== "listefichiers")
        var dd = new YAHOO.sesin.fip.DDListeFichiers(idDiv, {container: idObjContainer});
    else if (type== "libelle")
        var dd = new YAHOO.sesin.fip.DDLibelle(idDiv, {container: idObjContainer});
    else if (type== "clehier")
        var dd = new YAHOO.sesin.fip.DDCleHier(idDiv, {container: idObjContainer});
}

function AfficheObjetDansOnglet(objFip)
{
    var newDiv = CreerObjetDansOnglet(objFip);
    var idObjContainer = "fiche-parametree-" + objFip.numOnglet;
    CreerObjetFip(objFip.type, newDiv.id, idObjContainer)
    return newDiv;
}

/**
 * Affiche la liste des rubriques dans la liste déroulante à partir du tableau contenant
 * l'ensemble des rubriques
 * Les rubriques déjà affichées dans un onglet ne sont pas proposées dans la liste  
 */ 
function AfficheListeRubrique()
{
    var objSelectRubrique = document.getElementById("liste-rubriques");
    objSelectRubrique.options.length = 0;
    for(var a in tabCompletRubrique)
    {
        if (!tabCompletRubrique[a].isAffiche)
        {
            var nouvel_element = new Option(tabCompletRubrique[a].libelle, tabCompletRubrique[a].code, false, false);
 		    objSelectRubrique.options[objSelectRubrique.options.length] = nouvel_element;
        }
    }
}

function getLengthAssociativeArray(tab)
{
    var iNumberElements = 0;
    for (var a in tab)
    {
        iNumberElements++;
    }
    return iNumberElements;
}

/**
 * Affiche la liste des Champs Speciaux dans la liste déroulante 
 */ 
function AfficheListeChampsSpeciaux()
{
    var objSelectRubrique = document.getElementById("liste-champs-speciaux");
    objSelectRubrique.options.length = 0;
    var nouvel_element;
    // liste de fichiers : il ne peut y en avoir qu'un
    if (getLengthAssociativeArray(tabInitialListeFichiers) == 0)
    {
        nouvel_element = new Option(document.getElementById("LIBELLE_LISTEFICHIERS").value, "109", false, false);
     	objSelectRubrique.options[objSelectRubrique.options.length] = nouvel_element;
    }
    // Clé hiérarchique : elle doit être déjà paramétrée et il ne peut y en avoir qu'une dans le template
    if (isCleHier && getLengthAssociativeArray(tabCleHier) == 0)
    {
        nouvel_element = new Option(document.getElementById("LIBELLE_CLEHIER").value, "103", false, false);
 	    objSelectRubrique.options[objSelectRubrique.options.length] = nouvel_element;
    }
                                      
    nouvel_element = new Option(document.getElementById("LIBELLE_TEXTE").value, "105", false, false);
 	objSelectRubrique.options[objSelectRubrique.options.length] = nouvel_element;
    nouvel_element = new Option(document.getElementById("LIBELLE_GROUPE").value, "102", false, false);
 	objSelectRubrique.options[objSelectRubrique.options.length] = nouvel_element;
}


function onClicAjouterRubrique()
{	
    var indexRubrique = document.getElementById("liste-rubriques").selectedIndex;
    var idDivRubrique = document.getElementById("liste-rubriques").options[indexRubrique].value;
    var textDivRubrique = document.getElementById("liste-rubriques").options[indexRubrique].text;
	// récupération de la partie libelle
	var reg = new RegExp(" - ", "g");
	var szSousChaines = textDivRubrique.split(reg);
	var szChaine =  szSousChaines[0] + " - ";
	var libelleRub = textDivRubrique.replace(szChaine, "");
	var posOnglet = recupPosOnglet();
    tabCompletRubrique[idDivRubrique].wX = 40;
    tabCompletRubrique[idDivRubrique].wY = 60;
    if (tabCompletRubrique[idDivRubrique].isTableau)
    {
        tabCompletRubrique[idDivRubrique].wDX = 400;
        tabCompletRubrique[idDivRubrique].wDY = 50;
    }
    else
    {
        tabCompletRubrique[idDivRubrique].wDX = 200;
        tabCompletRubrique[idDivRubrique].wDY = 20;
    }

	AfficheRubriqueDansOnglet(tabCompletRubrique[idDivRubrique]);
    // affichage de l'objet libelle si rubrique non tableau
    if (!tabCompletRubrique[idDivRubrique].isTableau)
    {
    	var idDivLibelle = "libelle_" + iNbObj;		  	
    	iNbObj++;
        var objLibelle = new YAHOO.sesin.fip.Libelle(idDivLibelle, libelleRub, posOnglet, 20, 40, 200, 20, 16777216, 0);
    	var newDiv = AfficheObjetDansOnglet(objLibelle);
    	tabInitialLibelle[idDivLibelle] = objLibelle;
    }
	// actualisation de la liste des rubriques du type hors fiche paramétrée
	AfficheListeRubrique();
	
}

function onClicAjouterLibelle()
{
	var titre = prompt("Saisissez le titre du libellé :", "Titre")
    if (titre && titre.length > 0) {
		var idDivLibelle = "libelle_" + iNbObj;		  	
	    iNbObj++;
	    var posOnglet = recupPosOnglet();
        var objLibelle = new YAHOO.sesin.fip.Libelle(idDivLibelle, titre, posOnglet, 20, 40, 200, 20, 16777216, 0);
	    var newDiv = AfficheObjetDansOnglet(objLibelle);
	    tabInitialLibelle[idDivLibelle] = objLibelle;
	}
}

function onClicAjouterChampsSpeciaux()
{
    var typeObj = document.getElementById('liste-champs-speciaux').value;
    if (typeObj == "109")
    {
        onClicAjouterListeFichiers();
    }
    if (typeObj == "103")
    {
        onClicAjouterCleHier();
    }
    if (typeObj == "105")
    {
        onClicAjouterLibelle();
    }
    if (typeObj == "102")
    {
        onClicAjouterRegroupement();
    }
}


function SupprimerListeObjetsDansOngletCourant(mode, tableauObj)
{
    var iNbObjSuppr = 0;
	var posOnglet = recupPosOnglet();
    var idObjContainer = "fiche-parametree-" + posOnglet;
    var divFicheParametree = document.getElementById(idObjContainer);
    for(var a in tableauObj)
    {  
        if (tableauObj[a].isAffiche && tableauObj[a].numOnglet == posOnglet)
        {	 
            var obj = document.getElementById(a);
            if ((mode == 'selected' && obj.className.indexOf("objet-dd-select") >= 0) || mode == 'all')
            {  
                if (mode == 'all' || confirm("Voulez-vous supprimer l'objet " + tableauObj[a].libelle + " ?"))
                {
                    divFicheParametree.removeChild(obj);
                    tableauObj[a].isAffiche = false;
                    iNbObjSuppr++;
                }
 	  	    }
        }
    }
    return iNbObjSuppr;
}


function onClicAjouterCleHier()
{
	var posOnglet = recupPosOnglet();
	var idCleHier = "cle_" + iNbObj;		  	
    iNbObj++;      
    var objCleHier = new YAHOO.sesin.fip.CleHier(idCleHier, document.getElementById("LIBELLE_CLEHIER").value, posOnglet, 
                     20, 40, 200, 20, 16777216, 0);
	var newDiv = AfficheObjetDansOnglet(objCleHier);
	tabCleHier[newDiv.id] = objCleHier;
    AfficheListeChampsSpeciaux();
}

function onClicAjouterListeFichiers()
{
	var posOnglet = recupPosOnglet();
	var bListeFichiers = false;
	var idDivListeFichiers = "listefichiers_" + iNbObj;		  	
    iNbObj++;
    var objListeFichiers = new YAHOO.sesin.fip.ListeFichiers(idDivListeFichiers, document.getElementById("LIBELLE_LISTEFICHIERS").value, posOnglet, 
                    20, 40, 100*(widthFIP_PHP)/parseInt(widthFIP_WIN), 200*(heightFIP_PHP)/parseInt(heightFIP_WIN), 16777216, 0);
	var newDiv = AfficheObjetDansOnglet(objListeFichiers);
	tabInitialListeFichiers[newDiv.id] = objListeFichiers;
    AfficheListeChampsSpeciaux();
}


function onClicSupprimerSelectedObjets()
{	
    SupprimerTousObjetsDansOngletCourant('selected');
}

function SupprimerTousObjetsDansOngletCourant(mode)
{
    var iNbElement = 0;
    iNbElement = SupprimerListeObjetsDansOngletCourant(mode, tabInitialListeFichiers);
    if (iNbElement != 0)
        tabInitialListeFichiers = new Array();
    
    iNbElement = SupprimerListeObjetsDansOngletCourant(mode, tabCleHier);
    if (iNbElement != 0)
        tabCleHier = new Array();
    
    SupprimerListeObjetsDansOngletCourant(mode, tabCompletRegroupement);
    SupprimerListeObjetsDansOngletCourant(mode, tabInitialLibelle);
    AfficheListeChampsSpeciaux();
    
    SupprimerListeObjetsDansOngletCourant(mode, tabCompletRubrique);
    AfficheListeRubrique();
}

function SupprimerRegroupement(mode)
{
    SupprimerListeObjetsDansOngletCourant(mode, tabCompletRegroupement);
}


function AjouterOnglet()
{
    // GG : le fait de préciser active : true permet d'afficher l'onglet courant mais ne le marque pas comme
    // l'onglet sélectionné.
    // PL : sous Firefox 7.0.1, fonctionnement correct
    var saisie = prompt("Saisissez le titre de l'onglet :", "Titre")
    if (saisie && saisie.length > 0) {
        var titre = saisie;
        var href = "#tab" + CptOnglet;
        var numFiche = CptOnglet;
        CptOnglet++;
        var content = '<div id="fiche-parametree-' + numFiche + '" class="fiche-parametree"></div>'
        tabView.addTab( new YAHOO.widget.Tab({
        label: titre,
        href: href,
        content: content,
        active: true
        }), tabView.get('activeIndex') +1);
        // rends actif l'onglet ajouté
        tabView.set('activeIndex',tabView.get('activeIndex') + 1, true);
       if(tabView.get('tabs').length > 1)
		document.getElementById('SuppOngletBouton').disabled=false; 
    }
}

function SupprimerOnglet()
{
	if(parent.posMessageBoxConfirm(document.principal.MESSAGE_SUPP_ONGLET.value))
	{
        SupprimerTousObjetsDansOngletCourant('all');	
		tabView.removeTab(tabView.get('activeTab'));
		if(tabView.get('tabs').length == 1)
			document.getElementById('SuppOngletBouton').disabled=true;
	}
}

function RenommerOnglet()
{
    var saisie = prompt("Saisissez le nouveau titre de l'onglet :", "Titre");
	if (saisie && saisie.length > 0) {
        var titre = saisie;               
    	tabView.get('activeTab').set('label', titre, true);
    }
}

function recupPosOnglet()
{
	return tabView.get('activeTab').get("href").substring(4);
}

////////////////////////////////////////////////////////////////////////////////

function GetCoordonneesRub()
{
    var s = "";
    var Dom = YAHOO.util.Dom;
    for(var a in tabCompletRubrique)
    {
            var obj = document.getElementById(a);
            
            var top = 0;
            var left = 0;
            if (tabCompletRubrique[a].isAffiche)
			{
				top = parseInt(Dom.getStyle(obj, 'top'), 10);   
        		left = parseInt(Dom.getStyle(obj, 'left'), 10);
			}
            
            var width = 0;
            var height = 0;
            if (tabCompletRubrique[a].isAffiche)
			{
				width = parseInt(Dom.getStyle(obj, 'width'), 10);   
        		height = parseInt(Dom.getStyle(obj, 'height'), 10);
			}
            s += a + " wDX : " + width + " wDY : " + height + " wX : " + left + " wY : " + top +  "   onglet : " + tabCompletRubrique[a].numOnglet +  " " + tabCompletRubrique[a].isAffiche +"\n";
    }
    alert(s);
}
function GetCoordonneesReg()
{
    var s = "";
    var Dom = YAHOO.util.Dom;
    for(var a in tabCompletRegroupement)
    {
		var obj = document.getElementById(a);
		
		var top = parseInt(Dom.getStyle(obj, 'top'), 10);   
    	var left = parseInt(Dom.getStyle(obj, 'left'), 10);
    	
		var	width = parseInt(Dom.getStyle(obj, 'width'), 10);   
        var	height = parseInt(Dom.getStyle(obj, 'height'), 10);
        
        s += a + " wDX : " + width + " wDY : " + height + " wX : " + left + " wY : " + top +   "  " +tabCompletRegroupement[a].libelle +  " " + "   onglet : " + tabCompletRegroupement[a].numOnglet +  " " + tabCompletRegroupement[a].isAffiche +"\n";

    }
    alert(s);
}

function GetInfosOnglet()
{
	var s = "Onglet :\n";
	for (var i=0; i<tabView.get('tabs').length; i++)
	{
		s += "position : " + i + " href " + tabView.get('tabs')[i].get("href").substring(4) + "   label : " + tabView.get('tabs')[i].get('label') + "\n";
	}
	alert(s);
}

//////////////////////////////////////////////////////////////////////////////////

// Construit le tableau des correspondances Href des onglets et leur position
function ConstruitTabHrefPosOnglet()
{
	var tabHrefPosOnglet = new object();
	var iIndHref = 0;
	for (var i=0; i<tabView.get('tabs').length; i++)
	{
		iIndHref = tabView.get('tabs')[i].get("href").substring(4);
		tabHrefPosOnglet[iIndHref] = i;
	}
}

var SENS_CLIENT2SERVEUR = 1;
var SENS_SERVEUR2CLIENT = 2;
var TYPE_COORD_ABSCISSE = 1;
var TYPE_COORD_ORDONNEE = 2;
function ConvertCoordonnees(coordonnee, sensConversion, typeCoordonnee)
{
    var coordConvertie = coordonnee;
    if (sensConversion == SENS_CLIENT2SERVEUR)
    {
        if (typeCoordonnee == TYPE_COORD_ABSCISSE)
            coordConvertie = Math.ceil(coordonnee * widthFIP_WIN/widthFIP_PHP);
        else
            coordConvertie = Math.ceil(coordonnee * heightFIP_WIN/heightFIP_PHP);
    }
    return coordConvertie;
}


YAHOO.sesin.fip.ObjetFipVulcain = function(wTypeVal, wNumPage, wX, wY, wDX, wDY, dwStyle, dwCouleurFond, dwCouleurTexte, szLibelle) {
    
    this.wTypeVal = wTypeVal;
    this.wNumPage = wNumPage;
    this.wX = wX;
    this.wY = wY;
    this.wDX = wDX;
    this.wDY = wDY;
    this.dwStyle = dwStyle;
    this.dwCouleurFond = dwCouleurFond;
    this.dwCouleurTexte = dwCouleurTexte;
    this.szLibelle = szLibelle;
};

// Tableau des objets (rubriques, onglets, regroupements).
// Il sera transformé en chaine JSON est envoyé par le formulaire 
function ConstruitTabTousObjFip(tabTousObjFip)
{
	var Dom = YAHOO.util.Dom;
	var top = 0;
	var left = 0;
	var width = 0;
	var height = 0;
	var objFip;
	
	// Fiche paramétrée
	objFip = new YAHOO.sesin.fip.ObjetFipVulcain(101, 0, 0, 0, parseInt(widthFIP_WIN), parseInt(heightFIP_WIN), 0, 0, 0, "");
	tabTousObjFip.push(objFip);
	
	// onglets
	//Construit le tableau des correspondances Href des onglets et leur position
	var tabHrefPosOnglet = new Object();
	var iIndHref = 0;
		
	for (var i=0; i<tabView.get('tabs').length; i++)
	{
		iIndHref = tabView.get('tabs')[i].get("href").substring(4);
		tabHrefPosOnglet[iIndHref] = i;
		objFip = new YAHOO.sesin.fip.ObjetFipVulcain(106, i, 0, 0, 0, 0, 0, 0, 0, tabView.get('tabs')[i].get("label"));
        tabTousObjFip.push(objFip);
        
        // si l'onglet existait avant modif, on récupère la couleur de fond.
        if (iIndHref <tabInitialOnglet.length && tabInitialOnglet[iIndHref].dwCouleurFond != 0)
        {
            // le style est à 2 dans le client windows, on met la même valeur
            objFip = new YAHOO.sesin.fip.ObjetFipVulcain(107, i, 0, 0, 0, 0, 2,  tabInitialOnglet[iIndHref].dwCouleurFond, 0, "");
            tabTousObjFip.push(objFip);
        }
	}
	
	// rubriques
	for(var a in tabCompletRubrique)
    {
        var objRub = document.getElementById(a);
        if (tabCompletRubrique[a].isAffiche)
		{
            var codeObj = tabCompletRubrique[a].isTableau ? 104 : 100;	
		    objFip = new YAHOO.sesin.fip.ObjetFipVulcain(codeObj, tabHrefPosOnglet[tabCompletRubrique[a].numOnglet], 
                    ConvertCoordonnees(parseInt(Dom.getStyle(objRub, 'left'), 10), SENS_CLIENT2SERVEUR, TYPE_COORD_ABSCISSE), 
                    ConvertCoordonnees(parseInt(Dom.getStyle(objRub, 'top'), 10), SENS_CLIENT2SERVEUR, TYPE_COORD_ORDONNEE), 
                    ConvertCoordonnees(parseInt(Dom.getStyle(objRub, 'width'), 10), SENS_CLIENT2SERVEUR, TYPE_COORD_ABSCISSE), 
                    ConvertCoordonnees(parseInt(Dom.getStyle(objRub, 'height'), 10), SENS_CLIENT2SERVEUR, TYPE_COORD_ORDONNEE), 
                    0, tabCompletRubrique[a].dwCouleurFond, tabCompletRubrique[a].dwCouleurTexte, tabCompletRubrique[a].code);
		    tabTousObjFip.push(objFip);
		} 
	}
	ConstruitTabObjFipTab(tabTousObjFip, tabInitialLibelle, 105, tabHrefPosOnglet);
	ConstruitTabObjFipTab(tabTousObjFip, tabInitialListeFichiers, 109, tabHrefPosOnglet);
	ConstruitTabObjFipTab(tabTousObjFip, tabCompletRegroupement, 102, tabHrefPosOnglet);
    ConstruitTabObjFipTab(tabTousObjFip, tabCleHier, 103, tabHrefPosOnglet);
}

function ConstruitTabObjFipTab(tabTousObjFip, tableauObj, codeFip, tabHrefPosOnglet)
{
    //	regroupements
	for(var a in tableauObj)
    {
		var objReg = document.getElementById(a);
		if (tableauObj[a].isAffiche)
		{
		  objFip = new YAHOO.sesin.fip.ObjetFipVulcain(codeFip, tabHrefPosOnglet[tableauObj[a].numOnglet], 
                ConvertCoordonnees(parseInt(YAHOO.util.Dom.getStyle(objReg, 'left'), 10), SENS_CLIENT2SERVEUR, TYPE_COORD_ABSCISSE), 
                ConvertCoordonnees(parseInt(YAHOO.util.Dom.getStyle(objReg, 'top'), 10), SENS_CLIENT2SERVEUR, TYPE_COORD_ORDONNEE), 
                ConvertCoordonnees(parseInt(YAHOO.util.Dom.getStyle(objReg, 'width'), 10), SENS_CLIENT2SERVEUR, TYPE_COORD_ABSCISSE), 
                ConvertCoordonnees(parseInt(YAHOO.util.Dom.getStyle(objReg, 'height'), 10), SENS_CLIENT2SERVEUR, TYPE_COORD_ORDONNEE), 
                0, tableauObj[a].dwCouleurFond, tableauObj[a].dwCouleurTexte, tableauObj[a].libelle);
            tabTousObjFip.push(objFip);
		}  	  
    }
}

function lancerFormulaire()
{
	var tabTousObjFip = new Array();
 	ConstruitTabTousObjFip(tabTousObjFip);
    for (var a in tabTousObjFip)
    {
        tabTousObjFip[a].szLibelle = replaceAll(tabTousObjFip[a].szLibelle,  "\"", "@@@");
    }
    YAHOO.lang.JSON.useNativeStringify = false;
    var tabObjFipText = YAHOO.lang.JSON.stringify(tabTousObjFip);
    document.principal.POS_TAB_TOUS_OBJETS_JSON_STRING.value = tabObjFipText;
	return true;

}

function getStyleClass (className) {
	var re = new RegExp("\\." + className + "$", "gi");
	// IE
	if (document.all) {
		for (var s = 0; s < document.styleSheets.length; s++)
  			for (var r = 0; r < document.styleSheets[s].rules.length; r++)
    			if (document.styleSheets[s].rules[r].selectorText 
                    && document.styleSheets[s].rules[r].selectorText.search(re) != -1) {
     			 return document.styleSheets[s].rules[r].style;
    			}
	}
	// Naviagateur supportant DHTML officiel
	else if (document.getElementById) {
		for (var s = 0; s < document.styleSheets.length; s++)
  			for (var r = 0; r < document.styleSheets[s].cssRules.length; r++)
    			if (document.styleSheets[s].cssRules[r].selectorText && 
                    document.styleSheets[s].cssRules[r].selectorText.search(re) != -1) {
      				document.styleSheets[s].cssRules[r].sheetIndex = s;
      				document.styleSheets[s].cssRules[r].ruleIndex = s;
      				return document.styleSheets[s].cssRules[r].style;
    			}
	}
	return null;
}

function getStyleClassProperty (className, propertyName) {
	var styleClass = getStyleClass(className);
	if (styleClass)
		return styleClass[propertyName];
	else 
		return null;
}
