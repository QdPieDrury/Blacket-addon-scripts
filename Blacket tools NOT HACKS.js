// ==UserScript==
// @name         Blacket GUI Selector (Full Version)
// @namespace    http://tampermonkey.net/
// @version      2.4
// @description  Adds a GUI to Blacket with estimator, simulator, image viewer, and full pack chances viewer tab with sorted layout, styled UI, and scrollable views.
// @author       QdPieDrury on most platforms
// @match        https://blacket.org/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

const blacketBoxData = {
  "OG Pack": {
    "susdog": 13.75,
    "Omar": 13.75,
    "Pablo": 13.75,
    "Comic Crew Inc": 13.75,
    "Death": 13.75,
    "Mixafyy": 13.75,
    "Piotr": 6.5,
    "painbow": 6.5,
    "okr765": 6.5,
    "Cerulean": 2.5,
    "iBlooket": 2.5,
    "root": 0.5,
    "zastix": 0.25,
    "Doxy": 0.05,
    "Xotic": 0.005
  },
  "Ice Monster Pack": {
    "Ice Bat": 19.5,
    "Ice Bug": 19.5,
    "Ice Elemental": 19.5,
    "Rock Monster": 19.5,
    "Dink": 8.5,
    "Donk": 8.5,
    "Bush Monster": 4.5,
    "Yeti": 0.35,
    "Ice Slime": 0.08,
    "Frozen Fossil": 0.05,
    "Ice Crab": 0.02
  },
  "Color Pack": {
    "Brown Blook": 10.0,
    "Dull Blue Blook": 10.0,
    "Dust Blook": 10.0,
    "Maroon Blook": 10.0,
    "Tan Blook": 10.0,
    "Baby Blue Blook": 10.0,
    "Gray Blook": 10.0,
    "Light Blue Blook": 10.0,
    "Lime Blook": 10.0,
    "Orange Blook": 10.0,
    "Blue Blook": 5.0,
    "Salmon Blook": 5.0,
    "Teal Blook": 5.0,
    "Burgandy Blook": 5.0,
    "Green Blook": 5.0,
    "Mint Blook": 5.0,
    "Purple Blook": 2.5,
    "Yellow Blook": 2.5,
    "Red Blook": 2.5,
    "White Blook": 0.5,
    "Black Blook": 0.2,
    "Pink Blook": 0.05,
    "Rainbow Blook": 0.005
  },
  "Video Game Pack": {
    "Pac-Man": 14.0,
    "Space Invader": 14.0,
    "Among Us": 14.0,
    "Poke Ball": 14.0,
    "Flappy Bird": 14.0,
    "Goomba": 9.0,
    "Big Shield": 9.0,
    "Creeper": 9.0,
    "Red Bird": 1.3,
    "Companion Cube": 1.3,
    "Master Chief": 0.35,
    "Golden Among Us": 0.05,
    "Gaming Mouse": 0.003
  },
  "Sports Pack": {
    "Basketball": 15.0,
    "Baseball": 15.0,
    "Soccer Ball": 15.0,
    "Tennis Ball": 15.0,
    "Golf Ball": 15.0,
    "Football": 7.0,
    "Bowling Ball": 7.0,
    "Ping Pong Racket": 7.0,
    "Curling Stone": 3.48,
    "Football Helmet": 0.5,
    "Red Bowling Ball": 0.02
  },
  "Spooky Pack": {
    "Pumpkin": 18.5,
    "Swamp Monster": 18.5,
    "Frankenstein": 18.5,
    "Vampire": 18.5,
    "Zombie": 10.15,
    "Mummy": 10.15,
    "Caramel Apple": 6.7,
    "Werewolf": 5.0,
    "Ghost": 0.65,
    "Haunted Pumpkin": 0.05,
    "Pumpkin Cookie": 0.03,
    "Mummy Cookie": 0.025,
    "Ghost Cookie": 0.02,
    "Haunted Cookie": 0.0175,
    "Chick Chicken": 0.0175,
    "Chicken Chick": 0.0175,
    "Raccoon Bandit": 0.0175,
    "Owl Sheriff": 0.0175,
    "Anaconda Wizard": 0.0175,
    "Vampire Frog": 0.015,
    "Pumpkin King": 0.015,
    "Spooky Cookie": 0.013,
    "Spooky Pumpkin": 0.0125,
    "Spooky Mummy": 0.01,
    "Spooky Ghost": 0.005
  },
  "Ankha Pack": {
    "Ankha": 17.5,
    "Mummy Ankha": 17.5,
    "Realistic Ankha": 17.5,
    "Glowing Ankha": 15.0,
    "Mark Ankha": 10.0,
    "Ankha's House": 10.0,
    "High Ankha": 4.0,
    "Black Ankha": 2.5,
    "Golden Ankha": 0.5,
    "Zone Ankha": 0.02,
    "Rainbow Ankha": 0.003
  },
  "Gemstone Pack": {
    "Jasper": 15.0,
    "Jade": 15.0,
    "Onyx": 15.0,
    "Quartz": 15.0,
    "Lapis Lazuli": 15.0,
    "Topaz": 6.8,
    "Ruby": 6.8,
    "Sapphire": 6.8,
    "Amethyst": 3.9,
    "Opal": 0.5,
    "Moonstone": 0.2,
    "Rose Quartz": 0.05,
    "Black Opal": 0.0037
  },
  "Dino Pack": {
    "Amber": 19.5,
    "Dino Egg": 19.5,
    "Dino Fossil": 19.5,
    "Stegosaurus": 19.5,
    "Velociraptor": 9.0,
    "Brontosaurus": 9.0,
    "Triceratops": 3.7,
    "Tyrannosaurus Rex": 0.3,
    "Golden Amber": 0.05
  },
  "Blizzard Pack": {
    "Snow Globe": 14.5,
    "Holiday Gift": 14.5,
    "Hot Chocolate": 14.5,
    "Holiday Wreath": 14.5,
    "Stocking": 14.5,
    "Gingerbread Man": 7.1,
    "Gingerbread House": 7.1,
    "Reindeer": 7.1,
    "Snowman": 5.15,
    "Santa Claus": 1.0,
    "New York Snow Globe": 0.05,
    "London Snow Globe": 0.05,
    "Japan Snow Globe": 0.05,
    "Egypt Snow Globe": 0.05,
    "Paris Snow Globe": 0.05,
    "Frost Wreath": 0.03,
    "Tropical Globe": 0.02,
    "Golden Gift": 0.01,
    "Diamond Gift": 0.005
  },
  "Fruit Pack": {
    "Apple": 15.2,
    "Orange": 15.0,
    "Lemon": 15.0,
    "Lime": 15.0,
    "Grape": 15.0,
    "Strawberry": 6.5,
    "Raspberry": 6.5,
    "Blueberry": 6.5,
    "Watermelon": 2.5,
    "Dragon Fruit": 2.5,
    "Starfruit": 0.3,
    "Green Apple": 0.05,
    "Blue Raspberry": 0.01,
    "Golden Apple": 0.0025
  },
  "Elemental Pack": {
    "Nature Elemental": 18.75,
    "Fire Elemental": 18.75,
    "Water Elemental": 18.75,
    "Air Elemental": 18.75,
    "Frost Elemental": 10.0,
    "Lava Elemental": 10.0,
    "Space Elemental": 4.5,
    "Electric Elemental": 0.45,
    "Plasma Elemental": 0.05
  },
  "Candy Pack": {
    "Candy Corn": 19.5,
    "Jellybean": 19.5,
    "Lollipop": 19.5,
    "Black Licorice": 19.5,
    "Peppermint": 8.5,
    "Chocolate": 8.5,
    "Gummy Worm": 4.5,
    "Rock Candy": 0.35,
    "White Chocolate": 0.08,
    "Red Licorice": 0.05,
    "Blue Gummy Worm": 0.02
  },
  "Safari Pack": {
    "Panda": 15.0,
    "Sloth": 15.0,
    "Tenrec": 15.0,
    "Flamingo": 15.0,
    "Zebra": 15.0,
    "Elephant": 7.0,
    "Lemur": 7.0,
    "Peacock": 7.0,
    "Chameleon": 3.48,
    "Lion": 0.5,
    "Rainbow Panda": 0.02,
    "White Peacock": 0.02,
    "Tiger Zebra": 0.02
  },
  "Space Pack": {
    "Earth": 18.75,
    "Meteor": 18.75,
    "Stars": 18.75,
    "Alien": 18.75,
    "Planet": 10.0,
    "UFO": 10.0,
    "Spaceship": 4.5,
    "Astronaut": 0.45,
    "Pink Astronaut": 0.05,
    "Red Astronaut": 0.05,
    "Orange Astronaut": 0.05,
    "Yellow Astronaut": 0.05,
    "Lime Astronaut": 0.05,
    "Green Astronaut": 0.05,
    "Cyan Astronaut": 0.05,
    "Blue Astronaut": 0.05,
    "Purple Astronaut": 0.05,
    "Brown Astronaut": 0.05,
    "Black Astronaut": 0.05,
    "Space Terminal": 0.01,
    "Space Debugger": 0.0075,
    "Tim the Alien": 0.005,
    "Rainbow Astronaut": 0.0025
  },
  "Bot Pack": {
    "Lil Bot": 19.5,
    "Lovely Bot": 19.5,
    "Angry Bot": 19.5,
    "Happy Bot": 19.5,
    "Watson": 10.0,
    "Buddy Bot": 10.0,
    "Brainy Bot": 3.7,
    "Mega Bot": 0.3,
    "Catson": 0.03,
    "Forgotten Bot": 0.004
  },
  "Aquatic Pack": {
    "Old Boot": 15.0,
    "Jellyfish": 15.0,
    "Clownfish": 15.0,
    "Frog": 15.0,
    "Crab": 15.0,
    "Pufferfish": 6.1,
    "Blobfish": 6.1,
    "Octopus": 6.1,
    "Narwhal": 3.0,
    "Dolphin": 3.0,
    "Baby Shark": 0.5,
    "Megalodon": 0.2,
    "Lovely Frog": 0.08,
    "Lucky Frog": 0.07,
    "Spring Frog": 0.06,
    "Rainbow Jellyfish": 0.05,
    "Blizzard Clownfish": 0.05,
    "Poison Dart Frog": 0.05,
    "Lemon Crab": 0.05,
    "Pirate Pufferfish": 0.05,
    "Crimson Octopus": 0.05,
    "Donut Blobfish": 0.05,
    "Rainbow Narwhal": 0.05
  },
  "Medieval Pack": {
    "Elf": 13.4,
    "Witch": 13.4,
    "Wizard": 13.4,
    "Fairy": 13.4,
    "Slime Monster": 13.4,
    "Jester": 9.0,
    "Dragon": 9.0,
    "Queen": 9.0,
    "Unicorn": 5.0,
    "King": 1.0,
    "Agent Owl": 0.05,
    "Master Elf": 0.05,
    "Phantom King": 0.005,
    "Dark Dragon": 0.003
  },
  "Breakfast Pack": {
    "Toast": 12.5,
    "Cereal": 12.5,
    "Yogurt": 12.5,
    "Breakfast Combo": 12.5,
    "Orange Juice": 12.5,
    "Milk": 12.5,
    "Waffle": 9.0,
    "Pancakes": 9.0,
    "French Toast": 5.0,
    "Pizza": 2.0,
    "Sandwich": 1.0,
    "Chocolate Milk": 0.05
  },
  "Wonderland Pack": {
    "Two of Spades": 15.2,
    "Eat Me": 15.0,
    "Drink Me": 15.0,
    "Alice": 15.0,
    "Queen of Hearts": 15.0,
    "Dormouse": 6.5,
    "White Rabbit": 6.5,
    "Cheshire Cat": 6.5,
    "Caterpillar": 2.5,
    "Mad Hatter": 2.5,
    "King of Hearts": 0.3
  },
  "Combat Pack": {
    "Viking Helmet": 18.75,
    "Iron Chestplate": 18.75,
    "Spiked Boot": 18.75,
    "Silver Shuriken": 18.75,
    "Knight Shield": 10.0,
    "Knight Sword": 10.0,
    "Fragment Grenade": 4.5,
    "M12 Shotgun": 0.45,
    "M67 Grenade": 0.05,
    "Diamond Sword": 0.0025,
    "Golden Shuriken": 0.001
  }
};

    function simulateBox(box, times) {
        const results = {};
        const blooks = Object.entries(box);
        for (const [name] of blooks) results[name] = 0;

        for (let i = 0; i < times; i++) {
            let roll = Math.random() * 100;
            let cumulative = 0;
            for (const [name, chance] of blooks) {
                cumulative += chance;
                if (roll < cumulative) {
                    results[name]++;
                    break;
                }
            }
        }
        return results;
    }

    function createWrapper() {
        const wrapper = document.createElement("div");
        wrapper.id = "blacketGuiWrapper";
        wrapper.style.cssText = "position: fixed; top: 100px; right: 20px; z-index: 9999; font-family: sans-serif; background: #1f1f1f; color: white; border-radius: 10px; border: 2px solid #444; width: 620px; overflow: hidden;";
        wrapper.innerHTML = `
        <div id="guiControls" style="display: flex; justify-content: space-between; padding: 5px; background: #333;">
            <div>
                <button class="guiTabBtn" data-tab="estimator">🎯 Estimator</button>
                <button class="guiTabBtn" data-tab="classic">📊 Classic</button>
                <button class="guiTabBtn" data-tab="blookViewer">🖼️ Blook Viewer</button>
                <button class="guiTabBtn" data-tab="chances">📋 View Chances</button>
            </div>
            <div>
                <button id="moveGuiBtn">+</button>
                <button id="toggleGuiBtn">⏸</button>
                <button id="closeGuiBtn">✖</button>
            </div>
        </div>
        <div id="guiContent" style="padding: 10px;"></div>`;
        document.body.appendChild(wrapper);
        return wrapper;
    }

    const wrapper = createWrapper();
    const guiContent = document.getElementById("guiContent");

    document.head.insertAdjacentHTML("beforeend", `<style>
        .guiTabBtn {
            background: #555; color: white; border: none; margin-right: 5px;
            padding: 5px 10px; border-radius: 6px; cursor: pointer;
        }
        .guiTabBtn:hover { background: #777; }
        #guiContent label, #guiContent select, #guiContent input, #guiContent button {
            display: block; width: 100%; margin: 6px 0; padding: 8px; border-radius: 6px;
            border: none; font-size: 14px; box-sizing: border-box;
        }
        #guiContent select, #guiContent input {
            background: #2b2b2b; color: white;
        }
        #guiContent button {
            background: #4CAF50; color: white; font-weight: bold; cursor: pointer;
        }
        #guiContent button:hover {
            background-color: #45a049;
        }
        .chanceBlock {
            background: #2b2b2b; border-radius: 6px; padding: 8px; margin-bottom: 10px;
        }
        .scrollWrapChances, .scrollWrapBlooks {
            max-height: 350px;
            overflow-y: auto;
            margin-top: 8px;
            border-radius: 6px;
            border: 1px solid #333;
        }
        .scrollWrapBlooks {
            padding: 6px 0 0 6px;
            background: #181818;
        }
    </style>`);

    let isDragging = false, offsetX = 0, offsetY = 0;
    const moveBtn = wrapper.querySelector("#moveGuiBtn");
    moveBtn.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - wrapper.offsetLeft;
        offsetY = e.clientY - wrapper.offsetTop;
        e.preventDefault();
    });
    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            wrapper.style.left = (e.clientX - offsetX) + "px";
            wrapper.style.top = (e.clientY - offsetY) + "px";
        }
    });
    document.addEventListener("mouseup", () => isDragging = false);

    wrapper.querySelector("#toggleGuiBtn").addEventListener("click", () => {
        guiContent.style.display = guiContent.style.display === "none" ? "block" : "none";
    });
    wrapper.querySelector("#closeGuiBtn").addEventListener("click", () => wrapper.remove());

    wrapper.querySelectorAll(".guiTabBtn").forEach(btn =>
        btn.addEventListener("click", () => loadTab(btn.dataset.tab))
    );

    function loadTab(tab) {
        guiContent.innerHTML = "";
        if (tab === "classic") {
            guiContent.innerHTML = `<h3>📊 Classic Simulator</h3>`;
            const boxSelect = document.createElement("select");
            for (let box in blacketBoxData) {
                const opt = document.createElement("option");
                opt.value = box;
                opt.textContent = box;
                boxSelect.appendChild(opt);
            }
            const input = document.createElement("input");
            input.type = "number";
            input.placeholder = "Number of simulations";
            input.value = 1000;

            const button = document.createElement("button");
            button.textContent = "Simulate";

            const results = document.createElement("div");

            button.onclick = () => {
                const data = simulateBox(blacketBoxData[boxSelect.value], parseInt(input.value));
                results.innerHTML = Object.entries(data)
                    .map(([k, v]) => `${k}: ${v} (${((v / input.value) * 100).toFixed(2)}%)`)
                    .join("<br>");
            };

            guiContent.append(boxSelect, input, button, results);
        } else if (tab === "estimator") {
            guiContent.innerHTML = `<h3>🎯 Estimator</h3>`;
            const boxSelect = document.createElement("select");
            for (let box in blacketBoxData) {
                const opt = document.createElement("option");
                opt.value = box;
                opt.textContent = box;
                boxSelect.appendChild(opt);
            }
            const blookSelect = document.createElement("select");
            const targetInput = document.createElement("input");
            targetInput.type = "number";
            targetInput.placeholder = "Target # of Blooks";
            targetInput.value = 1;

            const updateBlooks = () => {
                const selectedBox = blacketBoxData[boxSelect.value];
                blookSelect.innerHTML = "";
                for (let blook in selectedBox) {
                    const opt = document.createElement("option");
                    opt.value = blook;
                    opt.textContent = blook;
                    blookSelect.appendChild(opt);
                }
            };
            boxSelect.addEventListener("change", updateBlooks);
            updateBlooks();

            const button = document.createElement("button");
            button.textContent = "Estimate Opens";

            const result = document.createElement("div");
            button.onclick = () => {
                const box = blacketBoxData[boxSelect.value];
                const blook = blookSelect.value;
                const target = parseInt(targetInput.value);
                const chance = box[blook] / 100;
                const estimate = Math.ceil(target / chance);
                result.innerHTML = `You need ~<b>${estimate}</b> boxes for ${target} "${blook}"`;
            };

            guiContent.append(boxSelect, blookSelect, targetInput, button, result);
        } else if (tab === "chances") {
            const input = document.createElement("input");
            input.placeholder = "Search pack or blook...";
            const list = document.createElement("div");
            function render(filter = "") {
                list.innerHTML = "";
                Object.entries(blacketBoxData).forEach(([pack, blooks]) => {
                    if (filter && !pack.toLowerCase().includes(filter.toLowerCase()) &&
                        !Object.keys(blooks).some(b => b.toLowerCase().includes(filter.toLowerCase()))) return;
                    const div = document.createElement("div");
                    div.className = "chanceBlock";
                    div.innerHTML = `<strong>${pack}</strong><br>` +
                        Object.entries(blooks).sort((a, b) => b[1] - a[1])
                            .map(([k, v]) => `${k}: ${v}%`).join("<br>");
                    list.appendChild(div);
                });
            }
            input.addEventListener("input", () => render(input.value));
            render();
            // SCROLL WRAP
            const scrollWrap = document.createElement("div");
            scrollWrap.className = "scrollWrapChances";
            scrollWrap.appendChild(list);
            guiContent.append(input, scrollWrap);
        } else if (tab === "blookViewer") {
            if (!location.href.includes("/blooks")) {
                alert("You need to be in the blacket blooks tab to do this");
                location.href = "https://blacket.org/blooks/";
                return;
            }
            const div = document.createElement("div");
            div.style.display = "flex";
            div.style.flexWrap = "wrap";
            Object.values(blacketBoxData).forEach(blooks => {
                Object.keys(blooks).forEach(name => {
                    const img = document.createElement("img");
                    img.src = "/content/blooks/" + name.replace(/ /g, " ") + ".webp";
                    img.title = name;
                    img.alt = name;
                    img.style.cssText = "width: 50px; height: 50px; margin: 4px;";
                    div.appendChild(img);
                });
            });
            // SCROLL WRAP
            const scrollWrap = document.createElement("div");
            scrollWrap.className = "scrollWrapBlooks";
            scrollWrap.appendChild(div);
            guiContent.appendChild(scrollWrap);
        }
    }

    loadTab("estimator");
})();
