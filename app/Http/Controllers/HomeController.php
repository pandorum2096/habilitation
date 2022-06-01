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
            $actions = Action::where('actions.statut', '=', 'OK')->leftJoin("permissions","permissions.action_id","actions.id")->where("permissions.profil_id","=",1)->selectRaw("actions.*,permissions.action_id,permissions.menu_id,permissions.profil_id")->get();
        else
            $actions = Action::where('actions.statut', '=', 'OK')->leftJoin("permissions","permissions.action_id","actions.id")->selectRaw("actions.*,permissions.action_id,permissions.menu_id,permissions.profil_id")->get();


        return view('home')->with('menus', $menus)->with('actions', $actions);
    }

    public function store(Request $request)
    {
        // var_dump("1");
        // dd($request->);
        $menus = Menus::where('statut', '=', 'OK')->get();
        $actions = Action::where('actions.statut', '=', 'OK')->get();

        
        $permissions = Permission::where("profil_id","=",Auth::user()->profil)->get();
        foreach ($permissions as $key => $permission) {
            $permission->delete();
        }
        
        
        foreach ($menus as $m => $menu) {
            foreach ($actions as $a => $action) {
                 var_dump($request->input($menu->id."|".$action->id));
                $check = Permission::where('permissions.menu_id', '=', $menu->id)->where('permissions.action_id', '=', $action->id)->where('permissions.profil_id', '=', Auth::user()->profil)->get();
                // dd("menu:$menu->id, action:$action->id, exite:".isset($request[$menu->id.'|'.$action->id])." count($check)");
                
                if($request->input($menu->id."|".$action->id) && count($check) == 0){
                    var_dump($check);
                    $permission = new Permission();
                    $permission->menu_id = $menu->id;
                    $permission->action_id = $action->id;
                    $permission->profil_id = Auth::user()->profil;
                    $permission->statut = "OK";
                    $permission->save();
                }
            }
        }

        return redirect("home");
    }
}