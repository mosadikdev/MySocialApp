<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function follow(User $user) {
    auth()->user()->following()->attach($user->id);
    return response()->json(['message' => 'Followed']);
}

public function unfollow(User $user) {
    auth()->user()->following()->detach($user->id);
    return response()->json(['message' => 'Unfollowed']);
}

public function followers(User $user) {
    return response()->json($user->followers);
}

public function following(User $user) {
    return response()->json($user->following);
}


public function searchUsers(Request $request) {
    $q = $request->query('q');
    return User::where('username', 'like', "%$q%")->get();
}

}
