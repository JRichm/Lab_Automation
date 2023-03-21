const { By } = require('selenium-webdriver');

const movie = "Batman";

const addMovie = async (driver) => {
    await driver.findElement(By.xpath("//input")).sendKeys(movie + '\n');
    const newMovie = await driver.findElement(By.xpath(`//li/span[text()='${movie}']`));
    expect(newMovie.isDisplayed()).toBeTruthy();
}

const deleteMovie = async (driver) => {
    await driver.findElement(By.xpath("//button[text()='x']")).click();
    const deleted = await driver.findElement(By.id("message"));
    expect(deleted.isDisplayed()).toBeTruthy();
}

const watchMovie = async (driver) => {
    // find input element and type movie, then press enter
    await driver.findElement(By.xpath("//input")).sendKeys(movie + '\n');

    // find first span element (first movie from list) and click it
    let movieClick = await driver.findElement(By.xpath("//span"));
    movieClick.click();

    // find message element
    const message = await driver.findElement(By.id("message"));

    // get message text
    const messageText = await message.getText();

    // test expects message text to end with 'watched!'
    expect(messageText.endsWith('watched!'));

    movieClick.click();
}

const unwatchMovie = async (driver) => {
    // find first span element (first movie from list) and click it
    let movieClick = await driver.findElement(By.xpath("//span"));
    movieClick.click();

    // sleep
    await driver.sleep(2000);

    // click movie again
    movieClick.click();

    // find message element
    const message = await driver.findElement(By.id("message"));

    // get message text
    const messageText = await message.getText();

    // test expects message text to end with 'watched!'
    expect(messageText.endsWith('added back!'));
}


module.exports = {
    addMovie,
    deleteMovie,
    watchMovie,
    unwatchMovie
}