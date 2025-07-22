<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function authenticate(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|exists:users,username|max:255',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return $this->response([
                'data' => $validator->getMessageBag(),
            ], 400);
        }

        $credentials = request(['username', 'password']);

        if (! Auth::attempt(array_merge($credentials, [
            'status' => User::STATUS_ACTIVE,
        ]))) {
            return response()->json([
                'message' => [
                    'password' => ['The password is invalid.'],
                ],
            ], 401);
        }

        $user        = $request->user();
        $tokenResult = $user->issueToken();
        $token       = $tokenResult->token;
        if ($request->get('remember_me')) {
            $token->expires_at = now()->addMonth();
        } else {
            $token->expires_at = now()->addDay();
        }
        $token->save();

        return response()->json([
            'data' => [
                'token_type'   => 'Bearer',
                'access_token' => $tokenResult->accessToken,
                'expires_at'   => $tokenResult->token->expires_at,
                'role'         => $user->role->name ?? '',
                'view'         => $user->views[0]['key'] ?? '',
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }
}
