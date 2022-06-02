var icon_path = '../../../../images/portail/';

var portletModelsList = {
    'bal' : {
        type: 'bal',
        options: {
            title: pos_yui_portal_label_default_bal_title,
            icon: 'balgenerale',
            bgcolor: '#FFFF00'
        },
        parametres: null,
        formEntries: {
            count: 3,
            e1_label: pos_yui_portal_label_title,
            e1_type: 'text',
            e1_id: 'title', 
            e2_label: pos_yui_portal_label_icon,
            e2_type: 'text',
            e2_id: 'icon', 
            e3_label: pos_yui_portal_label_bgcolor,
            e3_type: 'text',
            e3_id: 'bgcolor'
        },
        instanceable: false,
        mandatory: (display_icon_delete_bal == "1") ? false : true
    }, 
    'profil' : {
        type: 'profil',
        options: {
            title: pos_yui_portal_label_default_profil_title,
            icon: 'profil',
            bgcolor: '#FFFFFF'
        },
        parametres: null,
        formEntries: {
            count: 3,
            e1_label: pos_yui_portal_label_title,
            e1_type: 'text',
            e1_id: 'title', 
            e2_label: pos_yui_portal_label_icon,
            e2_type: 'text',
            e2_id: 'icon', 
            e3_label: pos_yui_portal_label_bgcolor,
            e3_type: 'text',
            e3_id: 'bgcolor' 
        },
        instanceable: false,
        mandatory: false
    }, 
    'panier' : {
        type: 'panier',
        options: {
            title: pos_yui_portal_label_default_panier_title,
            icon: 'panier',
            bgcolor: '#FFFFFF'
        },
        parametres: null,
        formEntries: {
            count: 3,
            e1_label: pos_yui_portal_label_title,
            e1_type: 'text',
            e1_id: 'title', 
            e2_label: pos_yui_portal_label_icon,
            e2_type: 'text',
            e2_id: 'icon', 
            e3_label: pos_yui_portal_label_bgcolor,
            e3_type: 'text',
            e3_id: 'bgcolor'
        },
        instanceable: false,
        mandatory: false
    }, 
	'qprivees' :{
		type: 'qprivees',
		options: {
			title: pos_yui_portal_label_default_qprivees_title,
			icon: 'list_bib_priv',
            bgcolor: '#FFFFFF'
		},
		parametres: null,
        formEntries: {
            count: 3,
            e1_label: pos_yui_portal_label_title,
            e1_type: 'text',
            e1_id: 'title', 
            e2_label: pos_yui_portal_label_icon,
            e2_type: 'text',
            e2_id: 'icon', 
            e3_label: pos_yui_portal_label_bgcolor,
            e3_type: 'text',
            e3_id: 'bgcolor' 
        },
		instanceable: false,
		mandatory: false
	},
	'dossier' :{
		type: 'dossier',
		options: {
			title: pos_yui_portal_label_default_dossier_title,
			icon: 'folderopen',
            bgcolor: '#FFFFFF'
		},
		parametres: {
			numdos: 0,
			profilLR: '',
			nb_max: 5
		},
        formEntries: {
             count: 6,
           e1_label: pos_yui_portal_label_title,
            e1_type: 'text',
            e1_id: 'title', 
            e2_label: pos_yui_portal_label_icon,
            e2_type: 'text',
            e2_id: 'icon', 
            e3_label: pos_yui_portal_label_bgcolor,
            e3_type: 'text',
            e3_id: 'bgcolor', 
            e4_label: pos_yui_portal_label_number,
            e4_type: 'text',
            e4_id: 'numdos',
            e5_label: pos_yui_portal_label_profil,
            e5_type: 'text',
            e5_id: 'profilLR',
            e6_label: pos_yui_portal_label_display_nbr,
            e6_type: 'text',
            e6_id: 'nb_max'
        },
		instanceable: true,
		mandatory: false
	},
	'qpubliques' :{
		type: 'qpubliques',
		options: {
			title: pos_yui_portal_label_default_qpubliques_title,
			icon: 'list_bib_part',
            bgcolor: '#FFFFFF'
		},
		parametres: null,
        formEntries: {
            count: 3,
            e1_label: pos_yui_portal_label_title,
            e1_type: 'text',
            e1_id: 'title', 
            e2_label: pos_yui_portal_label_icon,
            e2_type: 'text',
            e2_id: 'icon', 
            e3_label: pos_yui_portal_label_bgcolor,
            e3_type: 'text',
            e3_id: 'bgcolor' 
        },
		instanceable: false,
		mandatory: false
	},
	'rssfeed' :{
		type: 'rssfeed',
		options: {
			title: pos_yui_portal_label_default_rss_title,
			icon: 'rss',
            bgcolor: '#FFFFFF'
		},
		parametres: {
			url: '',
			nb_max: 5
		},
        formEntries: {
            count: 5,
            e1_label: pos_yui_portal_label_title,
            e1_type: 'text',
            e1_id: 'title', 
            e2_label: pos_yui_portal_label_icon,
            e2_type: 'text',
            e2_id: 'icon', 
            e3_label: pos_yui_portal_label_bgcolor,
            e3_type: 'text',
            e3_id: 'bgcolor', 
            e4_label: pos_yui_portal_label_url,
            e4_type: 'text',
            e4_id: 'url', 
            e5_label: pos_yui_portal_label_display_nbr,
            e5_type: 'text',
            e5_id: 'nb_max' 
        },
		instanceable: true,
		mandatory: false
	},
	/*
    'accesbalexterne' :{
		type: 'accesbalexterne',
		options: {
			title: 'Accès corbeilles externes',
			icon: 'rss',
            bgcolor: '#FFFFFF'
		},
        parametres: {
			pos_nom_appli_externe: ''			
		},
		formEntries: {
            count: 4,
            e1_label: pos_yui_portal_label_title,
            e1_type: 'text',
            e1_id: 'title',
            e2_label: pos_yui_portal_label_icon,
            e2_type: 'text',
            e2_id: 'icon', 
            e3_label: pos_yui_portal_label_bgcolor,
            e3_type: 'text',
            e3_id: 'bgcolor',
            e4_label: pos_yui_portal_label_bal_externe_pos_appli_name,
            e4_type: 'text',
            e4_id: 'pos_nom_appli_externe',
        },
		instanceable: true,
		mandatory: false
	},
	*/
	'question' : {
		type: 'question',
		options: {
			title: pos_yui_portal_label_default_question_title,
			icon: 'reponse',
            bgcolor: '#FFFFFF'
		},
		parametres: {
			pos_quest_nom: '',
			pos_quest_public: false,
			profilLR: '',
			nb_max: 5,
			variables: '',
            pos_quest_type_tri : '1',
            pos_quest_colonne_tri : '1',
            pos_aff_lien_lr : true
		},
        formEntries: {
            count: 11,
            e1_label: pos_yui_portal_label_title,
            e1_type: 'text',
            e1_id: 'title', 
            e2_label: pos_yui_portal_label_icon,
            e2_type: 'text',
            e2_id: 'icon', 
            e3_label: pos_yui_portal_label_bgcolor,
            e3_type: 'text',
            e3_id: 'bgcolor', 
            e4_label: pos_yui_portal_label_question,
            e4_type: 'text',
            e4_id: 'pos_quest_nom', 
            e5_label: pos_yui_portal_label_profil,
            e5_type: 'text',
            e5_id: 'profilLR', 
            e6_label: pos_yui_portal_label_display_nbr,
            e6_type: 'text',
            e6_id: 'nb_max', 
            e7_label: pos_yui_portal_label_variables,
            e7_type: 'text',
            e7_id: 'variables', 
            e8_label: pos_yui_portal_label_public,
            e8_type: 'checkbox',
            e8_id: 'pos_quest_public',
            
            e9_label: pos_yui_portal_label_question_type_tri,
            e9_type: 'text',
            e9_id: 'pos_quest_type_tri', 
            e10_label: pos_yui_portal_label_question_colonne_tri,
            e10_type: 'text',
            e10_id: 'pos_quest_colonne_tri',
            e11_label: pos_yui_portal_label_aff_lien_lr,
            e11_type: 'checkbox',
            e11_id: 'pos_aff_lien_lr', 
        },
		instanceable: true,
		mandatory: false
	}
	/*, 
	
	'histodocs' : {
		type: 'histodocs',
		options: {
			title: pos_yui_portal_label_default_histodocs_title,
			icon: 'rubriques',
            bgcolor: '#FFFFFF'
		},
		parametres: {
			nb_max: 5
		},
        formEntries: {
            count : 4,
            e1_label: pos_yui_portal_label_title,
            e1_type: 'text',
            e1_id: 'title', 
            e2_label: pos_yui_portal_label_icon,
            e2_type: 'text',
            e2_id: 'icon', 
            e3_label: pos_yui_portal_label_bgcolor,
            e3_type: 'text',
            e3_id: 'bgcolor', 
            e4_label: pos_yui_portal_label_display_nbr,
            e4_type: 'text',
            e4_id: 'nb_max' 
        },
		instanceable: false,
		mandatory: false
	}
    ,
	'googlegadget' : {
		type: 'googlegadget',
		options: {
			title: 'Gadget Google',
			icon: 'google',
            bgcolor: '#FFFFFF'
		},
		parametres: {
			src: ''
		},
		formInputs : optionsFormString + '<span class="labelChamp">Source</span> <input class="inputChamp" type="text" id="src_input"/><br/>',
		instanceable: true,
		mandatory: false
	}, 
	'notepad' : {
		type: 'notepad',
		options: {
			title: 'Bloc note',
			icon: 'document',
            bgcolor: '#FFFFFF'
		},
		parametres: {
			content: 'bloc note'
		},
		formInputs: optionsFormString,
		instanceable: true,
		mandatory: false
	}*/
}
