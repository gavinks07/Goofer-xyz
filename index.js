if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(Registration => {
        console.log("SW Registered!");
        console.log(Registration);
    }).catch(error => {
        console.log("SW registration Failed!");
        console.log(error);
    });
}