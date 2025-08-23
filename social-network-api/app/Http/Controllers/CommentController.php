<?php


namespace App\Http\Controllers;


use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CommentController extends Controller
{
public function index($postId)
{
$post = Post::findOrFail($postId);
return $post->comments()->with('user:id,username,profile_picture,name')->latest()->get();
}


public function store(Request $request, $postId)
{
$request->validate([
'comment' => ['required','string','max:2000']
]);


$comment = Comment::create([
'post_id' => $postId,
'user_id' => Auth::id(),
'comment' => $request->comment,
]);


return response()->json($comment->load('user'), 201);
}
}