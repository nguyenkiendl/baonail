<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('authenticate', [AuthController::class, 'authenticate']);
Route::post('authorization', [AuthController::class, 'authorization']);
