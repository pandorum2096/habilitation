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

        return view("profil.index");
    }

    public function create()
    {  
        return view("profil.store");
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