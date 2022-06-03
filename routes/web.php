<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', function () {
    return view('home');
});

Auth::routes();

Route::get('/profil', 'ProfilsController@index')->name('profil.index');
Route::post('/profil/store','HomeController@store')->name('profil.store');
Route::get('/profil/create','HomeController@create')->name('profil.create');
Route::get('/profil/edit','HomeController@edit')->name('profil.edit');

Route::get('/achat','menusController@achat')->name('achat.index');
Route::get('/finance','menusController@finance')->name('finance.index');
Route::get('/commercial','menusController@commercial')->name('commercial.index');
