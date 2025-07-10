<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::prefix('v1')->group(function () {
    Route::prefix('public')->group(base_path('routes/apis/v1/public.php'));
    Route::prefix('private')->middleware('auth:api')->group(base_path('routes/apis/v1/private.php'));
    Route::get('logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
