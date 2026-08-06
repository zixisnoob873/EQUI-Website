<?php

use App\Http\Controllers\AdminApiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PublicApiController;
use Illuminate\Support\Facades\Route;

// Public Endpoints
Route::get('/branches', [PublicApiController::class, 'getBranches']);
Route::get('/branches/{slug}', [PublicApiController::class, 'getBranch']);
Route::get('/pricing', [PublicApiController::class, 'getPricing']);
Route::get('/pc-tiers', [PublicApiController::class, 'getPcTiers']);
Route::get('/consoles', [PublicApiController::class, 'getConsoles']);
Route::get('/contacts', [PublicApiController::class, 'getContacts']);
Route::get('/gallery', [PublicApiController::class, 'getGallery']);
Route::get('/page-content/{page}', [PublicApiController::class, 'getPageContent']);

// Auth Endpoints
Route::post('/login', [AuthController::class, 'login']);

// Admin Protected Endpoints
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin CRUD
    Route::put('/admin/branches/{id}', [AdminApiController::class, 'updateBranch']);
    Route::post('/admin/pricing', [AdminApiController::class, 'savePricingTier']);
    Route::delete('/admin/pricing/{id}', [AdminApiController::class, 'deletePricingTier']);
    Route::post('/admin/pc-tiers', [AdminApiController::class, 'savePcTier']);
    Route::delete('/admin/pc-tiers/{id}', [AdminApiController::class, 'deletePcTier']);
    Route::post('/admin/consoles', [AdminApiController::class, 'saveConsole']);
    Route::put('/admin/contacts/{id}', [AdminApiController::class, 'updateContact']);
    Route::post('/admin/gallery', [AdminApiController::class, 'addGalleryImage']);
    Route::delete('/admin/gallery/{id}', [AdminApiController::class, 'deleteGalleryImage']);
});
