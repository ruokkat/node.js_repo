//1 таск
//1 таск
async function runSequentially<T, R>(
    items: T[],
    callback: (item: T, index: number) => Promise<R>
): Promise<R[]> {
    const results: R[] = [];

    for (let i = 0; i < items.length; i++) {
        const result = await callback(items[i], i);
        results.push(result);
    }

    return results;
}

// Приклад використання:
// @ts-ignore
const inputItems: Array<string> = ["one", "two", "three"];
// @ts-ignore
const processedResults = await runSequentially(inputItems, async (item, index) => {
    // Додайте асинхронний код, що оброблює кожен елемент масиву
    // @ts-ignore
    const processedItem = await processItem(item);
    // @ts-ignore
    const processedIndex = await processIndex(index);
    return {
        item: processedItem,
        index: processedIndex,
    };
});
console.log(processedResults);



//2 таск
function modifyArray<T>(
    array: T[],
    rule: (item: T) => boolean
): T[] {
    const modifiedElements: T[] = [];

    for (let i = array.length - 1; i >= 0; i--) {
        if (rule(array[i])) {
            // Змінені елементи додаються до масиву `modifiedElements`
            modifiedElements.unshift(...array.splice(i, 1));
        }
    }

    return modifiedElements;
}

// Приклад використання:
// @ts-ignore
const inputArray = [1, 2, 3, 6, 7, 9];
// @ts-ignore
const modifiedElements = modifyArray(inputArray, (item) => item % 2 === 0);
console.log("Масив після змін:", inputArray);
console.log("Змінені елементи:", modifiedElements);



//3 таск

import * as fs from "fs";
import * as path from "path";
import * as axios from "axios";

async function processJSONFile(filePath: string) {
    // Читаємо JSON-файл
    const jsonContent = fs.readFileSync(filePath, "utf-8");
    const links: string[] = JSON.parse(jsonContent);

    // Створюємо папку для збереження HTML-файлів
    const folderName = path.basename(filePath, ".json") + "_pages";
    fs.mkdirSync(folderName);

    // Обробляємо кожне посилання та зберігаємо його HTML-вміст у відповідному файлі
    for (const link of links) {
        // @ts-ignore
        const htmlContent = await axios.get(link);
        const fileName = path.basename(link, ".html") + ".html";
        fs.writeFileSync(path.join(folderName, fileName), htmlContent.data);
    }

    console.log("Операція завершена. HTML-вміст збережено у папці:", folderName);
}

// Приклад виклику:
const jsonFilePath = "links.json";
processJSONFile(jsonFilePath);


//4 таск
import * as os from "os";
import * as si from "systeminformation";

function printSystemInfo(frequencyInSeconds: number) {
    const systemInfo = {
        operatingSystem: os.type(),
        architecture: os.arch(),
        currentUser: os.userInfo().username,
    };

    console.log("System Info:", systemInfo);

    si.cpu().then((cpuData) => {
        // @ts-ignore
        console.log("CPU Cores Models:", cpuData.cores.map((core) => core.model));

        si.cpuTemperature().then((temperatureData) => {
            console.log("CPU Temperature:", temperatureData.main);
        });
    });

    si.graphics().then((graphicsData) => {
        console.log(
            "Graphic Controllers:",
            graphicsData.controllers.map(
                (controller) => `${controller.vendor} ${controller.model}`
            )
        );
    });

    si.mem().then((memoryData) => {
        const totalMemory = (memoryData.total / (1024 * 1024 * 1024)).toFixed(2);
        const usedMemory = (memoryData.used / (1024 * 1024 * 1024)).toFixed(2);
        const freeMemory = (memoryData.free / (1024 * 1024 * 1024)).toFixed(2);
        console.log(
            "Memory:",
            `${totalMemory} GB total, ${usedMemory} GB used, ${freeMemory} GB free`
        );
    });

    si.battery().then((batteryData) => {
        console.log("Battery Info:", batteryData);
    });
}

// Приклад виклику:
const frequencyInSeconds = 5;
setInterval(() => printSystemInfo(frequencyInSeconds), frequencyInSeconds * 1000);


//5 таск
type EventCallback = () => void;

class MyEventEmitter {
    private eventHandlers: { [eventName: string]: EventCallback[] } = {};

    registerHandler(eventName: string, callback: EventCallback) {
        // Додаємо обробник події до відповідного масиву обробників
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(callback);
    }

    emitEvent(eventName: string) {
        // Викликаємо всі обробники події для заданої події
        const handlers = this.eventHandlers[eventName];
        if (handlers) {
            handlers.forEach((handler) => handler());
        }
    }
}

// Приклад використання:
const emitter = new MyEventEmitter();
emitter.registerHandler("userUpdated", () =>
    console.log("Обліковий запис користувача оновлено")
);
emitter.emitEvent("userUpdated");
