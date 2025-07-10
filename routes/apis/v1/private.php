<?php

use App\Http\Controllers\BatchController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CleanController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FamilyController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PeriodicController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProposeController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\StatisticalController;
use App\Http\Controllers\StockController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UtensilController;

Route::middleware(['scope:superadmin'])->group(function () {
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::put('/{user}', [UserController::class, 'update']);
        Route::delete('/{user}', [UserController::class, 'destroy']);
    });

    Route::resource('settings', SettingController::class)->only(['index', 'update']);
});

Route::middleware(['scope:superadmin,adminapproval,admin,receptionist,sale,maketing,housekeeping,housechecking'])->group(function () {
    Route::prefix('user')->group(function () {
        Route::get('/profile', [UserController::class, 'profile']);
        Route::put('/profile/{user}', [UserController::class, 'updateProfile']);
    });
});

Route::middleware(['scope:superadmin,adminapproval,admin,receptionist,sale,maketing,housekeeping,housechecking'])->group(function () {

    Route::prefix('dashboards')->group(function () {
        Route::get('/order-list', [DashboardController::class, 'index']);
        Route::get('/expire-list', [DashboardController::class, 'getProductExpire']);
    });

    Route::prefix('statisticals')->group(function () {
        Route::get('/', [StatisticalController::class, 'index']);
    });

    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::post('/', [OrderController::class, 'store']);
        Route::get('/{id}', [OrderController::class, 'show']);
        Route::put('/{order}', [OrderController::class, 'update']);
        Route::delete('/{order}', [OrderController::class, 'destroy']);
        Route::post('/completed/{order}', [OrderController::class, 'completed']);
        Route::post('/reserve/{order}', [OrderController::class, 'reserve']);

        Route::put('/{orderId}/status', [OrderController::class, 'updateStatus']);
        Route::put('/{orderId}/metas', [OrderController::class, 'updateMetas']);
    });

    Route::prefix('confirm')->group(function () {
        Route::get('/', [OrderController::class, 'indexConfirm']);
        Route::post('/', [OrderController::class, 'storeConfirm']);
        Route::get('/{orderId}', [OrderController::class, 'showConfirm']);
        Route::put('/{orderId}', [OrderController::class, 'updateConfirm']);
        Route::delete('/{orderId}', [OrderController::class, 'destroyConfirm']);
    });

    Route::prefix('reserve')->group(function () {
        Route::get('/', [OrderController::class, 'indexReserve']);
    });

    Route::prefix('proposes')->group(function () {
        Route::post('/create-sample/{orderId}', [ProposeController::class, 'createSample']);
        Route::post('/create-sample-bbq/{orderId}', [ProposeController::class, 'createSampleBbq']);
        Route::get('/', [ProposeController::class, 'orders']);
        Route::get('/{orderId}', [ProposeController::class, 'index']);
        Route::post('/{orderId}', [ProposeController::class, 'store']);
        //Route::get('/{proposeId}', [ProposeController::class, 'show']);
        Route::put('/{proposeId}', [ProposeController::class, 'update']);
        Route::put('/metas/{proposeId}', [ProposeController::class, 'updateMetas']);
        Route::delete('/{proposeId}', [ProposeController::class, 'destroy']);
        Route::get('/details/{proposeId}', [ProposeController::class, 'details']);
        Route::post('/details/{proposeId}', [ProposeController::class, 'storeDetail']);
        Route::put('/details/{detailId}', [ProposeController::class, 'updateDetail']);
        Route::delete('/details/{detailId}', [ProposeController::class, 'destroyDetail']);
        Route::post('/details/{proposeId}/ingredient', [ProposeController::class, 'storeIngredient']);
    });

    Route::prefix('services')->group(function () {
        Route::get('/{orderId}', [ServiceController::class, 'index']);
        Route::post('/{orderId}', [ServiceController::class, 'store']);
        Route::put('/{serviceId}', [ServiceController::class, 'update']);
        Route::delete('/{serviceId}', [ServiceController::class, 'destroy']);
    });

    Route::prefix('rooms')->group(function () {
        Route::get('/{orderId}', [RoomController::class, 'index']);
        Route::post('/{orderId}', [RoomController::class, 'store']);
        Route::put('/{roomId}', [RoomController::class, 'update']);
        Route::delete('/{roomId}', [RoomController::class, 'destroy']);
        //booking list
        Route::get('/config/{type}/{roomType}', [RoomController::class, 'bookingConfig']);
        Route::get('/booking-list/{type}', [RoomController::class, 'bookingList']);
        Route::get('/booking/{type}/{roomNumber}', [RoomController::class, 'bookingDetail']);
    });

    Route::prefix('room')->group(function () {
        Route::get('/{roomId}', [RoomController::class, 'room']);
        Route::get('/detail/{detailId}/{orderType}/{roomType}', [RoomController::class, 'roomDetail']);
        Route::put('/detail/{detailId}', [RoomController::class, 'updateDetail']);

        Route::put('/step-data/{detailId}', [RoomController::class, 'updateStepData']);
    });

    Route::prefix('print-room')->group(function () {
        Route::get('/{roomId}', [RoomController::class, 'printRoomData']);
    });

    Route::prefix('portfolios')->group(function () {
        Route::get('/', [PortfolioController::class, 'index']);
        Route::post('/', [PortfolioController::class, 'store']);
        Route::put('/{portfolioId}', [PortfolioController::class, 'update']);
        Route::delete('/{portfolioId}', [PortfolioController::class, 'destroy']);

        Route::get('/details/{portfolioId}', [PortfolioController::class, 'details']);
    });

    Route::prefix('periodics')->group(function () {
        Route::get('/', [PeriodicController::class, 'index']);
        Route::post('/', [PeriodicController::class, 'store']);
        Route::put('/{periodicId}', [PeriodicController::class, 'update']);
        Route::delete('/{periodicId}', [PeriodicController::class, 'destroy']);

        Route::get('/details/{periodicId}', [PeriodicController::class, 'details']);
        Route::post('/details/{periodicId}', [PeriodicController::class, 'storeDetail']);
        Route::put('/details/{detailId}', [PeriodicController::class, 'updateDetail']);
        Route::delete('/details/{detailId}', [PeriodicController::class, 'destroyDetail']);
    });

    Route::prefix('ware-house')->group(function () {
        Route::get('/', [StockController::class, 'wareHouseReceipt']);
        Route::post('/receipt-in', [StockController::class, 'receiptIn']);
        Route::post('/receipt-out', [StockController::class, 'receiptOut']);
        Route::get('/{receiptId}', [StockController::class, 'receiptDetail']);
        Route::put('/{receiptId}/confirm-in', [StockController::class, 'confirmReceiptIn']);
        Route::put('/{receiptId}/confirm-out', [StockController::class, 'confirmReceiptOut']);
        Route::delete('/{receiptId}', [StockController::class, 'destroyReceipt']);
        Route::put('/details/{detailId}', [StockController::class, 'updateReceiptDetail']);
        Route::delete('/details/{detailId}', [StockController::class, 'destroyReceiptDetail']);
    });

    Route::prefix('stocks')->group(function () {
        Route::get('/{wareHouse}', [StockController::class, 'index']);
        Route::post('/{wareHouse}/stock-in', [StockController::class, 'stockIn']);
        Route::delete('/{stockId}/stock-in', [StockController::class, 'destroyStockIn']);
        Route::post('/{stockId}/confirm-stock-in', [StockController::class, 'stockInConfirm']);
        Route::post('/{wareHouse}/stock-out', [StockController::class, 'stockOut']);
        Route::post('/{stockId}/confirm-stock-out', [StockController::class, 'stockOutConfirm']);
        Route::delete('/{stockId}/stock-out', [StockController::class, 'destroyStockOut']);
        Route::get('/{wareHouse}/stock-by-sale', [StockController::class, 'stockBySale']);
        Route::get('/{orderId}/stock-by-sale-details', [StockController::class, 'stockBySaleDetail']);
        Route::put('/{stockId}', [StockController::class, 'update']);
        // Route::delete('/{stockId}', [StockController::class, 'destroy']);
        Route::get('/{warehouse}/in-transactions', [StockController::class, 'stockInTransactions']);
        Route::get('/{warehouse}/out-transactions', [StockController::class, 'stockOutTransactions']);
        Route::get('/{warehouse}/transactions', [StockController::class, 'transactions']);
        Route::get('/{stockId}/details', [StockController::class, 'transactionDetail']);
        Route::put('/transaction/{transactionId}', [StockController::class, 'updateTransaction']);
        Route::delete('/transaction/{transactionId}', [StockController::class, 'destroyTransaction']);

        Route::get('/{wareHouse}/transfers', [StockController::class, 'stockTransfersList']);
        Route::post('/{wareHouse}/stock-transfer', [StockController::class, 'stockTransfer']);
        Route::post('/{receiptId}/confirm-transfer', [StockController::class, 'stockTransferConfirm']);
    });

    Route::prefix('batches')->group(function () {
        Route::get('/{wareHouse}', [BatchController::class, 'index']);
        Route::post('/{productId}', [BatchController::class, 'store']);
        Route::put('/{batchId}', [BatchController::class, 'update']);
        Route::delete('/{batchId}', [BatchController::class, 'destroy']);
    });

    Route::prefix('products')->group(function () {
        Route::get('/{wareHouse}', [ProductController::class, 'index']);
        Route::get('/search/{wareHouse}', [ProductController::class, 'search']);
        Route::post('/{wareHouse}', [ProductController::class, 'store']);
        Route::patch('/{productId}', [ProductController::class, 'update']); //->middleware('log.request');
        Route::delete('/{productId}', [ProductController::class, 'destroy']);

        Route::get('/{productId}/transactions', [ProductController::class, 'transactions']);

        Route::get('/{productId}/batches', [ProductController::class, 'getBatches']);
    });

    Route::prefix('categories')->group(function () {
        Route::get('/{wareHouse}', [CategoryController::class, 'index']);
        Route::post('/{wareHouse}', [CategoryController::class, 'store']);
        Route::put('/{categoryId}', [CategoryController::class, 'update']);
        Route::delete('/{categoryId}', [CategoryController::class, 'destroy']);

        Route::get('/{wareHouse}/{categoryId}', [CategoryController::class, 'details']);
        Route::post('/{categoryId}/pivot', [CategoryController::class, 'addPivotProduct']);
        Route::put('/{categoryId}/pivot', [CategoryController::class, 'updatePivotProduct']);
        Route::delete('/{categoryId}/{productId}', [CategoryController::class, 'deletePivotProduct']);
    });

    Route::prefix('filter-categories')->group(function () {
        Route::get('/{keyword}', [CategoryController::class, 'filter']);
    });

    Route::prefix('families')->group(function () {
        Route::get('/{wareHouse}', [FamilyController::class, 'index']);
        Route::post('/{wareHouse}', [FamilyController::class, 'store']);
        Route::put('/{familyIdId}', [FamilyController::class, 'update']);
        Route::delete('/{familyIdId}', [FamilyController::class, 'destroy']);
    });

    Route::prefix('check-room')->group(function () {
        Route::get('/{roomNumber}', [RoomController::class, 'checkRoom']);
    });

    Route::prefix('check-tent')->group(function () {
        Route::get('/{tentNumber}', [RoomController::class, 'checkTent']);
    });

    Route::prefix('clean-category')->group(function () {
        Route::get('/{branch}/{type?}', [CleanController::class, 'categories']);
        Route::post('/', [CleanController::class, 'storeCategory']);
        Route::put('/{categoryId}', [CleanController::class, 'updateCategory']);
        Route::delete('/{categoryId}', [CleanController::class, 'destroyCategory']);

        //Route::get('/detail/{categoryId}', [CleanController::class, 'categoryDetail']);
    });

    Route::prefix('group')->group(function () {
        Route::get('/{branch}/{type?}', [GroupController::class, 'index']);
        Route::post('/', [GroupController::class, 'store']);
        Route::put('/{groupId}', [GroupController::class, 'update']);
        Route::delete('/{groupId}', [GroupController::class, 'destroy']);
    });

    Route::prefix('group-detail')->group(function () {
        Route::get('/{groupId}', [GroupController::class, 'details']);
        Route::post('/{groupId}/pivot', [GroupController::class, 'addPivotCleaning']);
        Route::put('/{groupId}/pivot', [GroupController::class, 'updatePivotCleaning']);
        Route::delete('/{groupId}/{cleanId}', [GroupController::class, 'deletePivotCleaning']);
    });

    Route::prefix('clean-search')->group(function () {
        Route::get('/', [CleanController::class, 'search']);
    });

    Route::prefix('clean')->group(function () {
        Route::get('/{categoryId}', [CleanController::class, 'index']);
        Route::post('/{categoryId}', [CleanController::class, 'store']);
        Route::put('/{cleanId}', [CleanController::class, 'update']);
        Route::delete('/{cleanId}', [CleanController::class, 'destroy']);
    });

    Route::prefix('upload')->group(function () {
        Route::get('/attached-file/{orderId}', [FileController::class, 'index']);
        Route::post('/attached-file/{orderId}', [FileController::class, 'store']);
        Route::delete('/attached-file/{fileId}', [FileController::class, 'destroy']);
    });

    // Route::prefix('utensils')->group(function () {
    //     Route::get('/{branch}', [UtensilController::class, 'index']);
    //     Route::post('/{branch}', [UtensilController::class, 'store']);
    //     Route::put('/{utensilId}', [UtensilController::class, 'update']);
    //     Route::delete('/{utensilId}', [UtensilController::class, 'destroy']);

    //     Route::get('/{branch}/stocks', [UtensilController::class, 'stocks']);
    //     Route::post('/{branch}/stock-in', [UtensilController::class, 'addStockIn']);
    //     Route::put('/{stockId}/stock-in', [UtensilController::class, 'updateStockIn']);
    //     Route::get('/{branch}/in-transactions', [UtensilController::class, 'stockInTransactions']);
    //     Route::get('/{branch}/out-transactions', [UtensilController::class, 'stockOutTransactions']);
    // });

    Route::prefix('utensils/{branch}')->group(function () {
        Route::get('/', [UtensilController::class, 'index']);
        Route::post('/', [UtensilController::class, 'store']);
        Route::put('/{utensilId}', [UtensilController::class, 'update']);
        Route::delete('/{utensilId}', [UtensilController::class, 'destroy']);

        Route::get('/stocks', [UtensilController::class, 'stocks']);
    });

    Route::prefix('utensil-stock-in/{branch}')->group(function () {
        Route::post('/', [UtensilController::class, 'addStockIn']);
        Route::put('/{stockId}', [UtensilController::class, 'updateStockIn']);
        Route::get('/transactions', [UtensilController::class, 'stockInTransactions']);
        Route::post('/{stockId}', [UtensilController::class, 'confirmApprovalStockIn']);
        Route::delete('/{stockId}', [UtensilController::class, 'destroyStockIn']);
    });

    Route::prefix('utensil-stock-out/{branch}')->group(function () {
        Route::post('/', [UtensilController::class, 'addStockOut']);
        Route::put('/{stockId}', [UtensilController::class, 'updateStockOut']);
        Route::get('/transactions', [UtensilController::class, 'stockOutTransactions']);
        Route::post('/{stockId}', [UtensilController::class, 'confirmApprovalStockOut']);
        Route::delete('/{stockId}', [UtensilController::class, 'destroyStockOut']);
    });

    Route::prefix('utensil-group/{branch}')->group(function () {
        Route::get('/', [UtensilController::class, 'indexGroup']);
        Route::post('/', [UtensilController::class, 'addGroup']);
        Route::put('/{groupId}', [UtensilController::class, 'updateGroup']);
        Route::delete('/{groupId}', [UtensilController::class, 'destroyGroup']);
    });
});
