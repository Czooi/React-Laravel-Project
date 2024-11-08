<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    // Store new user data
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        // Create a new user and save to the database
        $user = User::create($validated);

        // Return success response
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    // Retrieve all users from the database
    public function index()
    {
        // Fetch all users
        $users = User::all();

        // Return users as JSON
        return response()->json($users);
    }
}
