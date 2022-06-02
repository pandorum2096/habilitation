document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");

var fenetre_attente = 0;
var modif="";

function ouvre_attente()
{
	var sUrl = "../../../../interface/tpl/applicatif/fichier/attente.html";
	if (window.showModelessDialog)
		fenetre_attente = window.showModelessDialog(sUrl,window,"help:0;resizable:1;dialogWidth:500px;dialogHeight:200px,status=no");
	else
		fenetre_attente = window.open(sUrl,'Attente',"width=500px,height=200px,top=100,left=100,resizable=0,scrollbars=0,modal=yes");
}

function ferme_attente_opener()
{
	if(fenetre_attente)
		fenetre_attente.close();
}

function get_extension(extension)
{
    var tabBonneExtension = new Array("DOC", "XLS", "PPT", "RTF", "PDF");
    var i;
    for(i=0;i<tabBonneExtension.length;i++)
    {
        if(tabBonneExtension[i] == extension)
            return true;
    }
    
    return false;
}

function mode_fiche_index()
{
	var i;
	var bModif = false;
	modif = "Vous êtes en Consultation <font size=-2>Document n° ";
	
	for (i=0;i<document.forms['principal'].elements.length;i++) 
	{
		if (document.forms['principal'].elements[i].name=='POS_ACTION_HERMES') 
		{
			modif="Vous êtes en Modification <font size=-2>Document n° ";
			bModif = true;
			break;
		}
	}
	document.write(modif);
}
/*
 * Fonction d'affichage des fichiers selon le mode choisi
 * Traitement special pour les fichiers traites par WebDav
 * Par defaut, ce mode n'est pas active
 */
function AfficherFichier(posnumdoc, posnumpage,posnumsspage,phpsessid,mode,extension,bDownload)
{
	if (extension == "RWX" && mode == "MODIFICATION")
	{
		var szUrl = "../../../../interface/session/principal/redaction_web/afficher_edition_include.php?POS_NUM_DOC=";
		szUrl += posnumdoc;
		szUrl += "&POS_NUM_PAGE=";
		szUrl += posnumpage;
		szUrl += "&POS_NUM_SSPAGE=";
		szUrl += posnumsspage;
		parent.document.location.href = szUrl;
	}
	else
	{
        var url = "";
        if (extension == "RWX")
            posnumsspage=1;
        
		if(CST_TYPE_APPLI == 1)
		    url = "../../../../interface/session/principal/gestionfichier/consulter_fichier.php?POS_NUM_DOC=";
		else
				url = "../../../../servlet/interface/session/principal/gestionfichier.ConsulterFichier?POS_NUM_DOC=";
	
		url += posnumdoc;
		url += "&POS_NUM_PAGE=";
		url += posnumpage;
		url += "&POS_NUM_SSPAGE=";
		url += posnumsspage;
		url += "&PHPSESSID=";
		url += phpsessid;
		url += "&B_WEBDAV=";
		url += CST_UTIL_WEB_DAV;
        if (mode == "SIGNATURE") {
            url += "&MODE_SIGNATURE=1";
            mode =  "MODIFICATION";
        }
        else
            url += "&MODE_SIGNATURE=0";
        
		//Uniquement delib sinon bug si ouverture depuis l'iframe
		//url += "&POS_TYPEDOC="+document.principal.POS_TYPEDOC.value;
				
		if(mode == "MODIFICATION" && CST_UTIL_WEB_DAV == 2 )
		{
			url += "&MODE=MODIFICATION";
			parent.parent.openFileModif(url);
		}
		else
	    {
	    	url += "&MODE=CONSULTATION";
	        if(bDownload)
	    	    url += "&B_DOWNLOAD=true";
	        window.open(url, '_blank');
	    }
	}
}

/*
 * Fonction d'affichage des fichiers selon le mode choisi
 * Traitement special pour les fichiers traites par WebDav
 * Par defaut, ce mode n'est pas active
 */
function AfficherFichierLR(posnumdoc,posnumpage,posnumsspage,phpsessid,mode,extension,bDownload)
{
	if(CST_TYPE_APPLI == 1)
		url = "../../../../interface/session/principal/gestionfichier/consulter_fichier.php?POS_NUM_DOC=";
	else
        url = "../../../../servlet/interface/session/principal/gestionfichier.ConsulterFichier?POS_NUM_DOC=";

	url += posnumdoc;
	url += "&POS_NUM_PAGE=";
	url += posnumpage;
	url += "&POS_NUM_SSPAGE=";
	url += posnumsspage;
	url += "&PHPSESSID=";
	url += phpsessid;
	url += "&B_WEBDAV=";
	url += CST_UTIL_WEB_DAV;
	url += "&MODE="+ "CONSULTATION";

	if(arguments.length == 7)
	    url += "&B_DOWNLOAD=true";
	
    //new_fen = window.open(url, 'load', 'left=250,top=100,height=500,width=500,scrollbars=auto,location=no,toolbar=no,status=no,resizable=yes');
	//** window.open(url, '_blank');

	var obj = document.getElementById('ifr_fenetre_fichier');
  	if (obj == null) {
          obj = document.createElement("div");
          obj.style.display = "none";
          obj.innerHTML = "<iframe id='ifr_fenetre_fichier' frameborder='0' name='ifr_fenetre_fichier'></iframe>";
  	     document.body.appendChild(obj);
    }
    window.ifr_fenetre_fichier.location.href = url;

}

