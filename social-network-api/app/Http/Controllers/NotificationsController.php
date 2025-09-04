<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    public function index() {
    return auth()->user()->notifications()->latest()->get();
}

    public function markAsRead($id) {
    $notif = auth()->user()->notifications()->findOrFail($id);
    $notif->update(['read' => true]);
    return response()->json(['message' => 'Marked as read']);
}

}
