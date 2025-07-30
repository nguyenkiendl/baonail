<?php
namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'status' => true,
            'data'   => CategoryResource::collection(Category::get()),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name'      => 'required|string',
            'parent_id' => 'nullable|numeric',
        ]);

        $category = Category::updateOrCreate([
            'name'      => $request->get('name'),
            'parent_id' => $request->get('parent_id') ?? null,
        ]);
        if (! $category) {
            return response()->json([
                'success' => false,
                'message' => 'Fail!',
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'OK!',
            'data'    => new CategoryResource($category),
        ]);
    }

    public function update($categoryId, Request $request): JsonResponse
    {
        $request->validate([
            'name'      => 'nullable|string',
            'parent_id' => 'nullable|numeric',
        ]);

        $category = Category::query()->where('id', $categoryId)->firstOrFail();
        if (! $category) {
            return response()->json([
                'success' => false,
                'message' => 'Fail!',
            ]);
        }
        $category->update([
            'name'      => $request->get('name'),
            'parent_id' => $request->get('parent_id'),
        ]);
        return response()->json([
            'success' => true,
            'message' => 'OK!',
            'data'    => new CategoryResource($category),
        ]);
    }

    public function destroy(int $categoryId): JsonResponse
    {
        $category = Category::query()->where('id', $categoryId)->firstOrFail();
        if (! $category) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu!',
            ]);
        }
        $category->delete();
        return response()->json([
            'success' => true,
            'message' => 'Xóa thành công!',
        ]);
    }

}