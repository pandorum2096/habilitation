YUI.add('pos-yui-portlet-factory',  function(Y) {
	
	var PosYUIPortletFactory = function(cfg) {
		PosYUIPortletFactory.superclass.constructor.apply(this, arguments);
		var attrs = {
			'portal' : {
				value: null
			}, 
			'asyncload' : {
			    value: true
			}
		};
		this.addAttrs(attrs, cfg);
	};
	PosYUIPortletFactory.NAME = 'pos-yui-portlet-factory';
	Y.extend(PosYUIPortletFactory, Y.Base);
	Y.augment(PosYUIPortletFactory, Y.Attribute);
	Y.PosYUIPortletFactory = new PosYUIPortletFactory();
    
    PosYUIPortletFactory.prototype.getUrl = function(typeURL) {
    
        var tabCodeUrl = new Array();
        if(CST_TYPE_APPLI == 1) {
            tabCodeUrl["AFFICHER_PORTLET"] = "../portail/afficher_portlet.php";
            tabCodeUrl["AFFICHER_CONFIGURATION"] = "../portail/afficher_configuration.php";
        }
        else if(CST_TYPE_APPLI == 2) {
            tabCodeUrl["AFFICHER_PORTLET"] = "../../../../servlet/interface/session/principal/portail.AfficherPortlet";
            tabCodeUrl["AFFICHER_CONFIGURATION"] = "../../../../servlet/interface/session/principal/portail.AfficherConfiguration"; 
        }
		return tabCodeUrl[typeURL];
	}	
	
	PosYUIPortletFactory.prototype.feedPortletContent = function(portletDiv) {
	    var asyncload = Y.PosYUIPortletFactory.get('asyncload');
		var portletInstance = portletDiv.getData('instance');
		
		if (portletInstance.portletModel.type == 'notepad') {
            var contentDiv = portletDiv.one ('#' + portletInstance.id + "_content");
            if (contentDiv.hasClass('loading')) contentDiv.removeClass('loading');
            contentDiv.set('innerHTML', '');
            contentDiv.setStyle('overflow', 'auto');
            contentDiv.setStyle('max-height', '150px');
		    // direct content from parametres :
		    var editor = new Y.EditorBase({
		        content: decodeURIComponent(portletInstance.parametres['content'])
		    });
		    editor.on('nodeChange', function (e) {
		        portletInstance.parametres['content'] = encodeURIComponent (editor.getContent());
		    });
		    editor.render (contentDiv);
		    return;
		}
		
		if (portletInstance.portletModel.type == 'bal') {
		  var contentDiv = portletDiv.one ('#' + portletInstance.id + "_content");
		  if (contentDiv.hasClass('loading')) contentDiv.removeClass('loading');
		  contentDiv.set('innerHTML', document.getElementById('liste_bal').innerHTML);
		  document.getElementById('liste_bal').innerHTML = "";
		  return;
		}
		
        if (portletInstance.portletModel.type == 'profil') {
            if (document.getElementById('nb-profils').value == '0' && isAdmin != 1) {
                portletDiv.setStyle('display', 'none');
            }
            else {
          var contentDiv = portletDiv.one ('#' + portletInstance.id + "_content");
          if (contentDiv.hasClass('loading')) contentDiv.removeClass('loading');
          contentDiv.set('innerHTML', document.getElementById('liste_profil').innerHTML);
            }
          return;
        }
        
        if (portletInstance.portletModel.type == 'qpubliques') {
          var contentDiv = portletDiv.one ('#' + portletInstance.id + "_content");
          if (contentDiv.hasClass('loading')) contentDiv.removeClass('loading');
          contentDiv.set('innerHTML', document.getElementById('liste_qpubliques').innerHTML);
          return;
        }
        
        if (portletInstance.portletModel.type == 'qprivees') {
          var contentDiv = portletDiv.one ('#' + portletInstance.id + "_content");
          if (contentDiv.hasClass('loading')) contentDiv.removeClass('loading');
          contentDiv.set('innerHTML', document.getElementById('liste_qprivees').innerHTML);
          return;
        }
        
        
        if (portletInstance.portletModel.type == 'panier') {
          var contentDiv = portletDiv.one ('#' + portletInstance.id + "_content");
          if (contentDiv.hasClass('loading')) contentDiv.removeClass('loading');
          contentDiv.set('innerHTML', document.getElementById('div_panier').innerHTML);
          document.getElementById('div_panier').innerHTML = "";
          return;
        }

		var szRequete = Y.PosYUIPortletFactory.getUrl("AFFICHER_PORTLET");
		var szCorps = "PORTLET_TYPE=" + portletInstance.portletModel.type;
        
        if (portletInstance.portletModel.type == 'accesbalexterne') {
            szRequete = "../specifique/afficher_portlet_bal_externe.php";
        }
        

		for(param in portletInstance.parametres) {
			if(portletInstance.parametres[param] != null) {
				szCorps += "&" + param.toUpperCase() + "=" + portletInstance.parametres[param];
			}
		} 
		var actionReqObject = Y.PosYUIUtils.getXmlHttpRequestObject();
		
        var requestTimer = asyncload ? setTimeout(function() {
            actionReqObject.abort();
            var contentDiv = portletDiv.one ('#' + portletInstance.id + "_content");
            if (contentDiv.hasClass('loading')) contentDiv.removeClass('loading');
            contentDiv.addClass('errorloading');
            contentDiv.set('innerHTML', 'request timeout');
        }, 20000) : null;
        
        var onRequestStateChange = function () {
              if (actionReqObject.readyState == 4) {
                  if (requestTimer != null) clearTimeout(requestTimer);
                  if (actionReqObject.status == 200) {
                    var objAction = eval('(' + actionReqObject.responseText + ')');
                    if(objAction.code_retour > 0) {
                        var contentDiv = portletDiv.one ('#' + portletInstance.id + "_content");
                        if (contentDiv.hasClass('loading')) contentDiv.removeClass('loading');
                        if (contentDiv.hasClass('errorloading')) contentDiv.removeClass('errorloading');
                        contentDiv.set('innerHTML', objAction.contenu);
                    } else {
                        var contentDiv = portletDiv.one ('#' + portletInstance.id + "_content");
                        if (contentDiv.hasClass('loading')) contentDiv.removeClass('loading');
                        contentDiv.addClass('errorloading');
                        contentDiv.set('innerHTML', objAction.msg_erreur);
                    }
                  } else {
                        var contentDiv = portletDiv.one ('#' + portletInstance.id + "_content");
                        if (contentDiv.hasClass('loading')) contentDiv.removeClass('loading');
                        contentDiv.addClass('errorloading');
                        contentDiv.set('innerHTML', 'request error');
                  }
              }
        }
        if(asyncload) actionReqObject.onreadystatechange = onRequestStateChange;
		actionReqObject.open("POST", szRequete, asyncload);
        actionReqObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		actionReqObject.send(szCorps);
        if (!asyncload) onRequestStateChange();
	}
	
	var onMinPortlet = function(portletDiv) {
		var portletInstance = portletDiv.getData('instance');
		var contentDiv = portletDiv.one('#' + portletInstance.id + '_content');
		if (contentDiv == null) return;
		//Create an anim instance on this node.
		var anim = new Y.Anim({
			node : contentDiv
		});
		//Is it expanded?
		if(!portletDiv.hasClass('minned')) {
			//Set the vars for collapsing it
			anim.setAttrs({
				to : {
					height : 0
				},
				duration : '.25',
				easing : Y.Easing.easeOut,
				iteration : 1
			});
			//On the end, toggle the minned class
			//Then set the cookies for state
			anim.on('end', function() {
				portletDiv.toggleClass('minned');
				portletDiv.one('a.min').set('innerHTML', '+');
				Y.PosYUIPortletFactory.get('portal').onPortletChange(portletInstance, 'minned');
			});
		} else {
			//Set the vars for expanding it
			anim.setAttrs({
				to : {
					height : '100%'
				},
				duration : '.25',
				easing : Y.Easing.easeOut,
				iteration : 1
			});
			//Toggle the minned class
			portletDiv.toggleClass('minned');
			portletDiv.one('a.min').set('innerHTML', '-');
			Y.PosYUIPortletFactory.get('portal').onPortletChange(portletInstance, 'minned');
		}
		//Run the animation
		anim.run();
	}
	var onConfPortlet = function (portletDiv) {
		var id = portletDiv.getData('instance').id;
		portletDiv.one('#' + id + '_content').hide();
		
        // GG 19.12.2012 chargement du formulaire de conf à la demande 
        var portletInstance = portletDiv.getData('instance');
        if (!portletDiv.one('#' + id + '_form'))
            portletDiv.appendChild(Y.PosYUIPortletFactory.makePortletConfigureForm(portletInstance));
		portletDiv.one('#' + id + '_form').show();
	}
	var onRemovePortlet = function(portletDiv) {
        
        if (confirm(pos_yui_portal_label_confirm_supprimer) ) {
			//Setup the animation for making it disappear
			var anim = new Y.Anim({
				node : portletDiv,
				to : {
					opacity : 0
				},
				duration : '.25',
				easing : Y.Easing.easeOut
			});
			anim.on('end', function() {
				//On end of the first anim, setup another to make it collapse
				var anim = new Y.Anim({
					node : portletDiv,
					to : {
						height : 0
					},
					duration : '.25',
					easing : Y.Easing.easeOut
				});
				anim.on('end', function() {
					Y.PosYUIPortletFactory.get('portal').onPortletChange(portletDiv.getData('instance'), 'removed');
				});
				//Run the animation
				anim.run();
			});
			//Run the animation
			anim.run();
		}
	}
    
	var onTitleBarClick = function(e) {
		if(e.target.test('a')) {
			var a = e.target, portletDiv = a.get('parentNode').get('parentNode');
			if(a.hasClass('min')) {
				onMinPortlet(portletDiv);
			}
			if(a.hasClass('conf')) {
				onConfPortlet(portletDiv);
			}
			if(a.hasClass('close')) {
				onRemovePortlet(portletDiv);
			}
            if(a.hasClass('refresh-std') || a.hasClass('refresh-std-admin')) {
				Y.PosYUIPortletFactory.feedPortletContent(portletDiv);
			}
			e.halt();
		}
	};
	
	/**
	 * creates a portlet instance based on type, options and parametres 
	 * @param {Object} portletType
	 * @param {Object} options options for instance (each default to option in model if not specified)
	 * @param {Object} parametres parametres for instance (each default to parametre in model if not specified)
	 * @return {Object} with fields portletModel, options, parametres, id
	 */
	PosYUIPortletFactory.prototype.makePortletInstance = function (portletType, options, parametres) {
		var portletModel = eval ('portletModelsList.' + portletType);
		
		// default options and parametres :
		for(var opt in portletModel.options) {
			if(options[opt] == undefined) {
				options[opt] = encodeURIComponent(portletModel.options[opt]);
			}
		}
		for(var param in portletModel.parametres) {
			if(parametres[param] == undefined) {
				parametres[param] = encodeURIComponent(portletModel.parametres[param]);
			}
		}
		
		return {
			portletModel: portletModel,
			options: options,
			parametres: parametres,
			id: Y.guid()
		};
	}
	
	PosYUIPortletFactory.prototype.makePortletTitleBar = function (portletInstance) {
		var icon = 'url('+ icon_path + decodeURIComponent(portletInstance.options['icon']) + '.png)';
        var iconSrc = icon_path + decodeURIComponent(portletInstance.options['icon']) + '.png';
        //var str =  '<h2 id="' + portletInstance.id + '_title"><img style="float: left;vertical-align: top;" src="'+iconSrc+'"><div class="portlettitle"><span>' + decodeURIComponent(portletInstance.options['title']) + '</span></div>';
        
        var titre = decodeURIComponent(portletInstance.options['title']);
        var indexSeparateur = titre.indexOf(','); 
        if (indexSeparateur > 0) {
            if (langue_portail == 'fr')
                titre = titre.substring(0, indexSeparateur);
            else
                titre = titre.substring(indexSeparateur + 1);
        }
        var str =  '<h2 id="' + portletInstance.id + '_title"><img style="float: left;vertical-align: top;" src="'+iconSrc+'"><div class="portlettitle">' + titre + '</div>';
        
        var minclass=(Y.PosYUIPortletFactory.get('portal').get('allowMinimize')) ? 'min' : 'disabledmin';
		if (portletInstance.options.minned) {
			str += '<a title="' + pos_yui_portal_label_minmax + '" class="'+ minclass +'" href="#">+</a>';
		} else {
			str += '<a title="' + pos_yui_portal_label_minmax + '" class="'+ minclass +'" href="#">-</a>';
		}
		
		if (Y.PosYUIPortletFactory.get('portal').get('allowConfigure')) {
            str += '<a title="' + pos_yui_portal_label_configurer + '" class="conf" href="#">!</a>';
        } else {
    		str += '<a title="' + pos_yui_portal_label_configurer + '" class="disabledconf" href="#">!</a>';
        }
        
        if(portletInstance.portletModel.type == 'bal') {
		  str += '<a title="' + pos_yui_portal_label_actualiser + '" href="javascript:void(0);" onClick="javascript:reloadBal();">...</a>';
        }

        if(portletInstance.portletModel.type == 'question') {
          var refreshstdclass = Y.PosYUIPortletFactory.get('portal').get('allowClose') ? "refresh-std-admin" : "refresh-std"; 
		  str += '<a title="' + pos_yui_portal_label_actualiser + '" class="'+refreshstdclass+'"  href="#">...</a>';
        }
        
		if(portletInstance.portletModel.mandatory || !Y.PosYUIPortletFactory.get('portal').get('allowClose')) {
			str += '<a title="' + pos_yui_portal_label_supprimer + '" class="disabledclose" href="#">X</a></h2>';
		} else {
			str += '<a title="' + pos_yui_portal_label_supprimer + '" class="close" href="#">X</a></h2>';
		}
		
		
        var titleBar = Y.Node.create (str);
		titleBar.on('click', onTitleBarClick);
		return titleBar;
	}
	
	PosYUIPortletFactory.prototype.getFormInputValue = function (inputNode) {
	    if (inputNode == null || inputNode == undefined) return null;
	    
	    switch (inputNode.get('type')) {
	        case 'text': 
	           return encodeURIComponent (inputNode.get('value'));
	        case 'checkbox': 
	           Y.log ('get checked value : ' + inputNode.get('checked'));
	           return inputNode.get('checked');
	    }
	    
	    return null;
	}

    PosYUIPortletFactory.prototype.setFormInputValue = function (inputNode, value) {
        if (inputNode == null || inputNode == undefined) return;
        
        switch (inputNode.get('type')) {
            case 'text': 
               inputNode.set('value', decodeURIComponent(value));
               break;
            case 'checkbox': 
                Y.log ('Set checked value : ' + value);
                inputNode.set('checked', eval(value));
                break;
        }
    }
	
	PosYUIPortletFactory.prototype.makePortletConfigureForm = function (portletInstance) {
		var portletModel = portletInstance.portletModel;
		var options = portletInstance.options;
		var parametres = portletInstance.parametres;
		
        var szRequete = Y.PosYUIPortletFactory.getUrl("AFFICHER_CONFIGURATION");
        var szCorps = "PORTLET_TYPE=" + portletInstance.portletModel.type + "&PORTLET_INSTANCE_ID=" + portletInstance.id;

        szCorps += "&INPUTS_COUNT=" + portletModel.formEntries.count;
        for (var e = 1; e <= portletModel.formEntries.count; ++ e) {
            szCorps += "&ENTRY_" + e + "_LABEL=" + encodeURIComponent(eval ('portletModel.formEntries.e' + e + '_label'));
            szCorps += "&ENTRY_" + e + "_TYPE=" + eval ('portletModel.formEntries.e' + e + '_type');
            szCorps += "&ENTRY_" + e + "_ID=" + eval ('portletModel.formEntries.e' + e + '_id');
        }
        
        var actionReqObject = Y.PosYUIUtils.getXmlHttpRequestObject();
        actionReqObject.open("POST", szRequete, false);
        actionReqObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        actionReqObject.send(szCorps);
          if (actionReqObject.readyState == 4) {
              if (actionReqObject.status == 200) {
                var objAction = eval('(' + actionReqObject.responseText + ')');
                if(objAction.code_retour > 0) {
                    var formNode = Y.Node.create(objAction.contenu);

                    for(var opt in portletModel.options) {
                        if(options[opt] !== undefined) {
                            this.setFormInputValue(formNode.one('#' + opt + '_input'), options[opt]);
                        }
                    }
                    for(var param in portletModel.parametres) {
                        if(parametres[param] !== undefined) {
                            this.setFormInputValue(formNode.one('#' + param + '_input'), parametres[param]);
                        }
                    }
                    formNode.hide(); 
                    return formNode;
                } else {
                    return null;
                }
              } else {
                    return null;
              }
          }
    }

	PosYUIPortletFactory.prototype.makePortletDiv = function(portletInstance) {
		var str = '<div class="portlet" id="' + portletInstance.id + '"></div>';
		var portletDiv = Y.Node.create(str);
		portletDiv.appendChild (this.makePortletTitleBar (portletInstance, false));
		var contentDiv = Y.Node.create('<div id="' + portletInstance.id + '_content" class="portletcontent loading">' + pos_yui_portal_label_chargement + '</div>');
        contentDiv.setStyle('background', decodeURIComponent(portletInstance.options['bgcolor']));
		
		portletDiv.appendChild(contentDiv);
		
		if (portletInstance.options.minned) {
			contentDiv.setStyle('height', '0');
			portletDiv.addClass('minned');
		}
		portletDiv.setData('instance', portletInstance);

		return portletDiv;
	}
	
	PosYUIPortletFactory.prototype.feedPortletDragNode = function(dragNode, portletDiv) {
		dragNode.set('innerHTML', portletDiv.get('innerHTML'));
		dragNode.addClass('portlet');
		dragNode.addClass('portletdrag');
		dragNode.show();
	}
	
	
	PosYUIPortletFactory.prototype.submitForm = function(id) {
		var portletDiv = Y.one ('#' + id);
		var contentDiv = portletDiv.one ('#' + id + "_content"); 
		var form = portletDiv.one ('#' + id + "_form");
		var portletInstance = portletDiv.getData('instance');

		var portletModel = portletInstance.portletModel;
		for(var param in portletModel.parametres) {
			var inputNode = form.one('#' + param + '_input');
			if(inputNode != null) {
				var inputValue = this.getFormInputValue (inputNode);
				if(inputValue != null) {
					portletInstance.parametres[param] = inputValue;
				}
			}
		}
		for(var opt in portletModel.options) {
			var inputNode = form.one('#' + opt + '_input');
			if(inputNode != null) {
                var inputValue = this.getFormInputValue (inputNode);
				if(inputValue != null) {
					portletInstance.options[opt] = inputValue;
				}
			}
		}

		var titleContent = portletDiv.one('div.portlettitle');
		if(portletInstance.options['title'] != undefined) {
			// change title :
			titleContent.set('innerHTML', decodeURIComponent(portletInstance.options['title']));
		}
        
		if (portletInstance.options['bgcolor'] != undefined) {
		    contentDiv.setStyle('background', decodeURIComponent(portletInstance.options['bgcolor']));
		}
		
		portletDiv.setData('instance', portletInstance);
		// content may have changed
		Y.PosYUIPortletFactory.get('portal').onPortletChange(portletInstance, 'configured');
		contentDiv.show();
		form.hide();
	}
	PosYUIPortletFactory.prototype.cancelForm = function(id) {
		var portletDiv = Y.one ('#' + id);
		var contentDiv = portletDiv.one ('#' + id + "_content"); 
		var form = portletDiv.one ('#' + id + "_form");
		contentDiv.show();
		form.hide();		
	}
}, '0.0.1', {requires: ['node', 'dd', 'datatype-xml', 'attributes', 'pos-yui-utils', 'editor']});


