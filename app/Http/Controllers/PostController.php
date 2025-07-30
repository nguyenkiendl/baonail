<?php
namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class PostController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $postsQuery = Post::query();
        if (! empty($request->get('name'))) {
            $name = $request->get('name');
            $postsQuery->where('name', 'LIKE', '%' . $name . '%');
        }

        if (! empty($request->get('category'))) {
            $category = $request->get('category');
            $postsQuery->whereIn('category_id', $category);
        }
        $posts = $postsQuery->orderBy('category_id', 'asc')->orderBy('title', 'asc')->get();
        return response()->json([
            'posts'      => PostResource::collection($posts),
            'categories' => CategoryResource::collection(Category::get()),
        ]);
    }

    public function search(): JsonResponse
    {
        $posts = Post::query()->orderBy('name', 'asc')->get();
        return response()->json([
            'posts' => PostResource::collection($posts),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title'    => 'required|string',
            'content'  => 'nullable|string',
            'file'     => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            'category' => 'nullable|numeric',
        ]);
        $fileName = '';
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            if ($file) {
                $fileName = Str::random(40) . '.' . $file->getClientOriginalExtension();
                $image    = Image::make($file);
                $path     = public_path('uploads/' . $fileName);
                $image->save($path);
                //thumbnail
                // Đặt đường dẫn thư mục cần tạo (nếu chưa có)
                $directory = public_path('uploads/thumbnails');

                // Kiểm tra thư mục tồn tại chưa, nếu không thì tạo mới
                if (! File::exists($directory)) {
                    File::makeDirectory($directory, 0777, true);
                }
                $image->resize(100, null, function ($constraint) {
                    $constraint->aspectRatio(); // Giữ tỷ lệ khung hình
                    $constraint->upsize();      // Không thay đổi kích thước nếu hình ảnh nhỏ hơn kích thước yêu cầu
                });
                $path = public_path('uploads/thumbnails/' . $fileName);
                $image->save($path);
            }
        }
        $post = Post::updateOrCreate([
            'title'       => $request->get('title'),
            'content'     => $request->get('content') ?? '',
            'file'        => $fileName,
            'category_id' => $request->get('category') ?? null,
            'user_id'     => Auth::id(),
        ]);
        if (! $post) {
            return response()->json([
                'success' => false,
                'message' => 'Fail!',
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'OK!',
            'data'    => new PostResource($post),
        ]);
    }

    public function update($postId, Request $request): JsonResponse
    {
        $request->validate([
            'title'    => 'required|string',
            'content'  => 'nullable|string',
            'file'     => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            'category' => 'nullable|numeric',
        ]);
        $post     = Post::findOrFail($postId);
        $fileName = $post->file;
        if ($request->hasFile('file')) {
            if ($fileName) {
                $filePath = public_path('uploads/' . $fileName);
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
                $thumbnailPath = public_path('uploads/thumbnails/' . $fileName);
                if (file_exists($thumbnailPath)) {
                    unlink($thumbnailPath);
                }
            }
            $file = $request->file('file');
            if ($file) {
                $fileName = Str::random(40) . '.' . $file->getClientOriginalExtension();
                $image    = Image::make($file);
                $path     = public_path('uploads/' . $fileName);
                $image->save($path);
                //thumbnail
                // Đặt đường dẫn thư mục cần tạo (nếu chưa có)
                $directory = public_path('uploads/thumbnails');

                // Kiểm tra thư mục tồn tại chưa, nếu không thì tạo mới
                if (! File::exists($directory)) {
                    File::makeDirectory($directory, 0777, true);
                }
                $image->resize(100, null, function ($constraint) {
                    $constraint->aspectRatio(); // Giữ tỷ lệ khung hình
                    $constraint->upsize();      // Không thay đổi kích thước nếu hình ảnh nhỏ hơn kích thước yêu cầu
                });
                $path = public_path('uploads/thumbnails/' . $fileName);
                $image->save($path);
            }
        }
        $post->update([
            'title'       => $request->get('title'),
            'content'     => $request->get('content') ?? '',
            'file'        => $fileName,
            'category_id' => $request->get('category') ?? null,
        ]);
        return response()->json([
            'success' => true,
            'message' => 'OK!',
            'data'    => new PostResource($post),
        ]);
    }

    public function destroy(int $postId): JsonResponse
    {
        $post     = Post::query()->where('id', $postId)->firstOrFail();
        $fileName = $post->file;
        if ($fileName) {
            $filePath = public_path('uploads/' . $fileName);
            if (file_exists($filePath)) {
                unlink($filePath);
            }
            $thumbnailPath = public_path('uploads/thumbnails/' . $fileName);
            if (file_exists($thumbnailPath)) {
                unlink($thumbnailPath);
            }
        }
        if (! $post) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu!',
            ]);
        }
        $post->delete();
        return response()->json([
            'success' => true,
            'message' => 'Xóa thành công!',
        ]);
    }
}