document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");

var objPosDocument = "";
var iAncienNumDoc = "";
function putObjetPosDocument(obj, iNumDoc)
{
	objPosDocument = obj;
    iAncienNumDoc = iNumDoc; 
}
                    
function afficheAttente()
{
    //objPosDocument.document.write("<DIV id='attente' style='position:absolute;top:0;left:0;visibility:hidden'></DIV>&nbsp;");
}

function getPositionCurrent()
{
    // cas recherche ftx, un meme numero peut apparaitre plusieurs fois en resultat
    if (typeof(iCurrentPos) != 'undefined')
    {
        return iCurrentPos;
    }
    else
    {
        var current = objPosDocument.document.principal.POS_NUM_DOC.value;	
    	for(i = 0; i < tabNumDoc.length; i++)
    	{
    		if(tabNumDoc[i] == current)
    			return i;	
    	}	
    }
}

/*
 * sensNavigation : SUIVANT ou PRECEDENT
 */ 
function navigationEntreReponses(sensNavigation)
{
	var mode = objPosDocument.document.principal.MODE.value;
	// si mode modification, appel de la fonction de verifiation des zones modifiees
	if(mode == "MODIFICATION")
		bChampModif = objPosDocument.getIfChampModif(objPosDocument.document.principal);
	if(mode == "CONSULTATION" || (bChampModif && confirm(document.principal.LIBELLE_FERM_FICHE.value)) || !bChampModif)
	{
		var tabNumDoc = getTableauNumDoc();
		currentPage = getCurrentPage();
		nbPage = getNbPage();
		positionInTable = getPositionCurrent();
		if (sensNavigation == 'SUIVANT')
		{
    		if(positionInTable < tabNumDoc.length -1) 
    		{
    			positionInTable++;
    			if (typeof(iCurrentPos) != 'undefined')
    			     iCurrentPos++;
    			afficheAttente();
                if(mode == "MODIFICATION")
    			     onModifier("POS_NUM_DOC="+tabNumDoc[positionInTable]+"&POS_OLD_NUMDOC=" + iAncienNumDoc);
                else
                    onConsulter("POS_NUM_DOC="+tabNumDoc[positionInTable]+"&POS_OLD_NUMDOC=" + iAncienNumDoc);
                // cas de la recherche ftx ou les numero de doc peuvent etre identiques
                if(tabNumDoc[positionInTable] != iAncienNumDoc)
                    parent.closeOnglet(objPosDocument.frameElement.id);
    		}
    		else
    		{
    		    if(currentPage < nbPage)
    			{
    				afficheAttente();
    				document.principal.MODE_NAVIGATION.value = mode;
    				document.principal.TYPE_NAVIGATION.value = "SUIV";
    				changerPage(currentPage+1);
                    parent.closeOnglet(objPosDocument.frameElement.id);
    			}	
    			else
    				objPosDocument.alert(document.principal.NO_DOC_SUIVANT.value);	
    		}
        }
        else
        {
        	if(positionInTable > 0) 
    		{
    			positionInTable--;
    			if (typeof(iCurrentPos) != 'undefined')
    			     iCurrentPos--;
    				afficheAttente();
                if(mode == "MODIFICATION")
    			     onModifier("POS_NUM_DOC="+tabNumDoc[positionInTable]+"&POS_OLD_NUMDOC=" + iAncienNumDoc);
                else
                    onConsulter("POS_NUM_DOC="+tabNumDoc[positionInTable]+"&POS_OLD_NUMDOC=" + iAncienNumDoc);
                // cas de la recherche ftx ou les numero de doc peuvent etre identiques
                if(tabNumDoc[positionInTable] != iAncienNumDoc)
                    parent.closeOnglet(objPosDocument.frameElement.id);
    		}
    		else
    		{
    			if(currentPage > 1)
    			{
    				afficheAttente();
   					document.principal.MODE_NAVIGATION.value = mode;
    				document.principal.TYPE_NAVIGATION.value = "PREC";
    				changerPage(currentPage-1);
                    parent.closeOnglet(objPosDocument.frameElement.id);
    			}	
    			else
    				objPosDocument.alert(document.principal.NO_DOC_PRECEDENT.value);	
    		}
        }
	}
}

function goToDocumentSuivant()
{
    if (parent.center.putObjetPosDocument) {
        parent.center.putObjetPosDocument(this, document.principal.POS_NUM_DOC.value);
        parent.center.navigationEntreReponses('SUIVANT');
    }
}

function goToDocumentPrecedent() 
{
    if (parent.center.putObjetPosDocument) {
        parent.center.putObjetPosDocument(this, document.principal.POS_NUM_DOC.value);
        parent.center.navigationEntreReponses('PRECEDENT');
    }
}

function affiche_onglet(indOnglet)
{
	document.getElementById('label_onglet_' + indOnglet).click();
}

function affiche_onglet_onload_url()
{
	szUrl = document.URL;
	if (szUrl.indexOf("#ONGLET_") != -1)
	{
		numOnglet = szUrl.substring(szUrl.indexOf("#ONGLET_") + "#ONGLET_".length, szUrl.length);
		affiche_onglet(numOnglet);
	}
}
