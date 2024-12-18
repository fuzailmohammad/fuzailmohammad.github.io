'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "80ae18d9259052bb56f16487ffaf3fd3",
"assets/AssetManifest.bin.json": "a08e747fee96d604180a217c30c265ee",
"assets/AssetManifest.json": "8f3e19fea8c3226e7aa85567b754eb4a",
"assets/assets/fonts/inter.ttf": "0a77e23a8fdbe6caefd53cb04c26fabc",
"assets/assets/images/arrow_down.png": "e02073a84d5433ec09f95ece7b4c1fdb",
"assets/assets/images/background.png": "6c9f296c3887ef8907102a99ee0b12af",
"assets/assets/images/background_mobile.png": "5e5bc46be5108cd08f7399cd6bbfa2e8",
"assets/assets/images/clicker.jpg": "bd6afeae71ef9e638d409d32b3905170",
"assets/assets/images/crown.png": "75f138e05c8784be0a164b9831f5fe2d",
"assets/assets/images/crown_drawer.png": "9aa9b919ccce4a5fbc8a25ba75c9be23",
"assets/assets/images/gift.png": "0187f7d5f51693069a786b1a374321ea",
"assets/assets/images/logo.png": "73ba4fb59e7885943d16b8914d78bced",
"assets/assets/images/logout.png": "8f1b089514f32a60a15a75e78368b353",
"assets/assets/images/logo_transparent.png": "89f61ab3a6e28a5bce24771de46a4a0e",
"assets/assets/images/masked_logo.png": "c004e526dc9b03d4f9050ce22d4163ee",
"assets/assets/images/menu.png": "500f628525ea4ae3658872435b57cccc",
"assets/assets/images/message.png": "1ee08ddb2b7c46847cfa8968cfdb013e",
"assets/assets/images/question.png": "954e34de8593c8b3111f677a0d816290",
"assets/assets/images/user.png": "9d6827450781f5c0a138e2ee72c2d2c4",
"assets/assets/images/verify.png": "8713946d3108da93dd92a022cdbebf40",
"assets/assets/images/whatsapp.png": "fcccef5d10f9b23c1db31724fff8ce31",
"assets/FontManifest.json": "8d0e3e956ecdb4a2735d5ff8a07bc3b8",
"assets/fonts/MaterialIcons-Regular.otf": "9527acbf73da7cf116929b7bedff292f",
"assets/NOTICES": "d1cc1b46069cb0ee156333a99d5e67d2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "51f1da3f24be2081fb3818e86e894514",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.css": "5a8d0222407e388155d7d1395a75d5b9",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.html": "16911fcc170c8af1c5457940bd0bf055",
"assets/packages/flutter_inappwebview_web/assets/web/web_support.js": "509ae636cfdd93e49b5a6eaf0f06d79f",
"assets/packages/syncfusion_flutter_pdfviewer/assets/fonts/RobotoMono-Regular.ttf": "5b04fdfec4c8c36e8ca574e40b7148bb",
"assets/packages/syncfusion_flutter_pdfviewer/assets/highlight.png": "7384946432b51b56b0990dca1a735169",
"assets/packages/syncfusion_flutter_pdfviewer/assets/squiggly.png": "c9602bfd4aa99590ca66ce212099885f",
"assets/packages/syncfusion_flutter_pdfviewer/assets/strikethrough.png": "cb39da11cd936bd01d1c5a911e429799",
"assets/packages/syncfusion_flutter_pdfviewer/assets/underline.png": "c94a4441e753e4744e2857f0c4359bf0",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"custom_back.css": "9ec5feae80470d8669e776c196aaf49a",
"favicon.ico": "55ab16d585300ccc11eb7955f1c03372",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"flutter_bootstrap.js": "70e8086f90ac8d19ba04f83b2676f142",
"icons/apple-touch-icon.png": "cc86a24a9a32df935a12fefa869d9762",
"icons/Icon-192.png": "af6216bff6b7b1a73a17893a52b32a10",
"icons/Icon-512.png": "e2825f45c053d1990ea5e0c0a6585d56",
"icons/Icon-maskable-192.png": "03541a4aac33879544ad131bbe61102c",
"icons/Icon-maskable-512.png": "775f1e77659a71687826bd6cc437f0e9",
"index.html": "755d11971e29f6cf5e159bbffc92d116",
"/": "755d11971e29f6cf5e159bbffc92d116",
"main.dart.js": "700404735880d0458cbeab8f48b8bb60",
"manifest.json": "5b98f4d416e0960fe92fd4a4d27d3b79",
"style.css": "2a458cdcc0e4184124cdba55bf582c24",
"version.json": "dba7a4f9a700e4a3cf80448ac47e47eb"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
