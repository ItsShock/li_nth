const Differencify = require("differencify");
const differencify = new Differencify({ mismatchThreshold: 0 });
let urlToTest = "http://127.0.0.1:8080/";

describe("Zadanie nr. 2", () => {
  const timeout = 30000;
  let page;

  beforeAll(async () => {
    await differencify.launchBrowser({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const target = differencify.init({ chain: false });
    page = await target.newPage();
    await page.goto(urlToTest);
    await page.waitFor(1000);
  }, timeout);
  afterAll(async () => {
    await differencify.cleanup();
  });

  it("Dodano uporządkowaną listę", async () => {
    const ol = await page.$eval("ol", elem => !!elem);
    expect(ol).toBe(true);
  }, timeout);

  it("Dodano 5 elementów listy", async () => {
    const ol = await page.$$eval("ol li", elems => elems.length === 5);
    expect(ol).toBe(true);
  }, timeout);

  it("Każdy LI ma span oraz checkbox", async () => {
    const listItems = await page.$$eval("ol li", elems => {
      return !!elems[0].innerHTML.indexOf("span") && !!elems[0].innerHTML.indexOf("input")
        && !!elems[1].innerHTML.indexOf("span") && !!elems[1].innerHTML.indexOf("input")
        && !!elems[2].innerHTML.indexOf("span") && !!elems[2].innerHTML.indexOf("input")
        && !!elems[3].innerHTML.indexOf("span") && !!elems[3].innerHTML.indexOf("input")
        && !!elems[4].innerHTML.indexOf("span") && !!elems[4].innerHTML.indexOf("input")
    });
    expect(listItems).toBe(true);
  }, timeout);

  it("Każdy nieparzysty LI ma odpowiedni kolor", async () => {
    const listItems = await page.$$eval("ol li", elems => {
      return getComputedStyle(elems[0]).backgroundColor === "rgb(206, 206, 206)"
        && getComputedStyle(elems[2]).backgroundColor === "rgb(206, 206, 206)"
        && getComputedStyle(elems[4]).backgroundColor === "rgb(206, 206, 206)"
    });
    expect(listItems).toBe(true);
  }, timeout);

  it("Każdy parzysty LI ma odpowiedni kolor", async () => {
    const listItems = await page.$$eval("ol li", elems => {
      return getComputedStyle(elems[1]).backgroundColor === "rgb(239, 227, 227)"
        && getComputedStyle(elems[3]).backgroundColor === "rgb(239, 227, 227)"
    });
    expect(listItems).toBe(true);
  }, timeout);
});
