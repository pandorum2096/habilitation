var Yglob = YUI({
	skin : 'sam'
}).use('dd', 'node', 'anim', 'dom', 'event', 'overlay', 'node-menunav', 'pos-yui-utils', 'attributes', 'pos-yui-portlet-factory', function(Y) {
	var PosYUIPortal = function(cfg) {
		PosYUIPortal.superclass.constructor.apply(this, arguments);
		this.insertionDiv = null;
		var attrs = {
			'editing' : {
				value: false
			}, 
            'showconfigpanel' : {
				value: false
			}, 
			'layoutDefinition' : {
				value: null
			}, 
			'saveOnMoved' : {
			    value: true
			},
            'saveOnMinned' : {
                value: false
            }, 
            'allowMove' : {
                value: false
            },
            'allowClose' : {
                value: false
            },
            'allowConfigure' : {
                value: false
            }, 
            'allowMinimize' : {
                value: false
            }
		};
		this.addAttrs(attrs, cfg);
	};
	PosYUIPortal.NAME = 'pos-yui-portal';
	Y.extend(PosYUIPortal, Y.Base);
	Y.augment(PosYUIPortal, Y.Attribute);
	Y.PosYUIPortal = new PosYUIPortal({'editing': false});

	Y.on("domready", function() {
		Y.PosYUIPortletFactory.set('portal', Y.PosYUIPortal);
		var portalDiv = Y.one('#portal');
		var displayDiv = Y.Node.create ('<div id="layoutdisplay"/>');
		displayDiv.hide();
		portalDiv.appendChild (displayDiv);
		var modelsListDiv = Y.Node.create ('<div id="portletslist"></div>');
		modelsListDiv.hide();
		portalDiv.appendChild (modelsListDiv);		

		var layoutsListDiv = Y.Node.create ('<div id="layoutslist"></div>');
		layoutsListDiv.hide();
		portalDiv.appendChild (layoutsListDiv);		

        if (isAdmin) {
            Y.PosYUIPortal.set('editing', true);
        } else {
            Y.PosYUIPortal.set('saveOnMoved', false);
        }

		Y.PosYUIPortal.feedModelsList(modelsListDiv);
		// GG 18.02.2013 suppression chargement des layouts disponibles (fait a la demande) 
		Y.PosYUIPortal.parseAndMakeLayout(null);

		if (Y.PosYUIPortal.get('showconfigpanel')) {		
			layoutsListDiv.show();
			modelsListDiv.show();
		}
		// TODO voir meilleure solution que '-80'...
        displayDiv.setStyle('min-height', (Y.one('body').get('winHeight') - 80) + 'px');
		displayDiv.show();
		Y.PosYUIPortal.populatePortlets();
		initEcranAccueil();
	});

Y.PosYUIPortal.on('showconfigpanelChange', function (e) {
		Y.log ('showconfigpanel changed : ' + e.newVal);
		if (e.newVal) {
			Y.one('#layoutdisplay').setStyle('width', '80%');
            Y.one('#layoutdisplay').setStyle('border', '1px solid #D4D8EB');
            Y.one('#portletslist').show();
			// GG 18.02.2013 chargement des layouts disponibles a la demande 
            Y.PosYUIPortal.feedlayoutsListDiv(Y.one('#layoutslist'));
			Y.one('#layoutslist').show();
            document.getElementById('showconfigpaneltoggler').dataset.isOpen = 1;
		} else {
			Y.one('#layoutdisplay').setStyle('width', '100%');
            Y.one('#layoutdisplay').setStyle('border', 'none');
			Y.one('#portletslist').hide();
			Y.one('#layoutslist').hide();
            document.getElementById('showconfigpaneltoggler').dataset.isOpen = 0;
		}
	});
	
	Y.PosYUIPortal.on('editingChange', function (e) {
		Y.log ('editing changed : ' + e.newVal);
		if (e.newVal) {
			Y.PosYUIPortal.set('allowMove', true);
            Y.PosYUIPortal.set('allowClose', true);
            Y.PosYUIPortal.set('allowConfigure', true);
            Y.PosYUIPortal.set('allowMinimize', true);
            Y.PosYUIPortal.set('saveOnMoved', true);
            document.getElementById('editiontoggler').setAttribute('data-is-edit','1');
            Y.one('#showconfigpaneltoggler').setStyle('display', '');
            Y.PosYUIPortal.set('showconfigpanel', true);
		} else {
			Y.PosYUIPortal.set('allowMove', false);
            Y.PosYUIPortal.set('allowClose', false);
            Y.PosYUIPortal.set('allowConfigure', false);
            Y.PosYUIPortal.set('allowMinimize', false);
            Y.PosYUIPortal.set('saveOnMoved', false);
            document.getElementById('editiontoggler').setAttribute('data-is-edit','0');
            Y.one('#showconfigpaneltoggler').setStyle('display', 'none');
		}
	});

	PosYUIPortal.prototype.getInsertionDiv = function() {
		if (this.insertionDiv == null) {
			if (Y.PosYUIPortal.get('layoutDefinition').type == 'vertical') {
				this.insertionDiv = Y.Node.create('<div class="vinsertiondiv"/>');
			} else if (Y.PosYUIPortal.get('layoutDefinition').type == 'horizontal') {
				this.insertionDiv = Y.Node.create('<div class="hinsertiondiv"/>');
			}
		}

		this.insertionDiv.show();
		return this.insertionDiv;
	}	

    PosYUIPortal.prototype.getUrl = function(typeURL) {
    
        var tabCodeUrl = new Array();
        if(CST_TYPE_APPLI == 1)
            tabCodeUrl["MANAGE_LAYOUT"] = "../portail/manage_layout.php";
        else if(CST_TYPE_APPLI == 2) {
            tabCodeUrl["MANAGE_LAYOUT"] = "../../../../servlet/interface/session/principal/portail.ManageLayout"; 
        }
		return tabCodeUrl[typeURL];
	}	

	PosYUIPortal.prototype.getNewInstanceSlot = function() {
		if (Y.PosYUIPortal.get('layoutDefinition').type == 'vertical') {
			var div = Y.one('#verticalDiv');
			var firstUl = Y.one('ul.verticalGroup');
			// empty slots have to be created in this case :
			var slot = Y.Node.create('<li class="verticalGroupZone"/>');
			firstUl.prepend(slot);
			return slot;
		} else if (Y.PosYUIPortal.get('layoutDefinition').type == 'horizontal') {
			var div = Y.one('#horizontalDiv');
			var firstUl = Y.one('ul.horizontalGroup');
			// empty slots have to be created in this case :
			var slot = Y.Node.create('<li class="horizontalGroupZone"/>');
			firstUl.prepend(slot);
			return slot;
		}
	}
	
	PosYUIPortal.prototype.feedModelsList = function(modelsListDiv) {
		var ul = Y.Node.create('<ul/>');
		modelsListDiv.appendChild(ul);

		for(var modelType in portletModelsList) {
			var portletModel = portletModelsList[modelType];
			var icon = 'url('+ icon_path + decodeURIComponent(portletModel.options['icon']) + '.png)';
			var node = Y.Node.create('<li id="' + modelType + '" style="background-image: ' + icon + '">' + portletModel.options.title + '</li>');
			this.makeModelsListDrag (portletModel, node);
			ul.appendChild(node);
		}
	}
	
	/**
	 * Cree la liste des gestionnaires de contenu disponibles
	 */     	
	PosYUIPortal.prototype.feedlayoutsListDiv = function(layoutsListDiv) {
		var actionReqObject = Y.PosYUIUtils.getXmlHttpRequestObject();
		var szRequete = Y.PosYUIPortal.getUrl("MANAGE_LAYOUT") + "?ACTION_LAYOUT=get_availables";
		if(actionReqObject.readyState == 4 || actionReqObject.readyState == 0) {
			actionReqObject.open("GET", szRequete, false);
			actionReqObject.send(null);
			if(actionReqObject.readyState == 4 || actionReqObject.readyState == 0) {
				var objAction = eval('(' + actionReqObject.responseText + ')');
				if(objAction.code_retour > 0) {
				    layoutsListDiv.get('childNodes').remove();
					var ul = Y.Node.create('<ul/>');
					ul.appendChild ('<h2 style="color: #5E6BA4; margin:0; text-align:center;">'+ pos_yui_portal_label_layout +'</h2>');
					for (var i=0; i < objAction.nombre; ++i) {
						var li = null;
						var icon_name =  eval ('objAction.icone' + i);
						if (icon_name != null && icon_name != "") {
							li = Y.Node.create ('<li style="background-image: url('+ icon_path + icon_name + '.png)">' + eval ('objAction.nom' + i) + '</li>');
						} else {
						    li = Y.Node.create ('<li>' + eval ('objAction.nom' + i) + '</li>');
						}
						
						li.setData('index', i);
						ul.appendChild(li);
					}
					ul.delegate('click', onAvailableLayoutClick, 'li');
					layoutsListDiv.appendChild (ul);
				} else {
					alert(objAction.msg_erreur);
					return;
				}
			}
		}		
	}

	function onAvailableLayoutClick (e) {
		Y.PosYUIPortal.changeLayout (this.getData('index'));
	}
	/**
	 * accepts null node (retrieves node from model)
	 */
	PosYUIPortal.prototype.makeModelsListDrag = function(portletModel, node) {
		if (node == null) {
			var listDiv = Y.one('#portletslist');
			node = listDiv.one('#' + portletModel.type);
			if (node.hasClass('disabled')) node.removeClass('disabled');
		}
		var drag = new Y.DD.Drag({
			node: node,
			data: portletModel,
			bubbles: Y.PosYUIPortal
		}).plug(Y.Plugin.DDProxy, {
			moveOnEnd : false,
			borderStyle : 'none'
		});
		drag.set('frommodelslist', true);
		return drag;
	}

	Y.PosYUIPortal.on('drag:start', function(e) {
	    Y.log ('on drag start');
	    if (! Y.PosYUIPortal.get('allowMove')) {
	        Y.log ('move not allowed')
            e.halt(true);
            e.stopPropagation();
            e.preventDefault()
            return;
	    }
		var drag = e.target;
		var portletDiv = null;
		if (drag.get('frommodelslist')) {
			var slot = Y.PosYUIPortal.getNewInstanceSlot();
			if(slot == null) {
				alert('no free slot, TODO');
				return;
			}
			var portletModel = drag.get('data');
			portletDiv = Y.PosYUIPortal.makePortlet(portletModel.type, {}, {});
			portletDiv.hide();			
			slot.appendChild(portletDiv);	
			if(!portletModel.instanceable) {
				drag.get('node').addClass('disabled');
			}
			var portletDrag = Y.DD.DDM.getDrag(portletDiv);
			Y.PosYUIPortletFactory.feedPortletDragNode(portletDrag.get('dragNode'), portletDiv);
			drag.set('node', portletDiv);
			drag.set('data', portletDrag.get('data'));
			drag.set('dragNode', portletDrag.get('dragNode'));
	
			if(portletModel.instanceable) {
				// recreate drag on list :
				Y.PosYUIPortal.makeModelsListDrag (portletModel, null);
			}			
		} else {
			portletDiv = drag.get('node');
			var portletDrag = Y.DD.DDM.getDrag(portletDiv);
			Y.PosYUIPortletFactory.feedPortletDragNode(portletDrag.get('dragNode'), portletDiv);
			portletDiv.hide();
		}

		var insertionDiv = Y.PosYUIPortal.getInsertionDiv();
		var portletParent = portletDiv.get('parentNode');
		portletParent.insert(insertionDiv, 'before');
		portletParent.hide();
	});
	var hit = function(region, xy) {
		return xy[0] > region.left && xy[0] < region.right && xy[1] > region.top && xy[1] < region.bottom;
	}

	Y.PosYUIPortal.on('drop:over', function(e) {
        if (! Y.PosYUIPortal.get('allowMove')) {
            Y.log ('move not allowed')
            e.halt(true);
            e.stopPropagation();
            e.preventDefault()
            return;
        }
	    
		var drop = e.drop.get('node'), drag = e.drag.get('node');

		Y.log('drop over drop tag name is ' + drop.get('tagName').toLowerCase());
		var xy = e.drag.mouseXY;
		var insertionDiv = Y.PosYUIPortal.getInsertionDiv();

		// hit on parent : do nothing
		if(hit(insertionDiv.get('region'), xy)) {
			Y.log('hit insertion point : ok')
			return;
		}

		// hit on existing li ?
		var hitLi = null;
		drop.all('li.verticalGroupZone').each(function(li) {
			if(hitLi == null && hit(li.get('region'), xy)) {
				Y.log('hit child' + li);
				hitLi = li;
			}
		});
		if(hitLi != null) {
			if(hitLi.previous() == insertionDiv) {
				Y.log('prev insertion zone');
			} else {
				hitLi.insert(insertionDiv, 'before');
			}
		} else {
			// move insertion point to the end of ul
			drop.appendChild(insertionDiv);
		}
	});

	Y.PosYUIPortal.on('drag:drophit', function(e) {
        if (! Y.PosYUIPortal.get('allowMove')) {
            Y.log ('move not allowed')
            e.halt(true);
            e.stopPropagation();
            e.preventDefault()
            return;
        }
		var portletDrag = e.drag;
		var portletDiv = portletDrag.get('node');		
		var insertionDiv = Y.PosYUIPortal.getInsertionDiv();
		var parent = portletDiv.get('parentNode');
		insertionDiv.insert(parent, 'before');
        portletDrag.get('dragNode').hide();
        portletDrag.get('dragNode').set('innerHTML', '');
		parent.show();
		portletDiv.show ();
		insertionDiv.hide();
		if (portletDrag.get('frommodelslist')) {
			Y.PosYUIPortletFactory.feedPortletContent(portletDiv);
			portletDrag.set('frommodelslist', false);
		}
		Y.PosYUIPortal.onPortletChange(portletDiv.getData('instance'), 'moved');
	});

	Y.PosYUIPortal.on('drag:dropmiss', function(e) {
        if (! Y.PosYUIPortal.get('allowMove')) {
            Y.log ('move not allowed')
            e.halt(true);
            e.stopPropagation();
            e.preventDefault()
            return;
        }
		Y.log ('drop miss');
		var portletDrag = e.target;
		var portletDiv = portletDrag.get('node');
		var insertionDiv = Y.PosYUIPortal.getInsertionDiv();
		portletDrag.get('dragNode').hide();		
        portletDrag.get('dragNode').set('innerHTML', '');
		insertionDiv.hide();
		
		if (portletDrag.get('frommodelslist')) {
			var portletModel = portletDrag.get('data').portletModel;
			portletDiv.remove(false);
//			portletDrag.destroy();
			
			if(!portletModel.instanceable)
				Y.PosYUIPortal.makeModelsListDrag(portletModel, null);
		} else { 
			portletDiv.get('parentNode').show();
			portletDiv.show();
		}
		e.stopPropagation();
	});

	PosYUIPortal.prototype.onPortletChange = function (portletInstance, action) {
		Y.log ('change on ' + portletInstance + ', action is ' + action);
		switch (action) {
			case 'minned': 
			    if (Y.PosYUIPortal.get('saveOnMinned'))
				    this.saveLayout(null);
				break;
			case 'removed': 
				if (!portletInstance.portletModel.instanceable) {
					this.makeModelsListDrag(portletInstance.portletModel, null);
				}
				var portletDiv = Y.one('#' + portletInstance.id);
				portletDiv.remove(true);
			
				this.saveLayout(null);
				break;
			case 'configured':
			    var hasParams = false;
			    if (portletInstance.parametres != null) {
			        for (var p in portletInstance.parametres)
			            hasParams = true;
			    }
			    Y.log ('configured with params ' + hasParams);
                if (hasParams)
				Y.PosYUIPortletFactory.feedPortletContent(Y.one('#' + portletInstance.id));
				this.saveLayout(null);
				break;
			case 'moved':
				if (portletInstance.portletModel.type == 'notepad') 
					Y.PosYUIPortletFactory.feedPortletContent(Y.one('#' + portletInstance.id));
                if (Y.PosYUIPortal.get('saveOnMoved'))
    				this.saveLayout(null);
				break;
		}
	}

	PosYUIPortal.prototype.makePortlet = function(portletType, options, parametres) {
		var portletInstance = Y.PosYUIPortletFactory.makePortletInstance(portletType, options, parametres);
		var portletDiv = Y.PosYUIPortletFactory.makePortletDiv (portletInstance);
		var d = new Y.DD.Drag({
			node : portletDiv,
			data : portletInstance,
			bubbles : Y.PosYUIPortal
		}).plug(Y.Plugin.DDProxy, {
			moveOnEnd : false,
			borderStyle: 'none'
		});
		d.set('target', false);
		d.addHandle('h2').addInvalid('a');

		// if model not instanceable, remove drag from list and add style
		if(!portletInstance.portletModel.instanceable) {
			var listDiv = Y.one('#portletslist');
			var li = listDiv.one('#' + portletInstance.portletModel.type);
            if (li != null) {
    			li.addClass('disabled');
    			Y.DD.DDM.getDrag(li).destroy();
            }
		}		
		return portletDiv;
	}

	PosYUIPortal.prototype.removePortletByType = function(type, zonesList) {
		var portlets = [];
		for(var j = 0; j < zonesList.length; j++){
			if(zonesList[j].portletType != type)
				portlets.push(zonesList[j]);
		}
		return portlets;
	}
	PosYUIPortal.prototype.makeLayoutGroup = function(group, layoutDefinition) {
		var groupClass = null;
		var groupZoneClass = null;
		if (layoutDefinition.type == 'vertical') {
			groupClass = 'verticalGroup';
			groupZoneClass = 'verticalGroupZone';
		} else if (layoutDefinition.type == 'horizontal') {
			groupClass = 'horizontalGroup';
			groupZoneClass = 'horizontalGroupZone';
		}
		
		var zonesList = group.zones;
		// Supprimer le type bal si aucun élément dans la BAL
		if(elements_dans_bal == "0" && !isAdmin)
			zonesList = this.removePortletByType("bal", zonesList);
		var groupNode = Y.Node.create('<ul class="' + groupClass + '" data-group-weight="'+group.weight+'"/>');
		groupNode.setData('group', group);
		new Y.DD.Drop({
			node : groupNode,
			bubbles : Y.PosYUIPortal
		});

		for(var j = 0; j < zonesList.length; ++j) {
			var zoneNode = Y.Node.create('<li class="' + groupZoneClass + '"/>');
			var zone = zonesList[j];

			//TODO if layoutDefinition is not current definition, claim portlets for current layout ? 
			if (zone.portletType != 'empty') {
				var portletDiv = this.makePortlet(zone.portletType, zone.options, zone.parametres);
				zoneNode.appendChild(portletDiv);
			}
			groupNode.appendChild(zoneNode);
		}

		return groupNode;
	}

	PosYUIPortal.prototype.createLayout = function(layoutDefinition) {
		var layoutDisplayDiv = Y.one('#layoutdisplay');

		if(layoutDefinition.type == 'vertical') {
			var divNode = Y.Node.create("<div class='displayZone'/>");

			for(var i = 0; i < layoutDefinition.columns; ++i) {
				var list = this.makeLayoutGroup(layoutDefinition.groups[i], layoutDefinition);
				divNode.appendChild(list);
			}
			layoutDisplayDiv.appendChild(divNode);
			return divNode;
		} else if(layoutDefinition.type == 'horizontal') {
			var divNode = Y.Node.create("<div class='displayZone'/>");

			for(var i = 0; i < layoutDefinition.rows; ++i) {
				var list = this.makeLayoutGroup(layoutDefinition.groups[i], layoutDefinition);
				divNode.appendChild(list);
			}
			layoutDisplayDiv.appendChild(divNode);
			return divNode;
		}
	}

	PosYUIPortal.prototype.parseGroup = function (groupXMLNode) {
		var group = {
			zones: []
		};
		for (var i = 0; i < groupXMLNode.childNodes.length; ++ i) {
			var element = groupXMLNode.childNodes[i];
			if (element.nodeName == 'option') {
				if (element.attributes.getNamedItem('name').value == 'weight') {
					group['weight'] = parseInt(element.attributes.getNamedItem('value').value);
				}
			} else if (element.nodeName == 'box') {
				// parse element : 
				var portletType = element.attributes.getNamedItem('type').value;
				if (portletType != 'empty') {
					// feed parametres & options
					var parametres = {};
					var options = {};
					for (var j = 0; j < element.childNodes.length; ++j) {
						var parametreNode = element.childNodes[j];
						if (parametreNode.nodeName == 'option') {
							options[parametreNode.attributes.getNamedItem('name').value] = parametreNode.attributes.getNamedItem('value').value;
						} else if (parametreNode.nodeName == 'parametre') {
							parametres[parametreNode.attributes.getNamedItem('name').value] = parametreNode.attributes.getNamedItem('value').value;
						}
					}
				}
				
				group.zones[group.zones.length] = {'portletType': portletType, 'options': options, 'parametres': parametres};
			}
		}
		
		if (group['weight'] == undefined) {
			group['weight'] = 1;
		} else if (group['weight'] > 5 || group['weight'] < 1) {
			// TODO warning ?
			group['weigth'] = 1;
		}
		
		return group;
	}

	/**
	 * parses layout node 
	 * @param {Object} layoutXMLNode
	 * @return {Object} containing rows, columns, type, name and groups
	 */
	PosYUIPortal.prototype.parseLayout = function(layoutXMLNode) {
		var groupList = [];
		var rows = 0;
		var columns = 0;
		var weightsum = 0;
		for(var i = 0; i < layoutXMLNode.childNodes.length; ++i) {
			var element = layoutXMLNode.childNodes[i];
			if(element.nodeName == 'option') {
				var optionName = element.attributes.getNamedItem('name').value;
				var optionValue = element.attributes.getNamedItem('value').value;
				if(optionName == 'rows') {
					rows = optionValue;
				} else if(optionName == 'columns') {
					columns = optionValue;
				}
			} else if(element.nodeName == 'group') {
				var group = this.parseGroup(element);
				groupList[groupList.length] = group;
				weightsum = weightsum + group['weight'];
			}
		}

		var layoutType = layoutXMLNode.attributes.getNamedItem('type').value;
		var layoutName = layoutXMLNode.attributes.getNamedItem('name').value;

		if(layoutType == 'vertical') {
			rows = 1;
			if(columns <= 0) {
				Y.log("no or invalid columns specified, default to 3");
				columns = 3;
			}
		} else if(layoutType == 'horizontal') {
			if(rows <= 0) {
				Y.log("no or invalid rows specified, default to 2");
				rows = 2;
			}
			columns = 1;
		}

		return {
			'rows' : rows,
			'columns' : columns,
			'weightsum': weightsum,
			'groups' : groupList,
			'type' : layoutType,
			'name' : layoutName
		};
	}

	PosYUIPortal.prototype.parseAndMakeLayout = function(layoutName) {
	
	    // GG 18.02.2013 chargement en statique, ajax + long
		if(currentLayoutContent.length > 0) {
			var xmlDoc = Y.PosYUIUtils.loadXMLString(currentLayoutContent);
			// chrome access needs to get rid of namespace
			var layoutXMLNode = xmlDoc.getElementsByTagName ((xmlDoc.getElementsByTagName('clientlayout:Layout').length == 0) ? "Layout" : "clientlayout:Layout") [0];
			Y.PosYUIPortal.set('layoutDefinition', this.parseLayout(layoutXMLNode));
			Y.PosYUIPortal.get('layoutDefinition').displayDiv = this.createLayout(Y.PosYUIPortal.get('layoutDefinition'));
		} else {
		    alert(currentLayoutContentMsgErr);
		}

	    /*
		var actionReqObject = Y.PosYUIUtils.getXmlHttpRequestObject();
		var szRequete = "../portail/manage_layout.php?ACTION_LAYOUT=get_current";
		if(actionReqObject.readyState == 4 || actionReqObject.readyState == 0) {
			actionReqObject.open("GET", szRequete, false);
			actionReqObject.send(null);
			if(actionReqObject.readyState == 4 || actionReqObject.readyState == 0) {
				Y.log("response Text=" + actionReqObject.responseText);
				var objAction = eval('(' + actionReqObject.responseText + ')');
				if(objAction.code_retour > 0) {
					var xmlDoc = Y.PosYUIUtils.loadXMLString(objAction.contenu);
					// chrome access needs to get rid of namespace
					var layoutXMLNode = xmlDoc.getElementsByTagName ((xmlDoc.getElementsByTagName('clientlayout:Layout').length == 0) ? "Layout" : "clientlayout:Layout") [0];
					Y.PosYUIPortal.set('layoutDefinition', this.parseLayout(layoutXMLNode));
					Y.PosYUIPortal.get('layoutDefinition').displayDiv = this.createLayout(Y.PosYUIPortal.get('layoutDefinition'));
				} else {
					alert(objAction.msg_erreur);
				}
			}
		}
		*/
				
	}

	PosYUIPortal.prototype.getAvailableLayout = function (index) {
		var actionReqObject = Y.PosYUIUtils.getXmlHttpRequestObject();
		var szRequete = Y.PosYUIPortal.getUrl("MANAGE_LAYOUT") + "?ACTION_LAYOUT=get_by_index";
		szRequete += "&LAYOUT_INDEX=" + index;
		if(actionReqObject.readyState == 4 || actionReqObject.readyState == 0) {
			actionReqObject.open("GET", szRequete, false);
			actionReqObject.send(null);
			if(actionReqObject.readyState == 4 || actionReqObject.readyState == 0) {
				Y.log("response Text=" + actionReqObject.responseText);
				var objAction = eval('(' + actionReqObject.responseText + ')');
				if(objAction.code_retour > 0) {
					var xmlDoc = Y.PosYUIUtils.loadXMLString(objAction.contenu);
					// chrome access needs to get rid of namespace
					var layoutXMLNode = xmlDoc.getElementsByTagName ((xmlDoc.getElementsByTagName('clientlayout:Layout').length == 0) ? "Layout" : "clientlayout:Layout") [0];
					return this.parseLayout(layoutXMLNode);
				} else {
					alert(objAction.msg_erreur);
				}
			}
		}
		return null;
	}

	PosYUIPortal.prototype.changeLayout = function (index) {
		// TODO add tests vertical/ horizontal... 
		var targetLayout = this.getAvailableLayout(index);
		if (targetLayout == null) return;
		targetLayout.displayDiv = this.createLayout(targetLayout);
		targetLayout.displayDiv.hide();
		var currentLayout = Y.PosYUIPortal.get('layoutDefinition');
		
		var currentDisplayDiv = currentLayout.displayDiv;
		
		if (currentLayout.type == 'vertical') {
			var currentGroupNodes = currentDisplayDiv.all('.verticalGroup');
			var groupNodes = targetLayout.displayDiv.all('.verticalGroup');
			for (var i = 0; i < currentGroupNodes.size(); ++i) {
				var group = (i<groupNodes.size())? groupNodes.item(i) : groupNodes.item(groupNodes.size() - 1);
				
				currentGroupNodes.item(i).all('.verticalGroupZone').each(function(li) {
					li.remove(false);
					group.appendChild(li);
					// hook : need to refresh notepad after move (ugly)
					var portletDiv = li.one ('div.portlet');
					var portletInstance = portletDiv.getData('instance');
					if (portletInstance.portletModel.type == 'notepad') {
						Y.PosYUIPortletFactory.feedPortletContent(portletDiv);
					}
					// end hook
				});
			}
		}
		currentDisplayDiv.remove(true);
		targetLayout.displayDiv.show();
		Y.PosYUIPortal.set('layoutDefinition', targetLayout);
		Y.PosYUIPortal.saveLayout(null);
	}

	PosYUIPortal.prototype.populatePortlets = function() {
		Y.all('div.portlet').each(function(portletDiv) {
			Y.PosYUIPortletFactory.feedPortletContent(portletDiv);
		});
	}

	PosYUIPortal.prototype.saveLayout = function(name) {
		if(name == null) {
			name = Y.PosYUIPortal.get('layoutDefinition').name;
		}
		var str = '<?xml version="1.0" encoding="UTF-8"?><clientlayout:Layout xmlns:clientlayout="http://www.sesin.com/clientlayout/1.0" type="' + Y.PosYUIPortal.get('layoutDefinition').type + '" name="' + name + '">';
		str += '<option name="rows" value="' + Y.PosYUIPortal.get('layoutDefinition').rows + '"/>';
		str += '<option name="columns" value="' + Y.PosYUIPortal.get('layoutDefinition').columns + '"/>';

		if(Y.PosYUIPortal.get('layoutDefinition').type == 'vertical') {
			var div = Y.one('div.displayZone');
			div.all('ul.verticalGroup').each(function(ul) {
				str += '<group>';
				
				var group = ul.getData('group');
				if (group['weight'] != undefined) {
					str += '<option name="weight" value="' + group['weight'] + '"/>';
				}
				
				ul.all('li.verticalGroupZone').each(function(li) {
					var div = li.one('div');
					if(div != null) {
						var id = div.get('id');
						var dd = Y.DD.DDM.getDrag('#' + id);
						var data = dd.get('data');
						str += '<box type="' + data.portletModel.type + '">';


						for(prop in data.parametres) {
							if(data.parametres[prop] != null) {
								str += '<parametre name="' + prop + '" value="' + data.parametres[prop] + '"/>';
							}
						}
						if(div.hasClass('minned')) {
							str += '<option name="minned" value="true"/>';
						}
						for(prop in data.options) {
							if(prop != 'colspan' && prop != 'minned' && prop != 'rowspan' && data.options[prop] != null) {
								str += '<option name="' + prop + '" value="' + data.options[prop] + '"/>';
							}
						}
						str += '</box>';
					} else {
						li.remove(true);
					}
				});
				str += '</group>';
			});
		} else if(Y.PosYUIPortal.get('layoutDefinition').type == 'horizontal') {
			var div = Y.one('div.displayZone');
			div.all('ul.horizontalGroup').each(function(ul) {
				str += '<group>';

				var group = ul.getData('group');
				if (group.weight != undefined) {
					str += '<option name="weight" value="' + group.weight + '"/>';
				}
				
				ul.all('li.horizontalGroupZone').each(function(li) {
					var div = li.one('div');
					if(div != null) {
						var id = div.get('id');
						var dd = Y.DD.DDM.getDrag('#' + id);
						var data = dd.get('data');
						str += '<box type="' + data.portletModel.type + '">';


						for(prop in data.parametres) {
							if(data.parametres[prop] != null && data.parametres[prop] != "") {
								str += '<parametre name="' + prop + '" value="' + data.parametres[prop] + '"/>';
							}
						}
						if(div.hasClass('minned')) {
							str += '<option name="minned" value="true"/>';
						}
						for(prop in data.options) {
							if(prop != 'colspan' && prop != 'rowspan' && data.options[prop] != null && data.options[prop] != "") {
								str += '<option name="' + prop + '" value="' + data.options[prop] + '"/>';
							}
						}
						str += '</box>';
					} else {
						li.remove(true);
					}
				});
				str += '</group>';
			});
		}

		str += '</clientlayout:Layout>';
		encodedString = encodeURIComponent(str);
		Y.log(encodedString);
		var actionReqObject = Y.PosYUIUtils.getXmlHttpRequestObject();
		var szRequete = Y.PosYUIPortal.getUrl("MANAGE_LAYOUT");
        var szCorps = "ACTION_LAYOUT=save&CONTENT=" + encodedString;
		//actionReqObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		Y.log (szRequete);
		if(actionReqObject.readyState == 4 || actionReqObject.readyState == 0) {
			//actionReqObject.open("GET", szRequete, false);
			//actionReqObject.send(null);
			actionReqObject.open("POST", szRequete, false);
			actionReqObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			actionReqObject.send(szCorps);
			
			if(actionReqObject.readyState == 4 || actionReqObject.readyState == 0) {
				Y.log("save response=" + actionReqObject.responseText);
				var objAction = eval('(' + actionReqObject.responseText + ')');
				if(objAction.code_retour <= 0) {
					alert(objAction.msg_erreur);
				}
			}
		}
	}
});
