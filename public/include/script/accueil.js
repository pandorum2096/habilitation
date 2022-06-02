document.write("<SCRIPT language=\"javascript\" SRC=\"configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"include/Passets/js/message.alert.js\"></SCRIPT>");

function getLibelleDateDuJour() {
    navvers = navigator.appVersion.substring(0, 1);
    if (navvers > 3)
        navok = true;
    else
        navok = false;
    today = new Date();
    jour = today.getDay();
    numero = today.getDate();
    if (numero < 10)
        numero = "0" + numero;
    mois = today.getMonth();
    if (navok)
        annee = today.getFullYear();
    else
        annee = today.getYear();
    TabJour = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
    TabMois = new Array("Janvier", "F�vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao�t", "Septembre", "Octobre", "Novembre", "D�cembre");
    messageDate = TabJour[jour] + " " + numero + " " + TabMois[mois] + " " + annee;
    return messageDate;
}

function connexion() {
    if (document.getElementById("div_profil").style.display == "none") {
        document.principal.POS_PASSWD.value = crypt_text(document.principal.POS_PASSWORD.value, szCleCrypt);
    }
    affichageListeProfilEtConnexion(false);
    // dans tous les cas, annulation du submit auto, il sera fait par appel javascript.
    return false;
}

function changeTheme(objSelect) {
    document.location.href = document.location.href + "?STYLE_THEME=" + objSelect.options[objSelect.selectedIndex].value;
}

function changeActiveStyleSheet(objSelect) {
    if (document.styleSheets) {
        for (var i = 0; i < document.styleSheets.length; i++) {
            var szRefStyle = document.styleSheets[i].href;
            var szNewRefStyle = "";
            if (szRefStyle.indexOf('theme') > 0) {
                szNewRefStyle = szRefStyle.substr(0, szRefStyle.lastIndexOf('/') + 1) + objSelect.options[objSelect.selectedIndex].value + ".css";
                document.styleSheets[i].href = szNewRefStyle;
                break;
            }
        }
    }
}


var dlgChangeMdp;

function getDlgChangeMdp() {
    if (dlgChangeMdp == null) {
        dlgChangeMdp = new YAHOO.widget.Dialog("dialog1", {
            width: "300px",
            fixedcenter: true,
            visible: false,
            constraintoviewport: true,
            modal: true,
            buttons: [{ text: "Valider", handler: handleSubmit, isDefault: true },
                { text: "Annuler", handler: handleCancel }
            ]
        });
        dlgChangeMdp.render();
    }
    return dlgChangeMdp;
}

function getUrlProfilUtilisateur(type_url) {
    var tabCodeUrl = new Array();
    if (CST_TYPE_APPLI == 1) {
        tabCodeUrl["URL_GET_LISTE_PROFILS"] = "interface/session/principal/ajax/get_profils_par_utilisateur.php";
    } else if (CST_TYPE_APPLI == 2) {
        tabCodeUrl["URL_GET_LISTE_PROFILS"] = "servlet/interface/session/principal/ajax.GetProfilsParUtilisateur";
    }
    return tabCodeUrl[type_url];
}

