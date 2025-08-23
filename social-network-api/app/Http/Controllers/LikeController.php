<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function index($postId)
    {
        $post = Post::findOrFail($postId);
        return $post->likes()->with('user:id,username,profile_picture,name')->get();
    }

    public function like($postId)
    {
        $post = Post::findOrFail($postId);

        $exists = Like::where('post_id', $post->id)
            ->where('user_id', Auth::id())
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Already liked'], 409);
        }

        $like = Like::create([
            'post_id' => $post->id,
            'user_id' => Auth::id(),
        ]);

        return response()->json($like->load('user'), 201);
    }

    public function unlike($postId)
    {
        $post = Post::findOrFail($postId);

        Like::where('post_id', $post->id)
            ->where('user_id', Auth::id())
            ->delete();

        return response()->json(['message' => 'Unliked']);
    }
}
