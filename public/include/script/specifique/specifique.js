function exempleAfficherListeAssociation(divId, typedoc, coderub, termeRech) {

    var tabLocution = new Array();
	tabLocution[0] = new Locution(1, 'FIC', 'NAT', '=', termeRech, '', 0, 0);
    var profil_lr ='test_split';
    afficherListeAssociation(divId, tabLocution, typedoc, coderub, 
            profil_lr, 'associerValeurIndexFromDivAssoc', 'Aucun fichier en réponse');
}
function onValiderAssociation(sCodeType, sCodeRub) 
{
    if (sCodeType == "TAU" && sCodeRub == "LAU") {
    }
}

// permet de ne pas repasser lorsqu'on lance vraiment le submit
var verify = true;
function testActionHermes() {
    if (verify) {
        // code ou libelle (recuperable par ~ option[selectedIndex])
        // si code separateur ### 
        var actionRub = document.principal.POS_ACTION_HERMES.value;
        var tabAction = actionRub.split(SEPARATEUR);
        var action = tabAction[0];
        if (action == "COD_001_SIGNATURE") {
            SignerFichier(document.principal.POS_NUM_DOC.value, 1, 0, function(){verify = false;document.principal.TYPE_ACTION[0].click();}, function(){alert('action annulée');});
            return false;        
        }
    }
    return true;
}

function SignatureFichierPDF() {
    if (verify) {
        // code ou libelle (recuperable par ~ option[selectedIndex])
        // si code separateur ### 
        var actionRub = document.principal.POS_ACTION_HERMES.value;
        var tabAction = actionRub.split(SEPARATEUR);
        var action = tabAction[0];

        if (action == "AC_050_SA_SIGNE_DEL" || action == "AC_050_DGS_SIGNE_ARR" || action == "AC_050_PRES_SIGNE_ARR")
		{
			// document.principal.TYPE_ACTION[0] si bouton Enregistrer en plus du bouton Exécuter
			//SignerFichier(document.principal.POS_NUM_DOC.value, 1, 1, function(){alert('Action OK !');verify = false;document.principal.TYPE_ACTION[0].click();}, function(){alert('Action de signature annulée !');});
			SignerFichier(document.principal.POS_NUM_DOC.value, 1, 1, function(){verify = false;document.principal.TYPE_ACTION.click();}, function(){alert('Action de signature annulée !');});
			return false;
        }
    }
    return true;
}

function onArchiver()
{
    var szUrl = "";
    var okInsertion = true;
    if(CST_TYPE_APPLI == 1)	{
		szUrl = "../../../../interface/session/principal/dossier/ajoute_dossier.php?";
	}
	else if (CST_TYPE_APPLI == 2)
	{
		szUrl= "../../../../servlet/interface/session/principal/dossier.DeplacerFilsDossier?ACTION=AJOUTER&";
	}
	else {
	    szUrl = "../../../../interface/session/principal/dossier/ajoute_dossier.php?";
	}
	
    if(parent.document.principal.POS_NUM_DOSSIER_POUR_AJOUT.value != "")		
    {
        if (confirm("Voulez-vous insérer ce document dans le dossier :" + parent.document.principal.POS_TITRE_DOSSIER_PERE.value + " ?"))
        {
            szUrl+="POS_NUM_DOC="+ document.principal.POS_NUM_DOC.value;
            szUrl+="&POS_NUM_DOSSIER_PERE="+parent.document.principal.POS_NUM_DOSSIER_POUR_AJOUT.value;
            szUrl+="&POS_TITRE_DOSSIER_PERE="+escape(parent.document.principal.POS_TITRE_DOSSIER_PERE.value);
            szUrl+="&POS_INDICE_DOSSIER_PERE="+parent.document.principal.POS_INDICE_DOSSIER_POUR_AJOUT.value;
        }
        else
            okInsertion = false;
    }
    else
    {
        var message = "Veuillez sélectionner le dossier dans lequel vous désirez insérer ce document.<br><br><u>AIDE :</u><br>1) Cliquez sur l'icône '+' du plan de classement pour parcourir l'arborescence.<br>2) Faire un clic droit sur l'icône du dossier pour faire apparaître l'option 'Marquer pour l'insertion'. <br> 3) Cliquer sur l'option pour marquer le dossier d'une flêche orange";
		parent.posMessageBoxWarning(message);
		okInsertion = false;
    }
    if(okInsertion > 0){
        var reply = false;
        var dataReply = null;
        $.ajax({
            type: "GET",
            url: szUrl,
            dataType: "JSON",
            success: function(response) {
                reply = true;
                dataReply = response;
            },
            complete: function() {

                if(reply && dataReply != null){
                    if(dataReply.hasOwnProperty("status")){
                        if(dataReply.status == "INSERT_SUCCESS" && parent.document.querySelectorAll("i.arbo-folderajout").length > 0){
                            $(parent.document.querySelectorAll("i.arbo-folderajout")).trigger("click");
                        }else if(dataReply.status == "ALREADY_EXIST"){
                            if(parent.posMessageBoxWarning)
                                parent.posMessageBoxWarning(dataReply.message);
                            else if(parent.parent.posMessageBoxWarning)
                                parent.parent.posMessageBoxWarning(dataReply.message);
                            else
                                alert(dataReply.message);
                        }else{
                            if(parent.posMessageBoxWarning)
                                parent.posMessageBoxWarning(dataReply);
                            else if(parent.parent.posMessageBoxWarning)
                                parent.parent.posMessageBoxWarning(dataReply);
                            else
                                alert(dataReply);
                        }
                    }
                }

            },
            failure: function(response) {
                initDatas();
                alert("Un erreur est survenue, veuillez réessayer !");
            }
        });

	    //return window.open(szUrl, 'attente', 'left='+CST_PANIER_LEFT+',top='+CST_PANIER_TOP+',height='+CST_PANIER_HEIGHT+',width='+CST_PANIER_WIDTH+',scrollbars=yes,location=no,toolbar=no,status=no,resizable=no');
    }
    //window.open(szUrlArchiver, 'Classement', 'width=450,height=470,top=100,left=100,scrollbars=yes,location=no,toolbar=no,status=no,resizable=yes');
}