//Gets the browser specific XmlHttpRequest Object
function getXmlHttpRequestObject() {

    if (window.XMLHttpRequest) {

        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

//Our XmlHttpRequest object to get the auto suggestvar 
var searchReq = getXmlHttpRequestObject();

function replaceAll(str, search, repl) {
    while (str.indexOf(search) != -1)
        str = str.replace(search, repl);
    return str;
}

// Define various event handlers for Dialog   
var handleSubmit = function() {
    if (document.form_change_pwd.NV_MDP.value != document.form_change_pwd.CONF_NV_MDP.value) {
        alert("Vous n'avez pas saisi deux fois le m�me mot de passe");
        return;
    } else {
        getDlgChangeMdp().hide();
        document.form_change_pwd.NV_MDP.value = crypt_text(document.form_change_pwd.NV_MDP.value, szCleCrypt);
        affichageListeProfilEtConnexion(true);
    }
};

var handleCancel = function() {
    getDlgChangeMdp().hide();
};


//Called from keyup on the search textbox.
//Starts the AJAX request.
function affichageListeProfilEtConnexion(boolIsNvMdp) {
    var bRetour = false;
    // les profils ne sont pas affich�s : on les demande au serveur
    if (document.getElementById("div_profil").style.display == "none") {
        if (searchReq.readyState == 4 || searchReq.readyState == 0) {
            searchReq.open("POST", getUrlProfilUtilisateur("URL_GET_LISTE_PROFILS"), false);
            searchReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            var corps = "";
            corps += "POS_APPLI=" + document.principal.POS_APPLI.value;
            corps += "&POS_UTIL=" + escape(document.principal.POS_UTIL.value);
            corps += "&POS_PASSWD=" + replaceAll(escape(document.principal.POS_PASSWD.value), "+", "%2B");;
            corps += "&POS_SERVEUR=" + document.principal.POS_SERVEUR.value;
            corps += "&POS_PORT=" + document.principal.POS_PORT.value;
            if (boolIsNvMdp) {
                corps += "&POS_NVMDP=" + replaceAll(escape(document.form_change_pwd.NV_MDP.value), "+", "%2B");;
            }

            searchReq.send(corps);
            if (searchReq.readyState == 4 || searchReq.readyState == 0) {
                var objAction = eval('(' + searchReq.responseText + ')');
                if (objAction.code_retour == 1) {
                    // suppression de la premi�re option
                    document.principal.POS_PROFIL.options[0] = null;

                    for (var i = 0; i < objAction.liste_profils.length; i++) {
                        if (i == 0)
                            nouvel_element = new Option(objAction.liste_profils[i], objAction.liste_profils[i], true, true);
                        else
                            nouvel_element = new Option(objAction.liste_profils[i], objAction.liste_profils[i], false, false);
                        document.principal.POS_PROFIL.options[document.principal.POS_PROFIL.length] = nouvel_element;
                        document.principal.POS_UTIL.readOnly = true;
                        //document.principal.POS_UTIL.className = "verrouille";
                        document.principal.POS_PASSWD.readOnly = true;
                        //document.principal.POS_PASSWD.className = "verrouille";
                    }
                    // on vient de changer le mdp
                    if (boolIsNvMdp)
                        document.principal.POS_PASSWD.value = document.form_change_pwd.NV_MDP.value;

                    if (objAction.liste_profils.length == 1) {
                        document.principal.POS_CONNEXION_AUTO.value = "1";
                        document.principal.POS_PROFIL.selectedIndex = 0;
                        document.principal.submit();
                    } else {
                        document.getElementById("div_profil").style.display = "";
                        document.principal.POS_PROFIL.focus();
                    }
                } else if (objAction.code_retour == 2) {
                    alert("Votre mot de passe a expir�. Vous devez le changer.");
                    getDlgChangeMdp().show();
                    document.principal.POS_UTIL.readOnly = true;
                    ///document.principal.POS_UTIL.className = "verrouille";
                    document.principal.POS_PASSWD.readOnly = true;
                    //document.principal.POS_PASSWD.className = "verrouille";
                } else {
                    // erreur au changement du mdp
                    if (boolIsNvMdp) {
                        document.form_change_pwd.NV_MDP.value = "";
                        document.form_change_pwd.CONF_NV_MDP.value = "";
                        getDlgChangeMdp().show();
                    } else {
                        document.principal.POS_PASSWD.value = "";
                        document.principal.POS_UTIL.focus();
                    }
                    //alert(objAction.msg_erreur);
                    console.log(objAction.msg_erreur)
                    message('#msg_alert', 'success', objAction.msg_erreur);
                }
            }
        }
    }
    // les profils sont affich�s
    else {
        if (document.principal.POS_PROFIL.selectedIndex < 0)
            alert("Veuillez s�lectionner votre profil de connexion");
        else
            document.principal.submit();
    }
    return bRetour;
}

function onChangeUser() {
    if (document.principal.POS_UTIL.value.length == 0)
        document.getElementById('btn_valider').disabled = true;
    else
        document.getElementById('btn_valider').disabled = false;
}