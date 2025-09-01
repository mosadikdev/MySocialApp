<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        return Post::with([
                'user:id,username,profile_picture,name',
                'comments.user:id,username,profile_picture,name',
                'likes'
            ])
            ->latest()
            ->paginate(20);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'content' => ['required','string','max:5000'],
            'image' => ['nullable','string'], 
        ]);

        $post = Post::create([
            'user_id' => Auth::id(),
            'content' => $data['content'],
            'image' => $data['image'] ?? null,
        ]);

        return response()->json(
            $post->load('user:id,username,profile_picture,name'),
            201
        );
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function searchPosts(Request $request)
    {
        $q = $request->query('q');

        if (!$q) {
            return response()->json([], 200);
        }

        return Post::where('content', 'like', "%$q%")
            ->with('user:id,username,profile_picture,name')
            ->limit(20)
            ->get();
    }
}
