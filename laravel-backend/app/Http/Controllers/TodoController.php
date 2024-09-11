<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Todo::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $todo = new Todo();
        $todo->title = $request->title;
        $todo->save();
        return response()->json($todo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $todo = Todo::find($id);
    
        if (!$todo) {
            return response()->json(['error' => 'Todo not found'], 404);
        }
    
        // Validate the input
        $request->validate([
            'completed' => 'required|boolean',
            'title' => 'nullable|string' // Only if title can be updated
        ]);
    
        $todo->completed = $request->input('completed', false);
        if ($request->has('title')) {
            $todo->title = $request->input('title');
        }
        $todo->save();
    
        return response()->json($todo, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $todo = Todo::find($id);
    
        if (!$todo) {
            return response()->json(['error' => 'Todo not found'], 404);
        }
    
        $todo->delete();
    
        return response()->json(null, 204);
    }
}
