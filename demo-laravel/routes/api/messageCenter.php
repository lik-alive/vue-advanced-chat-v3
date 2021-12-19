<?php

use App\Http\Controllers\MessageCenter\FileController;
use App\Http\Controllers\MessageCenter\MessageController;
use App\Http\Controllers\MessageCenter\RoomController;
use App\Http\Controllers\MessageCenter\UnreadController;
use App\Http\Controllers\MessageCenter\UserController;
use App\Http\Controllers\MessageCenter\VisitedAllController;
use Illuminate\Support\Facades\Route;

Route::apiResource('rooms', RoomController::class)->only([
  'index', 'show'
]);

Route::apiResource('users', UserController::class)->only([
  'index'
]);

Route::apiResource('files', FileController::class)->only([
  'show'
]);

Route::apiResource('rooms.messages', MessageController::class)->shallow();

Route::apiResource('unread', UnreadController::class)->only(['index']);

Route::apiResource('visited-all', VisitedAllController::class)->only(['store']);
