let items = [];
const getData = async () => {
  try {
    const result = await fetch('./data1.json');
    return await result.json();

  }
  catch (error) {

  }
}
const setItems = async () => {
  items = await getData();

}
await setItems();
const itemcontainer = document.querySelector(".items");
const image = document.querySelector(".image");
const displaytitle = document.querySelector(".title");
let currentselectedindex = 0;
const titleArray = []; //stores complete title .
const setTextContentWidth = (item, text) => {
  const parent = item.parentNode;
  const part1 = text.substr(0, Math.floor(text.length / 2));
  const part2 = text.substr(Math.floor(text.length / 2));
  let lenpartone = 1;
  let lenparttwo = part1.length;
  let ans = lenpartone;
  if (item.clientWidth > (parent.clientWidth) * 0.7) {
    while (lenpartone < lenparttwo) {
      let midlen = parseInt((lenpartone + lenparttwo) / 2);
      if (lenpartone === lenparttwo && lenpartone === part1.length) {
        item.textContent = part1.substr(0, midlen) + part2.substr(-1 * (midlen - 1));
      }
      else {
        item.textContent = part1.substr(0, midlen) + '...' + part2.substr(-1 * (midlen - 1));
      }
      if (item.clientWidth >= (parent.clientWidth) * 0.7) {
        lenparttwo = midlen - 1;
      }
      else {
        ans = midlen;
        lenpartone = midlen + 1;
      }
    }
    if (ans === part1.length) {
      item.textContent = part1.substr(0, ans) + part2.substr(-1 * (ans - 1));
    }
    else {
      item.textContent = part1.substr(0, ans) + '...' + part2.substr(-1 * (ans - 1));
    }
  }
}
const setTextContent = (item, text, checkwidth) => {
  item.textContent = text;
  if (checkwidth === true) {
    setTextContentWidth(item, text);
  }
}
const addClass = (item, classes) => {
  for (let clas of classes) {
    item.classList.add(clas);
  }
}


const createElements = (element) => {
  return document.createElement(element);
}


const removeSelection = () => {
  const children = itemcontainer.children.item(currentselectedindex);
  children.classList.remove("selected");
}
items.map((item, index) => {
  const iteminfo = createElements("div");
  addClass(iteminfo, ["content", "flex"]);

  const titlediv = createElements("div");

  const imagedisplay = createElements("img");

  addClass(titlediv, ["text-content"]);
  imagedisplay.src = item.previewImage;
  iteminfo.append(imagedisplay, titlediv);
  itemcontainer.append(iteminfo);
  titleArray.push(item.title);
  setTextContent(titlediv, item.title, true);

})

const makeInitialSelection = () => {
  const listofitems = itemcontainer.children;
  listofitems.item(currentselectedindex).click();
}

const dipslayDetails = (callback) => {
  const listofitems = itemcontainer.children;
  for (let i = 0; i < items.length; i++) {
    listofitems.item(i).addEventListener("click", () => {
      const prevSelectedItem = listofitems.item(currentselectedindex);
      prevSelectedItem.classList.remove("selected");
      image.src = items[i].previewImage;
      currentselectedindex = i;
      displaytitle.textContent = titleArray[currentselectedindex];
      listofitems.item(i).classList.add("selected");
    })
  }
  callback(makeInitialSelection);
}
dipslayDetails(makeInitialSelection);

displaytitle.addEventListener("focusout", (event) => {
  const currentselecteditem = itemcontainer.children.item(currentselectedindex);
  titleArray[currentselectedindex] = event.target.textContent;
  setTextContent(currentselecteditem.children.item(1), event.target.textContent, true);

})

const selectPrevItem = (listofitems) => {
  removeSelection();
  if (currentselectedindex > 0) {
    currentselectedindex--;
    listofitems.item(currentselectedindex).click();
  }
  else {
    listofitems.item(items.length - 1).click();
  }
}


const selectNextItem = (listofitems) => {
  removeSelection();
  if (currentselectedindex + 1 < items.length) {
    currentselectedindex++;
    listofitems.item(currentselectedindex).click();
  }
  else {
    currentselectedindex = 0;
    listofitems.item(currentselectedindex).click();
  }
}

document.addEventListener("keydown", (event) => {
  const listofitems = itemcontainer.children;
  switch (event.key) {
    case "ArrowUp": selectPrevItem(listofitems);
      break;
    case "ArrowDown": selectNextItem(listofitems);
      break;
  }
})

