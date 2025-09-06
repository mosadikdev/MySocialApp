<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{id}', [PostController::class, 'show']);   
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);

    Route::get('/posts/{id}/comments', [CommentController::class, 'index']);
    Route::post('/posts/{id}/comments', [CommentController::class, 'store']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']); 

    Route::get('/posts/{id}/likes', [LikeController::class, 'index']);
    Route::post('/posts/{id}/like', [LikeController::class, 'like']);
    Route::delete('/posts/{id}/like', [LikeController::class, 'unlike']);



    Route::post('/users/{user}/follow', [UserController::class, 'follow']);
Route::delete('/users/{user}/follow', [UserController::class, 'unfollow']);
Route::get('/users/{user}/followers', [UserController::class, 'followers']);
Route::get('/users/{user}/following', [UserController::class, 'following']);


Route::get('/search/users', [UserController::class, 'searchUsers']);
Route::get('/search/posts', [PostController::class, 'searchPosts']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/messages/{user}', [MessageController::class, 'store']);
});


});
