const { execSync } = require('child_process');
const DESTINATIONS = require('./destinations');

// Flatten destinations to a list of cities
const allCities = [];
const TARGET_COUNTRIES = 10;
const MIN_CITIES = 30;

let cityCount = 0;
for (const [country, cities] of Object.entries(DESTINATIONS)) {
    for (const city of cities) {
        allCities.push({ city, country });
        cityCount++;
    }
}

console.log(`Found ${allCities.length} total cities.`);

// Function to run generation for a city
const runGen = (city) => {
    const cityName = city.city.split('(')[0].trim().toLowerCase();
    try {
        console.log(`\n>>> Processing ${city.city} of ${city.country}...`);
        // Run as a synchronous child process
        execSync(`node generate_global.js "${cityName}"`, { stdio: 'inherit' });
        console.log(`>>> Completed ${city.city}`);

        // GIT AUTOMATION
        try {
            console.log(">>> Committing and Pushing to Git...");
            execSync('git add data/'); // Only stage data folder
            execSync(`git commit -m "Auto-update: Travel data for ${city.city}"`);
            execSync('git push');
            console.log(">>> Git Push Successful!");
        } catch (gitErr) {
            console.error(">>> Git processing failed (might be nothing to commit):", gitErr.message);
        }
    } catch (e) {
        console.error(`>>> Failed ${city.city}`, e.message);
    }
};

async function main() {
    console.log("Starting Global Generation Batch...");

    // Process all cities
    for (let i = 0; i < allCities.length; i++) {
        const city = allCities[i];
        console.log(`\n[${i + 1}/${allCities.length}] Starting Batch for: ${city.city}`);
        runGen(city);

        // Add a cooldown between cities to let API quotas cool off slightly
        console.log("Cooling down 10s between cities...");
        await new Promise(r => setTimeout(r, 10000));
    }

    console.log("Global Batch Generation Completed!");
}

main();
