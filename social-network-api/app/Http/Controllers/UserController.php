<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function follow(User $user)
    {
        $authUser = auth()->user();

        if ($authUser->id === $user->id) {
            return response()->json(['message' => 'You cannot follow yourself'], 400);
        }

        $authUser->following()->syncWithoutDetaching([$user->id]);

        return response()->json(['message' => 'Followed']);
    }

    public function unfollow(User $user)
    {
        auth()->user()->following()->detach($user->id);

        return response()->json(['message' => 'Unfollowed']);
    }

    public function followers(User $user)
    {
        return response()->json($user->followers()->with('followers')->get());
    }

    public function following(User $user)
    {
        return response()->json($user->following()->with('following')->get());
    }

    public function searchUsers(Request $request)
    {
        $q = $request->query('q');

        if (!$q) {
            return response()->json([], 200);
        }

        return User::where('username', 'like', "%$q%")
            ->orWhere('name', 'like', "%$q%")
            ->limit(20)
            ->get();
    }
}
