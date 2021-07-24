<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Cors;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function () {
    Route::post('/login', 'App\Http\Controllers\AuthController@login');
    Route::post('/logout', 'App\Http\Controllers\AuthController@logout');
});


Route::get('/tasks', 'App\Http\Controllers\TaskController@index');
Route::post('/tasks', 'App\Http\Controllers\TaskController@store');
Route::get('/tasks/{task}', 'App\Http\Controllers\TaskController@show');
Route::put('/tasks/{task}', 'App\Http\Controllers\TaskController@update');
Route::delete('/tasks/{task}', 'App\Http\Controllers\TaskController@delete');

Route::middleware([Cors::class])->group( function() {
    Route::options('/user', function() {
        return response()->json();
    });
    Route::post('/user', 'App\Http\Controllers\UserController@store');
});