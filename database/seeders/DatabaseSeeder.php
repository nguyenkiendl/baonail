<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            [
                'name'         => 'admin',
                'display_name' => 'Admin',
                'description'  => 'Toàn quyền hệ thống, quản lý người dùng, forum, cấu hình, xóa bài, khóa topic, thêm/xóa mod',
            ],
            [
                'name'         => 'moderator',
                'display_name' => 'Moderator',
                'description'  => 'Quản lý nội dung: duyệt bài, xóa bài vi phạm, khóa topic, xử lý tranh cãi',
            ],
            [
                'name'         => 'member',
                'display_name' => 'Member',
                'description'  => 'Người dùng đăng ký bình thường, được đăng bài, bình luận',
            ],
            [
                'name'         => 'guest',
                'display_name' => 'Guest',
                'description'  => 'Khách, không đăng nhập, chỉ xem bài viết công khai',
            ],
            [
                'name'         => 'banned',
                'display_name' => 'Banned',
                'description'  => 'Người dùng bị cấm, không có quyền đăng bài hay bình luận',
            ],
        ];

        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert([
                'name' => $role['name'],
            ], [
                'display_name' => $role['display_name'],
                'description'  => $role['description'],
            ]);
        }

        // User::factory(10)->create();
        $users = [
            [
                'username' => 'admin',
                'password' => config('app.env') === 'local' ? '12345678' : '89wKFVb1VjdoiBI',
                'role_id'  => 1,
            ],
            [
                'username' => 'moderator',
                'password' => config('app.env') === 'local' ? '12345678' : 'hN8ORY6LLXE6EJV',
                'role_id'  => 2,
            ],
            [
                'username' => 'member',
                'password' => config('app.env') === 'local' ? '12345678' : 'hN8ORY6LLXE6EJV',
                'role_id'  => 3,
            ],
        ];

        foreach ($users as $user) {
            DB::table('users')->updateOrInsert([
                'username' => $user['username'],
            ], [
                'name'           => $user['username'],
                'email'          => $user['username'] . '@mail.com',
                'role_id'        => $user['role_id'],
                'password'       => Hash::make($user['password']),
                'remember_token' => Str::random(10),
            ]);
        }

    }
}
