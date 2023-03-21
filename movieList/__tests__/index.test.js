const {Builder, Capabilities} = require('selenium-webdriver');

require('chromedriver');

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

const { deleteMovie, watchMovie, unwatchMovie } = require('../testFunctions');

beforeAll(async () => {
    await (await driver).get(`http://127.0.0.1:4000/movieList/index.html`);
});

afterAll(async () => {
    await (await driver).quit();
});

describe("movie list functionality", () => {
    it("check movie off list", async () => {
        await watchMovie(driver);
        await driver.sleep(1000);
    });

    it("add movie back to list", async () => {
        await unwatchMovie(driver);
        await driver.sleep(1000);
    });
});