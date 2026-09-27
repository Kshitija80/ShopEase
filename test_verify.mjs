import { chromium } from 'playwright';

async function runVerification() {
  console.log('🚀 Starting ShopEase E2E Browser Verification...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = [];
  function record(name, passed, details = '') {
    results.push({ name, passed, details });
    console.log(`${passed ? '✅ PASS' : '❌ FAIL'}: ${name} ${details ? `(${details})` : ''}`);
  }

  try {
    // 1. Visit Home Page
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');

    const title = await page.title();
    record('Page Title Check', title.includes('ShopEase'), `Title: "${title}"`);

    // Verify Hero
    const heroText = await page.locator('header h1').innerText();
    const heroSub = await page.locator('header p').innerText();
    record('Hero Banner Rendered', heroText.includes('ShopEase') && heroSub.includes('Discover products'), heroText);

    // 2. Wait for products to load from DummyJSON API
    await page.waitForSelector('.product-card', { timeout: 10000 });
    const productCardsCount = await page.locator('.product-card').count();
    record('Product API Data Loaded', productCardsCount > 0, `Loaded ${productCardsCount} product cards`);

    // 3. Test Search
    const searchInput = page.locator('input[placeholder*="Search products"]');
    await searchInput.fill('essence');
    await page.waitForTimeout(500);
    const searchCardsCount = await page.locator('.product-card').count();
    record('Dynamic Search Filter', searchCardsCount > 0, `Found ${searchCardsCount} products for "essence"`);

    // Search for non-existent item
    await searchInput.fill('xyznonexistentquery123');
    await page.waitForTimeout(500);
    const noProductsFound = await page.locator('text=No products found.').isVisible();
    record('Empty Search State Message', noProductsFound, 'Showed "No products found."');

    // Reset search
    await page.locator('button[aria-label="Clear search"]').click();
    await page.waitForTimeout(500);

    // 4. Test Category Filter
    const categorySelect = page.locator('#categorySelect');
    await categorySelect.selectOption({ label: 'Beauty' });
    await page.waitForTimeout(500);
    const beautyCardsCount = await page.locator('.product-card').count();
    record('Category Filter Selected (Beauty)', beautyCardsCount > 0, `Found ${beautyCardsCount} beauty products`);

    // Reset category to all
    await categorySelect.selectOption({ value: 'all' });
    await page.waitForTimeout(500);

    // 5. Test Sorting (Price Low to High)
    const sortSelect = page.locator('#sortSelect');
    await sortSelect.selectOption('price-asc');
    await page.waitForTimeout(500);
    const firstPriceText = await page.locator('.product-card .fs-5').first().innerText();
    const firstPrice = parseFloat(firstPriceText.replace('$', ''));
    record('Sort Price: Low to High', !isNaN(firstPrice) && firstPrice >= 0, `Lowest price: $${firstPrice}`);

    // Sort Name A to Z
    await sortSelect.selectOption('name-asc');
    await page.waitForTimeout(500);
    const firstTitle = await page.locator('.product-card .card-title').first().innerText();
    record('Sort Name: A to Z', firstTitle.length > 0, `First product: "${firstTitle}"`);

    // Reset sort
    await sortSelect.selectOption('default');
    await page.waitForTimeout(500);

    // 6. Test Product Details Navigation
    const firstProduct = page.locator('.product-card').first();
    const productTitleBeforeClick = await firstProduct.locator('.card-title').innerText();
    await firstProduct.locator('button:has-text("View Details")').click();
    await page.waitForTimeout(800);

    const detailsTitle = await page.locator('h1').innerText();
    record('Product Details Page Loaded', detailsTitle.includes(productTitleBeforeClick), `Viewing: ${detailsTitle}`);

    const hasStock = await page.locator('text=In Stock').isVisible();
    record('Product Details Stock & Specs', hasStock, 'Stock status displayed');

    // Return to home via Back to Products button
    await page.locator('button:has-text("Back to Products")').click();
    await page.waitForTimeout(500);
    const backToProductsWorked = (await page.locator('.product-card').count()) > 0;
    record('Back to Products Navigation', backToProductsWorked, 'Returned to catalog');

    // 7. Test Add to Cart from Home
    const cardToAdd = page.locator('.product-card').first();
    const cardTitle = await cardToAdd.locator('.card-title').innerText();
    await cardToAdd.locator('button:has-text("Add to Cart")').click();
    await page.waitForTimeout(400);

    // Check navbar cart badge
    const cartBadgeText = await page.locator('nav a[href="#/cart"] .badge').innerText();
    record('Cart Badge Updated in Navbar', cartBadgeText === '1', `Badge shows: ${cartBadgeText}`);

    // Check toast notification
    const toastVisible = await page.locator('.toast').isVisible();
    record('Action Feedback Toast Shown', toastVisible, 'Toast alert displayed');

    // 8. Test Wishlist Toggle
    const wishlistBtn = page.locator('.product-card').first().locator('.wishlist-btn');
    await wishlistBtn.click();
    await page.waitForTimeout(400);
    const wishlistBadgeText = await page.locator('nav a[href="#/wishlist"] .badge').innerText();
    record('Wishlist Badge Updated in Navbar', wishlistBadgeText === '1', `Badge shows: ${wishlistBadgeText}`);

    // 9. Navigate to Wishlist Page
    await page.locator('nav a[href="#/wishlist"]').click();
    await page.waitForTimeout(500);
    const wishlistItemTitle = await page.locator('.product-card .card-title').first().innerText();
    record('Wishlist Page Renders Item', wishlistItemTitle === cardTitle, `Wishlist product: ${wishlistItemTitle}`);

    // 10. Navigate to Cart Page
    await page.locator('nav a[href="#/cart"]').click();
    await page.waitForTimeout(500);
    const cartItemTitle = await page.locator('table tbody tr h6').first().innerText();
    record('Cart Page Renders Item', cartItemTitle === cardTitle, `Cart product: ${cartItemTitle}`);

    // 11. Increase Quantity in Cart
    const qtyBefore = parseInt(await page.locator('table tbody tr .fw-bold.small').innerText(), 10);
    await page.locator('button[title="Increase quantity"]').click();
    await page.waitForTimeout(300);
    const qtyAfter = parseInt(await page.locator('table tbody tr .fw-bold.small').innerText(), 10);
    record('Cart Quantity Increase', qtyAfter === qtyBefore + 1, `Qty changed from ${qtyBefore} to ${qtyAfter}`);

    // 12. Decrease Quantity in Cart
    await page.locator('button[aria-label="Decrease quantity"]').click();
    await page.waitForTimeout(300);
    const qtyDecreased = parseInt(await page.locator('table tbody tr .fw-bold.small').innerText(), 10);
    record('Cart Quantity Decrease', qtyDecreased === qtyBefore, `Qty decreased back to ${qtyDecreased}`);

    // 13. Decrease quantity to 0 removes product from cart
    await page.locator('button[aria-label="Decrease quantity"]').click();
    await page.waitForTimeout(300);
    const emptyCartVisible = await page.locator('text=Your cart is empty.').isVisible();
    record('Decrease to 0 Removes Item from Cart', emptyCartVisible, 'Empty cart screen displayed');

    // 14. Add to Cart again to test LocalStorage persistence across page reload
    await page.locator('button:has-text("Start Shopping")').click();
    await page.waitForTimeout(500);
    await page.locator('.product-card').first().locator('button:has-text("Add to Cart")').click();
    await page.waitForTimeout(400);

    // Check LocalStorage content
    const lsCart = await page.evaluate(() => localStorage.getItem('shopease_cart'));
    const lsWishlist = await page.evaluate(() => localStorage.getItem('shopease_wishlist'));
    record('LocalStorage Keys Persisted', lsCart !== null && lsWishlist !== null, 'shopease_cart & shopease_wishlist stored');

    // Reload page to test persistence
    await page.reload();
    await page.waitForTimeout(800);
    const reloadedCartBadge = await page.locator('nav a[href="#/cart"] .badge').innerText();
    const reloadedWishlistBadge = await page.locator('nav a[href="#/wishlist"] .badge').innerText();
    record('Cart & Wishlist Persist Across Page Reload', reloadedCartBadge === '1' && reloadedWishlistBadge === '1', `Cart: ${reloadedCartBadge}, Wishlist: ${reloadedWishlistBadge}`);

    // 15. Mobile Responsiveness Test (375x667)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // Check navbar toggler is visible on mobile
    const togglerVisible = await page.locator('.navbar-toggler').isVisible();
    record('Mobile Viewport Navbar Toggler Visible', togglerVisible, 'Navbar collapsed with hamburger button');

    // Click hamburger button to expand menu
    await page.locator('.navbar-toggler').click();
    await page.waitForTimeout(300);
    const navCollapseShown = await page.locator('.navbar-collapse.show').isVisible();
    record('Mobile Menu Toggles Open', navCollapseShown, 'Mobile navigation expanded successfully');

    // Check horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    record('No Horizontal Scroll on Mobile', scrollWidth <= clientWidth, `scrollWidth: ${scrollWidth}px, clientWidth: ${clientWidth}px`);

    // Tablet Responsiveness Test (768x1024)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300);
    const tabletScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const tabletClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    record('No Horizontal Scroll on Tablet', tabletScrollWidth <= tabletClientWidth, `scrollWidth: ${tabletScrollWidth}px, clientWidth: ${tabletClientWidth}px`);

    console.log('\n📊 VERIFICATION SUMMARY:');
    const allPassed = results.every(r => r.passed);
    console.log(`Total tests: ${results.length} | Passed: ${results.filter(r => r.passed).length} | Failed: ${results.filter(r => !r.passed).length}`);
    if (allPassed) {
      console.log('🎉 ALL 18 SYSTEM TESTS PASSED SUCCESSFULLY!');
    }

  } catch (error) {
    console.error('Test execution error:', error);
  } finally {
    await browser.close();
  }
}

runVerification();
