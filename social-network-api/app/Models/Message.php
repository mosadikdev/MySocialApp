<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['sender_id','receiver_id','content','read'];

    protected $casts = [
        'read' => 'boolean',
    ];

    public function fromUser()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function toUser()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