function AfficherFichierLR_(posnumdoc,posnumpage,posnumsspage,phpsessid,mode,extension,bDownload)
{
    var url;
	if(CST_TYPE_APPLI == 1)
		url = "../../../../interface/session/principal/gestionfichier/consulter_fichier.php?POS_NUM_DOC=";
	else
        url = "../../../../servlet/interface/session/principal/gestionfichier.ConsulterFichier?POS_NUM_DOC=";

	url += posnumdoc;
	url += "&POS_NUM_PAGE=";
	url += posnumpage;
	url += "&POS_NUM_SSPAGE=";
	url += posnumsspage;
	url += "&PHPSESSID=";
	url += phpsessid;
	url += "&B_WEBDAV=";
	url += CST_UTIL_WEB_DAV;
	url += "&MODE="+ "CONSULTATION";

	if(arguments.length == 7)
	    url += "&B_DOWNLOAD=true";
	
    //new_fen = window.open(url, 'load', 'left=250,top=100,height=500,width=500,scrollbars=auto,location=no,toolbar=no,status=no,resizable=yes');
	window.open(url, '_blank');
}

function AfficherFichierNoSave(szNomCheminFic, phpsessid)
{
    var szUrl;
	if(CST_TYPE_APPLI == 1)
    	szUrl = "../../../../interface/session/principal/gestionfichier/ouverture_fichier.php?file="+escape(szNomCheminFic)+"&PHPSESSID="+phpsessid;
	else
		szUrl = "../../../../servlet/interface/session/principal/gestionfichier.OuvertureFichier?file="+escape(szNomCheminFic);
	
    var new_fen = window.open('', 'load', 'left=250,top=100,height=500,width=500,scrollbars=auto,location=no,toolbar=no,status=no,resizable=yes');
    new_fen.location.href = szUrl;
	setTimeout("new_fen.focus();", 2000);
}

function AfficherFichierByRang(posnumdoc, posnumrang, phpsessid)
{
	var sUrl = "../../../../interface/session/principal/gestionfichier/consulter_fichier.php?POS_NUM_DOC=";
	sUrl += posnumdoc;
	sUrl += "&POS_NUM_RANG=";
	sUrl += posnumrang;
	sUrl += "&PHPSESSID=";
	sUrl += phpsessid;
	sUrl += "&B_WEBDAV=";
	sUrl += CST_UTIL_WEB_DAV;
    sUrl += "&MODE=CONSULTATION";
	
	parent.openFileModif(sUrl);
}

function AfficherNumeriser(iNumDoc)
{
    var szUrl;
	if(CST_TYPE_APPLI == 1)
    	szUrl = "../../../../interface/session/principal/numerisation/afficher_numerisation.php?POS_NUM_DOC=" + iNumDoc + "&POS_NUM_PAGE=LAST&POS_NUM_SSPAGE=0";
	else
		szUrl = "../../../../servlet/interface/session/principal/numerisation.AfficherNumerisation?POS_NUM_DOC=" + iNumDoc + "&POS_NUM_PAGE=LAST&POS_NUM_SSPAGE=0";
	
    parent.openAppletOrJnlp(szUrl, 500, 200, 200, 100);
}

function maxVisuFichier()
{
    var hauteur = document.documentElement.clientHeight - 25;
    document.getElementById('div_affiche_fichier').style.height = hauteur + 'px';
    document.getElementById('div_affiche_fichier').height = hauteur;
    document.getElementById('frm_affiche_fichier').height = hauteur + 'px';
}

function actualiserVisuFichier()
{
    var sFrameId = "frm_affiche_fichier";
    var objIframe = document.getElementById("frm_affiche_fichier");
    if (objIframe) {
        var srcFrm = objIframe.src;
        var divid = document.getElementById("div_affiche_fichier");
        divid.removeChild(objIframe);
        
        var iframe = document.createElement("iframe");
        iframe.setAttribute("id", sFrameId);
        iframe.setAttribute("src", srcFrm);
        iframe.setAttribute("name", sFrameId);
        iframe.setAttribute("width", '100%');
        divid.appendChild(iframe);
        maxVisuFichier();
    }
}

var bAnnuleAttenteSignatureFichier = false;
function annuleAttenteSignatureFichier() {
    bAnnuleAttenteSignatureFichier = true;
}

function SignerFichier(numDoc, numPage, numSsPage, fnFichierSigne, fnFichierNonSigne)
{
    parent.yuiWaitOpen("Signature en cours...", window.name, "annuleAttenteSignatureFichier");
    
    AfficherFichier(numDoc, numPage,numSsPage,'',"SIGNATURE", "PDF", 0);
    (function poll(){
       setTimeout(function(){
          var req = getXmlHttpRequestObject();
          if (req.readyState == 4 || req.readyState == 0) {	
            var sUrl = "../../../../interface/session/principal/ajax/get_etat_signature_fichier.php?";
            sUrl += "POS_NUM_DOC=" + numDoc;
            sUrl += "&POS_NUM_PAGE=" + numPage;
            sUrl += "&POS_NUM_SSPAGE=" + numSsPage;
            req.open("GET", sUrl, true);
    		req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    var obj = JSON.parse(req.responseText);
                    if (obj.code_retour == -1) {
                        if (bAnnuleAttenteSignatureFichier) {
                            parent.yuiWaitClose();
                            bAnnuleAttenteSignatureFichier = false;
                        }
                        else
                            poll();
                    }
                    else {
                        parent.yuiWaitClose();
                        if (obj.code_retour == 1)
                            fnFichierSigne();
                        else
                            fnFichierNonSigne();
                    }
                }
            }; 
            req.send(null);
          }  
          
      }, 3000);
    })();
}