const sampleFeatures = {
    "extended-summary": true,
    "feedback-dialog": false
};

const CACHE_TIME = 5000;

// returns the state of *all* features for current user
export function fetchSelectedFeatures() {
    console.log("LOADING FF");
    
    // in reality, this would have been a `fetch` call:
    // `fetch("/api/features/all")`
    return new Promise<FFCache>((resolve, reject) => {
        // setTimeout(reject, 100, "WRONG VALUES!");
        setTimeout(resolve, 100, sampleFeatures);
    });
}

type FFCache = {
    [key: string]: boolean;
};

let ffCache: FFCache = null;
let ffCachePromise: Promise<FFCache> = null;
let ffCacheLoadTime = -Infinity;

async function loadAndCheckFFCache() {
    console.log("TRY TO LOAD FF");
    let succesfully = true;
    if (ffCache == null || ffCacheLoadTime + CACHE_TIME < Date.now()) {
        try {
            if (!ffCachePromise) {
                ffCachePromise = fetchSelectedFeatures();
            }
            ffCache = await ffCachePromise;
            ffCacheLoadTime = Date.now();
        } catch (error) {
            // Investigate error observability
            console.error(error);
            succesfully = false;
        } finally {
            ffCachePromise = null;
        }
    }
    return succesfully;
}

export async function getFeatureState(name: string) {
    if (await loadAndCheckFFCache()) {
        return ffCache && !!ffCache[name];
    } else {
        return null;
    }
}