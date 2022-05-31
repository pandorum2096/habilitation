<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Menus;
use App\sousmenu;
use App\Action;
use APP\Profils;
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
        $auth = Auth::user()->profil;

        $menus = Menus::where('statut', '=', 'OK')->get();
        if($auth != 1)
            $actions = Action::where('actions.statut', '=', 'OK')->leftJoin("permissions","permissions.action_id","actions.id")->where("permissions.profil_id","=",1)->get();
        else
            $actions = Action::where('actions.statut', '=', 'OK')->leftJoin("permissions","permissions.action_id","actions.id")->get();
        $permissions = Permission::where('permissions.statut', '=', 'OK')->rightJoin("actions","actions.id","permissions.action_id")->get();

        return view('home')->with('menus', $menus)->with('actions', $actions)->with('permissions', $permissions);
    }
}