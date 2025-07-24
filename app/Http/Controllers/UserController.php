<?php
namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function profile(Request $request, User $user): JsonResponse
    {
        return response()->json([
            'user'  => new UserResource(Auth::user()),
            'roles' => RoleResource::collection(Role::get()),
        ]);
    }

    public function updateProfile(User $user, Request $request): JsonResponse
    {
        $request->validate([
            'name'     => 'nullable|string|max:255',
            'email'    => 'sometimes|nullable|string|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|max:255|confirmed',
        ]);
        $attributes = $request->all();

        DB::beginTransaction();
        try {
            $user->update($attributes);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'OK',
                'data'    => new UserResource($user->fresh()),
            ]);
        } catch (Exception $e) {
            logger($e);
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Cập nhật thất bại!',
            ]);
        }

    }

    public function index(Request $request): JsonResponse
    {
        $users = User::with('role')
            ->where('role_id', '!=', 1)
            ->filter($request->all())
            ->paginate($request->get('page_size') ?? 10);
        return response()->json([
            'success' => true,
            'message' => 'OK',
            'data'    => UserResource::collection($users->items()),
            'meta'    => [
                'current_page' => $users->currentPage(),
                'page_size'    => $request->get('page_size') ?? 10,
                'total'        => $users->total(),
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email'    => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:8|max:255|confirmed',
            'role_id'  => 'required|integer|exists:roles,id',
            'status'   => 'nullable|in:' . implode(',', User::statuses()),
        ]);
        $attributes = $request->all();
        DB::beginTransaction();
        try {
            $user = User::create($attributes);
            DB::commit();
            return response()->json([
                'success' => true,
                'data'    => new UserResource($user),
            ]);
        } catch (Exception $e) {
            logger($e);
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Thất bại!',
            ]);
        }
    }

    public function update(User $user, Request $request): JsonResponse
    {
        $request->validate([
            'name'     => 'nullable|string|max:255',
            'username' => 'required|string|max:255',
            'email'    => 'sometimes|nullable|string|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|max:255|confirmed',
            'role_id'  => 'required|integer|exists:roles,id',
            'status'   => 'nullable|in:' . implode(',', User::statuses()),
        ]);

        $attributes = $request->all();
        DB::beginTransaction();
        try {
            $user->update($attributes);
            DB::commit();
            return $this->response([
                'success' => true,
                'data'    => new UserResource($user->fresh()),
            ]);
        } catch (Exception $e) {
            logger($e);
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Cập nhật thất bại!',
            ]);
        }
    }

    public function destroy(User $user): JsonResponse
    {
        return response()->json(['success' => $user->delete()]);
    }
}