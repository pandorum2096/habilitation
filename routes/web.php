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

Auth::routes();

Route::get('/profil', 'ProfilsController@index')->name('profil.index');
Route::post('/profil/store','HomeController@store')->name('profil.store');
Route::get('/profil/create','HomeController@create')->name('profil.create');
Route::get('/profil/edit/{id}','HomeController@edit')->name('profil.edit');
Route::post('/profil/update/{id}','HomeController@update')->name('profil.update');

Route::get('/achat','HomeController@achat')->name('achat.index');
Route::get('/finance','HomeController@finance')->name('finance.index');
Route::get('/commercial','HomeController@commercial')->name('commercial.index');
