<?php

namespace App\Http\Controllers\MessageCenter;

use App\Http\Controllers\Controller;
use App\Http\Resources\MessageCenter\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function index(Request $request)
    {
        return new UserCollection(User::whereIn('id', $request->ids)->get());
    }
}
