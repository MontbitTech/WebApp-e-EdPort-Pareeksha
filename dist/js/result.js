const urlParams = new URLSearchParams(window.location.search);
const entries = urlParams.entries()

for (const entry of entries) {
    if (entry[0] == 'student') {
        console.log(`${entry[0]}: ${entry[1]}`);
    }
}