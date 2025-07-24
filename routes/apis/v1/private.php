<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Route cần token có scope 'admin' hoặc 'moderate'
Route::middleware(['auth:api', 'scopes:admin,moderate'])->get('/admin-panel', function () {
    return 'Chào admin hoặc moderator!';
});

// Route cần token có scope 'create-post' và 'edit-post'
Route::middleware(['auth:api', 'scope:create-post,edit-post'])->post('/posts/edit', function () {
    return 'Bạn có thể tạo và sửa bài viết.';
});

Route::middleware(['auth:api', 'scopes:view-profile,edit-profile'])->group(function () {
    Route::prefix('user')->group(function () {
        Route::get('/profile', [UserController::class, 'profile']);
        Route::put('/profile/{user}', [UserController::class, 'updateProfile']);
    });

});

Route::middleware(['auth:api', 'scope:admin'])->group(function () {
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::put('/{user}', [UserController::class, 'update']);
        Route::delete('/{user}', [UserController::class, 'destroy']);
    });
});