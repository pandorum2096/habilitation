<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Menus;
use App\sousmenu;
use App\Action;
use App\Profils;
use App\Permission;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        
        
    }

    public function store(Request $request)
    {  
        $profil = new Profils();
        $profil->code = $request->code;
        $profil->libelle = $request->libelle;
        $profil->statut = true;
        $profil->save(); 
        $idProfil = $profil->id;

        $menus = Menus::where('statut', true)->get();
        $actions = Action::where('statut', true)->get(); 
        
		foreach($menus as $menu) {  
            
            if (is_array($actions) || is_object($actions))
            {
                foreach($actions as $action)
                {      
                    dd($request->input('menu.id'));
                    if($menu->id .'|'. $action->id == $request[$menu->id .'|'. $action->id]){   
                        Permission::created([
                            'menu_id'=>$request->menu->id,
                            'action_id'=>$request->action->id,
                            'profil_id'=>$idProfil,
                        ]);
                    }
                } 
            }  
		}

        return redirect("/profil");
    }

    public function create()
    {  
        $menus = Menus::where('statut', true)->get();
        $actions = Action::where('statut', true)->get(); 

        return view("profil.store", compact('actions','menus'));
    }

    public function edit()
    {
        return view("profil.edit");
    }

    public function achat()
    {
        return view("achat.index");
    }

    public function finance()
    {
        return view("finance.index");
    }
}