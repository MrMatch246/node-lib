import { Keyboard, KeyInfo, KeyState } from "../../src";
import { KeyModel } from "../../src/internal/models";

// Ok. Let's create a keyboard
// This will be done with the default values for USB vendor, product, and interface
const keyboard = new Keyboard();

/*
 * Now, this actually finds the keyboard. Internally the keyboard object will track
 * the device, but if you really want access to the low-level HID device this will 
 * return it.
 * 
 * NOTE: THE FIND METHOD CAN TAKE THE VENDOR AND PRODUCT IDS ALONG WITH A HOST OF USB
 * INFO TO MAKE THE CONNECTION. THE DEFAULT CALL USES THE INFO NECESSARY TO CONNECT
 * TO THE Q5.
 */
const hidDevice = keyboard.find();

/*
 * Now that we found our keyboard let's go and initialize it...
 * What initialization means, I'm not sure yet, but we send some stuff...
 */
keyboard.initialize();

allColor("#FF0000");
allColor("#00FF00");
allColor("#0000FF");

// sparkle();
const data = keyboard.getKeyboardData();
console.log("Firmware Version:" + data.firmware);
keyboard.setBrightness(63);

// sparkleBatch();

/*
 * Let's set some color!
 */
// keyboard.set(
//   new KeyState(KeyInfo["en-US"].space)
//     .setToColorHex("#0000FF")
//     .setFromColorHex("#FF0000")
//     .setDownHoldDelay(100)
//     .setUpHoldDelay(100)
//     .setDownDecrement(100)
//     .setUpIncrement(100)
//     .setUpMaximum("#000000")
//     .setTransition()
// );

/*
 * Great! Apply our changes!
 */
keyboard.apply();

/*
 * Clean up!
 */
keyboard.close();

/*
This function is useful for figuring out key mappings. While running, the key should flash red, green, blue, blank, repeat.

testKey(new Key(5, 0, 1, 2));
 */
function testKey(key: KeyModel) {
  while (true) {
    keyboard.setKeyState(new KeyState(key).setFromColorHex("FF0000").setToColorHex("FF0000"));
    keyboard.apply();
    sleep(300);
    keyboard.setKeyState(new KeyState(key).setFromColorHex("00FF00").setToColorHex("00FF00"));
    keyboard.apply();
    sleep(300);
    keyboard.setKeyState(new KeyState(key).setFromColorHex("0000FF").setToColorHex("0000FF"));
    keyboard.apply();
    sleep(300);
    keyboard.setKeyState(new KeyState(key).setFromColorHex("000000").setToColorHex("000000"));
    keyboard.apply();
    sleep(1000);
  }
}

function sparkle() {
  const keys = Object.keys(KeyInfo["en-US"]);
  while (true) {
    const chosenKey = keys[Math.floor(Math.random() * keys.length)];
    const key = KeyInfo["en-US"][chosenKey];
    const color = Math.floor(Math.random() * 3);
    if (color === 0) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#FF0000"));
    } else if (color === 1) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#00FF00"));
    } else if (color === 2) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#0000FF"));
    } else {
      throw new Error("should never happen");
    }

    keyboard.apply();
  }
}

function sparkleBatch() {
  const keys = Object.keys(KeyInfo["en-US"]);
  const currentKeys: KeyModel[] = [];
  while (true) {
    const chosenKey = keys[Math.floor(Math.random() * keys.length)];
    const key = KeyInfo["en-US"][chosenKey];
    const color = Math.floor(Math.random() * 3);
    if (color === 0) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#FF0000"));
    } else if (color === 1) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#00FF00"));
    } else if (color === 2) {
      keyboard.setKeyState(new KeyState(key).setToColorHex("#0000FF"));
    } else {
      throw new Error("should never happen");
    }
    keyboard.apply();
    currentKeys.push(key);

    if (currentKeys.length > 10) {
      keyboard.setKeyState(new KeyState(currentKeys.splice(0, 1)[0]).setToColorHex("#000000"));
      keyboard.apply();
    }
  }
}

function allColor(hexColor: string) {
  const keys = Object.keys(KeyInfo["en-US"]);
  for (const keyName of keys) {
    const key = KeyInfo["en-US"][keyName];
    keyboard.setKeyState(new KeyState(key).setToColorHex(hexColor));
  }
  keyboard.apply();
}

function sleep(sleepDuration: number) {
  const now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}
