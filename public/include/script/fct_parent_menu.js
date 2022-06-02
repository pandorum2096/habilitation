

function checkConnexion()
{
    var objHttp = getHTTPObjectParent();
    var sUlrRep = "../ajax/verifier_tps_session.php";
    objHttp.open("GET", sUlrRep, true);
    objHttp.send(null);
    objHttp.onreadystatechange=function()
    {
        if(objHttp.readyState == 4)
        {
            try
            {
                var objReponse = eval('(' + objHttp.responseText + ')');
                if (objReponse.msg_erreur && objReponse.msg_erreur.length != 0)
                {
                    alert(objReponse.msg_erreur)
                }
                if (objReponse.code_retour != -1 &&  objReponse.tps_prochaine_requete > 0)
                    setTimeout("checkConnexion()", objReponse.tps_prochaine_requete);
            }
            catch(ex) {}
        }
    }
}

var fenetrevoc = false;
var panelFile = null;
function modelesswinyui(url, title, coord)
{
    // si on remet cette ligne le bouton fermer ne fonctionne pas sur Chrome
	//if (!fenetrevoc) 
    {
        fenetrevoc = document.createElement("div");
        fenetrevoc.id = "demo-panel";
        // à masquer sinon réserve la place et affiche des ascenseurs
        fenetrevoc.style.display = "none";
    }
    document.body.insertBefore(fenetrevoc, document.body.firstChild)
    fenetrevoc.style.display = "";
    
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event;
    panelFile = new YAHOO.widget.Panel('demo-panel', {
                draggable: true,
                close: true,
                modal: true,
                zindex:4,
                autofillheight: "body", // default value, specified here to highlight its use in the example 
                constraintoviewport: true,           
                underlay: 'none',
                width: coord.width + "px",
                height: coord.height + "px",
                xy: [coord.left, coord.top]
            });

    var textInnerHtml = "";
    var frmHeight = coord.height - 60;
	textInnerHtml +="<iframe id='fenfile' frameborder='0' name='fenmod' style='height:"+frmHeight+"px;width:100%;' src='"+url+"'></iframe>";
	panelFile.setHeader(title);
    panelFile.setBody(textInnerHtml);
    panelFile.render();

    panelFile.subscribe("hide", function (event){
            setTimeout(function() {
                document.getElementById("fenfile").src = "../../../vide.htm";
                panelFile.destroy();
            }, 0);
    });
}

function getFrameArborescence()
{
    return window.frm_arbo_question;
}

function getFrameArborescenceId()
{
    return "frm_arbo_question";
}
