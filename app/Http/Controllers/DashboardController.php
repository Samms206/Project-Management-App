<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(){
        $user = Auth::user();
        $totalPendingTask = Task::query()->where('status', 'pending')->count();
        $myPendingTask = Task::query()->where('status', 'pending')->where('assigned_user_id', $user->id)->count();

        $totalInprogressTask = Task::query()->where('status', 'in_progress')->count();
        $myInprogressTask = Task::query()->where('status', 'in_progress')->where('assigned_user_id', $user->id)->count();

        $totalCompletedTask = Task::query()->where('status', 'completed')->count();
        $myCompletedTask = Task::query()->where('status', 'completed')->where('assigned_user_id', $user->id)->count();

        $myActiveTask= Task::query()->where('assigned_user_id', $user->id)->orderBy('created_at', 'desc')->paginate(10);

        return inertia('Dashboard', [
            'totalPendingTask' => $totalPendingTask,
            'myPendingTask' => $myPendingTask,
            'totalInprogressTask' => $totalInprogressTask,
            'myInprogressTask' => $myInprogressTask,
            'totalCompletedTask' => $totalCompletedTask,
            'myCompletedTask' => $myCompletedTask,
            'myActiveTask' => TaskResource::collection($myActiveTask),
        ]);
    }
}
