<?php

use App\Http\Controllers\ForumController;
use App\Http\Controllers\PostController;
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
Route::get('/', [ForumController::class, 'index']);
Route::get('/category/{id}', [ForumController::class, 'category']);
Route::get('/post/{id}', [ForumController::class, 'post']);

Route::middleware(['auth', 'permission:create_post'])->group(function () {
    Route::get('/post/create', [PostController::class, 'create']);
});

Route::get('{any}', function () {
    return view('app');
})->where('any', '^(?!api).*$');