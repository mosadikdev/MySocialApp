<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index($userId) {
    return Message::with(['fromUser:id,username', 'toUser:id,username'])
        ->where(function($q) use ($userId) {
            $q->where('sender_id', auth()->id())->where('receiver_id', $userId);
        })->orWhere(function($q) use ($userId) {
            $q->where('sender_id', $userId)->where('receiver_id', auth()->id());
        })
        ->orderBy('created_at')
        ->get();
}


public function store(Request $request, User $user)
    {
        $data = $request->validate([
            'content' => ['required','string','max:5000'],
        ]);

        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'You cannot message yourself'], 400);
        }

        $msg = Message::create([
            'sender_id'   => auth()->id(),
            'receiver_id' => $user->id,
            'content'     => $data['content'], 
        ]);

        return $msg->load([
            'fromUser:id,username,profile_picture,name',
            'toUser:id,username,profile_picture,name',
        ]);
    }

}
