// JavaScript Document
// function debug(szMessage)
// {
// 	document.getElementById("infos").value += szMessage;
// }
// DataTable costruite sur la table HTML
var dataTable;

(function() {

var Dom = YAHOO.util.Dom;
var Event = YAHOO.util.Event;
var RecordSet = YAHOO.widget.RecordSet;



// Objet s�lectionn� sont des draggables DDProxy 
var multiDD = new Array();
//Drag multiple
var	multi = false;

// tableau index� des id s�lectionn� � dragg�
var toDragIdTab = new Array();
// tableau associatif key:position initiale value: data de la ligne � dragger
var toDragDataTab = new Array();

// Texte du div interm�diaire dragg�
var draggedLibelle = "";

//////////////////////////////////////////////////////////////////////////////
//Drag and Drop de ligne d'un table HTML repr�sent�e dans une DataTable
//Apr�s s�lection et drag, on ins�re de nouvelles lgnes avec les donn�es
// de celles s�lectionn�es et dragg�es et on efface ces derni�res
//////////////////////////////////////////////////////////////////////////////
// example app
//////////////////////////////////////////////////////////////////////////////
YAHOO.example.DDApp = {

    init: function() {

        // recuperere les donn�es construite par le serveur (php/servlet)    	    	
		var myColumnDefs = myColumnDefstmp;
		var myData = myDatatmp;
                
        this.myDataSource = new YAHOO.util.DataSource(myData); 
	    this.myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY; 
	    this.myDataSource.responseSchema = myfields; 
		dataTable = new YAHOO.widget.DataTable("table-numerotation", myColumnDefs, this.myDataSource,{caption:"",initialLoad:true});
        
    // Abonnement des lignesaux �venements de survol
 		dataTable.subscribe("rowMouseoverEvent", dataTable.onEventHighlightRow);
  		dataTable.subscribe("rowMouseoutEvent", dataTable.onEventUnhighlightRow);
	
	// Si click sur ent�tes de colonne
   		dataTable.unsubscribe('theadCellClickEvent',dataTable.onEventSortColumn);
	   	dataTable.subscribe('theadCellClickEvent',function(ev) {
		    dataTable.onEventSortColumn(ev);
			multiDD = new Array();
	 	//	On recr�� les draggables
 			var j=0;
			var tmpTrRecord = dataTable.getRecord(j); 
 			while (tmpTrRecord != null) {
 			    // recr�ation des draggables pour chaque ligne
				tmpTrRecordId = tmpTrRecord.getId();
				multiDD[tmpTrRecordId] = new YAHOO.example.DDListMulti(tmpTrRecordId, "default", { 
               				dragElId: "multiDrag-proxy"
            				}); 																 					
                j++;
			     tmpTrRecord = dataTable.getRecord(j); 		
			}
		});
	  
        
    // Cr�ation initiale des draggables pour chaque ligne du tableau 
        var j=0;       
        var tmpTrRecord = dataTable.getRecord(j);
        
        while (tmpTrRecord != null) {
        	tmpTrRecordId = tmpTrRecord.getId();
        	
			multiDD[tmpTrRecordId] = new YAHOO.example.DDListMulti(tmpTrRecordId, "default", { 
	               				dragElId: "multiDrag-proxy"
	            				});					
 			j++;
 			tmpTrRecord = dataTable.getRecord(j); 		
		}
		

		// fonction associ�e � s�lection multiple (l'abonnement se fait dans YAHOO.ymod.tableExtension.setup)
		// Il n'y a pas besoin de s�lection simple du fait de �v�nement mousedown sur le draggable.
   		YAHOO.ymod.tableExtension.setup(dataTable, function()
		{

		   var selectedRows = dataTable.getSelectedRows();

		   var tmpId;
		   var position;
		   
		   // index du tableau des id des lignes dragg�es
		   var cpt = 0;
		   var toDragDataTabTmp = new Array();
		   toDragDataTab = new Array();
		   toDragIdTab = new Array();
		   
    		for(var i=0;i<selectedRows.length;i++)
    		{
                multi = true;
                // id de la ligne s�lectionn�
                tmpId = selectedRows[i];
                // si s�lectionn� on stocke son id (RecordId) dans toDragIdTab
                
                // position de la ligne
                position = dataTable.getTrIndex(tmpId);
                // on stocke l'id pour pouvoir  apr�s insertion des nouvelles lignes
                // effacer les anciennes
                toDragIdTab[cpt++] = tmpId;		   					
                // la position donn� par l'id donne le record
                // on acc�de au donn�es des cellules de la ligne
                tmpTrRecord = dataTable.getRecord(position);
                var data =  tmpTrRecord.getData();
                
                // on stocke dans le tableau associatif
                //key:position initiale value: data de la ligne � dragger
                toDragDataTabTmp[position] = data;
    		}
    		var cpt = 0;
    		// tri selon les cles (=position)
    		toDragDataTabTmpSorted = ksort(toDragDataTabTmp);
    		//tableau ind�x� des data des lignes � ajout�es
    		for(var i in toDragDataTabTmpSorted)
    			toDragDataTab[cpt++] = toDragDataTabTmpSorted[i];

    	});
    }//,
    
//     clearDebug: function() {
// 		Dom.get("infos").value = "";
// 	}
		
};


YAHOO.example.DDListMulti = function(id, sGroup, config) {

    YAHOO.example.DDListMulti.superclass.constructor.call(this, id, sGroup, config);

    this.logger = this.logger || YAHOO;
    this.goingUp = false;
    this.lastY = 0;
    var destElId = null;
};

YAHOO.extend(YAHOO.example.DDListMulti, YAHOO.util.DDProxy, {

    startDrag: function(x, y) {
        this.logger.log(this.id + " startDrag");
		var proxy = this.getDragEl();
		Dom.setStyle(proxy, "visibility", "");
		Dom.setStyle(proxy, "backgroundColor", "");
        Dom.setStyle(proxy, "z-index", "5");
		var positionDragged = dataTable.getTrIndex(this.id);
		tmpTrRecordDragged = dataTable.getRecord(positionDragged);	
		var dataDragged = tmpTrRecordDragged.getData();
		// ces valeurs n'ont pas �t� initialis� dans  la fonction associ�e � la selection multiple
		if (multi == false) {
			toDragIdTab[0] = this.id;
  		   	toDragDataTab[0] = dataDragged;
		}
		
		draggedLibelle = dataToString(dataDragged);
		var draggedEl =  Dom.get("label");
		draggedEl.innerHTML= draggedLibelle;
    },

    endDrag: function(e) {
    	
    	  	
        var targetRow = dataTable.getTrIndex(destElId) +1;
		dataTable.addRows(toDragDataTab,parseInt(targetRow));
		dataTable.render();
		// d�l�tion des anciennes lignes � partir du tableau de leur id	
        for (var i=0;i<toDragIdTab.length;i++) {
        	tmpId = toDragIdTab[i];
			var pos =  dataTable.getTrIndex(tmpId);
			dataTable.deleteRow(pos);
        }
     
        toDragDataTab = new Array();
        toDragIdTab = new Array();
        multi = false;
        multiDD = new Array();
       
		 // !!!!! faire une fonction car on passe d�ja par l� dans l'init de l'appli		
 		var j=0;
 		var tmpTrRecord = dataTable.getRecord(j); 
 		while (tmpTrRecord != null) {
 			// recr�ation des draggables pour chaque ligne apr�s un drag and drop
 			
 			tmpTrRecordId = tmpTrRecord.getId();
 			multiDD[tmpTrRecordId] = new YAHOO.example.DDListMulti(tmpTrRecordId, "default", { 
 	               				dragElId: "multiDrag-proxy"
 	            				}); 																 					
 			j++;
  			tmpTrRecord = dataTable.getRecord(j); 		
 		}
		
		
    },

 onDragEnter: function(e, id) {
		var proxy =  Dom.get("multidrag-proxy");
     	Dom.setStyle(proxy, "opacity", 0.67);
  		var srcEl = this.getEl();
      
  		var destEl =Dom.get(id);
  		Dom.replaceClass(destEl,YAHOO.widget.DataTable.CLASS_DATA,YAHOO.widget.DataTable.CLASS_HIGHLIGHTED);
		destElId = id;
  		var targetRow = dataTable.getTrIndex(destElId);
  		
  		Dom.setStyle(destElId, "opacity", 0.67);
    },


    onDragOver: function(e, id) {
		var proxy =  Dom.get("multidrag-proxy");
     	Dom.setStyle(proxy, "opacity", 0.67);
  		var srcEl = this.getEl();
      
  		var destEl =Dom.get(id);
  		Dom.replaceClass(destEl,YAHOO.widget.DataTable.CLASS_DATA,YAHOO.widget.DataTable.CLASS_HIGHLIGHTED);
  		destElId = id;

  		Dom.setStyle(destElId, "opacity", 0.67);
    },
    
	onDragOut: function(e,id) {
		var destEl = Dom.get(id);
		Dom.replaceClass(destEl,YAHOO.widget.DataTable.CLASS_HIGHLIGHTED,YAHOO.widget.DataTable.CLASS_DATA);
	}

});

Event.onAvailable("table-numerotation",YAHOO.example.DDApp.init, YAHOO.example.DDApp, true);
})();

function versNumerotation() 
{
    var recordSet = new Array();
	//var szChaine = '{"tab":[';
	var szChaine = '[';
	
	var j=0;
	var tmpTrRecord = dataTable.getRecord(j); 
	while (tmpTrRecord != null) {
    			
		data = tmpTrRecord.getData();
		var datatext = YAHOO.lang.JSON.stringify(data);
		// pas d'encodage car on passe par le formulaire
		//szChaine = szChaine + encodeURIComponent(datatext) + ",";
		szChaine = szChaine + datatext + ",";
		j++;
		tmpTrRecord = dataTable.getRecord(j);
	}
	szChaine = szChaine.substr(0,szChaine.length -1);
	//var recordSet = szChaine +  "]}";
	var recordSet = szChaine +  "]";
	document.principal.POS_JSON_STRING.value = recordSet;
	document.principal.submit();
}
