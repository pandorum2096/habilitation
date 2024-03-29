<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Menus;
use App\sousmenu;
use App\Action;
use App\Profils;
use App\Permission;
use Auth;
use DB;

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


        return view('profil.index');
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

    public function edit($id=null)
    {
        $profil = DB::table('profils')->find($id);
        $actions=DB::table('actions')->orderBy('position')->get();
        $all_menus=DB::table('menuses')->orderBy('position')->get();
        $p_menus_actions=DB::table('permissions')->where('profil_id','=',$id)->get();
        $p_menu_action_ids=[];

        foreach($p_menus_actions as $act){
            $p_menu_action_ids[]=[$act->menu_id,$act->action_id];
        }
        return view("profil.edit",compact('profil','actions','all_menus','p_menu_action_ids'));
    }

    public function update($id=null,Request $request){


        $profil = DB::table('profils')->find($id);
        $actions=DB::table('actions')->orderBy('position')->get();
        $all_menus=DB::table('menuses')->orderBy('position')->get();
        $permissions = Permission::where("profil_id","=",$id)->get();
        foreach ($permissions as $key => $permission) {
            $permission->delete();
        }

        foreach ($all_menus as $m => $menu) {
            foreach ($actions as $a => $action) {
                 $check = Permission::where('permissions.menu_id', '=', $menu->id)->where('permissions.action_id', '=', $action->id)->where('permissions.profil_id', '=', $id)->get();
                if($request->input($menu->id."|".$action->id) && count($check) == 0){
                    $permission = new Permission();
                    $permission->menu_id = $menu->id;
                    $permission->action_id = $action->id;
                    $permission->profil_id = $id;
                    $permission->statut = 1;
                    $permission->save();
                }
            }
        }



        return redirect("/profil");
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
