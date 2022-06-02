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
        return view("profil.store");
    }

    public function create()
    {
        return view("profil.store");
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

        DB::table('profils')
            ->where('id', $profil->id)
            ->update([
                'code' => $request->code ?: $profil->code,
                'libelle' => $request->libelle ?: $profil->libelle,
            ]);

        return redirect()->back();
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
